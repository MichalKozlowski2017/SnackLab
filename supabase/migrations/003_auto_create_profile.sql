-- Function to automatically create a profile when a new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, display_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    NEW.raw_user_meta_data->>'avatar_url'
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    display_name = COALESCE(EXCLUDED.display_name, profiles.display_name),
    avatar_url = COALESCE(EXCLUDED.avatar_url, profiles.avatar_url),
    updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger that fires on every new auth.users insert
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Backfill profiles for existing users who don't have one yet
INSERT INTO public.profiles (id, email, display_name, avatar_url)
SELECT
  u.id,
  u.email,
  COALESCE(u.raw_user_meta_data->>'full_name', u.raw_user_meta_data->>'name', split_part(u.email, '@', 1)),
  u.raw_user_meta_data->>'avatar_url'
FROM auth.users u
LEFT JOIN public.profiles p ON p.id = u.id
WHERE p.id IS NULL
ON CONFLICT (id) DO NOTHING;

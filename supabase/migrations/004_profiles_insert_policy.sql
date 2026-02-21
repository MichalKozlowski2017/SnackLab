-- Add missing INSERT policy for profiles table
-- Without this, authenticated users cannot create their own profile row
CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

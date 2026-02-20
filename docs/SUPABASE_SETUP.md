# Konfiguracja Supabase dla SnackLab

## Krok 1: Stwórz projekt Supabase

1. Przejdź na [supabase.com](https://supabase.com)
2. Zaloguj się lub załóż darmowe konto
3. Kliknij "New Project"
4. Wypełnij formularz:
   - **Name**: SnackLab
   - **Database Password**: wybierz silne hasło (zapisz je bezpiecznie)
   - **Region**: wybierz najbliższy region (np. Europe West)
5. Kliknij "Create new project" i poczekaj ~2 minuty

## Krok 2: Uruchom migrację bazy danych

1. W panelu Supabase, przejdź do **SQL Editor** (ikona w menu po lewej)
2. Kliknij **New Query**
3. Skopiuj całą zawartość pliku `supabase/migrations/001_initial_schema.sql`
4. Wklej do edytora SQL
5. Kliknij **Run** (lub Ctrl/Cmd + Enter)
6. Powinieneś zobaczyć komunikat "Success. No rows returned"

## Krok 3: Sprawdź tabele

1. Przejdź do **Table Editor** w menu
2. Powinieneś zobaczyć następujące tabele:
   - `profiles`
   - `recipes`
   - `ingredients`
   - `recipe_ingredients`
   - `favorites`

## Krok 4: Pobierz klucze API

1. Przejdź do **Project Settings** (ikona koła zębatego w menu)
2. Kliknij **API** w menu po lewej
3. Skopiuj:
   - **Project URL** (np. `https://xxxxx.supabase.co`)
   - **anon public** key (długi token zaczynający się od `eyJ...`)

## Krok 5: Skonfiguruj zmienne środowiskowe

1. Otwórz plik `.env` w głównym folderze projektu
2. Uzupełnij wartości:

```env
EXPO_PUBLIC_SUPABASE_URL=wklej_tutaj_project_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=wklej_tutaj_anon_key
```

## Krok 6: Konfiguracja Authentication (opcjonalne)

Jeśli chcesz włączyć autentykację użytkowników:

1. Przejdź do **Authentication** > **Providers**
2. Włącz **Email**:
   - **Enable Email provider**: ON
   - **Confirm email**: możesz wyłączyć dla testów
3. Zapisz zmiany

### Dodatkowi providerzy (opcjonalne):

Możesz włączyć logowanie przez:

- Google
- GitHub
- Apple
- Facebook

Każdy wymaga skonfigurowania OAuth credentials w odpowiednich serwisach.

## Krok 7: Testuj połączenie

1. Uruchom aplikację: `npm start`
2. Sprawdź czy aplikacja łączy się z bazą
3. W konsoli nie powinny być błędy związane z Supabase

## Krok 8: Storage dla zdjęć (opcjonalne)

Jeśli chcesz dodać zdjęcia przepisów:

1. Przejdź do **Storage** w menu Supabase
2. Kliknij **New bucket**
3. Nazwa: `recipe-images`
4. **Public bucket**: ON (zdjęcia będą publiczne)
5. Kliknij **Create bucket**

### Polityki dostępu dla Storage:

```sql
-- Pozwól wszystkim czytać zdjęcia
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'recipe-images');

-- Pozwól zalogowanym użytkownikom dodawać zdjęcia
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'recipe-images'
  AND auth.role() = 'authenticated'
);

-- Użytkownicy mogą usuwać swoje zdjęcia
CREATE POLICY "Users can delete own images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'recipe-images'
  AND auth.uid()::text = (storage.foldername(name))[1]
);
```

## Dodatkowe zasoby

- 📖 [Dokumentacja Supabase](https://supabase.com/docs)
- 🎓 [Supabase + React Native Guide](https://supabase.com/docs/guides/getting-started/tutorials/with-expo-react-native)
- 🔐 [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)

## Rozwiązywanie problemów

### Błąd: "Invalid API key"

- Sprawdź czy klucze w `.env` są poprawne
- Upewnij się, że plik `.env` jest w głównym folderze projektu
- Zrestartuj Expo (`npm start`)

### Błąd: "relation does not exist"

- Upewnij się, że uruchomiłeś migrację SQL
- Sprawdź w Table Editor czy tabele istnieją

### Błędy RLS (Row Level Security)

- Sprawdź w Dashboard > Authentication czy użytkownik jest zalogowany
- Przejrzyj polityki RLS w Table Editor > Policies

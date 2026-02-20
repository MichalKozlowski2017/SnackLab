# 🧪 SnackLab

> Aplikacja mobilna do tworzenia kreatywnych przepisów z 3-5 składników, które masz w lodówce.

## 📱 Opis projektu

SnackLab to aplikacja mobilna stworzona w React Native + Expo, która pomaga użytkownikom znaleźć lub wygenerować przepisy kulinarne na podstawie składników, które mają pod ręką. Aplikacja oferuje:

- 🔍 Przeglądanie gotowych przepisów z bazy danych
- 🤖 Generowanie nowych przepisów przy użyciu AI (OpenAI)
- ❤️ Zapisywanie ulubionych przepisów
- 👤 Zarządzanie profilem użytkownika
- 📝 Tworzenie własnych przepisów

## 🛠️ Stack Technologiczny

### Frontend

- **React Native** - framework do budowy aplikacji mobilnych
- **Expo** - platforma przyśpieszająca rozwój RN
- **TypeScript** - typowanie statyczne
- **React Navigation** - nawigacja w aplikacji
- **Zustand** - prosty i wydajny state management
- **TanStack Query (React Query)** - zarządzanie stanem serwerowym
- **StyleSheet (React Native)** - natywne stylowanie komponentów

### Backend

- **Supabase** - Backend-as-a-Service
  - PostgreSQL - baza danych
  - Authentication - autentykacja użytkowników
  - Storage - przechowywanie obrazów
  - Row Level Security - bezpieczeństwo na poziomie wierszy

### AI & Zewnętrzne API

- **OpenAI API** - generowanie przepisów (opcjonalne)

## 📂 Struktura projektu

```
snacklab/
├── src/
│   ├── components/        # Komponenty UI
│   │   ├── common/        # Wspólne komponenty (Button, Input, itp.)
│   │   ├── recipe/        # Komponenty związane z przepisami
│   │   └── ingredient/    # Komponenty składników
│   ├── screens/           # Ekrany aplikacji
│   │   ├── home/          # Ekran główny
│   │   ├── recipe/        # Szczegóły przepisu
│   │   ├── create-recipe/ # Tworzenie przepisu
│   │   ├── favorites/     # Ulubione przepisy
│   │   └── profile/       # Profil użytkownika
│   ├── navigation/        # Konfiguracja nawigacji
│   ├── hooks/             # Custom React hooks
│   ├── services/          # Serwisy (API, Supabase)
│   ├── store/             # Zustand stores
│   ├── types/             # Definicje typów TypeScript
│   ├── utils/             # Funkcje pomocnicze
│   └── constants/         # Stałe aplikacji
├── supabase/
│   └── migrations/        # Migracje bazy danych
├── assets/                # Obrazy, fonty, itp.
└── App.tsx                # Główny plik aplikacji
```

## 🚀 Instalacja i uruchomienie

### Wymagania

- Node.js 18.x lub nowszy
- npm lub yarn
- Expo CLI
- Konto Supabase (darmowe)
- Konto OpenAI (opcjonalne, dla AI)

### Krok po kroku

1. **Sklonuj repozytorium** (jeśli git jest skonfigurowany)

```bash
git clone <repository-url>
cd snacklab
```

2. **Zainstaluj zależności**

```bash
npm install
```

3. **Skonfiguruj zmienne środowiskowe**

Skopiuj plik `.env.example` do `.env` i wypełnij odpowiednimi kluczami:

```bash
cp .env.example .env
```

Następnie edytuj `.env`:

```env
EXPO_PUBLIC_SUPABASE_URL=twój_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=twój_supabase_anon_key
EXPO_PUBLIC_OPENAI_API_KEY=twój_openai_key (opcjonalne)
```

4. **Skonfiguruj Supabase**

- Załóż konto na [supabase.com](https://supabase.com)
- Stwórz nowy projekt
- W SQL Editor uruchom migrację z pliku `supabase/migrations/001_initial_schema.sql`
- Skopiuj URL projektu i klucz ANON do pliku `.env`

5. **Uruchom aplikację**

```bash
npm start
```

Następnie:

- Naciśnij `i` dla iOS simulator
- Naciśnij `a` dla Android emulator
- Zeskanuj kod QR w aplikacji Expo Go na telefonie

## 📝 Dostępne skrypty

```bash
npm start          # Uruchom Expo dev server
npm run android    # Uruchom na Androidzie
npm run ios        # Uruchom na iOS
npm run web        # Uruchom w przeglądarce
```

## 🗄️ Schema bazy danych

Aplikacja używa następujących tabel:

- `profiles` - Profile użytkowników
- `recipes` - Przepisy kulinarne
- `ingredients` - Składniki
- `recipe_ingredients` - Relacja wiele-do-wielu między przepisami a składnikami
- `favorites` - Ulubione przepisy użytkowników

Pełny schemat znajduje się w `supabase/migrations/001_initial_schema.sql`.

## 🔐 Bezpieczeństwo

Projekt używa Row Level Security (RLS) w Supabase, co zapewnia:

- Użytkownicy mogą edytować tylko własne przepisy
- Użytkownicy mogą zarządzać tylko własnymi ulubionymi
- Wszyscy mogą przeglądać publiczne przepisy

## 🎨 Customizacja

### Kolory

Główne kolory aplikacji można zmienić w:

- `src/constants/index.ts` - dla stałych JS

### Nawigacja

Struktura nawigacji znajduje się w `src/navigation/index.tsx`.

## 🚧 Roadmap

- [ ] Implementacja pełnej integracji z OpenAI API
- [ ] Dodanie obrazów do przepisów
- [ ] System ocen i komentarzy
- [ ] Udostępnianie przepisów
- [ ] Tryb offline
- [ ] Notyfikacje push
- [ ] Eksport przepisów do PDF
- [ ] Ciemny motyw

## 📄 Licencja

MIT

## 👨‍💻 Autor

Michal

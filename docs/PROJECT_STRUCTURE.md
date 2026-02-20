# 📁 Struktura Projektu SnackLab

```
snacklab/
│
├── 📱 App.tsx                          # Główny komponent aplikacji
├── index.ts                            # Entry point
├── app.json                            # Konfiguracja Expo
├── package.json                        # Zależności projektu
├── tsconfig.json                       # Konfiguracja TypeScript
├── babel.config.js                     # Konfiguracja Babel
│
├── 📄 .env                             # Zmienne środowiskowe (nie w git)
├── 📄 .env.example                     # Przykładowe zmienne
├── 📄 .gitignore                       # Pliki ignorowane przez git
├── 📄 .eslintrc.js                     # Konfiguracja ESLint
├── 📄 .prettierrc                      # Konfiguracja Prettier
├── 📄 .prettierignore                  # Pliki ignorowane przez Prettier
│
├── 📖 README.md                        # Dokumentacja główna
│
├── 📂 docs/                            # Dodatkowa dokumentacja
│   ├── QUICKSTART.md                   # Szybki start
│   ├── SUPABASE_SETUP.md              # Konfiguracja Supabase
│   └── TODO.md                         # Roadmap i TODO list
│
├── 📂 supabase/                        # Konfiguracja backendu
│   └── migrations/
│       └── 001_initial_schema.sql      # Schema bazy danych
│
├── 📂 assets/                          # Zasoby (obrazy, fonty)
│   ├── adaptive-icon.png
│   ├── favicon.png
│   ├── icon.png
│   └── splash-icon.png
│
└── 📂 src/                             # Kod źródłowy aplikacji
    │
    ├── 📂 components/                  # Komponenty React
    │   ├── common/                     # Wspólne komponenty
    │   │   └── Button.tsx              # Komponenty przycisków
    │   ├── recipe/                     # Komponenty przepisów
    │   │   └── RecipeCard.tsx          # Karta przepisu
    │   └── ingredient/                 # Komponenty składników
    │       └── IngredientChip.tsx      # Chip składnika
    │
    ├── 📂 screens/                     # Ekrany aplikacji
    │   ├── home/
    │   │   ├── HomeScreen.tsx          # Ekran główny
    │   │   └── index.ts
    │   ├── recipe/
    │   │   ├── RecipeDetailScreen.tsx  # Szczegóły przepisu
    │   │   └── index.ts
    │   ├── create-recipe/
    │   │   ├── CreateRecipeScreen.tsx  # Tworzenie przepisu
    │   │   └── index.ts
    │   ├── favorites/
    │   │   ├── FavoritesScreen.tsx     # Ulubione przepisy
    │   │   └── index.ts
    │   └── profile/
    │       ├── ProfileScreen.tsx       # Profil użytkownika
    │       └── index.ts
    │
    ├── 📂 navigation/
    │   └── index.tsx                   # Konfiguracja nawigacji
    │
    ├── 📂 hooks/
    │   └── useRecipes.ts               # React Query hooks
    │
    ├── 📂 services/
    │   ├── supabase.ts                 # Klient Supabase
    │   └── openai.ts                   # Serwis OpenAI
    │
    ├── 📂 store/
    │   └── ingredientsStore.ts         # Zustand store
    │
    ├── 📂 types/
    │   └── index.ts                    # Definicje typów TypeScript
    │
    ├── 📂 utils/
    │   └── index.ts                    # Funkcje pomocnicze
    │
    └── 📂 constants/
        └── index.ts                    # Stałe aplikacji
```

## Kluczowe pliki

### Konfiguracja

- `App.tsx` - Główny komponent z providerami
- `src/navigation/index.tsx` - Stack i Bottom Tab navigation
- `.env` - Zmienne środowiskowe (Supabase, OpenAI)

### Typy i modele danych

- `src/types/index.ts` - Recipe, Ingredient, User, Navigation
- `supabase/migrations/001_initial_schema.sql` - Schema PostgreSQL

### State Management

- `src/store/ingredientsStore.ts` - Zustand (wybrane składniki)
- `src/hooks/useRecipes.ts` - React Query (dane z serwera)

### Serwisy

- `src/services/supabase.ts` - Połączenie z bazą danych
- `src/services/openai.ts` - Generowanie przepisów AI

### UI Components

- `src/components/common/Button.tsx` - Uniwersalny przycisk
- `src/components/recipe/RecipeCard.tsx` - Karta przepisu
- `src/components/ingredient/IngredientChip.tsx` - Chip składnika

### Ekrany

- `src/screens/home/` - Lista przepisów
- `src/screens/recipe/` - Szczegóły przepisu
- `src/screens/create-recipe/` - Wybór składników + generowanie
- `src/screens/favorites/` - Ulubione przepisy
- `src/screens/profile/` - Profil i ustawienia

## Stack Count

- **Total Files**: ~40 plików
- **TypeScript/TSX**: ~25 plików
- **Documentation**: 5 plików markdown
- **Config**: 10+ plików konfiguracyjnych
- **Lines of Code**: ~1500+ linii (bez node_modules)

## Zależności

### Production (~10 packages)

- expo, react, react-native
- @react-navigation/\*
- @supabase/supabase-js
- @tanstack/react-query
- zustand

### Development (~8 packages)

- typescript
- @types/\*
- eslint, prettier
- @typescript-eslint/\*

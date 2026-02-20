# SnackLab - TODO & Roadmap

## ✅ Completed

- [x] Podstawowa struktura projektu
- [x] Konfiguracja TypeScript
- [x] Konfiguracja ESLint i Prettier
- [x] Instalacja React Navigation
- [x] Konfiguracja Zustand
- [x] Konfiguracja React Query
- [x] Konfiguracja stylowania opartego o React Native StyleSheet
- [x] Konfiguracja Supabase client
- [x] Schema bazy danych (SQL)
- [x] Podstawowe typy TypeScript
- [x] Podstawowa nawigacja (Stack + Bottom Tabs)
- [x] Ekrany startowe (Home, Recipe Detail, Create, Favorites, Profile)
- [x] Serwis OpenAI (szkielet)
- [x] Custom hooks dla React Query
- [x] Komponenty UI (Button, RecipeCard, IngredientChip)
- [x] Funkcje pomocnicze (utils)

## 🚧 In Progress / Next Steps

### Faza 1: MVP (Minimum Viable Product)

#### Backend & Database

- [x] Wypełnić bazę danych przykładowymi przepisami
- [ ] Stworzyć funkcje Supabase Edge Functions dla bezpiecznego wywołania OpenAI
- [ ] Dodać indeksy do bazy dla lepszej wydajności
- [ ] Implementacja full-text search dla przepisów

#### UI/UX

- [ ] Dodać splash screen i ikonę aplikacji
- [ ] Stworzyć ekran onboarding/welcome
- [ ] Ulepszyć ekran Home - lista przepisów z filtrowaniem
- [ ] Ulepszyć ekran Recipe Detail - pełne informacje o przepisie
- [ ] Stworzyć ekran wyboru składników (z searchem)
- [ ] Dodać loading states i error handling
- [ ] Dodać pull-to-refresh na listach
- [ ] Stworzyć komponent EmptyState
- [ ] Dodać animacje (React Native Reanimated)

#### Features

- [ ] Implementacja wyszukiwania przepisów po składnikach
- [ ] Implementacja generowania przepisów przez AI
- [ ] System dodawania do ulubionych
- [ ] Filtrowanie przepisów (difficulty, prepTime, ingredients count)
- [ ] Udostępnianie przepisów (share)

#### Authentication

- [ ] Integracja z Supabase Auth
- [ ] Ekran logowania/rejestracji
- [ ] Zarządzanie sesją użytkownika
- [ ] Resetowanie hasła

### Faza 2: Rozszerzenia

#### Features

- [ ] Upload zdjęć przepisów (Supabase Storage)
- [ ] Edycja własnych przepisów
- [ ] Usuwanie własnych przepisów
- [ ] System ocen przepisów (5 gwiazdek)
- [ ] Komentarze pod przepisami
- [ ] Historia generowanych przepisów
- [ ] Export przepisu do PDF
- [ ] Timer kuchenny (countdown)
- [ ] Lista zakupów (grocery list)

#### UI/UX

- [ ] Dark mode
- [ ] Customizacja motywu kolorystycznego
- [ ] Lepsze obrazy placeholder
- [ ] Skeleton loaders
- [ ] Gesture handling (swipe, pinch to zoom)
- [ ] Ulepszone animacje przejść

#### Performance

- [ ] Optymalizacja obrazów
- [ ] Lazy loading
- [ ] Caching strategia
- [ ] Offline mode (React Query persistent)

### Faza 3: Polski

#### Social

- [ ] Profil użytkownika z awatarem
- [ ] Follow/Following innych użytkowników
- [ ] Feed z przepisami od followowanych osób
- [ ] Prywatne/publiczne przepisy
- [ ] Udostępnianie na social media

#### Advanced Features

- [ ] Rekomendacje przepisów (ML)
- [ ] Scanner kodów kreskowych produktów
- [ ] Rozpoznawanie składników ze zdjęcia (ML)
- [ ] Kalkulator wartości odżywczych
- [ ] Plan posiłków na tydzień
- [ ] Notyfikacje push (przypomnienia, nowe przepisy)

#### Internationalization

- [ ] i18n setup
- [ ] Tłumaczenie na angielski
- [ ] Więcej języków

### Faza 4: Deployment & Distribution

#### App Store

- [ ] Przygotowanie grafik App Store (screenshots, previews)
- [ ] Przygotowanie opisu aplikacji
- [ ] Privacy policy
- [ ] Terms of service
- [ ] Budowanie z EAS Build
- [ ] Testowanie na TestFlight
- [ ] Publikacja w App Store

#### Google Play

- [ ] Przygotowanie grafik Google Play
- [ ] Testowanie na Google Play Console (internal/beta)
- [ ] Publikacja w Google Play Store

#### Marketing

- [ ] Landing page
- [ ] Social media presence
- [ ] App analytics (Expo Analytics / Firebase)
- [ ] Crash reporting (Sentry)

## 🐛 Known Issues / Bugs

- [ ] (Dodaj znalezione bugi tutaj)

## 💡 Ideas for Future

- Integracja z Spoonacular API jako backup dla przepisów
- Wersja web (React Native Web)
- Gamification (achievements, badges)
- Premium features (subscription)
- Integracja z smart devices (kitchen scales, ovens)
- AR preview przepisu
- Współpraca z influencerami kulinarnym
- Kursy gotowania w aplikacji

## 📝 Notes

- Priorytet: MVP najpierw, potem rozszerzenia
- Testować na prawdziwych urządzeniach regularnie
- Zbierać feedback od użytkowników
- Iterować szybko

---

**Ostatnia aktualizacja**: 18 lutego 2026

# 🚀 Quickstart Guide - SnackLab

Ten przewodnik pomoże Ci uruchomić aplikację SnackLab w ciągu kilku minut.

## Wymagania wstępne

Upewnij się, że masz zainstalowane:

- ✅ Node.js 18+ (`node --version`)
- ✅ npm (`npm --version`)
- ✅ Expo Go app na telefonie (iOS/Android) - pobierz z App Store/Google Play

## Krok 1: Instalacja zależności (już zrobione ✅)

Zależności są już zainstalowane! Możesz pominąć ten krok.

Jeśli w przyszłości będziesz musiał je zainstalować ponownie:

```bash
npm install
```

## Krok 2: Konfiguracja zmiennych środowiskowych (WAŻNE!)

### Opcja A: Szybki start bez bazy danych (DEV MODE)

Możesz uruchomić aplikację bez konfiguracji Supabase - interfejs będzie działał, ale bez danych z serwera.

1. Plik `.env` jest już stworzony - pozostaw puste wartości:

```env
EXPO_PUBLIC_SUPABASE_URL=
EXPO_PUBLIC_SUPABASE_ANON_KEY=
```

2. Uruchom aplikację (patrz Krok 3)

### Opcja B: Pełna konfiguracja z Supabase (~10 minut)

Przejdź do przewodnika konfiguracji:
📖 [docs/SUPABASE_SETUP.md](./SUPABASE_SETUP.md)

**TL;DR:**

1. Załóż konto na [supabase.com](https://supabase.com)
2. Stwórz nowy projekt
3. Uruchom SQL z `supabase/migrations/001_initial_schema.sql`
4. Skopiuj URL i ANON_KEY do `.env`

## Krok 3: Uruchom aplikację! 🎉

```bash
npm start
```

Po uruchomieniu zobaczysz kod QR w terminalu.

### Na telefonie (zalecane):

1. **iOS**: Otwórz aplikację Camera i zeskanuj kod QR
2. **Android**: Otwórz aplikację Expo Go i kliknij "Scan QR code"

### W emulatorze:

```bash
# iOS (wymaga Xcode na macOS)
npm run ios

# Android (wymaga Android Studio)
npm run android
```

### W przeglądarce (ograniczona funkcjonalność):

```bash
npm run web
```

## Krok 4: Testuj aplikację

Aplikacja uruchomi się z podstawową nawigacją:

- 🏠 **Home** - Ekran główny z przepisami
- ❤️ **Ulubione** - Zapisane przepisy
- 👤 **Profil** - Ustawienia użytkownika

Możesz kliknąć "Stwórz przepis z AI" aby przejść do ekranu tworzenia przepisu (generowanie AI wymaga konfiguracji OpenAI w Kroku 5).

## Krok 5: (Opcjonalne) Konfiguracja OpenAI dla generowania przepisów

Jeśli chcesz używać funkcji generowania przepisów przez AI:

1. Załóż konto na [platform.openai.com](https://platform.openai.com)
2. Stwórz API key w sekcji API Keys
3. Dodaj do `.env`:

```env
EXPO_PUBLIC_OPENAI_API_KEY=sk-...
```

4. Zrestartuj aplikację (`Ctrl+C` i ponownie `npm start`)

⚠️ **UWAGA**: OpenAI jest płatne (pay-as-you-go). GPT-4 kosztuje ~$0.03 za 1000 tokenów.

## Przydatne komendy

```bash
# Uruchom dev server
npm start

# Sprawdź błędy TypeScript
npm run type-check

# Formatuj kod
npm run format

# Napraw problemy z ESLint
npm run lint:fix

# Wyczyść cache Expo (jeśli coś nie działa)
npx expo start -c
```

## Często spotykane problemy

### "Connection refused" / "Network error"

- Upewnij się, że telefon i komputer są w tej samej sieci WiFi
- Wyłącz VPN
- Spróbuj tunel: `npx expo start --tunnel`

### "Module not found"

```bash
rm -rf node_modules
npm install
```

### "Unable to start server"

```bash
npx expo start -c  # Wyczyść cache
```

### Aplikacja się nie odświeża po zmianach

- Kliknij `r` w terminalu aby przeładować
- Lub wstrząśnij telefonem i wybierz "Reload"

## Następne kroki

1. 📖 Przeczytaj [README.md](../README.md) aby poznać strukturę projektu
2. 🗄️ Skonfiguruj Supabase: [docs/SUPABASE_SETUP.md](./SUPABASE_SETUP.md)
3. 📝 Zobacz roadmap: [docs/TODO.md](./TODO.md)
4. 🎨 Dostosuj kolory w `src/constants/index.ts`
5. 🚀 Zacznij rozwijać funkcje z `docs/TODO.md`

## Potrzebujesz pomocy?

- 📚 [Expo Documentation](https://docs.expo.dev/)
- 🎓 [React Native Tutorial](https://reactnative.dev/docs/tutorial)
- 💬 [Expo Discord](https://chat.expo.dev/)
- 🐛 [Zgłoś problem](https://github.com/your-username/snacklab/issues)

---

**Miłego kodowania! 🎉**

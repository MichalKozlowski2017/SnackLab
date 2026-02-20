import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import { supabase } from '../../services/supabase';

WebBrowser.maybeCompleteAuthSession();

function parseAuthUrl(url: string) {
  const parsedUrl = new URL(url);
  const queryParams = parsedUrl.searchParams;
  const hashString = parsedUrl.hash.startsWith('#') ? parsedUrl.hash.slice(1) : parsedUrl.hash;
  const hashParams = new URLSearchParams(hashString);

  return {
    accessToken: queryParams.get('access_token') ?? hashParams.get('access_token'),
    refreshToken: queryParams.get('refresh_token') ?? hashParams.get('refresh_token'),
    errorDescription:
      queryParams.get('error_description') ?? hashParams.get('error_description') ?? null,
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#111827',
  },
  subtitle: {
    color: '#6b7280',
    marginTop: 8,
    marginBottom: 24,
    fontSize: 15,
    lineHeight: 22,
  },
  button: {
    backgroundColor: '#f79f17',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
  helperText: {
    marginTop: 12,
    color: '#6b7280',
    fontSize: 13,
  },
  errorText: {
    marginTop: 12,
    color: '#dc2626',
    fontSize: 13,
  },
});

export default function AuthScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const redirectTo = Linking.createURL('auth/callback', { scheme: 'snacklab' });

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo,
          skipBrowserRedirect: true,
        },
      });

      if (error) {
        throw error;
      }

      if (!data?.url) {
        throw new Error('Nie udało się rozpocząć logowania Google.');
      }

      const authResult = await WebBrowser.openAuthSessionAsync(data.url, redirectTo);

      if (authResult.type !== 'success' || !authResult.url) {
        setIsLoading(false);
        return;
      }

      const { accessToken, refreshToken, errorDescription } = parseAuthUrl(authResult.url);

      if (errorDescription) {
        throw new Error(errorDescription);
      }

      if (!accessToken || !refreshToken) {
        throw new Error('Brak tokenów sesji po logowaniu Google.');
      }

      const { error: sessionError } = await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      });

      if (sessionError) {
        throw sessionError;
      }
    } catch (error) {
      const fallbackMessage = 'Nie udało się zalogować przez Google.';
      const message = error instanceof Error ? error.message : fallbackMessage;
      setErrorMessage(message || fallbackMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Witaj w SnackLab</Text>
      <Text style={styles.subtitle}>
        Zaloguj się przez Google, aby zapisywać ulubione i tworzyć własne przepisy.
      </Text>

      <TouchableOpacity
        style={[styles.button, isLoading && styles.buttonDisabled]}
        onPress={() => {
          void handleGoogleSignIn();
        }}
        disabled={isLoading}
        activeOpacity={0.7}
      >
        <Text style={styles.buttonText}>{isLoading ? 'Logowanie...' : 'Kontynuuj z Google'}</Text>
      </TouchableOpacity>

      <Text style={styles.helperText}>
        Google Auth jest główną metodą logowania w tej wersji MVP.
      </Text>
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
}

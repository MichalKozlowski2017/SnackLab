import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { supabase } from '../../services/supabase';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#111827',
  },
  subtitle: {
    color: '#6b7280',
    marginTop: 8,
  },
  scrollContent: {
    flex: 1,
    paddingHorizontal: 16,
  },
  section: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  emptyText: {
    color: '#9ca3af',
  },
  infoText: {
    color: '#374151',
    marginBottom: 16,
  },
  signOutButton: {
    backgroundColor: '#ef4444',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
  },
  signOutButtonText: {
    color: 'white',
    fontWeight: '700',
  },
});

export default function ProfileScreen() {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setEmail(user?.email ?? null);
    };

    void loadUser();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profil</Text>
        <Text style={styles.subtitle}>Twoje konto i preferencje aplikacji</Text>
      </View>

      <ScrollView style={styles.scrollContent}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ustawienia</Text>
          <Text style={styles.infoText}>
            {email ? `Zalogowano jako: ${email}` : 'Brak danych konta.'}
          </Text>
          <TouchableOpacity style={styles.signOutButton} onPress={() => void handleSignOut()}>
            <Text style={styles.signOutButtonText}>Wyloguj</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

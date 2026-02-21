import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { supabase } from '../../services/supabase';

interface UserInfo {
  email: string | null;
  displayName: string | null;
  avatarInitials: string;
}

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
  avatarSection: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f79f17',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 28,
    fontWeight: '700',
    color: 'white',
  },
  displayName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  emailText: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  section: {
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
    paddingTop: 16,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#9ca3af',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  infoRow: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  infoLabel: {
    fontSize: 12,
    color: '#9ca3af',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 15,
    color: '#111827',
  },
  signOutButton: {
    backgroundColor: '#fee2e2',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 32,
  },
  signOutButtonText: {
    color: '#ef4444',
    fontWeight: '700',
    fontSize: 15,
  },
});

export default function ProfileScreen() {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    email: null,
    displayName: null,
    avatarInitials: '?',
  });

  useEffect(() => {
    const loadUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const displayName = user.user_metadata?.full_name ?? user.user_metadata?.name ?? null;

      const initials = displayName
        ? displayName
            .split(' ')
            .map((n: string) => n[0])
            .slice(0, 2)
            .join('')
            .toUpperCase()
        : (user.email?.[0] ?? '?').toUpperCase();

      setUserInfo({ email: user.email ?? null, displayName, avatarInitials: initials });
    };

    void loadUser();
  }, []);

  const handleSignOut = () => {
    Alert.alert('Wylogowanie', 'Czy na pewno chcesz się wylogować?', [
      { text: 'Anuluj', style: 'cancel' },
      {
        text: 'Wyloguj',
        style: 'destructive',
        onPress: () => void supabase.auth.signOut(),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profil</Text>
        <Text style={styles.subtitle}>Twoje konto i ustawienia</Text>
      </View>

      <ScrollView style={styles.scrollContent}>
        <View style={styles.avatarSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{userInfo.avatarInitials}</Text>
          </View>
          {userInfo.displayName && <Text style={styles.displayName}>{userInfo.displayName}</Text>}
          {userInfo.email && <Text style={styles.emailText}>{userInfo.email}</Text>}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Konto</Text>
          {userInfo.displayName && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Imię i nazwisko</Text>
              <Text style={styles.infoValue}>{userInfo.displayName}</Text>
            </View>
          )}
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoValue}>{userInfo.email ?? '—'}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <Text style={styles.signOutButtonText}>Wyloguj się</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

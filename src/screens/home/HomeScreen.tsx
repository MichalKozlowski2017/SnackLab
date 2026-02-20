import React, { useEffect, useRef, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import { useRecipes } from '../../hooks/useRecipes';
import RecipeCard from '../../components/recipe/RecipeCard';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

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
  aiButton: {
    backgroundColor: '#f79f17',
    borderRadius: 12,
    padding: 24,
    marginBottom: 16,
  },
  aiButtonTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  aiButtonSubtitle: {
    color: 'rgba(255,255,255,0.5)',
    marginTop: 8,
  },
  section: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#dc2626',
    marginBottom: 16,
  },
  emptyText: {
    color: '#9ca3af',
  },
  refreshedText: {
    color: '#16a34a',
    marginBottom: 12,
    fontSize: 13,
  },
});

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { data: recipes = [], isLoading, isError, refetch, isRefetching } = useRecipes();
  const [showRefreshedText, setShowRefreshedText] = useState(false);
  const hideRefreshedTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (hideRefreshedTimeout.current) {
        clearTimeout(hideRefreshedTimeout.current);
      }
    };
  }, []);

  const handleRefresh = async () => {
    const result = await refetch();

    if (!result.error) {
      setShowRefreshedText(true);

      if (hideRefreshedTimeout.current) {
        clearTimeout(hideRefreshedTimeout.current);
      }

      hideRefreshedTimeout.current = setTimeout(() => {
        setShowRefreshedText(false);
      }, 1800);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>SnackLab</Text>
        <Text style={styles.subtitle}>Odkryj przepisy z Twoich składników</Text>
      </View>

      <ScrollView
        style={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={() => {
              void handleRefresh();
            }}
          />
        }
      >
        <TouchableOpacity
          style={styles.aiButton}
          onPress={() => navigation.navigate('CreateRecipe', {})}
          activeOpacity={0.7}
        >
          <Text style={styles.aiButtonTitle}>🧪 Stwórz przepis z AI</Text>
          <Text style={styles.aiButtonSubtitle}>
            Wybierz składniki i pozwól AI stworzyć przepis
          </Text>
        </TouchableOpacity>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popularne przepisy</Text>
          {showRefreshedText && <Text style={styles.refreshedText}>Odświeżono</Text>}
          {isLoading && <Text style={styles.emptyText}>Ładowanie przepisów...</Text>}
          {isError && <Text style={styles.emptyText}>Nie udało się pobrać przepisów.</Text>}
          {!isLoading && !isError && recipes.length === 0 && (
            <Text style={styles.emptyText}>Brak przepisów w bazie.</Text>
          )}
          {!isLoading &&
            !isError &&
            recipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onPress={() => navigation.navigate('RecipeDetail', { recipeId: recipe.id })}
              />
            ))}
        </View>
      </ScrollView>
    </View>
  );
}

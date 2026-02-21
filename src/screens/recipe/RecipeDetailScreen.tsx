import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import { useRecipe, useFavorites, useToggleFavorite } from '../../hooks/useRecipes';
import { formatDifficulty, formatPrepTime } from '../../utils';

type Props = NativeStackScreenProps<RootStackParamList, 'RecipeDetail'>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  titleContainer: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  favoriteButton: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteIcon: {
    fontSize: 28,
    color: '#d1d5db',
  },
  favoriteIconActive: {
    fontSize: 28,
    color: '#f79f17',
  },
  idText: {
    color: '#6b7280',
    marginTop: 8,
  },
  description: {
    color: '#374151',
    marginTop: 12,
    fontSize: 15,
    lineHeight: 22,
  },
  metaRow: {
    marginTop: 16,
    gap: 8,
  },
  metaText: {
    color: '#4b5563',
  },
  sectionTitle: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  stepText: {
    marginTop: 8,
    color: '#374151',
    lineHeight: 21,
  },
  emptyText: {
    color: '#9ca3af',
    marginTop: 16,
  },
});

export default function RecipeDetailScreen({ route }: Props) {
  const { recipeId } = route.params;
  const { data: recipe, isLoading, isError } = useRecipe(recipeId);
  const { data: favoriteRecipes = [] } = useFavorites();
  const { mutateAsync: toggleFavorite } = useToggleFavorite();

  const serverIsFavorite = useMemo(() => {
    return favoriteRecipes.some((r) => r.id === recipeId);
  }, [favoriteRecipes, recipeId]);

  const [optimisticFavorite, setOptimisticFavorite] = useState(serverIsFavorite);

  useEffect(() => {
    setOptimisticFavorite(serverIsFavorite);
  }, [serverIsFavorite]);

  const handleToggleFavorite = async () => {
    const prev = optimisticFavorite;
    setOptimisticFavorite(!prev);
    try {
      await toggleFavorite({ recipeId, isFavorite: prev });
    } catch {
      setOptimisticFavorite(prev);
    }
  };

  if (isLoading) {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Szczegóły przepisu</Text>
          <Text style={styles.emptyText}>Ładowanie przepisu...</Text>
        </View>
      </ScrollView>
    );
  }

  if (isError || !recipe) {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Szczegóły przepisu</Text>
          <Text style={styles.emptyText}>Nie udało się pobrać przepisu.</Text>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{recipe.title}</Text>
          </View>
          <Pressable
            style={styles.favoriteButton}
            onPress={handleToggleFavorite}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Text style={optimisticFavorite ? styles.favoriteIconActive : styles.favoriteIcon}>
              ♥
            </Text>
          </Pressable>
        </View>
        <Text style={styles.idText}>ID: {recipeId}</Text>
        {!!recipe.description && <Text style={styles.description}>{recipe.description}</Text>}

        <View style={styles.metaRow}>
          <Text style={styles.metaText}>⏱️ Czas: {formatPrepTime(recipe.prepTime)}</Text>
          <Text style={styles.metaText}>📊 Trudność: {formatDifficulty(recipe.difficulty)}</Text>
          <Text style={styles.metaText}>🥗 Składniki: {recipe.ingredients.length}</Text>
        </View>

        <Text style={styles.sectionTitle}>Kroki</Text>
        {recipe.steps.map((step, index) => (
          <Text key={`${recipe.id}-step-${index + 1}`} style={styles.stepText}>
            {index + 1}. {step}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
}

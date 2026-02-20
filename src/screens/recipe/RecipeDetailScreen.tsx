import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import { useRecipe } from '../../hooks/useRecipes';
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
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
        <Text style={styles.title}>{recipe.title}</Text>
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

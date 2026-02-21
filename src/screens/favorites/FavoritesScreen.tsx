import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import { useFavorites } from '../../hooks/useRecipes';
import { useToggleFavorite } from '../../hooks/useRecipes';
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 300,
  },
  section: {
    marginTop: 16,
    marginBottom: 32,
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
});

export default function FavoritesScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { data: favoriteRecipes = [], isLoading, error, refetch } = useFavorites();
  const { mutateAsync: toggleFavorite } = useToggleFavorite();

  const handleNavigateToRecipe = (recipeId: string) => {
    navigation.navigate('RecipeDetail', { recipeId });
  };

  const handleToggleFavorite = (recipeId: string) => async () => {
    const isFavorite = favoriteRecipes.some((r) => r.id === recipeId);
    await toggleFavorite({ recipeId, isFavorite });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Ulubione</Text>
        <Text style={styles.subtitle}>Zapisane przepisy, do których chcesz wracać</Text>
      </View>

      <ScrollView
        style={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={() => refetch()} />}
      >
        {isLoading && !favoriteRecipes.length ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#ec4899" />
          </View>
        ) : error ? (
          <View style={styles.section}>
            <Text style={styles.emptyText}>Coś poszło nie tak. Spróbuj ponownie.</Text>
          </View>
        ) : favoriteRecipes.length === 0 ? (
          <View style={styles.section}>
            <Text style={styles.emptyText}>Twoje ulubione przepisy pojawią się tutaj...</Text>
          </View>
        ) : (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{favoriteRecipes.length} ulubione przepisy</Text>
            {favoriteRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onPress={() => handleNavigateToRecipe(recipe.id)}
                isFavorite={true}
                onToggleFavorite={handleToggleFavorite(recipe.id)}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

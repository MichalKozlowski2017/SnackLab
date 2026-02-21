import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import {
  useIngredients,
  useRecipes,
  useFavorites,
  useToggleFavorite,
} from '../../hooks/useRecipes';
import RecipeCard from '../../components/recipe/RecipeCard';
import IngredientChip from '../../components/ingredient/IngredientChip';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
const INITIAL_VISIBLE_INGREDIENTS = 12;

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
    color: '#357522',
    marginBottom: 16,
  },
  filterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  filterToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  filterToggleText: {
    color: '#4b5563',
    fontSize: 13,
    fontWeight: '500',
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  clearButton: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  clearButtonText: {
    color: '#374151',
    fontSize: 13,
    fontWeight: '500',
  },
  ingredientsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  emptyText: {
    color: '#9ca3af',
  },
  refreshedText: {
    color: '#16a34a',
    marginBottom: 12,
    fontSize: 13,
  },
  showMoreButton: {
    marginTop: 12,
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: '#f3f4f6',
  },
  showMoreText: {
    color: '#374151',
    fontSize: 13,
    fontWeight: '500',
  },
});

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { data: recipes = [], isLoading, isError, refetch, isRefetching } = useRecipes();
  const {
    data: ingredients = [],
    isLoading: isIngredientsLoading,
    isError: isIngredientsError,
  } = useIngredients();
  const { data: favoriteRecipes = [] } = useFavorites();
  const { mutateAsync: toggleFavorite } = useToggleFavorite();
  const [selectedIngredientIds, setSelectedIngredientIds] = useState<string[]>([]);
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(false);
  const [showAllIngredients, setShowAllIngredients] = useState(false);
  const [showRefreshedText, setShowRefreshedText] = useState(false);
  const hideRefreshedTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const favoriteRecipeIds = useMemo(() => {
    return new Set(favoriteRecipes.map((recipe) => recipe.id));
  }, [favoriteRecipes]);

  const usedIngredientIds = useMemo(() => {
    const ids = new Set<string>();

    recipes.forEach((recipe) => {
      recipe.ingredients.forEach((ingredient) => {
        ids.add(ingredient.id);
      });
    });

    return ids;
  }, [recipes]);

  const filterIngredients = useMemo(() => {
    if (usedIngredientIds.size === 0) {
      return ingredients;
    }

    return ingredients.filter((ingredient) => usedIngredientIds.has(ingredient.id));
  }, [ingredients, usedIngredientIds]);

  const selectedIngredients = useMemo(
    () => filterIngredients.filter((ingredient) => selectedIngredientIds.includes(ingredient.id)),
    [filterIngredients, selectedIngredientIds]
  );

  const visibleIngredients = useMemo(() => {
    if (showAllIngredients) {
      return filterIngredients;
    }

    return filterIngredients.slice(0, INITIAL_VISIBLE_INGREDIENTS);
  }, [filterIngredients, showAllIngredients]);

  const filteredRecipes = useMemo(() => {
    if (selectedIngredientIds.length === 0) {
      return recipes;
    }

    const selectedIdsSet = new Set(selectedIngredientIds);

    return recipes.filter((recipe) =>
      recipe.ingredients.some((ingredient) => selectedIdsSet.has(ingredient.id))
    );
  }, [recipes, selectedIngredientIds]);

  useEffect(() => {
    return () => {
      if (hideRefreshedTimeout.current) {
        clearTimeout(hideRefreshedTimeout.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isFiltersExpanded) {
      setShowAllIngredients(false);
    }
  }, [isFiltersExpanded]);

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

  const handleIngredientToggle = (ingredientId: string) => {
    setSelectedIngredientIds((current) => {
      if (current.includes(ingredientId)) {
        return current.filter((id) => id !== ingredientId);
      }

      return [...current, ingredientId];
    });
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
          <TouchableOpacity
            style={styles.filterToggle}
            onPress={() => setIsFiltersExpanded((current) => !current)}
            activeOpacity={0.7}
          >
            <Text style={styles.filterTitle}>
              Filtruj po składnikach
              {selectedIngredientIds.length > 0 ? ` (${selectedIngredientIds.length})` : ''}
            </Text>
            <Text style={styles.filterToggleText}>{isFiltersExpanded ? 'Zwiń ▲' : 'Rozwiń ▼'}</Text>
          </TouchableOpacity>

          <View style={styles.filterHeader}>
            <View />
            {selectedIngredientIds.length > 0 && (
              <TouchableOpacity
                style={styles.clearButton}
                onPress={() => setSelectedIngredientIds([])}
                activeOpacity={0.7}
              >
                <Text style={styles.clearButtonText}>Wyczyść</Text>
              </TouchableOpacity>
            )}
          </View>

          {isIngredientsLoading && <Text style={styles.emptyText}>Ładowanie składników...</Text>}
          {isIngredientsError && (
            <Text style={styles.emptyText}>Nie udało się pobrać składników.</Text>
          )}
          {!isIngredientsLoading && !isIngredientsError && filterIngredients.length === 0 && (
            <Text style={styles.emptyText}>Brak składników do filtrowania.</Text>
          )}

          {!isIngredientsLoading &&
            !isIngredientsError &&
            filterIngredients.length > 0 &&
            !isFiltersExpanded &&
            selectedIngredients.length > 0 && (
              <View style={styles.ingredientsWrap}>
                {selectedIngredients.map((ingredient) => (
                  <IngredientChip
                    key={ingredient.id}
                    ingredient={ingredient}
                    selected={true}
                    onPress={() => handleIngredientToggle(ingredient.id)}
                  />
                ))}
              </View>
            )}

          {!isIngredientsLoading &&
            !isIngredientsError &&
            filterIngredients.length > 0 &&
            !isFiltersExpanded &&
            selectedIngredients.length === 0 && (
              <Text style={styles.emptyText}>Rozwiń sekcję, aby wybrać składniki.</Text>
            )}

          {!isIngredientsLoading &&
            !isIngredientsError &&
            filterIngredients.length > 0 &&
            isFiltersExpanded && (
              <>
                <View style={styles.ingredientsWrap}>
                  {visibleIngredients.map((ingredient) => (
                    <IngredientChip
                      key={ingredient.id}
                      ingredient={ingredient}
                      selected={selectedIngredientIds.includes(ingredient.id)}
                      onPress={() => handleIngredientToggle(ingredient.id)}
                    />
                  ))}
                </View>

                {filterIngredients.length > INITIAL_VISIBLE_INGREDIENTS && (
                  <TouchableOpacity
                    style={styles.showMoreButton}
                    onPress={() => setShowAllIngredients((current) => !current)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.showMoreText}>
                      {showAllIngredients ? 'Pokaż mniej' : 'Pokaż więcej'}
                    </Text>
                  </TouchableOpacity>
                )}
              </>
            )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popularne przepisy</Text>
          {showRefreshedText && <Text style={styles.refreshedText}>Odświeżono</Text>}
          {isLoading && <Text style={styles.emptyText}>Ładowanie przepisów...</Text>}
          {isError && <Text style={styles.emptyText}>Nie udało się pobrać przepisów.</Text>}
          {!isLoading && !isError && filteredRecipes.length === 0 && (
            <Text style={styles.emptyText}>Brak przepisów w bazie.</Text>
          )}
          {!isLoading &&
            !isError &&
            filteredRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onPress={() => navigation.navigate('RecipeDetail', { recipeId: recipe.id })}
                isFavorite={favoriteRecipeIds.has(recipe.id)}
                onToggleFavorite={async () => {
                  await toggleFavorite({
                    recipeId: recipe.id,
                    isFavorite: favoriteRecipeIds.has(recipe.id),
                  });
                }}
              />
            ))}
        </View>
      </ScrollView>
    </View>
  );
}

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../services/supabase';
import { Recipe, Ingredient } from '../types';

type RecipeRow = {
  id: string;
  title: string;
  description: string;
  steps: string[];
  prep_time: number;
  difficulty: 'easy' | 'medium' | 'hard';
  image_url?: string;
  created_at: string;
  updated_at: string;
  user_id?: string;
  is_ai_generated: boolean;
  recipe_ingredients?: Array<{
    quantity?: number;
    unit?: string;
    ingredients?: {
      id: string;
      name: string;
      category?: Ingredient['category'];
    };
  }>;
};

function mapRecipeRowToRecipe(recipe: RecipeRow): Recipe {
  const ingredients =
    recipe.recipe_ingredients?.reduce<Ingredient[]>((accumulator, item) => {
      if (!item.ingredients) {
        return accumulator;
      }

      accumulator.push({
        id: item.ingredients.id,
        name: item.ingredients.name,
        category: item.ingredients.category,
        quantity: item.quantity,
        unit: item.unit,
      });

      return accumulator;
    }, []) ?? [];

  return {
    id: recipe.id,
    title: recipe.title,
    description: recipe.description,
    steps: recipe.steps,
    prepTime: recipe.prep_time,
    difficulty: recipe.difficulty,
    imageUrl: recipe.image_url,
    createdAt: recipe.created_at,
    updatedAt: recipe.updated_at,
    userId: recipe.user_id,
    isAiGenerated: recipe.is_ai_generated,
    ingredients,
  };
}

// Query keys
export const QUERY_KEYS = {
  recipes: ['recipes'],
  recipe: (id: string) => ['recipe', id],
  ingredients: ['ingredients'],
  favorites: (userId: string) => ['favorites', userId],
  userRecipes: (userId: string) => ['userRecipes', userId],
};

// Fetch all recipes
export function useRecipes() {
  return useQuery({
    queryKey: QUERY_KEYS.recipes,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('recipes')
        .select(
          `
          *,
          recipe_ingredients (
            ingredient_id,
            quantity,
            unit,
            ingredients (*)
          )
        `
        )
        .order('created_at', { ascending: false });

      if (error) throw error;
      return (data as RecipeRow[]).map(mapRecipeRowToRecipe);
    },
  });
}

// Fetch single recipe
export function useRecipe(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.recipe(id),
    queryFn: async () => {
      const { data, error } = await supabase
        .from('recipes')
        .select(
          `
          *,
          recipe_ingredients (
            ingredient_id,
            quantity,
            unit,
            ingredients (*)
          )
        `
        )
        .eq('id', id)
        .single();

      if (error) throw error;
      return mapRecipeRowToRecipe(data as RecipeRow);
    },
    enabled: !!id,
  });
}

// Fetch all ingredients
export function useIngredients() {
  return useQuery({
    queryKey: QUERY_KEYS.ingredients,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ingredients')
        .select('*')
        .order('name', { ascending: true });

      if (error) throw error;
      return data as Ingredient[];
    },
  });
}

// Fetch current user's favorite recipes
export function useFavorites() {
  return useQuery({
    queryKey: ['currentUserFavorites'],
    queryFn: async () => {
      // Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return [];

      // Fetch favorite recipe IDs
      const { data: favoritesList, error: favError } = await supabase
        .from('favorites')
        .select('recipe_id')
        .eq('user_id', user.id);

      if (favError) throw favError;

      const recipeIds = favoritesList?.map((fav) => fav.recipe_id) || [];

      if (recipeIds.length === 0) return [];

      // Fetch full recipes for favorited IDs
      const { data: recipesData, error: recipesError } = await supabase
        .from('recipes')
        .select(
          `
          *,
          recipe_ingredients (
            ingredient_id,
            quantity,
            unit,
            ingredients (*)
          )
        `
        )
        .in('id', recipeIds);

      if (recipesError) throw recipesError;

      return (recipesData as RecipeRow[]).map(mapRecipeRowToRecipe);
    },
  });
}

// Create recipe mutation
export function useCreateRecipe() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (recipe: Partial<Recipe>) => {
      // Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error('User not authenticated');

      // Insert recipe
      const { data: recipeData, error: recipeError } = await supabase
        .from('recipes')
        .insert({
          user_id: user.id,
          title: recipe.title,
          description: recipe.description,
          steps: recipe.steps,
          prep_time: recipe.prepTime,
          difficulty: recipe.difficulty,
          image_url: recipe.imageUrl,
          is_ai_generated: recipe.isAiGenerated,
        })
        .select()
        .single();

      if (recipeError) throw recipeError;

      // Insert recipe ingredients
      if (recipe.ingredients && recipe.ingredients.length > 0) {
        const recipeIngredients = recipe.ingredients.map((ing) => ({
          recipe_id: recipeData.id,
          ingredient_id: ing.id,
          quantity: ing.quantity,
          unit: ing.unit,
        }));

        const { error: ingredientsError } = await supabase
          .from('recipe_ingredients')
          .insert(recipeIngredients);

        if (ingredientsError) throw ingredientsError;
      }

      return recipeData;
    },
    onSuccess: () => {
      // Invalidate recipes query to refetch
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.recipes });
    },
  });
}

// Toggle favorite mutation
export function useToggleFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ recipeId, isFavorite }: { recipeId: string; isFavorite: boolean }) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error('User not authenticated');

      if (isFavorite) {
        const { error } = await supabase
          .from('favorites')
          .delete()
          .eq('user_id', user.id)
          .eq('recipe_id', recipeId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('favorites').insert({
          user_id: user.id,
          recipe_id: recipeId,
        });
        if (error) throw error;
      }

      return { recipeId, isFavorite: !isFavorite };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserFavorites'] });
    },
  });
}

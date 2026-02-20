// Recipe types
export interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: Ingredient[];
  steps: string[];
  prepTime: number; // in minutes
  difficulty: 'easy' | 'medium' | 'hard';
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
  userId?: string;
  isAiGenerated: boolean;
}

// Ingredient types
export interface Ingredient {
  id: string;
  name: string;
  quantity?: number;
  unit?: string;
  category?: IngredientCategory;
}

export type IngredientCategory =
  | 'vegetables'
  | 'fruits'
  | 'dairy'
  | 'meat'
  | 'grains'
  | 'spices'
  | 'other';

// User types
export interface User {
  id: string;
  email: string;
  displayName?: string;
  avatarUrl?: string;
  favoriteRecipes: string[];
  createdAt: string;
}

// Navigation types
export type RootStackParamList = {
  Auth: undefined;
  Home: undefined;
  RecipeDetail: { recipeId: string };
  CreateRecipe: { ingredients?: string[] };
  Favorites: undefined;
  Profile: undefined;
};

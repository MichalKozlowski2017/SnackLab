import { create } from 'zustand';
import { Ingredient } from '../types';

interface IngredientsState {
  selectedIngredients: Ingredient[];
  addIngredient: (ingredient: Ingredient) => void;
  removeIngredient: (id: string) => void;
  clearIngredients: () => void;
}

export const useIngredientsStore = create<IngredientsState>((set) => ({
  selectedIngredients: [],
  addIngredient: (ingredient) =>
    set((state) => ({
      selectedIngredients: [...state.selectedIngredients, ingredient],
    })),
  removeIngredient: (id) =>
    set((state) => ({
      selectedIngredients: state.selectedIngredients.filter((i) => i.id !== id),
    })),
  clearIngredients: () => set({ selectedIngredients: [] }),
}));

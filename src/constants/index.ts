// API endpoints
export const API_ENDPOINTS = {
  RECIPES: '/recipes',
  INGREDIENTS: '/ingredients',
  USER: '/user',
} as const;

// App constants
export const APP_NAME = 'SnackLab';

export const MAX_INGREDIENTS = 5;
export const MIN_INGREDIENTS = 3;

// Difficulty levels
export const DIFFICULTY_LEVELS = {
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard',
} as const;

// Colors
export const COLORS = {
  primary: '#f79f17',
  secondary: '#dd8a0a',
  background: '#ffffff',
  text: '#1d1002',
  gray: '#6b7280',
  lightGray: '#f3f4f6',
} as const;

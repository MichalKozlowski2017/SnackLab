/**
 * Format time in minutes to human readable format
 * @param minutes - time in minutes
 * @returns formatted string (e.g., "1 godz. 30 min" or "45 min")
 */
export function formatPrepTime(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (remainingMinutes === 0) {
    return `${hours} godz.`;
  }

  return `${hours} godz. ${remainingMinutes} min`;
}

/**
 * Format difficulty level to Polish text
 */
export function formatDifficulty(difficulty: 'easy' | 'medium' | 'hard'): string {
  const difficultyMap = {
    easy: 'Łatwy',
    medium: 'Średni',
    hard: 'Trudny',
  };

  return difficultyMap[difficulty];
}

/**
 * Get emoji for ingredient category
 */
export function getCategoryEmoji(
  category: 'vegetables' | 'fruits' | 'dairy' | 'meat' | 'grains' | 'spices' | 'other'
): string {
  const emojiMap = {
    vegetables: '🥬',
    fruits: '🍎',
    dairy: '🥛',
    meat: '🍖',
    grains: '🌾',
    spices: '🌶️',
    other: '🍴',
  };

  return emojiMap[category];
}

/**
 * Validate number of ingredients
 */
export function validateIngredientsCount(count: number): boolean {
  return count >= 3 && count <= 5;
}

/**
 * Generate unique ID
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
}

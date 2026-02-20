// OpenAI Service dla generowania przepisów
import { Recipe, Ingredient } from '../types';

const OPENAI_API_KEY = process.env.EXPO_PUBLIC_OPENAI_API_KEY;
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

interface GenerateRecipeParams {
  ingredients: Ingredient[];
  difficulty?: 'easy' | 'medium' | 'hard';
  prepTime?: number;
}

export async function generateRecipeWithAI(params: GenerateRecipeParams): Promise<Partial<Recipe>> {
  if (!OPENAI_API_KEY) {
    throw new Error('OpenAI API key not configured');
  }

  const { ingredients, difficulty = 'medium', prepTime } = params;

  const ingredientsList = ingredients.map((ing) => ing.name).join(', ');

  const prompt = `Stwórz przepis kulinarny używając TYLKO następujących składników: ${ingredientsList}.

Wymagania:
- Poziom trudności: ${difficulty}
${prepTime ? `- Czas przygotowania: około ${prepTime} minut` : ''}
- Przepis powinien być kreatywny i smaczny
- Użyj TYLKO podanych składników (lub podstawowych przypraw jak sól, pieprz)

Zwróć odpowiedź w formacie JSON:
{
  "title": "Nazwa przepisu",
  "description": "Krótki opis przepisu (2-3 zdania)",
  "steps": ["krok 1", "krok 2", ...],
  "prepTime": liczba_minut
}`;

  try {
    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content:
              'Jesteś ekspertem kulinarnym. Tworzysz proste i smaczne przepisy. Zawsze odpowiadasz w formacie JSON.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.8,
        response_format: { type: 'json_object' },
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;

    if (!content) {
      throw new Error('No content in OpenAI response');
    }

    const recipeData = JSON.parse(content);

    return {
      title: recipeData.title,
      description: recipeData.description,
      steps: recipeData.steps,
      prepTime: recipeData.prepTime || prepTime,
      difficulty,
      ingredients,
      isAiGenerated: true,
    };
  } catch (error) {
    console.error('Error generating recipe with AI:', error);
    throw error;
  }
}

// Alternatywna funkcja używająca prostszej metody (bez OpenAI)
export function generateSimpleRecipe(ingredients: Ingredient[]): Partial<Recipe> {
  const ingredientNames = ingredients.map((ing) => ing.name).join(', ');

  return {
    title: `Przepis z ${ingredients[0]?.name || 'dostępnych składników'}`,
    description: `Prosty przepis wykorzystujący: ${ingredientNames}`,
    steps: [
      'Przygotuj wszystkie składniki',
      'Wykonaj podstawową obróbkę (mycie, krojenie)',
      'Połącz składniki według własnego uznania',
      'Dopraw do smaku',
      'Podawaj świeże',
    ],
    prepTime: 20,
    difficulty: 'easy',
    ingredients,
    isAiGenerated: false,
  };
}

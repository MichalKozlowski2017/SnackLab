import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useIngredientsStore } from '../../store/ingredientsStore';

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
  subtitle: {
    color: '#6b7280',
    marginTop: 8,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  emptyText: {
    color: '#9ca3af',
  },
  ingredientsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 16,
  },
  ingredientChip: {
    backgroundColor: '#fef3e2',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  ingredientText: {
    color: '#ad6b08',
  },
  button: {
    backgroundColor: '#f79f17',
    borderRadius: 12,
    padding: 16,
    marginTop: 24,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default function CreateRecipeScreen() {
  const { selectedIngredients } = useIngredientsStore();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Stwórz przepis</Text>
        <Text style={styles.subtitle}>Wybierz 3-5 składników</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Wybrane składniki ({selectedIngredients.length}/5)
          </Text>

          {selectedIngredients.length === 0 && (
            <Text style={styles.emptyText}>Brak wybranych składników</Text>
          )}

          <View style={styles.ingredientsList}>
            {selectedIngredients.map((ingredient) => (
              <View key={ingredient.id} style={styles.ingredientChip}>
                <Text style={styles.ingredientText}>{ingredient.name}</Text>
              </View>
            ))}
          </View>
        </View>

        <TouchableOpacity
          style={[styles.button, selectedIngredients.length < 3 && styles.buttonDisabled]}
          onPress={() => {
            console.log('Generowanie przepisu...');
          }}
          disabled={selectedIngredients.length < 3}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>Wygeneruj przepis z AI</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

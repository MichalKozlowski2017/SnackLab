import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ingredient } from '../../types';
import { getCategoryEmoji } from '../../utils';

interface IngredientChipProps {
  ingredient: Ingredient;
  onPress?: () => void;
  onRemove?: () => void;
  selected?: boolean;
}

export default function IngredientChip({
  ingredient,
  onPress,
  onRemove,
  selected = false,
}: IngredientChipProps) {
  const chipStyles = [styles.chip, selected ? styles.chipSelected : styles.chipDefault];
  const textStyles = [styles.text, selected ? styles.textSelected : styles.textDefault];
  const removeTextStyles = [
    styles.removeText,
    selected ? styles.textSelected : styles.removeTextDefault,
  ];

  return (
    <TouchableOpacity style={chipStyles} onPress={onPress} activeOpacity={0.7}>
      <Text style={styles.emoji}>
        {ingredient.category ? getCategoryEmoji(ingredient.category) : '🍴'}
      </Text>
      <Text style={textStyles}>{ingredient.name}</Text>

      {onRemove && (
        <TouchableOpacity
          onPress={onRemove}
          style={styles.removeButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={removeTextStyles}>×</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 2,
  },
  chipSelected: {
    backgroundColor: '#f79f17',
    borderColor: '#dd8a0a',
  },
  chipDefault: {
    backgroundColor: '#f3f4f6',
    borderColor: '#e5e7eb',
  },
  emoji: {
    fontSize: 16,
    marginRight: 4,
  },
  text: {
    fontSize: 14,
  },
  textSelected: {
    color: '#ffffff',
    fontWeight: '600',
  },
  textDefault: {
    color: '#374151',
  },
  removeButton: {
    marginLeft: 8,
  },
  removeText: {
    fontSize: 18,
    lineHeight: 18,
  },
  removeTextDefault: {
    color: '#6b7280',
  },
});

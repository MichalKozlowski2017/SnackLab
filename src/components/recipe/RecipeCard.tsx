import React, { useEffect, useState } from 'react';
import { View, Text, Image, Pressable, TouchableOpacity, StyleSheet } from 'react-native';
import { Recipe } from '../../types';
import { formatPrepTime, formatDifficulty } from '../../utils';

interface RecipeCardProps {
  recipe: Recipe;
  onPress: () => void;
  isFavorite?: boolean;
  onToggleFavorite?: () => Promise<void>;
}

export default function RecipeCard({
  recipe,
  onPress,
  isFavorite = false,
  onToggleFavorite,
}: RecipeCardProps) {
  // Optimistic local state - flips immediately on press, then syncs with server
  const [optimisticFavorite, setOptimisticFavorite] = useState(isFavorite);

  useEffect(() => {
    setOptimisticFavorite(isFavorite);
  }, [isFavorite]);

  const handleToggleFavorite = async () => {
    if (!onToggleFavorite) return;
    const prev = optimisticFavorite;
    setOptimisticFavorite(!prev); // instant visual feedback
    try {
      await onToggleFavorite();
    } catch {
      setOptimisticFavorite(prev); // revert on error
    }
  };
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      {recipe.imageUrl ? (
        <Image source={{ uri: recipe.imageUrl }} style={styles.image} resizeMode="cover" />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Text style={styles.imageEmoji}>🍽️</Text>
        </View>
      )}

      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text style={styles.title} numberOfLines={2}>
            {recipe.title}
          </Text>
          <View style={styles.badgesRow}>
            {onToggleFavorite && (
              // Pressable prevents ScrollView from stealing the gesture
              <Pressable
                style={styles.favoriteButton}
                onPress={handleToggleFavorite}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Text style={optimisticFavorite ? styles.favoriteIconActive : styles.favoriteIcon}>
                  ♥
                </Text>
              </Pressable>
            )}
            {recipe.isAiGenerated && (
              <View style={styles.aiBadge}>
                <Text style={styles.aiBadgeText}>🤖 AI</Text>
              </View>
            )}
          </View>
        </View>

        {recipe.description && (
          <Text style={styles.description} numberOfLines={2}>
            {recipe.description}
          </Text>
        )}

        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Text style={styles.metaText}>⏱️ {formatPrepTime(recipe.prepTime)}</Text>
          </View>

          <View style={styles.metaItem}>
            <Text style={styles.metaText}>📊 {formatDifficulty(recipe.difficulty)}</Text>
          </View>

          <View style={styles.metaItem}>
            <Text style={styles.metaText}>🥗 {recipe.ingredients?.length || 0} składników</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  image: {
    width: '100%',
    height: 192,
  },
  imagePlaceholder: {
    width: '100%',
    height: 192,
    backgroundColor: '#e5e7eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageEmoji: {
    fontSize: 36,
  },
  content: {
    padding: 16,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  badgesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  favoriteButton: {
    padding: 4,
  },
  favoriteIcon: {
    fontSize: 22,
    color: '#d1d5db',
  },
  favoriteIconActive: {
    fontSize: 22,
    color: '#f79f17',
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  aiBadge: {
    marginLeft: 8,
    backgroundColor: '#f3e8ff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
  },
  aiBadgeText: {
    color: '#6b21a8',
    fontSize: 12,
    fontWeight: '600',
  },
  description: {
    color: '#4b5563',
    fontSize: 14,
    marginBottom: 12,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    color: '#6b7280',
    fontSize: 13,
  },
});

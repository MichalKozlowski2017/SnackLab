import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from '../types';

// Import screens
import HomeScreen from '../screens/home';
import RecipeDetailScreen from '../screens/recipe';
import CreateRecipeScreen from '../screens/create-recipe';
import FavoritesScreen from '../screens/favorites';
import ProfileScreen from '../screens/profile';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#f79f17',
        tabBarInactiveTintColor: '#6b7280',
      }}
    >
      <Tab.Screen name="HomeTab" component={HomeScreen} options={{ title: 'Przepisy' }} />
      <Tab.Screen name="FavoritesTab" component={FavoritesScreen} options={{ title: 'Ulubione' }} />
      <Tab.Screen name="ProfileTab" component={ProfileScreen} options={{ title: 'Profil' }} />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeTabs} options={{ headerShown: false }} />
        <Stack.Screen
          name="RecipeDetail"
          component={RecipeDetailScreen}
          options={{ title: 'Przepis' }}
        />
        <Stack.Screen
          name="CreateRecipe"
          component={CreateRecipeScreen}
          options={{ title: 'Stwórz przepis' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

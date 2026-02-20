import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { Session } from '@supabase/supabase-js';
import { RootStackParamList } from '../types';
import { supabase } from '../services/supabase';

// Import screens
import HomeScreen from '../screens/home';
import RecipeDetailScreen from '../screens/recipe';
import CreateRecipeScreen from '../screens/create-recipe';
import FavoritesScreen from '../screens/favorites';
import ProfileScreen from '../screens/profile';
import AuthScreen from '../screens/auth';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#6b7280',
    fontSize: 15,
  },
});

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
  const [session, setSession] = React.useState<Session | null>(null);
  const [isAuthLoading, setIsAuthLoading] = React.useState(true);

  React.useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      if (!mounted) {
        return;
      }

      setSession(currentSession);
      setIsAuthLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      setSession(currentSession);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  if (isAuthLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Ładowanie sesji...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {session ? (
          <>
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
          </>
        ) : (
          <Stack.Screen name="Auth" component={AuthScreen} options={{ headerShown: false }} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

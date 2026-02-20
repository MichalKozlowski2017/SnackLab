import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navigation from './src/navigation';
import { supabase } from './src/services/supabase';
import { useEffect } from 'react';

// Initialize React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

// Test Supabase connection on app start
function SupabaseTest() {
  useEffect(() => {
    const testConnection = async () => {
      try {
        console.log('🔍 Testing Supabase connection...');

        // Test 1: Check client initialization
        console.log('✅ Supabase client created:', !!supabase);

        // Test 2: Try a simple query on public recipes table
        const { data, error } = await supabase.from('recipes').select('id, title').limit(1);

        if (error) {
          console.error('❌ Query error:', error.message);
        } else {
          console.log('✅ Supabase connection works! Can read recipes:', !!data);
        }
      } catch (err) {
        console.error('❌ Connection test failed:', err);
      }
    };

    testConnection();
  }, []);

  return null;
}

export default function App() {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <SupabaseTest />
        <Navigation />
        <StatusBar style="auto" />
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}

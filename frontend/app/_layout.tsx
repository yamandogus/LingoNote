import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useEffect } from 'react';

import { useColorScheme } from '@/hooks/useColorScheme';
import '../global.css';
import React from 'react';
import Toast from 'react-native-toast-message';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';

const CustomDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: 'linear-gradient(to bottom, #0f0c29, #302b63, #24243e)',
    card: '#2a2a2a',
    text: '#f3f4f6',
    border: '#404040',
    notification: '#ff453a',
  },
};

function RootLayoutNav() {
  const { user, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === 'auth';

    if (!user && !inAuthGroup) {
      // Kullanıcı giriş yapmamış ve auth sayfasında değilse, login'e yönlendir
      router.replace('/auth/login');
    } else if (user && inAuthGroup) {
      // Kullanıcı giriş yapmış ve auth sayfasındaysa, ana sayfaya yönlendir
      router.replace('/(tabs)');
    }
  }, [user, segments, isLoading]);

  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded || isLoading) {
    // Async font loading only occurs in development.
    return null;
  }

  const backgroundColor = colorScheme === 'dark' ? '#1a1a2e' : '#f8f9fa';

  return (
    <ThemeProvider value={colorScheme === 'dark' ? CustomDarkTheme : DefaultTheme}>
      <Stack 
        screenOptions={{ 
          headerShown: false,
          animation: 'none',
          contentStyle: { backgroundColor }
        }}
      >
        <Stack.Screen name="auth" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
      <Toast />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}

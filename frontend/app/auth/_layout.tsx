import { Stack } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function AuthLayout() {
  const colorScheme = useColorScheme();
  const backgroundColor = colorScheme === 'dark' ? '#1a1a2e' : '#f8f9fa';

  return (
    <Stack 
      screenOptions={{ 
        headerShown: false,
        // animation: 'none',
        contentStyle: { backgroundColor },
      }}
    >
      <Stack.Screen 
        name="login" 
        options={{ 
          title: 'Giriş Yap'
        }} 
      />
      <Stack.Screen 
        name="register" 
        options={{ 
          title: 'Kayıt Ol'
        }} 
      />
      <Stack.Screen 
        name="forgot-password" 
        options={{ 
          title: 'Şifremi Unuttum'
        }} 
      />
    </Stack>
  );
}

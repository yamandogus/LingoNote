import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack 
      screenOptions={{ 
        headerShown: false,
        animation: 'slide_from_right',
        animationDuration: 200,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        contentStyle: { backgroundColor: 'transparent' },
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

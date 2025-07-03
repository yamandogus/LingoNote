import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";

import { useColorScheme } from "@/hooks/useColorScheme";
import "../global.css";
import Toast from "react-native-toast-message";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";

const CustomDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: "linear-gradient(to bottom, #0f0c29, #302b63, #24243e)",
    card: "#2a2a2a",
    text: "#f3f4f6",
    border: "#404040",
    notification: "#ff453a",
  },
};

function RootLayoutNav() {
  const { user, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const [splashDone, setSplashDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSplashDone(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  // 🔥 Giriş yönlendirmesi sadece splash ve auth yüklemesi bittiğinde çalışır
  useEffect(() => {
    // Yükleme veya splash bitmeden yönlendirme yapma!
    if (isLoading || !splashDone) return;

    const inAuthGroup = segments[0] === "auth";

    // Yalnızca yükleme bittikten sonra yönlendirme yap
    if (!user && !inAuthGroup) {
      router.replace("/auth/login");
    } else if (user && inAuthGroup) {
      router.replace("/(tabs)");
    }
  }, [splashDone, isLoading, user, segments]);

  // ⌛ Splash gösterimi
  if (!fontsLoaded || isLoading || !splashDone) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colorScheme === "dark" ? "#1a1a2e" : "#f8f9fa",
        }}
      >
        <Text style={{ color: "#fff", fontSize: 24 }}>LingoNote</Text>
      </View>
    );
  }

  const backgroundColor = colorScheme === "dark" ? "#1a1a2e" : "#f8f9fa";

  return (
    <ThemeProvider value={colorScheme === "dark" ? CustomDarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "none",
          contentStyle: { backgroundColor },
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

import { router } from "expo-router";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import Toast from "react-native-toast-message";

const Login = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const { login } = useAuth();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const gradientColors = isDark
    ? ["#1a1a2e", "#16213e", "#0f3460"]
    : ["#f8f9fa", "#e9ecef", "#dee2e6"];

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Hata", "Lütfen tüm alanları doldurun");
      return;
    }

    setIsLoading(true);
    try {
      await login(email, password);
      Toast.show({
        type: 'success',
        text1: 'Başarılı',
        text2: 'Giriş yapıldı'
      });
      router.replace("/(tabs)");
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Hata',
        text2: error.message || 'Giriş yapılamadı'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <LinearGradient
        colors={gradientColors as [string, string, string]}
        style={{ flex: 1 }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {Platform.OS === "android" && <View style={{ height: 32 }} />}
        
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 32}
        >
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ 
              flexGrow: 1, 
              justifyContent: 'center',
              paddingHorizontal: 32,
              paddingVertical: 20
            }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* Header */}
            <View className="items-center mb-12">
              <View className="w-20 h-20 rounded-full items-center justify-center mb-4">
                <Ionicons name="book-outline" size={40} color={isDark ? "white" : "#22223b"} />
              </View>
              <Text className="text-3xl font-bold mb-2 dark:text-gray-200">
                LingoNote
              </Text>
              <Text className="text-center dark:text-gray-200">
                Dil öğrenme yolculuğunuza hoş geldiniz
              </Text>
            </View>

            {/* Login Form */}
            <View className="space-y-4">
              <View>
                <Text className="text-sm font-medium mb-2 dark:text-gray-200">
                  E-posta
                </Text>
                <TextInput
                  className={`w-full px-4 py-3 rounded-lg border ${
                    isDark 
                      ? 'bg-gray-800 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  placeholder="E-posta adresinizi girin"
                  placeholderTextColor={isDark ? "#9ca3af" : "#6b7280"}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              <View>
                <Text className="text-sm font-medium mb-2 dark:text-gray-200">
                  Şifre
                </Text>
                <TextInput
                  className={`w-full px-4 py-3 rounded-lg border ${
                    isDark 
                      ? 'bg-gray-800 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  placeholder="Şifrenizi girin"
                  placeholderTextColor={isDark ? "#9ca3af" : "#6b7280"}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  autoCapitalize="none"
                />
              </View>

              <TouchableOpacity
                className={`w-full py-3 rounded-lg mt-6 ${
                  isDark ? 'bg-blue-600' : 'bg-blue-500'
                } ${isLoading ? 'opacity-50' : ''}`}
                onPress={handleLogin}
                disabled={isLoading}
              >
                <Text className="text-white text-center font-semibold text-lg">
                  {isLoading ? "Giriş yapılıyor..." : "Giriş Yap"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="mt-4"
                onPress={() => router.push("/auth/register")}
              >
                <Text className="text-center text-blue-500 dark:text-blue-400">
                  Hesabınız yok mu? Kayıt olun
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Login;

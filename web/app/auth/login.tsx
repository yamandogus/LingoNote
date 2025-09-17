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
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect } from "react";
import Toast from "react-native-toast-message";

const clientId =
  "594124346639-h5ok7snve4l69igmhki76v2sjmecnagb.apps.googleusercontent.com";

const Login = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const { login, user, isLoading: authLoading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const gradientColors = isDark
    ? ["#1a1a2e", "#16213e", "#0f3460"]
    : ["#f8f9fa", "#e9ecef", "#dee2e6"];

  useEffect(() => {
    if (authLoading) return;
    if (user) {
      router.replace("/(tabs)");
    }
  }, [user, authLoading]);

  if (authLoading || user) {
    // Kullanıcı login olduysa veya auth yükleniyorsa hiçbir şey gösterme
    return null;
  }

  const handleLogin = async () => {
    if (!email || !password) {
      Toast.show({
        type: "error",
        text1: "Tüm alanları doldurun",
        text2: "Lütfen e-posta ve şifrenizi doldurun",
      });
      return;
    }

    setIsLoading(true);
    console.log("Giriş işlemi başlatılıyor:", { email, password: "***" });

    try {
      await login(email, password);
      console.log("Giriş başarılı, ana sayfaya yönlendiriliyor...");
      Toast.show({
        type: "success",
        text1: "Başarılı",
        text2: "Giriş yapıldı",
      });
      router.replace("/(tabs)");
    } catch (error: any) {
      console.error("Giriş hatası:", error);
      Toast.show({
        type: "error",
        text1: "Hata",
        text2: error.message || "Giriş yapılamadı",
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
          behavior={Platform.OS === "ios" ? "padding" : "padding"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 32}
        >
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "center",
              paddingHorizontal: 32,
              paddingVertical: 20,
            }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* Header */}
            <View className="items-center mb-10">
              <View
                className="w-24 h-24 bg-white/20 rounded-full items-center justify-center mb-6"
                style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.2,
                  shadowRadius: 8,
                  elevation: 5,
                }}
              >
                <Ionicons
                  name="book"
                  size={50}
                  color={isDark ? "white" : "#0f3460"}
                />
              </View>
              <Text className="text-4xl font-extrabold mb-2 dark:text-white text-gray-800 tracking-wider">
                LingoNote
              </Text>
              <Text className="text-lg text-center dark:text-gray-300 text-gray-600">
                Tekrar hoş geldiniz!
              </Text>
            </View>

            {/* Login Form */}
            <View className="space-y-6 gap-4">
              {/* Email Input */}
              <View className="flex-row items-center w-full bg-white/30 dark:bg-black/20 rounded-2xl px-4 py-2">
                <Ionicons
                  name="mail-outline"
                  size={22}
                  color={isDark ? "#9ca3af" : "#6b7280"}
                  className="mr-3"
                />
                <TextInput
                  className="flex-1 text-base dark:text-white text-gray-800"
                  placeholder="E-posta adresiniz"
                  placeholderTextColor={isDark ? "#9ca3af" : "#6b7280"}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              {/* Password Input */}
              <View className="flex-row items-center w-full bg-white/30 dark:bg-black/20 rounded-2xl px-4 py-2">
                <Ionicons
                  name="lock-closed-outline"
                  size={22}
                  color={isDark ? "#9ca3af" : "#6b7280"}
                  className="mr-3"
                />
                <TextInput
                  className="flex-1 text-base dark:text-white text-gray-800"
                  placeholder="Şifreniz"
                  placeholderTextColor={isDark ? "#9ca3af" : "#6b7280"}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  autoCapitalize="none"
                />
              </View>

              {/* Login Button */}
              <TouchableOpacity
                className={`w-full py-2 rounded-2xl mt-6 ${
                  isDark ? "bg-indigo-600" : "bg-blue-600"
                } ${isLoading ? "opacity-60" : ""} shadow-lg`}
                onPress={handleLogin}
                disabled={isLoading}
              >
                <Text className="text-white text-center font-bold text-lg tracking-wide">
                  {isLoading ? "Giriş yapılıyor..." : "Giriş Yap"}
                </Text>
              </TouchableOpacity>

              {/* Register Link */}
              <View className="flex-row justify-center items-center mt-6">
                <Text className="text-center dark:text-gray-300 text-gray-600">
                  Hesabınız yok mu?{" "}
                </Text>
                <TouchableOpacity
                  onPress={() => router.replace("/auth/register")}
                >
                  <Text className="font-semibold text-indigo-600 dark:text-blue-400">
                    Kayıt Olun
                  </Text>
                </TouchableOpacity>
              </View>
              <View className="flex-row justify-center items-center mt-6">
                <TouchableOpacity
                  onPress={() => router.replace("/auth/forgot-password")}
                >
                  <Text className="font-semibold text-indigo-600 dark:text-blue-400">
                    Şifremi unuttum
                  </Text>
                </TouchableOpacity>
              </View>
              <View className="flex-row justify-center items-center mt-6">
                <TouchableOpacity className="flex-row items-center justify-center gap-2 border-2 border-gray-300 rounded-2xl p-2 w-full text-center">
                  <Ionicons name="logo-google" size={22} color={isDark ? "#9ca3af" : "#6b7280"} />
                  <Text className="font-semibold text-indigo-600 dark:text-blue-400">
                    Google ile giriş yap
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Login;

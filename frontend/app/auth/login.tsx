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

const Login = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const gradientColors = isDark
    ? ["#1a1a2e", "#16213e", "#0f3460"]
    : ["#f8f9fa", "#e9ecef", "#dee2e6"];

  // Light ve dark için renkler
  const textColor = isDark ? "white" : "#22223b";
  const subTextColor = isDark ? "rgba(255,255,255,0.8)" : "#4b5563";
  const boxBg = isDark ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.7)";
  const boxBorder = isDark ? "white" : "#cbd5e1";
  const placeholderColor = isDark ? "rgba(255,255,255,0.7)" : "#6b7280";
  const buttonText = isDark ? "#764ba2" : "#764ba2";
  const linkColor = isDark ? "white" : "#764ba2";

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
              <View style={{ backgroundColor: boxBg }} className="w-20 h-20 rounded-full items-center justify-center mb-4">
                <Ionicons name="book-outline" size={40} color={textColor} />
              </View>
              <Text style={{ color: textColor }} className="text-3xl font-bold mb-2">
                LingoNote
              </Text>
              <Text style={{ color: subTextColor }} className="text-center">
                Dil öğrenme yolculuğunuza hoş geldiniz
              </Text>
            </View>

            {/* Login Form */}
            <View style={{ backgroundColor: boxBg }} className="rounded-3xl py-8 px-4 mb-2">
              <Text style={{ color: textColor }} className="text-2xl font-bold mb-6 text-center">
                Giriş Yap
              </Text>

              <View className="space-y-4 gap-6">
                <View style={{ backgroundColor: boxBg, borderColor: boxBorder }} className="rounded-xl p-2 border-[0.3px]">
                  <TextInput
                    placeholder="E-posta"
                    placeholderTextColor={placeholderColor}
                    style={{ color: textColor, fontSize: 18 }}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>

                <View style={{ backgroundColor: boxBg, borderColor: boxBorder }} className="rounded-xl p-2 border-[0.3px]">
                  <TextInput
                    placeholder="Şifre"
                    placeholderTextColor={placeholderColor}
                    style={{ color: textColor, fontSize: 18 }}
                    secureTextEntry
                  />
                </View>
              </View>

              <TouchableOpacity
                style={{ backgroundColor: isDark ? "white" : "white" }}
                className="rounded-xl p-4 mt-6"
                onPress={() => router.replace("/(tabs)")}
              >
                <Text style={{ color: buttonText }} className="text-center font-bold text-lg">
                  Giriş Yap
                </Text>
              </TouchableOpacity>

              {/* Forgot Password Link */}
              <TouchableOpacity
                className="mt-2"
                onPress={() => router.push("/auth/forgot-password")}
              >
                <Text style={{ color: subTextColor, textDecorationLine: 'underline' }} className="text-center">
                  Şifremi Unuttum
                </Text>
              </TouchableOpacity>
            </View>

            {/* Register Link */}
            <View className="items-center mt-2">
              <Text style={{ color: subTextColor }} className="mb-2">Hesabınız yok mu?</Text>
              <TouchableOpacity className="flex-row items-center gap-2" onPress={() => router.replace("/auth/register")}>
                <Text style={{ color: linkColor, textDecorationLine: 'underline' }} className="font-bold text-lg">
                  Kayıt Ol
                </Text>
                <Ionicons name="arrow-forward-outline" size={16} color={linkColor} />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Login;

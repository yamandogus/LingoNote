import { router } from 'expo-router';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/useColorScheme';

const ForgotPassword = () => {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === "dark";

    const gradientColors = isDark
        ? ["#1a1a2e", "#16213e", "#0f3460"]
        : ["#f8f9fa", "#e9ecef", "#dee2e6"];


    return (
        <SafeAreaView className="flex-1">
            <LinearGradient
                colors={gradientColors as [string, string, string]}
                style={{ flex: 1 }}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                {Platform.OS === "android" && <View style={{ height: 32 }} />}
                
                <View className="flex-1 justify-center px-8">
                    {/* Header */}
                    <View className="items-center mb-8">
                        <View className="w-20 h-20 rounded-full items-center justify-center mb-4">
                            <Ionicons name="key-outline" size={40} color={isDark ? "white" : "#22223b"} />
                        </View>
                        <Text className="text-3xl font-bold mb-2 dark:text-gray-200">Şifremi Unuttum</Text>
                        <Text className="text-center dark:text-gray-200">E-posta adresinizi girin, şifre sıfırlama bağlantısı gönderelim</Text>
                    </View>

                    {/* Form */}
                    <View className="rounded-3xl py-6 px-2 mb-6">
                        <View className="space-y-4">
                            <View className="rounded-xl p-2 border-[0.3px] dark:border-gray-200">
                                <TextInput
                                    placeholder="E-posta adresiniz"
                                    placeholderTextColor={isDark ? "rgba(255,255,255,0.7)" : "#6b7280"}
                                    style={{ color: isDark ? "white" : "#22223b", fontSize: 18 }}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                            </View>
                        </View>

                        <TouchableOpacity
                            style={{ backgroundColor: isDark ? "white" : "white" }}
                            className="rounded-xl p-4 mt-6"
                            onPress={() => {
                                // Burada şifre sıfırlama işlemi yapılacak
                                alert('Şifre sıfırlama bağlantısı e-posta adresinize gönderildi!');
                            }}
                        >
                            <Text className="text-center font-bold text-lg">Şifre Sıfırlama Bağlantısı Gönder</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Back to Login */}
                    <View className="items-center">
                        <TouchableOpacity onPress={() => router.replace('/auth/login')}>
                            <Text className="font-bold text-lg dark:text-gray-200">Giriş Sayfasına Dön</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </LinearGradient>
        </SafeAreaView>
    );
};

export default ForgotPassword;

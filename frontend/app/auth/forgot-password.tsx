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
                    <View className="items-center mb-10">
                        <View 
                            className="w-24 h-24 bg-white/20 rounded-full items-center justify-center mb-6"
                            style={{
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 4 },
                                shadowOpacity: 0.2,
                                shadowRadius: 8,
                                elevation: 5,
                            }}
                        >
                            <Ionicons name="key" size={50} color={isDark ? "white" : "#0f3460"} />
                        </View>
                        <Text className="text-4xl font-extrabold mb-2 dark:text-white text-gray-800 tracking-wider">
                            Şifremi Unuttum
                        </Text>
                        <Text className="text-lg text-center dark:text-gray-300 text-gray-600">
                            Şifrenizi sıfırlamak için e-postanızı girin
                        </Text>
                    </View>

                    {/* Form */}
                    <View className="space-y-6">
                        {/* Email Input */}
                        <View className="flex-row items-center w-full bg-white/30 dark:bg-black/20 rounded-2xl p-4">
                            <Ionicons name="mail-outline" size={22} color={isDark ? "#9ca3af" : "#6b7280"} className="mr-3" />
                            <TextInput
                                className="flex-1 text-base dark:text-white text-gray-800"
                                placeholder="E-posta adresiniz"
                                placeholderTextColor={isDark ? "#9ca3af" : "#6b7280"}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                        </View>

                        {/* Submit Button */}
                        <TouchableOpacity
                            className={`w-full py-4 rounded-2xl mt-6 ${
                                isDark ? 'bg-indigo-600' : 'bg-blue-600'
                            } shadow-lg`}
                            onPress={() => {
                                // Burada şifre sıfırlama işlemi yapılacak
                                alert('Şifre sıfırlama bağlantısı e-posta adresinize gönderildi!');
                            }}
                        >
                            <Text className="text-white text-center font-bold text-lg tracking-wide">
                                Sıfırlama Linki Gönder
                            </Text>
                        </TouchableOpacity>

                        {/* Back to Login */}
                        <View className="flex-row justify-center items-center mt-6">
                            <TouchableOpacity onPress={() => router.replace('/auth/login')}>
                                <Text className="font-semibold text-indigo-600 dark:text-blue-400">
                                    Giriş Yap'a Geri Dön
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </LinearGradient>
        </SafeAreaView>
    );
};

export default ForgotPassword;

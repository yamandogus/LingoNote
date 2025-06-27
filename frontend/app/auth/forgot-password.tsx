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
                
                <View className="flex-1 justify-center px-8">
                    {/* Header */}
                    <View className="items-center mb-8">
                        <View style={{ backgroundColor: boxBg }} className="w-20 h-20 rounded-full items-center justify-center mb-4">
                            <Ionicons name="key-outline" size={40} color={textColor} />
                        </View>
                        <Text style={{ color: textColor }} className="text-3xl font-bold mb-2">Şifremi Unuttum</Text>
                        <Text style={{ color: subTextColor }} className="text-center">E-posta adresinizi girin, şifre sıfırlama bağlantısı gönderelim</Text>
                    </View>

                    {/* Form */}
                    <View style={{ backgroundColor: boxBg }} className="rounded-3xl p-8 mb-6">
                        <View className="space-y-4">
                            <View style={{ backgroundColor: boxBg, borderColor: boxBorder }} className="rounded-xl p-4 border-[0.3px]">
                                <TextInput
                                    placeholder="E-posta adresiniz"
                                    placeholderTextColor={placeholderColor}
                                    style={{ color: textColor, fontSize: 18 }}
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
                            <Text style={{ color: buttonText }} className="text-center font-bold text-lg">Şifre Sıfırlama Bağlantısı Gönder</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Back to Login */}
                    <View className="items-center">
                        <TouchableOpacity onPress={() => router.replace('/auth/login')}>
                            <Text style={{ color: linkColor, textDecorationLine: 'underline' }} className="font-bold text-lg">Giriş Sayfasına Dön</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </LinearGradient>
        </SafeAreaView>
    );
};

export default ForgotPassword;

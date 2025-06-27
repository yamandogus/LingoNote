import { router } from 'expo-router';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const ForgotPassword = () => {
    return (
        <SafeAreaView className="flex-1">
            <LinearGradient
                colors={['#667eea', '#764ba2']}
                style={{ flex: 1 }}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                {Platform.OS === "android" && <View style={{ height: 32 }} />}
                
                <View className="flex-1 justify-center px-8">
                    {/* Header */}
                    <View className="items-center mb-8">
                        <View className="w-20 h-20 bg-white/20 rounded-full items-center justify-center mb-4">
                            <Ionicons name="key-outline" size={40} color="white" />
                        </View>
                        <Text className="text-3xl font-bold text-white mb-2">Şifremi Unuttum</Text>
                        <Text className="text-white/80 text-center">E-posta adresinizi girin, şifre sıfırlama bağlantısı gönderelim</Text>
                    </View>

                    {/* Form */}
                    <View className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 mb-6">
                        <View className="space-y-4">
                            <View className="bg-white/20 rounded-xl p-4">
                                <TextInput
                                    placeholder="E-posta adresiniz"
                                    placeholderTextColor="rgba(255,255,255,0.7)"
                                    className="text-white text-lg"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                            </View>
                        </View>

                        <TouchableOpacity
                            className="bg-white rounded-xl p-4 mt-6"
                            onPress={() => {
                                // Burada şifre sıfırlama işlemi yapılacak
                                alert('Şifre sıfırlama bağlantısı e-posta adresinize gönderildi!');
                            }}
                        >
                            <Text className="text-center text-purple-600 font-bold text-lg">Şifre Sıfırlama Bağlantısı Gönder</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Back to Login */}
                    <View className="items-center">
                        <TouchableOpacity onPress={() => router.replace('/auth/login')}>
                            <Text className="text-white font-bold text-lg underline">Giriş Sayfasına Dön</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </LinearGradient>
        </SafeAreaView>
    );
};

export default ForgotPassword;

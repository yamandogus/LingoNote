import { router } from 'expo-router';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const Login = () => {
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
                    <View className="items-center mb-12">
                        <View className="w-20 h-20 bg-white/20 rounded-full items-center justify-center mb-4">
                            <Ionicons name="book-outline" size={40} color="white" />
                        </View>
                        <Text className="text-3xl font-bold text-white mb-2">LingoNote</Text>
                        <Text className="text-white/80 text-center">Dil öğrenme yolculuğunuza hoş geldiniz</Text>
                    </View>

                    {/* Login Form */}
                    <View className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 mb-6">
                        <Text className="text-2xl font-bold text-white mb-6 text-center">Giriş Yap</Text>
                        
                        <View className="space-y-4">
                            <View className="bg-white/20 rounded-xl p-4">
                                <TextInput
                                    placeholder="E-posta"
                                    placeholderTextColor="rgba(255,255,255,0.7)"
                                    className="text-white text-lg"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                            </View>
                            
                            <View className="bg-white/20 rounded-xl p-4">
                                <TextInput
                                    placeholder="Şifre"
                                    placeholderTextColor="rgba(255,255,255,0.7)"
                                    className="text-white text-lg"
                                    secureTextEntry
                                />
                            </View>
                        </View>

                        <TouchableOpacity
                            className="bg-white rounded-xl p-4 mt-6"
                            onPress={() => router.replace('/(tabs)')}
                        >
                            <Text className="text-center text-purple-600 font-bold text-lg">Giriş Yap</Text>
                        </TouchableOpacity>
                        
                        {/* Forgot Password Link */}
                        <TouchableOpacity 
                            className="mt-4"
                            onPress={() => router.push('/auth/forgot-password')}
                        >
                            <Text className="text-center text-white/80 underline">Şifremi Unuttum</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Register Link */}
                    <View className="items-center">
                        <Text className="text-white/80 mb-2">Hesabınız yok mu?</Text>
                        <TouchableOpacity onPress={() => router.replace('/auth/register')}>
                            <Text className="text-white font-bold text-lg underline">Kayıt Ol</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </LinearGradient>
        </SafeAreaView>
    );
};

export default Login;
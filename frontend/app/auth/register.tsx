import { router } from 'expo-router';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, Platform, KeyboardAvoidingView, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const Register = () => {
    return (
        <SafeAreaView className="flex-1">
            <LinearGradient
                colors={['#667eea', '#764ba2']}
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
                        <View className="items-center mb-8">
                            <View className="w-20 h-20 bg-white/20 rounded-full items-center justify-center mb-4">
                                <Ionicons name="person-add-outline" size={40} color="white" />
                            </View>
                            <Text className="text-3xl font-bold text-white mb-2">LingoNote</Text>
                            <Text className="text-white/80 text-center">Hesabınızı oluşturun</Text>
                        </View>

                        {/* Register Form */}
                        <View className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 mb-6">
                            <Text className="text-2xl font-bold text-white mb-6 text-center">Kayıt Ol</Text>
                            
                            <View className="space-y-4 gap-6">
                                <View className="bg-white/20 rounded-xl p-2 border-[0.3px] border-white">
                                    <TextInput
                                        placeholder="Ad Soyad"
                                        placeholderTextColor="rgba(255,255,255,0.7)"
                                        className="text-white text-lg"
                                        autoCapitalize="words"
                                    />
                                </View>
                                
                                <View className="bg-white/20 rounded-xl p-2 border-[0.3px] border-white">
                                    <TextInput
                                        placeholder="E-posta"
                                        placeholderTextColor="rgba(255,255,255,0.7)"
                                        className="text-white text-lg"
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                    />
                                </View>
                                
                                <View className="bg-white/20 rounded-xl p-2 border-[0.3px] border-white">
                                    <TextInput
                                        placeholder="Şifre"
                                        placeholderTextColor="rgba(255,255,255,0.7)"
                                        className="text-white text-lg"
                                        secureTextEntry
                                    />
                                </View>
                                
                                <View className="bg-white/20 rounded-xl p-2 border-[0.3px] border-white">
                                    <TextInput
                                        placeholder="Şifre Tekrar"
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
                                <Text className="text-center text-purple-600 font-bold text-lg">Kayıt Ol</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Login Link */}
                        <View className="items-center">
                            <Text className="text-white/80 mb-2">Zaten hesabınız var mı?</Text>
                            <TouchableOpacity onPress={() => router.replace('/auth/login')}>
                                <Text className="text-white font-bold text-lg underline">Giriş Yap</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </LinearGradient>
        </SafeAreaView>
    );
};

export default Register;

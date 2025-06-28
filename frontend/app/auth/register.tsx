import { router } from 'expo-router';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, Platform, KeyboardAvoidingView, ScrollView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';
import Toast from 'react-native-toast-message';

const Register = () => {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === "dark";
    const { register } = useAuth();
    
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const gradientColors = isDark
        ? ["#1a1a2e", "#16213e", "#0f3460"]
        : ["#f8f9fa", "#e9ecef", "#dee2e6"];

    const handleRegister = async () => {
        if (!username || !email || !password || !confirmPassword) {
            Alert.alert("Hata", "Lütfen tüm alanları doldurun");
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert("Hata", "Şifreler eşleşmiyor");
            return;
        }

        if (password.length < 6) {
            Alert.alert("Hata", "Şifre en az 6 karakter olmalıdır");
            return;
        }

        setIsLoading(true);
        try {
            await register(username, email, password);
            Toast.show({
                type: 'success',
                text1: 'Başarılı',
                text2: 'Hesap oluşturuldu. Giriş yapabilirsiniz.'
            });
            router.replace("/auth/login");
        } catch (error: any) {
            Toast.show({
                type: 'error',
                text1: 'Hata',
                text2: error.message || 'Kayıt oluşturulamadı'
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
                        <View className="items-center mb-8">
                            <View className="w-20 h-20 rounded-full items-center justify-center mb-4">
                                <Ionicons name="person-add-outline" size={40} color={isDark ? "white" : "#22223b"} />
                            </View>
                            <Text className="text-3xl font-bold mb-2 dark:text-gray-200">LingoNote</Text>
                            <Text className="text-center dark:text-gray-200">Hesabınızı oluşturun</Text>
                        </View>

                        {/* Register Form */}
                        <View className="space-y-4">
                            <View>
                                <Text className="text-sm font-medium mb-2 dark:text-gray-200">
                                    Kullanıcı Adı
                                </Text>
                                <TextInput
                                    className={`w-full px-4 py-3 rounded-lg border ${
                                        isDark 
                                            ? 'bg-gray-800 border-gray-600 text-white' 
                                            : 'bg-white border-gray-300 text-gray-900'
                                    }`}
                                    placeholder="Kullanıcı adınızı girin"
                                    placeholderTextColor={isDark ? "#9ca3af" : "#6b7280"}
                                    value={username}
                                    onChangeText={setUsername}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                />
                            </View>
                            
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
                            
                            <View>
                                <Text className="text-sm font-medium mb-2 dark:text-gray-200">
                                    Şifre Tekrar
                                </Text>
                                <TextInput
                                    className={`w-full px-4 py-3 rounded-lg border ${
                                        isDark 
                                            ? 'bg-gray-800 border-gray-600 text-white' 
                                            : 'bg-white border-gray-300 text-gray-900'
                                    }`}
                                    placeholder="Şifrenizi tekrar girin"
                                    placeholderTextColor={isDark ? "#9ca3af" : "#6b7280"}
                                    value={confirmPassword}
                                    onChangeText={setConfirmPassword}
                                    secureTextEntry
                                    autoCapitalize="none"
                                />
                            </View>

                            <TouchableOpacity
                                className={`w-full py-3 rounded-lg mt-6 ${
                                    isDark ? 'bg-blue-600' : 'bg-blue-500'
                                } ${isLoading ? 'opacity-50' : ''}`}
                                onPress={handleRegister}
                                disabled={isLoading}
                            >
                                <Text className="text-white text-center font-semibold text-lg">
                                    {isLoading ? "Kayıt oluşturuluyor..." : "Kayıt Ol"}
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {/* Login Link */}
                        <TouchableOpacity
                            className="mt-6"
                            onPress={() => router.replace('/auth/login')}
                        >
                            <Text className="text-center text-blue-500 dark:text-blue-400">
                                Zaten hesabınız var mı? Giriş yapın
                            </Text>
                        </TouchableOpacity>
                    </ScrollView>
                </KeyboardAvoidingView>
            </LinearGradient>
        </SafeAreaView>
    );
};

export default Register;

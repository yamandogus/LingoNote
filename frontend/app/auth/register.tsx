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
                                <Ionicons name="person-add" size={50} color={isDark ? "white" : "#0f3460"} />
                            </View>
                            <Text className="text-4xl font-extrabold mb-2 dark:text-white text-gray-800 tracking-wider">
                                Hesap Oluştur
                            </Text>
                            <Text className="text-lg text-center dark:text-gray-300 text-gray-600">
                                LingoNote&apos;a katılın
                            </Text>
                        </View>

                        {/* Register Form */}
                        <View className="space-y-5 gap-2">
                            {/* Username Input */}
                            <View className="flex-row items-center w-full bg-white/30 dark:bg-black/20 rounded-2xl p-4">
                                <Ionicons name="person-outline" size={22} color={isDark ? "#9ca3af" : "#6b7280"} className="mr-3" />
                                <TextInput
                                    className="flex-1 text-base dark:text-white text-gray-800"
                                    placeholder="Kullanıcı adınız"
                                    placeholderTextColor={isDark ? "#9ca3af" : "#6b7280"}
                                    value={username}
                                    onChangeText={setUsername}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                />
                            </View>

                            {/* Email Input */}
                            <View className="flex-row items-center w-full bg-white/30 dark:bg-black/20 rounded-2xl p-4">
                                <Ionicons name="mail-outline" size={22} color={isDark ? "#9ca3af" : "#6b7280"} className="mr-3" />
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
                            <View className="flex-row items-center w-full bg-white/30 dark:bg-black/20 rounded-2xl p-4">
                                <Ionicons name="lock-closed-outline" size={22} color={isDark ? "#9ca3af" : "#6b7280"} className="mr-3" />
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

                            {/* Confirm Password Input */}
                            <View className="flex-row items-center w-full bg-white/30 dark:bg-black/20 rounded-2xl p-4">
                                <Ionicons name="lock-closed-outline" size={22} color={isDark ? "#9ca3af" : "#6b7280"} className="mr-3" />
                                <TextInput
                                    className="flex-1 text-base dark:text-white text-gray-800"
                                    placeholder="Şifrenizi tekrar girin"
                                    placeholderTextColor={isDark ? "#9ca3af" : "#6b7280"}
                                    value={confirmPassword}
                                    onChangeText={setConfirmPassword}
                                    secureTextEntry
                                    autoCapitalize="none"
                                />
                            </View>

                            {/* Register Button */}
                            <TouchableOpacity
                                className={`w-full py-4 rounded-2xl mt-6 ${
                                    isDark ? 'bg-indigo-600' : 'bg-blue-600'
                                } ${isLoading ? 'opacity-60' : ''} shadow-lg`}
                                onPress={handleRegister}
                                disabled={isLoading}
                            >
                                <Text className="text-white text-center font-bold text-lg tracking-wide">
                                    {isLoading ? "Oluşturuluyor..." : "Hesap Oluştur"}
                                </Text>
                            </TouchableOpacity>

                            {/* Login Link */}
                            <View className="flex-row justify-center items-center mt-6">
                                <Text className="text-center dark:text-gray-300 text-gray-600">
                                    Zaten hesabınız var mı?{' '}
                                </Text>
                                <TouchableOpacity onPress={() => router.replace('/auth/login')}>
                                    <Text className="font-semibold text-indigo-600 dark:text-blue-400">
                                        Giriş Yapın
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

export default Register;

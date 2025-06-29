import { useAuth } from '@/contexts/AuthContext';
import Ionicons from '@expo/vector-icons/build/Ionicons';
import { router } from 'expo-router';
import { View, Text, TouchableOpacity, useColorScheme } from 'react-native'

export default function Header() {
    const isDark = useColorScheme() === "dark";
    const { user } = useAuth();
    const currentTime24 = new Date().toLocaleTimeString('tr-TR', { hour12: false });
    const emoji = currentTime24 < "12:00" ? "🌞" : currentTime24 < "18:00" ? "🌤️" : "🌙";
    
    const welcomeMessage = currentTime24 < "12:00" ? "Günaydın" : currentTime24 < "18:00" ? "İyi günler" : "İyi akşamlar";

  return (
    <View className='flex-row justify-between items-center my-4'>
      <Text className='text-xl font-bold dark:text-white text-gray-800'>{emoji} {welcomeMessage} {user?.username}</Text>
      <TouchableOpacity onPress={() => router.replace("/(tabs)/profile")} className='bg-gray-600/80 dark:bg-white/20 rounded-full p-2'>
        <Ionicons name="person-outline" size={20} color={isDark ? "white" : "#ffffff"} />
      </TouchableOpacity>
    </View>
  )
}
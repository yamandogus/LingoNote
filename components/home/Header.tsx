import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Image, Text, TouchableOpacity, View } from 'react-native';

const avatarUrl = 'https://randomuser.me/api/portraits/women/44.jpg';

export const Header = () => {
  const navigation = useNavigation();
  
  return (
    <View className="flex-row items-center justify-between mb-2 mt-2">
      <View className="flex-row items-center">
        <FontAwesome name="calendar" size={16} color="#64748b" />
        <Text className="ml-2 text-xs text-gray-500">25 Haziran 2022</Text>
      </View>
      <TouchableOpacity onPress={() => {navigation.navigate('profile' as never)}} className="flex-row items-center">
        <Image source={{ uri: avatarUrl }} className="w-9 h-9 rounded-full" />
      </TouchableOpacity>
    </View>
  );
}; 
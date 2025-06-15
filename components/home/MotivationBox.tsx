import { FontAwesome } from '@expo/vector-icons';
import { Text, View } from 'react-native';

export const MotivationBox = () => {
  return (
    <View className="rounded-2xl bg-green-100 p-4 mb-4 flex-row items-center">
      <FontAwesome name="smile-o" size={20} color="#22c55e" />
      <Text className="ml-3 text-green-900 font-semibold">Harika gidiyorsun, böyle devam et!</Text>
    </View>
  );
}; 
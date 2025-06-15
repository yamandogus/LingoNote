import { FontAwesome } from '@expo/vector-icons';
import { Text, View } from 'react-native';

export const NotificationBox = () => {
  return (
    <View className="rounded-2xl bg-yellow-100 p-4 mb-4 flex-row items-center">
      <FontAwesome name="info-circle" size={20} color="#eab308" />
      <Text className="ml-3 text-yellow-900 font-semibold">Bugün 2 yeni görev eklendi!</Text>
    </View>
  );
}; 
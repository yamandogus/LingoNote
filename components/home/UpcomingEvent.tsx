import { FontAwesome } from '@expo/vector-icons';
import { Text, View } from 'react-native';

const upcoming = {
  title: 'Toplantı: Proje Sunumu',
  date: '26 Haziran 2022',
  time: '15:00 - 16:00',
  icon: 'users' as const,
  color: 'bg-purple-100',
};

export const UpcomingEvent = () => {
  return (
    <View className="rounded-2xl bg-purple-100 p-4 mb-4 flex-row items-center justify-between">
      <View className="flex-row items-center">
        <FontAwesome name={upcoming.icon} size={22} color="#a21caf" />
        <View className="ml-3">
          <Text className="font-bold text-base text-purple-900 mb-1">{upcoming.title}</Text>
          <Text className="text-xs text-gray-900">{upcoming.date} • {upcoming.time}</Text>
        </View>
      </View>
      <FontAwesome name="chevron-right" size={20} color="#a21caf" />
    </View>
  );
}; 
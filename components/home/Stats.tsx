import { FontAwesome } from '@expo/vector-icons';
import { ScrollView, Text, View } from 'react-native';

const stats = [
  { label: 'Toplam Proje', value: 82, icon: 'folder-open-o' as const, color: 'bg-blue-200' },
  { label: 'Bugünkü Görev', value: 3, icon: 'calendar-check-o' as const, color: 'bg-green-200' },
  { label: 'Yeni Bildirim', value: 2, icon: 'bell-o' as const, color: 'bg-yellow-200' },
];

export const Stats = () => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-2 my-4">
      {stats.map((item, i) => (
        <View key={i} className={`mr-3 px-4 py-3 rounded-2xl ${item.color} flex-row items-center`}>
          <FontAwesome name={item.icon} size={22} color="#2563eb" />
          <View className="ml-2">
            <Text className="text-xs text-gray-500">{item.label}</Text>
            <Text className="text-base font-bold text-gray-700">{item.value}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}; 
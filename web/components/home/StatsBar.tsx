import { View, Text } from "react-native";

interface StatsBarProps {
  isDark: boolean;
  stats: {
    totalNotes: number;
    favoriteCategory: string;
    lastDate: string;
  };
}

export function StatsBar({ isDark, stats }: StatsBarProps) {
  return (
    <View className={`flex-row justify-between rounded-xl p-4 mb-6 ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}> 
      <View>
        <Text className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Toplam Not</Text>
        <Text className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{stats.totalNotes}</Text>
      </View>
      <View>
        <Text className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Favori Kategori</Text>
        <Text className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{stats.favoriteCategory}</Text>
      </View>
      <View>
        <Text className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Son Not</Text>
        <Text className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{stats.lastDate}</Text>
      </View>
    </View>
  );
} 
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface StatsBarProps {
  isDark: boolean;
  stats: {
    totalNotes: number;
    favoriteCategory: string;
    lastDate: string;
  };
}

export function StatsBar({ isDark, stats }: StatsBarProps) {
  const statsData = [
    {
      label: "Toplam Not",
      value: stats.totalNotes.toString(),
      icon: "document-text",
      color: "#3b82f6",
    },
    {
      label: "Favori Kategori",
      value: stats.favoriteCategory,
      icon: "heart",
      color: "#ef4444",
    },
    {
      label: "Son Not",
      value: stats.lastDate,
      icon: "time",
      color: "#10b981",
    },
  ];

  return (
    <View 
      className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl p-6 mb-6"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 8,
      }}
    >
      <View className="flex-row items-center mb-4">
        <View 
          className="w-10 h-10 bg-blue-500 rounded-2xl items-center justify-center mr-3"
          style={{
            shadowColor: "#3b82f6",
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.3,
            shadowRadius: 6,
            elevation: 4,
          }}
        >
          <Ionicons name="stats-chart" size={20} color="white" />
        </View>
        <Text className="text-xl font-bold text-gray-900 dark:text-white">
          İstatistikler
        </Text>
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
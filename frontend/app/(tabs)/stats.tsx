import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { 
  Platform, 
  ScrollView, 
  Text, 
  useColorScheme, 
  View,
  StyleSheet,
  Dimensions
} from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get('window');

const StatCard = ({ 
  title, 
  value, 
  icon, 
  color, 
  isDark 
}: { 
  title: string; 
  value: string; 
  icon: React.ReactNode; 
  color: string; 
  isDark: boolean; 
}) => (
  <View className={`p-4 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
    <View className="flex-row items-center justify-between mb-2">
      <Text className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
        {title}
      </Text>
      <View style={{ backgroundColor: `${color}20`, padding: 6, borderRadius: 8 }}>
        {icon}
      </View>
    </View>
    <Text className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
      {value}
    </Text>
  </View>
);

const StreakCounter = ({ currentStreak, isDark }: { currentStreak: number; isDark: boolean }) => (
  <View className={`p-5 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
    <View className="flex-row items-center justify-between">
      <View>
        <Text className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
          Günlük Seri
        </Text>
        <View className="flex-row items-end mt-1">
          <Text className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {currentStreak}
          </Text>
          <Text className={`text-lg mb-1 ml-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            gün
          </Text>
        </View>
      </View>
      <View className="items-center">
        <MaterialCommunityIcons 
          name="fire" 
          size={40} 
          color={currentStreak > 0 ? "#f97316" : (isDark ? "#4b5563" : "#d1d5db")} 
        />
      </View>
    </View>
  </View>
);

const chartConfig = (isDark: boolean) => ({
  backgroundGradientFrom: 'transparent',
  backgroundGradientTo: 'transparent',
  color: (opacity = 1) => isDark ? `rgba(99, 102, 241, ${opacity})` : `rgba(79, 70, 229, ${opacity})`,
  labelColor: () => isDark ? '#e5e7eb' : '#4b5563',
  strokeWidth: 16,
  barPercentage: 0.5,
  useShadowColorFromDataset: false,
  decimalPlaces: 0,
  propsForBackgroundLines: {
    strokeWidth: 1,
    stroke: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
    strokeDasharray: '4',
  },
  propsForLabels: {
    fontSize: 12,
    fontWeight: '500',
  },
  fillShadowGradientOpacity: 0.7,
  fillShadowGradient: isDark ? '#4f46e5' : '#6366f1',
});

export default function StatsScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  // Sample data - replace with actual data
  const statsData = {
    totalNotes: '128',
    categories: '7',
    words: '2,450',
    streak: 5,
    weeklyProgress: [0.4, 0.6, 0.8, 0.3, 0.7, 0.9, 0.5],
  };

  const chartData = {
    labels: ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'],
    data: statsData.weeklyProgress,
  };

  return (
    <View className="flex-1">
      <LinearGradient
        colors={isDark ? ['#0f0c29', '#120f31', '#16162e'] : ['#f8f9fa', '#e9ecef', '#dee2e6']}
        className="flex-1"
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {Platform.OS === 'android' && <View className="h-8" />}
        <ScrollView
          className="flex-1 px-4 pt-6"
          contentContainerStyle={{ paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View className="mb-6">
            <Text className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              İstatistikler
            </Text>
            <Text className={`text-base ${isDark ? 'text-gray-400' : 'text-gray-500'} mt-1`}>
              Öğrenme performansınızı takip edin
            </Text>
          </View>

          {/* Stats Grid */}
          <View className="flex-row flex-wrap justify-between mb-6">
            <View className="w-[48%] mb-4">
              <StatCard 
                title="Toplam Not" 
                value={statsData.totalNotes} 
                icon={<Ionicons name="document-text-outline" size={20} color="#6366f1" />} 
                color="#6366f1"
                isDark={isDark}
              />
            </View>
            <View className="w-[48%] mb-4">
              <StatCard 
                title="Kategori" 
                value={statsData.categories} 
                icon={<Ionicons name="folder-outline" size={20} color="#10b981" />} 
                color="#10b981"
                isDark={isDark}
              />
            </View>
            <View className="w-[48%]">
              <StatCard 
                title="Toplam Kelime" 
                value={statsData.words} 
                icon={<Ionicons name="text-outline" size={20} color="#f59e0b" />} 
                color="#f59e0b"
                isDark={isDark}
              />
            </View>
            <View className="w-[48%]">
              <StatCard 
                title="Ortalama" 
                value="187/gün" 
                icon={<Ionicons name="speedometer-outline" size={20} color="#ec4899" />} 
                color="#ec4899"
                isDark={isDark}
              />
            </View>
          </View>

          {/* Streak Counter */}
          <View className="mb-6">
            <StreakCounter currentStreak={statsData.streak} isDark={isDark} />
          </View>

          {/* Recent Activity */}
          <View className={`p-5 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
            <Text className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Son Aktiviteler
            </Text>
            {[1, 2, 3].map((item) => (
              <View key={item} className="flex-row items-center py-3 border-b border-gray-200 dark:border-gray-700 last:border-0 last:pb-0 first:pt-0">
                <View className={`w-2 h-2 rounded-full mr-3 ${item === 1 ? 'bg-green-500' : 'bg-blue-500'}`} />
                <View className="flex-1">
                  <Text className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {item === 1 ? 'Yeni not eklendi' : item === 2 ? 'Kategori güncellendi' : 'Kelime tekrarı yapıldı'}
                  </Text>
                  <Text className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {item === 1 ? '5 dk önce' : item === 2 ? '2 saat önce' : 'Dün'}
                  </Text>
                </View>
                {item === 1 && (
                  <Text className="text-xs font-medium text-green-500">
                    +1
                  </Text>
                )}
              </View>
            ))}
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

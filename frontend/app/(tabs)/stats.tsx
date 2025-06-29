import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { noteService } from "@/services/note";
import { 
  Platform, 
  RefreshControl, 
  ScrollView, 
  Text, 
  useColorScheme, 
  View,
} from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/contexts/AuthContext";
import { Note } from "@/services/api";
import { useFocusEffect } from "expo-router";

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

export default function StatsScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadNotes = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await noteService.getNotes();
      setNotes(response.notes);
    } catch (error) {
      console.error('Notlar yüklenirken hata:', error);
      setError('Notlar yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadNotes();
    setRefreshing(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      loadNotes();
    }, [])
  );

  // İstatistik hesaplamaları
  const totalNotes = notes.length;
  const uniqueCategories = new Set(notes.map(note => note.category)).size;
  const totalWords = notes.reduce((acc, note) => acc + note.content.split(' ').length, 0);
  const averageWords = totalNotes > 0 ? Math.round(totalWords / totalNotes) : 0;
  
  // Streak hesaplama (örnek olarak son 7 günde not ekleme sayısı)
  const currentStreak = Math.min(notes.length, 7); // Gerçek streak hesaplaması için daha karmaşık logic gerekir

  // Tarih formatı fonksiyonu
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
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
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={isDark ? "#ffffff" : "#000000"}
              colors={isDark ? ["#ffffff"] : ["#000000"]}
            />
          }
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
                value={totalNotes.toString()} 
                icon={<Ionicons name="document-text-outline" size={20} color="#6366f1" />} 
                color="#6366f1"
                isDark={isDark}
              />
            </View>
            <View className="w-[48%] mb-4">
              <StatCard 
                title="Kategori" 
                value={uniqueCategories.toString()} 
                icon={<Ionicons name="folder-outline" size={20} color="#10b981" />} 
                color="#10b981"
                isDark={isDark}
              />
            </View>
            <View className="w-[48%]">
              <StatCard 
                title="Toplam Kelime" 
                value={totalWords.toString()} 
                icon={<Ionicons name="text-outline" size={20} color="#f59e0b" />} 
                color="#f59e0b"
                isDark={isDark}
              />
            </View>
            <View className="w-[48%]">
              <StatCard 
                title="Ortalama" 
                value={averageWords.toString()} 
                icon={<Ionicons name="speedometer-outline" size={20} color="#ec4899" />} 
                color="#ec4899"
                isDark={isDark}
              />
            </View>
          </View>

          {/* Streak Counter */}
          <View className="mb-6">
            <StreakCounter currentStreak={currentStreak} isDark={isDark} />
          </View>

          {/* Recent Activity */}
          <View className={`p-5 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
            <Text className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Son Notlar
            </Text>
            {notes.slice(0, 3).map((note, index) => (
              <View key={note.id || index} className="flex-row items-center py-3 border-b border-gray-200 dark:border-gray-700 last:border-0 last:pb-0 first:pt-0">
                <View className={`w-2 h-2 rounded-full mr-3 ${index === 0 ? 'bg-green-500' : 'bg-blue-500'}`} />
                <View className="flex-1">
                  <Text className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {note.title}
                  </Text>
                  <Text className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {note.createdAt ? formatDate(note.createdAt) : 'Tarih bilgisi yok'}
                  </Text>
                </View>
                {index === 0 && (
                  <Text className="text-xs font-medium text-green-500">
                    +1
                  </Text>
                )}
              </View>
            ))}
            {notes.length === 0 && (
              <View className="py-4">
                <Text className={`text-sm text-center ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Henüz not eklenmemiş
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

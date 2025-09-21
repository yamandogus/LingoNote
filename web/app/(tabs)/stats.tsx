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
  <View 
    className={`p-4 rounded-3xl ${isDark ? 'bg-gray-800/90' : 'bg-white/90'} backdrop-blur-sm`}
    style={{
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.1,
      shadowRadius: 20,
      elevation: 8,
    }}
  >
    <View className="flex-row items-center justify-between mb-4">
      <Text className={`text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
        {title}
      </Text>
      <View 
        className="w-12 h-12 rounded-2xl items-center justify-center"
        style={{ 
          backgroundColor: `${color}15`,
          borderWidth: 1,
          borderColor: `${color}25`,
        }}
      >
        {icon}
      </View>
    </View>
    <Text className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
      {value}
    </Text>
    {/* Progress indicator */}
    <View className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
      <View 
        className="h-full rounded-full"
        style={{ 
          backgroundColor: color,
          width: `${Math.min(parseInt(value) || 0, 100)}%`,
        }}
      />
    </View>
  </View>
);

const StreakCounter = ({ currentStreak, isDark }: { currentStreak: number; isDark: boolean }) => (
  <View 
    className={`p-6 rounded-3xl ${isDark ? 'bg-gray-800/90' : 'bg-white/90'} backdrop-blur-sm`}
    style={{
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.1,
      shadowRadius: 20,
      elevation: 8,
    }}
  >
    <View className="flex-row items-center justify-between">
      <View className="flex-1">
        <View className="flex-row items-center mb-2">
          <MaterialCommunityIcons 
            name="fire" 
            size={24} 
            color={currentStreak > 0 ? "#f97316" : (isDark ? "#4b5563" : "#d1d5db")} 
          />
          <Text className={`text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider ml-2`}>
            Günlük Seri
          </Text>
        </View>
        <View className="flex-row items-end">
          <Text className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {currentStreak || "0"}
          </Text>
          <Text className={`text-lg mb-2 ml-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            gün
          </Text>
        </View>
        {/* Streak progress bar */}
        <View className="mt-4">
          <View className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <View 
              className="h-full rounded-full bg-gradient-to-r from-orange-400 to-red-500"
              style={{
                width: `${Math.min((currentStreak / 30) * 100, 100)}%`,
              }}
            />
          </View>
          <Text className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'} mt-2`}>
            Hedef: 30 gün
          </Text>
        </View>
      </View>
      <View className="items-center ml-4">
        <View 
          className="w-20 h-20 rounded-full items-center justify-center"
          style={{
            backgroundColor: currentStreak > 0 ? "#f9731615" : (isDark ? "#1f293715" : "#f3f4f615"),
            borderWidth: 3,
            borderColor: currentStreak > 0 ? "#f97316" : (isDark ? "#4b5563" : "#d1d5db"),
          }}
        >
          <MaterialCommunityIcons 
            name="fire" 
            size={32} 
            color={currentStreak > 0 ? "#f97316" : (isDark ? "#4b5563" : "#d1d5db")} 
          />
        </View>
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
        colors={isDark ? ["#1a1a2e", "#16213e", "#0f3460"]
            : ["#f8f9fa", "#e9ecef", "#dee2e6"]}
        className="flex-1"
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {Platform.OS === 'android' && <View className="h-8" />}
        <ScrollView
          className="flex-1 px-2 pt-6"
          contentContainerStyle={{ paddingBottom: 140 }}
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
          {/* Modern Header */}
          <View className="mb-8">
            <View className="flex-row items-center mb-2">
              <View 
                className="w-12 h-12 bg-blue-500 rounded-2xl items-center justify-center mr-4"
                style={{
                  shadowColor: "#3b82f6",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                  elevation: 6,
                }}
              >
                <Ionicons name="stats-chart" size={24} color="white" />
              </View>
              <View>
                <Text className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  İstatistikler
                </Text>
                <Text className={`text-base ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Öğrenme performansınızı takip edin
                </Text>
              </View>
            </View>
          </View>

          {/* Enhanced Stats Grid */}
          <View className="mb-8">
            <View className="flex-row justify-between mb-4">
              <View className="w-[48%]">
                <StatCard 
                  title="Toplam Not" 
                  value={totalNotes.toString() || "0"} 
                  icon={<Ionicons name="document-text" size={24} color="#6366f1" />} 
                  color="#6366f1"
                  isDark={isDark}
                />
              </View>
              <View className="w-[48%]">
                <StatCard 
                  title="Kategori" 
                  value={uniqueCategories.toString() || "0"} 
                  icon={<Ionicons name="folder" size={24} color="#10b981" />} 
                  color="#10b981"
                  isDark={isDark}
                />
              </View>
            </View>
            <View className="flex-row justify-between">
              <View className="w-[48%]">
                <StatCard 
                  title="Toplam Kelime" 
                  value={totalWords.toString() || "0"} 
                  icon={<Ionicons name="text" size={24} color="#f59e0b" />} 
                  color="#f59e0b"
                  isDark={isDark}
                />
              </View>
              <View className="w-[48%]">
                <StatCard 
                  title="Ortalama" 
                  value={averageWords.toString() || "0"} 
                  icon={<Ionicons name="speedometer" size={24} color="#ec4899" />} 
                  color="#ec4899"
                  isDark={isDark}
                />
              </View>
            </View>
          </View>

          {/* Enhanced Streak Counter */}
          <View className="mb-8">
            <StreakCounter currentStreak={currentStreak} isDark={isDark} />
          </View>

          {/* Modern Recent Activity */}
          <View 
            className={`p-6 rounded-3xl ${isDark ? 'bg-gray-800/90' : 'bg-white/90'} backdrop-blur-sm`}
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.1,
              shadowRadius: 20,
              elevation: 8,
            }}
          >
            <View className="flex-row items-center mb-6">
              <View 
                className="w-10 h-10 bg-green-500 rounded-2xl items-center justify-center mr-3"
                style={{
                  shadowColor: "#10b981",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.3,
                  shadowRadius: 4,
                  elevation: 3,
                }}
              >
                <Ionicons name="time" size={20} color="white" />
              </View>
              <Text className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Son Notlar
              </Text>
            </View>
            
            {notes.slice(0, 3).map((note, index) => (
              <View 
                key={note.id || index} 
                className="flex-row items-center py-4 border-b border-gray-200/50 dark:border-gray-700/50 last:border-0 last:pb-0"
              >
                <View 
                  className={`w-3 h-3 rounded-full mr-4 ${
                    index === 0 ? 'bg-green-500' : 
                    index === 1 ? 'bg-blue-500' : 'bg-purple-500'
                  }`}
                  style={{
                    shadowColor: index === 0 ? "#10b981" : index === 1 ? "#3b82f6" : "#8b5cf6",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.3,
                    shadowRadius: 4,
                    elevation: 2,
                  }}
                />
                <View className="flex-1">
                  <Text className={`text-base font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-1`}>
                    {note.title}
                  </Text>
                  <View className="flex-row items-center">
                    <Ionicons name="calendar-outline" size={12} color={isDark ? "#9ca3af" : "#6b7280"} />
                    <Text className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'} ml-1`}>
                      {note.createdAt ? formatDate(note.createdAt) : 'Tarih bilgisi yok'}
                    </Text>
                  </View>
                </View>
                {index === 0 && (
                  <View className="bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full">
                    <Text className="text-sm font-bold text-green-600 dark:text-green-400">
                      YENİ
                    </Text>
                  </View>
                )}
              </View>
            ))}
            
            {notes.length === 0 && (
              <View className="py-8 items-center">
                <View className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full items-center justify-center mb-4">
                  <Ionicons name="document-outline" size={24} color={isDark ? "#6b7280" : "#9ca3af"} />
                </View>
                <Text className={`text-base font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'} text-center`}>
                  Henüz not eklenmemiş
                </Text>
                <Text className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'} text-center mt-1`}>
                  İlk notunuzu ekleyerek başlayın!
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

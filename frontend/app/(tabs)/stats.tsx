import { LinearGradient } from "expo-linear-gradient";
import React, { useState, useEffect } from "react";
import { 
  Platform, 
  ScrollView, 
  Text, 
  useColorScheme, 
  View, 
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Note {
  id: string;
  title: string;
  summary: string;
  dueDate?: string;
  tags: string[];
  color?: string;
  isCompleted?: boolean;
}

const MOCK_NOTES: Note[] = [
  {
    id: "1",
    title: "Proje Toplantısı",
    summary: "Yeni proje için ön toplantı ve planlama",
    dueDate: "2025-06-22",
    tags: ["İş", "Önemli"],
    color: "#A7C7E7",
    isCompleted: false
  },
  {
    id: "2",
    title: "Alışveriş Yap",
    summary: "Haftalık market alışverişi",
    dueDate: "2025-06-21",
    tags: ["Kişisel"],
    color: "#B7E5B4",
    isCompleted: false
  },
  {
    id: "3",
    title: "Doktor Randevusu",
    summary: "Yıllık genel kontrol",
    dueDate: "2025-06-25",
    tags: ["Sağlık"],
    color: "#FFB7B2",
    isCompleted: false
  },
  {
    id: "4",
    title: "Fatura Ödemeleri",
    summary: "Elektrik, su ve doğalgaz faturaları",
    dueDate: "2025-06-15",
    tags: ["Ödemeler"],
    color: "#D7B4F3",
    isCompleted: false
  },
  {
    id: "5",
    title: "Kitap Okuma",
    summary: "React Native ile Uygulama Geliştirme bölüm 5",
    dueDate: "2025-06-23",
    tags: ["Eğitim"],
    color: "#FFF6B7",
    isCompleted: false
  },
];

export default function StatsScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [activeTab, setActiveTab] = useState<'upcoming' | 'overdue' | 'completed'>('upcoming');
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load notes on component mount
  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setNotes(MOCK_NOTES);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Filter notes based on due date
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingNotes = notes.filter(note => {
    if (!note.dueDate) return false;
    const dueDate = new Date(note.dueDate);
    return dueDate >= today && !note.isCompleted;
  }).sort((a, b) => {
    return new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime();
  });

  const overdueNotes = notes.filter(note => {
    if (!note.dueDate || note.isCompleted) return false;
    const dueDate = new Date(note.dueDate);
    return dueDate < today;
  }).sort((a, b) => {
    return new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime();
  });

  const completedNotes = notes.filter(note => note.isCompleted);

  const handleCompleteNote = (noteId: string) => {
    setNotes(notes.map(note => 
      note.id === noteId ? { ...note, isCompleted: !note.isCompleted } : note
    ));
  };

  const getDayDifference = (dueDate: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getDueDateText = (dueDate: string) => {
    const days = getDayDifference(dueDate);
    if (days === 0) return 'Bugün';
    if (days === 1) return 'Yarın';
    if (days < 0) return `${Math.abs(days)} gün önce`;
    return `${days} gün sonra`;
  };

  const renderNoteCard = (note: Note) => {
    const daysUntilDue = note.dueDate ? getDayDifference(note.dueDate) : 0;
    const isOverdue = daysUntilDue < 0;
    
    return (
      <View 
        key={note.id}
        className={`mb-4 p-4 rounded-2xl ${isDark ? 'bg-[#2a2a2a]' : 'bg-white'} shadow-md`}
        style={{
          borderLeftWidth: 6,
          borderLeftColor: note.color || (isDark ? '#3b82f6' : '#2563eb'),
          opacity: note.isCompleted ? 0.7 : 1
        }}
      >
        <View className="flex-row justify-between items-start mb-2">
          <Text 
            className={`text-base font-bold ${isDark ? 'text-white' : 'text-gray-900'} ${note.isCompleted ? 'line-through' : ''}`}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {note.title}
          </Text>
          {note.dueDate && (
            <View 
              className={`px-2 py-1 rounded-full ${isOverdue ? 'bg-red-100' : 'bg-blue-100'} ${isDark ? 'bg-opacity-20' : ''}`}
            >
              <Text 
                className={`text-xs font-medium ${isOverdue ? 'text-red-600' : 'text-blue-600'} ${isDark ? 'opacity-90' : ''}`}
              >
                {getDueDateText(note.dueDate)}
              </Text>
            </View>
          )}
        </View>
        
        <Text 
          className={`text-sm mb-3 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {note.summary}
        </Text>
        
        <View className="flex-row justify-between items-center">
          <View className="flex-row flex-wrap">
            {note.tags.map((tag, index) => (
              <View 
                key={index}
                className={`px-2 py-1 rounded-full mr-2 mb-1 ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}
              >
                <Text className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {tag}
                </Text>
              </View>
            ))}
          </View>
          
          <TouchableOpacity
            onPress={() => handleCompleteNote(note.id)}
            className={`w-8 h-8 rounded-full items-center justify-center ${note.isCompleted ? 'bg-green-100' : 'bg-gray-200'}`}
          >
            <Ionicons 
              name={note.isCompleted ? 'checkmark-done' : 'checkmark'} 
              size={20} 
              color={note.isCompleted ? (isDark ? '#4ade80' : '#16a34a') : (isDark ? '#9ca3af' : '#6b7280')} 
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderEmptyState = () => (
    <View className="flex-1 items-center justify-center py-12">
      <Ionicons 
        name="checkmark-done-circle-outline" 
        size={64} 
        color={isDark ? '#4b5563' : '#9ca3af'} 
      />
      <Text className={`mt-4 text-lg font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
        {activeTab === 'upcoming' && 'Yaklaşan not bulunmuyor'}
        {activeTab === 'overdue' && 'Süresi geçmiş not bulunmuyor'}
        {activeTab === 'completed' && 'Tamamlanmış not bulunmuyor'}
      </Text>
      <Text className={`mt-2 text-center px-8 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
        {activeTab === 'upcoming' && 'Yeni not ekleyerek başlayabilirsiniz'}
        {activeTab === 'overdue' && 'Tüm notlarınız güncel görünüyor'}
        {activeTab === 'completed' && 'Henüz hiç not tamamlamadınız'}
      </Text>
    </View>
  );

  return (
    <View className="flex-1">
      <LinearGradient
        colors={isDark ? ['#0f0c29', '#120f31', '#16162e'] : ['#f8f9fa', '#e9ecef', '#dee2e6']}
        style={{ flex: 1 }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {Platform.OS === 'android' && <View style={{ height: 32 }} />}
        
        {/* Header */}
        <View className="px-6 pt-6 pb-4">
          <Text className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Not Takibi
          </Text>
          <Text className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'} mt-1`}>
            Yaklaşan ve süresi dolan notlarınız
          </Text>
        </View>

        {/* Tabs */}
        <View className="flex-row mx-4 mt-2 mb-4 bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
          <TouchableOpacity
            onPress={() => setActiveTab('upcoming')}
            className={`flex-1 py-2 rounded-lg items-center ${activeTab === 'upcoming' ? 'bg-white dark:bg-gray-700' : ''}`}
          >
            <Text 
              className={`text-sm font-medium ${activeTab === 'upcoming' 
                ? (isDark ? 'text-blue-400' : 'text-blue-600') 
                : (isDark ? 'text-gray-400' : 'text-gray-600')}`}
            >
              Yaklaşan
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={() => setActiveTab('overdue')}
            className={`flex-1 py-2 rounded-lg items-center ${activeTab === 'overdue' ? 'bg-white dark:bg-gray-700' : ''}`}
          >
            <View className="flex-row items-center">
              <Text 
                className={`text-sm font-medium ${activeTab === 'overdue' 
                  ? (isDark ? 'text-red-400' : 'text-red-600') 
                  : (isDark ? 'text-gray-400' : 'text-gray-600')}`}
              >
                Geçen
              </Text>
              {overdueNotes.length > 0 && (
                <View className="ml-1 bg-red-500 rounded-full w-5 h-5 items-center justify-center">
                  <Text className="text-white text-xs font-bold">{overdueNotes.length}</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={() => setActiveTab('completed')}
            className={`flex-1 py-2 rounded-lg items-center ${activeTab === 'completed' ? 'bg-white dark:bg-gray-700' : ''}`}
          >
            <Text 
              className={`text-sm font-medium ${activeTab === 'completed' 
                ? (isDark ? 'text-green-400' : 'text-green-600') 
                : (isDark ? 'text-gray-400' : 'text-gray-600')}`}
            >
              Tamamlanan
            </Text>
          </TouchableOpacity>
        </View>

        {/* Stats Cards */}
        <View className="flex-row mx-4 mb-4">
          <View className="flex-1 bg-blue-100 dark:bg-blue-900 rounded-xl p-3 mr-2">
            <Text className="text-blue-800 dark:text-blue-200 text-xs font-medium">Yaklaşan</Text>
            <Text className="text-blue-600 dark:text-white text-2xl font-bold mt-1">{upcomingNotes.length}</Text>
          </View>
          <View className="flex-1 bg-red-100 dark:bg-red-900 rounded-xl p-3 mx-2">
            <Text className="text-red-800 dark:text-red-200 text-xs font-medium">Süresi Geçen</Text>
            <Text className="text-red-600 dark:text-white text-2xl font-bold mt-1">{overdueNotes.length}</Text>
          </View>
          <View className="flex-1 bg-green-100 dark:bg-green-900 rounded-xl p-3 ml-2">
            <Text className="text-green-800 dark:text-green-200 text-xs font-medium">Tamamlanan</Text>
            <Text className="text-green-600 dark:text-white text-2xl font-bold mt-1">{completedNotes.length}</Text>
          </View>
        </View>

        {/* Content */}
        <ScrollView 
          className="flex-1 px-4"
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          {isLoading ? (
            <View className="flex-1 items-center justify-center py-12">
              <Text className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Yükleniyor...
              </Text>
            </View>
          ) : (
            <>
              {activeTab === 'upcoming' && (
                upcomingNotes.length > 0 ? (
                  upcomingNotes.map(note => renderNoteCard(note))
                ) : (
                  renderEmptyState()
                )
              )}
              
              {activeTab === 'overdue' && (
                overdueNotes.length > 0 ? (
                  overdueNotes.map(note => renderNoteCard(note))
                ) : (
                  renderEmptyState()
                )
              )}
              
              {activeTab === 'completed' && (
                completedNotes.length > 0 ? (
                  completedNotes.map(note => renderNoteCard(note))
                ) : (
                  renderEmptyState()
                )
              )}
            </>
          )}
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

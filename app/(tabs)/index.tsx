import { ThemedView } from '@/components/ThemedView';
import { FontAwesome } from '@expo/vector-icons';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

const avatarUrl = 'https://randomuser.me/api/portraits/women/44.jpg';
const avatars = [
  'https://randomuser.me/api/portraits/men/32.jpg',
  'https://randomuser.me/api/portraits/women/65.jpg',
  'https://randomuser.me/api/portraits/men/45.jpg',
  'https://randomuser.me/api/portraits/women/44.jpg',
];

const taskBoxes = [
  { title: 'Devam Eden', count: 22, color: 'bg-blue-400', textColor: 'text-white' },
  { title: 'İşlemde', count: 32, color: 'bg-orange-400', textColor: 'text-white' },
  { title: 'Tamamlandı', count: 16, color: 'bg-green-400', textColor: 'text-white' },
  { title: 'İptal Edildi', count: 12, color: 'bg-pink-500', textColor: 'text-white' },
];

const stats = [
  { label: 'Toplam Proje', value: 82, icon: 'folder-open-o' as const, color: 'bg-blue-200' },
  { label: 'Bugünkü Görev', value: 3, icon: 'calendar-check-o' as const, color: 'bg-green-200' },
  { label: 'Yeni Bildirim', value: 2, icon: 'bell-o' as const, color: 'bg-yellow-200' },
];

const upcoming = {
  title: 'Toplantı: Proje Sunumu',
  date: '26 Haziran 2022',
  time: '15:00 - 16:00',
  icon: 'users' as const,
  color: 'bg-purple-100',
};

const projects = [
  {
    title: 'UI/UX Tasarım Projesi',
    progress: 45,
    time: '10:00 - 12:00',
    avatars: avatars.slice(0, 3),
    color: 'bg-blue-100',
    bar: 'bg-blue-400',
  },
  {
    title: 'Web Geliştirme',
    progress: 75,
    time: '14:00 - 17:00',
    avatars: avatars.slice(1, 4),
    color: 'bg-orange-100',
    bar: 'bg-orange-400',
  },
];

export default function HomeScreen() {
  return (
    <ThemedView className="flex-1 bg-gray-50 pt-2 px-4">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Tarih ve avatar */}
        <View className="flex-row items-center justify-between mb-4">
          <View className="flex-row items-center">
            <FontAwesome name="calendar" size={16} color="#64748b" />
            <Text className="ml-2 text-xs text-gray-500">25 Haziran 2022</Text>
          </View>
          <Image source={{ uri: avatarUrl }} className="w-9 h-9 rounded-full" />
        </View>

        {/* Kısa özet istatistikler */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4 -mx-1">
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

        {/* Görevlerim başlığı ve kutular */}
        <Text className="text-lg font-bold text-gray-700 mb-3">Görevlerim</Text>
        <View className="flex-row flex-wrap justify-between mb-6">
          {taskBoxes.map((box, i) => (
            <View key={i} className={`w-[48%] h-24 rounded-2xl mb-3 p-4 ${box.color} ${box.textColor} justify-between`}>
              <Text className="font-bold text-base">{box.title}</Text>
              <View className="flex-row items-center justify-between">
                <Text className="text-xs opacity-80">{box.count} proje</Text>
                <FontAwesome name="arrow-right" size={18} color="#fff" />
              </View>
            </View>
          ))}
        </View>

        {/* Yaklaşan etkinlik */}
        <View className="rounded-2xl bg-purple-100 p-4 mb-4 flex-row items-center justify-between">
          <View className="flex-row items-center">
            <FontAwesome name={upcoming.icon} size={22} color="#a21caf" />
            <View className="ml-3">
              <Text className="font-bold text-base text-purple-900 mb-1">{upcoming.title}</Text>
              <Text className="text-xs text-gray-500">{upcoming.date} • {upcoming.time}</Text>
            </View>
          </View>
          <FontAwesome name="chevron-right" size={20} color="#a21caf" />
        </View>

        {/* Bildirim kutusu */}
        <View className="rounded-2xl bg-yellow-100 p-4 mb-4 flex-row items-center">
          <FontAwesome name="info-circle" size={20} color="#eab308" />
          <Text className="ml-3 text-yellow-900 font-semibold">Bugün 2 yeni görev eklendi!</Text>
        </View>

        {/* Motivasyon mesajı */}
        <View className="rounded-2xl bg-green-100 p-4 mb-4 flex-row items-center">
          <FontAwesome name="smile-o" size={20} color="#22c55e" />
          <Text className="ml-3 text-green-900 font-semibold">Harika gidiyorsun, böyle devam et!</Text>
        </View>

        {/* Son projeler */}
        <View className="flex-row items-center justify-between mb-2">
          <Text className="text-base font-bold text-gray-700">Son Projeler</Text>
          <TouchableOpacity>
            <Text className="text-blue-500 font-bold text-xs">Tümünü Gör</Text>
          </TouchableOpacity>
        </View>
        {projects.map((proj, i) => (
          <View key={i} className={`rounded-2xl p-4 mb-4 ${proj.color} shadow-sm`}>
            <Text className="font-bold text-base text-gray-700 mb-2">{proj.title}</Text>
            <View className="mb-2">
              <Text className="text-xs text-gray-500 mb-1">İlerleme</Text>
              <View className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <View className={`h-2 ${proj.bar} rounded-full`} style={{ width: `${proj.progress}%` }} />
              </View>
              <Text className="text-xs text-blue-500 font-bold mt-1">%{proj.progress}</Text>
            </View>
            <View className="flex-row items-center justify-between mt-2">
              <View className="flex-row items-center">
                <FontAwesome name="clock-o" size={14} color="#64748b" />
                <Text className="ml-1 text-xs text-gray-500">{proj.time}</Text>
              </View>
              <View className="flex-row">
                {proj.avatars.map((img, idx) => (
                  <Image
                    key={idx}
                    source={{ uri: img }}
                    className="w-7 h-7 rounded-full border-2 border-white"
                    style={{ marginLeft: idx === 0 ? 0 : -8 }}
                  />
                ))}
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </ThemedView>
  );
}

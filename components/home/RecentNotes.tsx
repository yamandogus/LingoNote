import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

const avatars = [
  'https://randomuser.me/api/portraits/men/32.jpg',
  'https://randomuser.me/api/portraits/women/65.jpg',
  'https://randomuser.me/api/portraits/men/45.jpg',
  'https://randomuser.me/api/portraits/women/44.jpg',
];

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

export const RecentNotes = () => {
  const navigation = useNavigation();

  return (
    <>
      <View className="flex-row items-center justify-between mb-2 mt-4">
        <Text className="text-lg font-bold text-gray-400">Son Notlar</Text>
        <TouchableOpacity onPress={() => navigation.navigate('mynotes' as never)}>
          <Text className="text-blue-500 font-bold text-base">Tümünü Gör <FontAwesome name="chevron-right" size={14} color="#2563eb" /></Text>
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
    </>
  );
}; 
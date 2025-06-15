import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const taskBoxes = [
  { title: 'Devam Eden', count: 22, color: 'bg-blue-400', textColor: 'text-white' },
  { title: 'İşlemde', count: 32, color: 'bg-orange-400', textColor: 'text-white' },
  { title: 'Tamamlandı', count: 16, color: 'bg-green-400', textColor: 'text-white' },
  { title: 'İptal Edildi', count: 12, color: 'bg-pink-500', textColor: 'text-white' },
];

export const TaskBoxes = () => {
  return (
    <View className='my-4'>
      <Text className="text-lg font-bold text-gray-400 mb-2">Görevlerim</Text>
      <View className="flex-row flex-wrap justify-between mb-4">
        {taskBoxes.map((box, i) => (
          <TouchableOpacity key={i} className={`text-white w-[48%] h-24 rounded-2xl mb-3 p-4 ${box.color} ${box.textColor} justify-between`}>
            <Text className="font-bold text-base text-white">{box.title}</Text>
            <View className="flex-row items-center justify-between">
              <Text className="text-sm opacity-80 text-white font-bold">{box.count} proje</Text>
              <FontAwesome name="chevron-right" size={18} color="#fff" />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}; 
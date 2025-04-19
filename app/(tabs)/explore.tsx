import { View, Text, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';

export default function ExploreScreen() {
  return (
    <View className="flex-1 bg-gray-100 dark:bg-gray-900">
      <View className="p-4 pt-12">
        <Text className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
          Keşfet
        </Text>
        
        <View className="flex-row items-center bg-white dark:bg-gray-800 rounded-full px-4 py-2 mb-6">
          <Ionicons name="search" size={20} color="#6B7280" />
          <TextInput
            className="flex-1 ml-2 text-gray-800 dark:text-white"
            placeholder="Ara..."
            placeholderTextColor="#6B7280"
          />
        </View>
        
        <Text className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Kategoriler
        </Text>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
          <TouchableOpacity className="bg-blue-500 py-2 px-4 rounded-full mr-2">
            <Text className="text-white">Tümü</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-white dark:bg-gray-800 py-2 px-4 rounded-full mr-2">
            <Text className="text-gray-800 dark:text-white">Spor</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-white dark:bg-gray-800 py-2 px-4 rounded-full mr-2">
            <Text className="text-gray-800 dark:text-white">Müzik</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-white dark:bg-gray-800 py-2 px-4 rounded-full mr-2">
            <Text className="text-gray-800 dark:text-white">Teknoloji</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-white dark:bg-gray-800 py-2 px-4 rounded-full">
            <Text className="text-gray-800 dark:text-white">Sanat</Text>
          </TouchableOpacity>
        </ScrollView>
        
        <Text className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Önerilen İçerikler
        </Text>
        
        <ScrollView className="mb-4">
          {[1, 2, 3, 4, 5].map((item) => (
            <TouchableOpacity 
              key={item}
              className="bg-white dark:bg-gray-800 p-4 rounded-xl mb-3 shadow-sm"
            >
              <Text className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                İçerik Başlığı {item}
              </Text>
              <Text className="text-gray-600 dark:text-gray-300 mb-2">
                Bu içerik hakkında kısa bir açıklama bulunmaktadır. Detaylar için tıklayın.
              </Text>
              <View className="flex-row">
                <Text className="text-blue-500">#etiket</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}


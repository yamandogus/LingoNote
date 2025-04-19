import { View, Text, ScrollView } from "react-native";

export default function HomeScreen() {
  return (
    <ScrollView className="flex-1 bg-gray-100 dark:bg-gray-900 mt-10">
      <View className="p-4">
        <Text className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
          Hoş Geldiniz
        </Text>
        
        <View className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md mb-4">
          <Text className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
            Günün Önerisi
          </Text>
          <Text className="text-gray-600 dark:text-gray-300">
            Bugün yeni içerikleri keşfetmeye ne dersiniz? Keşfet bölümünden en yeni içeriklere göz atabilirsiniz.
          </Text>
        </View>
        
        <View className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
          <Text className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
            Popüler İçerikler
          </Text>
          <View className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg mb-2">
            <Text className="text-gray-800 dark:text-gray-200">Popüler içerik 1</Text>
          </View>
          <View className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg mb-2">
            <Text className="text-gray-800 dark:text-gray-200">Popüler içerik 2</Text>
          </View>
          <View className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
            <Text className="text-gray-800 dark:text-gray-200">Popüler içerik 3</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

import { ScrollView, Text, View, TextInput } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function HomeScreen() {
  return (
    <View className="flex-1 ">
      <StatusBar style="dark" />
      <ScrollView className="flex-1 px-4 py-8">

        {/* Header Section */}
        <View className="flex-row items-center justify-between mb-8 pt-4">
          <Text className="text-3xl font-bold text-gray-800">Günaydın, Kristin</Text>
          {/* Avatar (excluded as per request) */}
        </View>

        {/* Calendar/Up Next Section */}
        <View className="bg-white rounded-xl shadow-sm p-5 mb-8 flex-row items-center">
          <View className="mr-6 items-center">
            <Text className="text-5xl font-bold text-gray-800">25</Text>
            <Text className="text-lg text-gray-600">Eylül</Text>
          </View>
          <View className="flex-1">
            <Text className="text-base font-semibold text-gray-500 mb-2">Sıradaki</Text>
            <View className="flex-row items-center mb-1">
              <View className="w-1.5 h-6 bg-yellow-500 rounded-full mr-2" />
              <Text className="text-base text-gray-800">Toplantı öğle yemeği James Strobinsty ile</Text>
            </View>
            <View className="flex-row items-center">
              <View className="w-1.5 h-6 bg-blue-500 rounded-full mr-2" />
              <Text className="text-base text-gray-800">Dave&#39;in doğum günü partisi</Text>
            </View>
          </View>
        </View>

        {/* Search Bar */}
        <View className="flex-row items-center bg-white rounded-lg px-4 py-3 mb-8 shadow-sm">
          {/* Search Icon Placeholder */}
          <Text className="mr-3 text-xl text-gray-400">🔍</Text>
          <TextInput
            className="flex-1 text-base text-gray-700"
            placeholder="Projeler, etkinlikler, etiketler ara"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Projects/Notes Section */}
        <Text className="text-2xl font-bold text-gray-800 mb-5">Notlar</Text>

        <View className="flex-row flex-wrap justify-between">
          {/* Note Card 1 */}
          <View className="bg-white rounded-xl shadow-sm p-4 mb-4 w-[48%]">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-lg font-semibold text-gray-800">Tasarım Düzeni</Text>
              <View className="w-12 h-12 rounded-full border-2 border-blue-200 items-center justify-center">
                <Text className="text-sm text-blue-500">85%</Text>
              </View>
            </View>
            <View className="bg-red-100 rounded-md px-2 py-1 self-start mb-2">
              <Text className="text-xs text-red-700 font-medium">Acil</Text>
            </View>
            <Text className="text-sm text-gray-600 mb-2">Takım</Text>
            {/* Placeholder for Team Avatars */}
            <View className="flex-row -space-x-2">
              <View className="w-6 h-6 rounded-full bg-gray-300 border border-white" />
              <View className="w-6 h-6 rounded-full bg-gray-400 border border-white" />
              <View className="w-6 h-6 rounded-full bg-gray-500 border border-white" />
              <View className="w-6 h-6 rounded-full bg-gray-600 border border-white" />
              <View className="w-6 h-6 rounded-full bg-gray-700 border border-white items-center justify-center">
                <Text className="text-xs text-white">+5</Text>
              </View>
            </View>
          </View>

          {/* Note Card 2 */}
          <View className="bg-white rounded-xl shadow-sm p-4 mb-4 w-[48%]">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-lg font-semibold text-gray-800">Finans</Text>
              <View className="w-12 h-12 rounded-full border-2 border-green-200 items-center justify-center">
                <Text className="text-sm text-green-500">17%</Text>
              </View>
            </View>
            <View className="bg-blue-100 rounded-md px-2 py-1 self-start mb-2">
              <Text className="text-xs text-blue-700 font-medium">Yeni</Text>
            </View>
            <Text className="text-sm text-gray-600 mb-2">Takım</Text>
            {/* Placeholder for Team Avatars */}
            <View className="flex-row -space-x-2">
              <View className="w-6 h-6 rounded-full bg-gray-300 border border-white" />
              <View className="w-6 h-6 rounded-full bg-gray-400 border border-white" />
            </View>
          </View>

          {/* Note Card 3 */}
          <View className="bg-white rounded-xl shadow-sm p-4 mb-4 w-[48%]">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-lg font-semibold text-gray-800">Geniş Dünya</Text>
              <View className="w-12 h-12 rounded-full border-2 border-purple-200 items-center justify-center">
                <Text className="text-sm text-purple-500">69%</Text>
              </View>
            </View>
            <View className="bg-yellow-100 rounded-md px-2 py-1 self-start mb-2">
              <Text className="text-xs text-yellow-700 font-medium">İşlemde</Text>
            </View>
            <Text className="text-sm text-gray-600 mb-2">Takım</Text>
            {/* Placeholder for Team Avatars */}
            <View className="flex-row -space-x-2">
              <View className="w-6 h-6 rounded-full bg-gray-300 border border-white" />
              <View className="w-6 h-6 rounded-full bg-gray-400 border border-white" />
            </View>
          </View>

          {/* Note Card 4 */}
          <View className="bg-white rounded-xl shadow-sm p-4 mb-4 w-[48%]">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-lg font-semibold text-gray-800">Yooki</Text>
              <View className="w-12 h-12 rounded-full border-2 border-yellow-200 items-center justify-center">
                <Text className="text-sm text-yellow-500">100%</Text>
              </View>
            </View>
            <View className="bg-green-100 rounded-md px-2 py-1 self-start mb-2">
              <Text className="text-xs text-green-700 font-medium">Tamamlandı</Text>
            </View>
            <Text className="text-sm text-gray-600 mb-2">Takım</Text>
            {/* Placeholder for Team Avatars */}
            <View className="flex-row -space-x-2">
              <View className="w-6 h-6 rounded-full bg-gray-300 border border-white" />
              <View className="w-6 h-6 rounded-full bg-gray-400 border border-white" />
              <View className="w-6 h-6 rounded-full bg-gray-500 border border-white" />
              <View className="w-6 h-6 rounded-full bg-gray-600 border border-white" />
              <View className="w-6 h-6 rounded-full bg-gray-700 border border-white items-center justify-center">
                <Text className="text-xs text-white">+11</Text>
              </View>
            </View>
          </View>

        </View>

        {/* Categories Section */}
        <View className="mt-8 mb-8">
          <Text className="text-2xl font-bold text-gray-800 mb-4">Kategoriler</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row space-x-3">
            <View className="bg-blue-100 p-4 rounded-lg items-center justify-center min-w-[100px]">
              <Text className="text-blue-700 font-semibold">İş</Text>
            </View>
            <View className="bg-green-100 p-4 rounded-lg items-center justify-center min-w-[100px]">
              <Text className="text-green-700 font-semibold">Kişisel</Text>
            </View>
            <View className="bg-purple-100 p-4 rounded-lg items-center justify-center min-w-[100px]">
              <Text className="text-purple-700 font-semibold">Eğitim</Text>
            </View>
            <View className="bg-yellow-100 p-4 rounded-lg items-center justify-center min-w-[100px]">
              <Text className="text-yellow-700 font-semibold">Hobiler</Text>
            </View>
            <View className="bg-red-100 p-4 rounded-lg items-center justify-center min-w-[100px]">
              <Text className="text-red-700 font-semibold">Sağlık</Text>
            </View>
          </ScrollView>
        </View>


      </ScrollView>
    </View>
  );
}

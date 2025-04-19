import { router } from "expo-router";
import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Animation from "@/components/home/animation";

export default function HomeScreen() {
  return (
    <SafeAreaProvider className="flex-1">
      <ScrollView className="flex-1 bg-gray-100 dark:bg-gray-900">
        <SafeAreaView>
          <View className="p-4">
            <Text className="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">
              Hoş Geldiniz
            </Text>
            <View className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg mb-4">
              <Text className="font-bold mb-2">Ugulama Hakkında</Text>
              <Text className="text-gray-600 dark:text-gray-300">
                Bu uygulama, anında çeviri yapmanızı ve çevirdiğiniz içerikleri
                not alarak saklamanızı sağlar. Dil öğrenenler, gezginler ve
                üretkenliğini artırmak isteyen herkes için idealdir.
              </Text>
              <View className="flex flex-row justify-between px-10 my-2 gap-2">
                <Pressable className="bg-blue-500 p-2 rounded-md flex-1" onPress={()=> router.push("/(tabs)/explore")}>
                  <Text className="text-white font-bold text-center">
                    📝 Notlarım
                  </Text>
                </Pressable>
                <Pressable className="bg-blue-500 p-2 rounded-md flex-1" onPress={()=> router.push("/(tabs)/translate")}>
                  <Text className="text-white font-bold text-center">
                    🌐 Translate
                  </Text>
                </Pressable>
              </View>
            </View>

            <View className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
              <Text className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                Uygulamada Yapabileceklerin
              </Text>

              <View className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg mb-2">
                <Text className="text-gray-800 dark:text-gray-200">
                  🌐 Gerçek zamanlı metin çevirisi yap.
                </Text>
              </View>

              <View className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg mb-2">
                <Text className="text-gray-800 dark:text-gray-200">
                  📝 Çevirdiğin metinleri not olarak kaydet.
                </Text>
              </View>

              <View className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg mb-2">
                <Text className="text-gray-800 dark:text-gray-200">
                  📚 Kendi çok dilli sözlüğünü oluştur.
                </Text>
              </View>

              <View className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg mb-2">
                <Text className="text-gray-800 dark:text-gray-200">
                  🔍 Geçmiş notları dilediğin zaman görüntüle ve düzenle.
                </Text>
              </View>

              <View className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                <Text className="text-gray-800 dark:text-gray-200">
                  💾 Uygulama verilerini cihazında güvenle sakla.
                </Text>
              </View>
            </View>
          </View>
          <View className="my-6">
          <Animation/>
          </View>
        </SafeAreaView>
      </ScrollView>
    </SafeAreaProvider>
  );
}

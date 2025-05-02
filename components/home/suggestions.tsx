import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type IconName = "book-outline" | "bulb-outline" | "folder-outline" | "create-outline" | "list-outline" | "document-outline" | "search-outline" | "attach-outline";

interface Template {
  title: string;
  description: string;
  icon: IconName;
  category: string;
}


const templates: Template[] = [
  {
    title: "✏️ Not Ekle",
    description: "Hızlı ve kolay not alma",
    icon: "create-outline",
    category: "Genel"
  },
  {
    title: "📋 Genel Notlarım",
    description: "Günlük notlarınızı düzenleyin",
    icon: "list-outline",
    category: "Genel"
  },
  {
    title: "✅ Yapılacaklar",
    description: "Görevlerinizi planlayın",
    icon: "document-outline",
    category: "Görevler"
  },
  {
    title: "📝 Ödevler",
    description: "Ödevlerinizi takip edin",
    icon: "book-outline",
    category: "Eğitim"
  },
  {
    title: "🔍 Proje Notları",
    description: "Proje fikirlerinizi kaydedin",
    icon: "search-outline",
    category: "Projeler"
  },
  {
    title: "📎 Diğer",
    description: "Çeşitli notlarınız",
    icon: "attach-outline",
    category: "Diğer"
  }
];



const Suggestions = () => {
  return (
    <View className="space-y-6">
      <View className="mb-4">
        <View className="flex-row items-center gap-2 mb-4">
          <Ionicons name="bulb-outline" size={24} color="#6366F1" />
          <Text className="text-xl font-bold text-gray-900 dark:text-white">
            Günün İpucu
          </Text>
        </View>
        <View className="bg-indigo-50 dark:bg-indigo-900/30 p-5 rounded-2xl border border-indigo-100 dark:border-indigo-800">
          <Text className="text-indigo-600 dark:text-indigo-400 font-semibold mb-2">
            Kelime Kartları ile Öğrenin
          </Text>
          <Text className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Yeni kelimeleri öğrenirken, her kelime için bir örnek cümle oluşturun. Bu, kelimenin bağlamını anlamanıza ve daha kalıcı öğrenmenize yardımcı olur.
          </Text>
        </View>
      </View>

      <View className="mb-4">
        <View className="flex-row items-center gap-2 mb-4">
          <Ionicons name="book-outline" size={24} color="#10B981" />
          <Text className="text-xl font-bold text-gray-900 dark:text-white">
            Dil Öğrenme Stratejisi
          </Text>
        </View>
        <View className="bg-emerald-50 dark:bg-emerald-900/30 p-5 rounded-2xl border border-emerald-100 dark:border-emerald-800">
          <Text className="text-emerald-600 dark:text-emerald-400 font-semibold mb-2">
            Aktif Dinleme Tekniği
          </Text>
          <Text className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Podcast veya film izlerken, duyduğunuz yeni kelimeleri ve ifadeleri not alın. Daha sonra bu notları kategorize ederek tekrar edin.
          </Text>
        </View>
      </View>

      <View className="mb-4">
        <View className="flex-row items-center gap-2 mb-4">
          <Ionicons name="folder-outline" size={24} color="#F59E0B" />
          <Text className="text-xl font-bold text-gray-900 dark:text-white">
            Not Organizasyonu
          </Text>
        </View>
        <View className="bg-amber-50 dark:bg-amber-900/30 p-5 rounded-2xl border border-amber-100 dark:border-amber-800">
          <Text className="text-amber-600 dark:text-amber-400 font-semibold mb-2">
            Kategorize Edilmiş Notlar
          </Text>
          <Text className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Notlarınızı dil bilgisi, kelime, deyimler gibi kategorilere ayırarak düzenleyin. Bu, öğrenme sürecinizi daha organize ve verimli hale getirecektir.
          </Text>
        </View>
      </View>
        <View className="mt-4">
          <View className="flex-row items-center gap-2 mb-4">
            <Ionicons name="document-outline" size={24} color="#6366F1" />
            <Text className="text-xl font-bold text-gray-900 dark:text-white"> Örnek Not Tampletleri</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {templates.map((template, index) => (
              <View key={index} className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mx-2 border border-gray-200 dark:border-gray-700 mt-4 w-64 gap-2 mb-4">
                <Ionicons name={template.icon} size={24} color="#6366F1" />
                <Text className="text-gray-900 dark:text-white">{template.title}</Text>
                <Text className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{template.description}</Text>
                <Text className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{template.category}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
    </View>
  );
};

export default Suggestions;

import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

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
    </View>
  );
};

export default Suggestions;

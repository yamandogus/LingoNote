import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface CategorySelectorProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedColor: string;
  isDark: boolean;
  categories: string[];
}

export default function CategorySelector({
  selectedCategory,
  setSelectedCategory,
  selectedColor,
  isDark,
  categories,
}: CategorySelectorProps) {
  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: string } = {
      "Tümü": "apps",
      "Kişisel": "person",
      "İş": "briefcase",
      "Eğitim": "school",
      "Sağlık": "medical",
      "Fikirler": "bulb",
    };
    return icons[category] || "bookmark";
  };

  return (
    <View className="mb-6">
      <View className="flex-row items-center mb-3">
        <Ionicons 
          name="folder" 
          size={18} 
          color={selectedColor} 
        />
        <Text className="text-sm font-semibold dark:text-gray-300 text-gray-600 uppercase tracking-wider ml-2">
          Kategori Seçin
        </Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: 20, paddingVertical: 4 }}
        className="-mx-1"
      >
        {categories.map((kategori, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setSelectedCategory(kategori)}
            activeOpacity={0.8}
            className="mx-2 first:ml-1"
            style={{
              backgroundColor: selectedCategory === kategori ? selectedColor : isDark ? "#374151" : "#f8fafc",
              paddingVertical: 12,
              paddingHorizontal: 16,
              borderRadius: 16,
              borderWidth: 1,
              borderColor: selectedCategory === kategori ? selectedColor : isDark ? "#4b5563" : "#e2e8f0",
              shadowColor: selectedCategory === kategori ? selectedColor : "#000",
              shadowOffset: { width: 0, height: 3 },
              shadowOpacity: selectedCategory === kategori ? 0.3 : 0.1,
              shadowRadius: selectedCategory === kategori ? 8 : 4,
              elevation: selectedCategory === kategori ? 5 : 2,
            }}
          >
            <View className="flex-row items-center">
              <Ionicons
                name={getCategoryIcon(kategori) as any}
                size={16}
                color={
                  selectedCategory === kategori 
                    ? "white" 
                    : isDark 
                      ? "#d1d5db" 
                      : "#6b7280"
                }
              />
              <Text 
                className={`text-sm font-semibold ml-2 ${
                  selectedCategory === kategori 
                    ? "text-white" 
                    : isDark 
                      ? "text-gray-300" 
                      : "text-gray-700"
                }`}
              >
                {kategori}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
} 
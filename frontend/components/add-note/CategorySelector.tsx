import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

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
  return (
    <View className="mb-6">
      <Text className="text-sm font-medium mb-2 dark:text-gray-300 text-gray-600">
        Kategori Seçin
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: 20 }}
        className="pb-2 -mx-1"
      >
        {categories.map((kategori, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setSelectedCategory(kategori)}
            className={`py-2 px-4 mx-1 rounded-full ${
              selectedCategory === kategori 
                ? `bg-[${selectedColor}]` 
                : isDark 
                  ? "bg-gray-700" 
                  : "bg-gray-100"
            }`}
            style={{
              backgroundColor: selectedCategory === kategori ? selectedColor : isDark ? "#374151" : "#f3f4f6",
              shadowColor: selectedCategory === kategori ? `${selectedColor}80` : "transparent",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 1,
              shadowRadius: 4,
              elevation: selectedCategory === kategori ? 3 : 0,
            }}
          >
            <Text 
              className={`text-sm font-medium ${
                selectedCategory === kategori 
                  ? "text-white" 
                  : isDark 
                    ? "text-gray-200" 
                    : "text-gray-700"
              }`}
            >
              {kategori}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
} 
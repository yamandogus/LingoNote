import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ColorSelectorProps {
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  isDark: boolean;
  colors: string[];
}

export default function ColorSelector({
  selectedColor,
  setSelectedColor,
  isDark,
  colors,
}: ColorSelectorProps) {
  return (
    <View className="mb-8">
      <View className="flex-row items-center mb-4">
        <Ionicons 
          name="color-palette" 
          size={18} 
          color={selectedColor} 
        />
        <Text className="text-sm font-semibold dark:text-gray-300 text-gray-600 uppercase tracking-wider ml-2">
          Renk Seçin
        </Text>
      </View>
      <View className="flex-row flex-wrap justify-start items-center">
        {colors.map((color, index) => (
          <TouchableOpacity
            key={color}
            onPress={() => setSelectedColor(color)}
            className="m-2"
            activeOpacity={0.8}
          >
            <View 
              className="w-12 h-12 rounded-2xl items-center justify-center"
              style={{
                backgroundColor: color,
                borderWidth: 3,
                borderColor: selectedColor === color 
                  ? isDark ? "#ffffff" : "#1f2937" 
                  : "transparent",
                shadowColor: selectedColor === color ? color : "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: selectedColor === color ? 0.4 : 0.1,
                shadowRadius: selectedColor === color ? 8 : 4,
                elevation: selectedColor === color ? 6 : 2,
                transform: [{ scale: selectedColor === color ? 1.1 : 1 }],
              }}
            >
              {selectedColor === color && (
                <Ionicons 
                  name="checkmark" 
                  size={20} 
                  color="white"
                  style={{
                    textShadowColor: "rgba(0, 0, 0, 0.5)",
                    textShadowOffset: { width: 1, height: 1 },
                    textShadowRadius: 2,
                  }}
                />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
} 
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

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
      <Text className="text-sm font-medium mb-3 dark:text-gray-300 text-gray-600">
        Renk Seçin
      </Text>
      <View className="flex-row flex-wrap justify-start items-center">
        {colors.map((color) => (
          <TouchableOpacity
            key={color}
            onPress={() => setSelectedColor(color)}
            className="m-1.5"
          >
            <View 
              className="w-10 h-10 rounded-full items-center justify-center"
              style={{
                backgroundColor: color,
                borderWidth: 3,
                borderColor: selectedColor === color 
                  ? isDark ? "#fff" : "#1f2937" 
                  : "transparent",
                shadowColor: selectedColor === color ? color : "transparent",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.8,
                shadowRadius: 4,
                elevation: selectedColor === color ? 4 : 0,
              }}
            >
              {selectedColor === color && (
                <View className="w-5 h-5 rounded-full bg-white/80 items-center justify-center">
                  <View 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: color }}
                  />
                </View>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
} 
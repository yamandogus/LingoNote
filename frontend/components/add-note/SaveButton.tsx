import React from "react";
import { Text, TouchableOpacity } from "react-native";

interface SaveButtonProps {
  onPress: () => void;
  isLoading: boolean;
  selectedColor: string;
}

export default function SaveButton({
  onPress,
  isLoading,
  selectedColor,
}: SaveButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isLoading}
      className={`py-4 rounded-xl overflow-hidden ${isLoading ? 'opacity-50' : ''}`}
      style={{
        backgroundColor: selectedColor,
        shadowColor: selectedColor,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 12,
        elevation: 5,
      }}
    >
      <Text className="text-center text-gray-600 dark:text-black text-lg font-bold">
        {isLoading ? "Kaydediliyor..." : "Notu Kaydet"}
      </Text>
    </TouchableOpacity>
  );
} 
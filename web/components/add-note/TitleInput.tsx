import React from "react";
import { Text, TextInput, View } from "react-native";

interface TitleInputProps {
  title: string;
  setTitle: (title: string) => void;
  isFocused: boolean;
  setIsFocused: (focused: { title: boolean; content: boolean }) => void;
  selectedColor: string;
  isDark: boolean;
}

export default function TitleInput({
  title,
  setTitle,
  isFocused,
  setIsFocused,
  selectedColor,
  isDark,
}: TitleInputProps) {
  return (
    <View className="mb-6">
      <Text className="text-sm font-medium mb-1.5 dark:text-gray-300 text-gray-600">
        Başlık
      </Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        className={`rounded-xl px-4 py-3 text-base ${
          isDark ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        }`}
        style={{
          borderWidth: 2,
          borderColor: isFocused ? selectedColor : isDark ? "#374151" : "#e5e7eb",
          shadowColor: isFocused ? `${selectedColor}40` : "transparent",
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 1,
          shadowRadius: 8,
          elevation: isFocused ? 4 : 0,
        }}
        placeholder="Not başlığını yazın"
        placeholderTextColor={isDark ? "#9ca3af" : "#9ca3af"}
        onFocus={() => setIsFocused({ title: true, content: false })}
        onBlur={() => setIsFocused({ title: false, content: false })}
      />
    </View>
  );
} 
import React from "react";
import { Text, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

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
      <View className="flex-row items-center mb-3">
        <Ionicons 
          name="document-text" 
          size={18} 
          color={selectedColor} 
        />
        <Text className="text-sm font-semibold dark:text-gray-300 text-gray-600 uppercase tracking-wider ml-2">
          Başlık
        </Text>
      </View>
      <TextInput
        value={title}
        onChangeText={setTitle}
        className={`rounded-2xl px-5 py-4 text-base font-medium ${
          isDark ? "bg-gray-700/50 text-white" : "bg-gray-50 text-gray-900"
        }`}
        style={{
          borderWidth: 2,
          borderColor: isFocused ? selectedColor : "transparent",
          shadowColor: isFocused ? selectedColor : "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: isFocused ? 0.3 : 0.05,
          shadowRadius: isFocused ? 12 : 8,
          elevation: isFocused ? 6 : 2,
        }}
        placeholder="Başlığınızı buraya yazın..."
        placeholderTextColor={isDark ? "#9ca3af" : "#6b7280"}
        onFocus={() => setIsFocused({ title: true, content: false })}
        onBlur={() => setIsFocused({ title: false, content: false })}
        maxLength={50}
      />
      {title.length > 0 && (
        <Text className={`text-xs mt-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          {title.length}/50 karakter
        </Text>
      )}
    </View>
  );
} 
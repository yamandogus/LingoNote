import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import * as Animatable from "react-native-animatable";

interface ContentInputProps {
  content: string;
  setContent: (content: string) => void;
  isFocused: boolean;
  setIsFocused: (focused: { title: boolean; content: boolean }) => void;
  selectedColor: string;
  isDark: boolean;
}

export default function ContentInput({
  content,
  setContent,
  isFocused,
  setIsFocused,
  selectedColor,
  isDark,
}: ContentInputProps) {
  const [isMicActive, setIsMicActive] = useState(false);

  return (
    <View className="mb-6">
      <Text className="text-sm font-medium mb-1.5 dark:text-gray-300 text-gray-600">
        İçerik
      </Text>
      <TextInput
        value={content}
        onChangeText={setContent}
        multiline
        className={`rounded-xl px-4 py-3 text-base min-h-[150px] ${
          isDark ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        }`}
        style={{
          textAlignVertical: "top",
          borderWidth: 2,
          borderColor: isFocused
            ? selectedColor
            : isDark
              ? "#374151"
              : "#e5e7eb",
          shadowColor: isFocused ? `${selectedColor}40` : "transparent",
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 1,
          shadowRadius: 8,
          elevation: isFocused ? 4 : 0,
        }}
        placeholder="Not içeriğinizi yazın..."
        placeholderTextColor={isDark ? "#9ca3af" : "#9ca3af"}
        onFocus={() => setIsFocused({ title: false, content: true })}
        onBlur={() => setIsFocused({ title: false, content: false })}
      />
      <Animatable.View
        animation={isMicActive ? "pulse" : undefined}
        duration={1000}
        iterationCount={isMicActive ? "infinite" : 0}
        style={{ position: "absolute", right: 16, bottom: 16, zIndex: 10 }}
      >
        <TouchableOpacity
          className={`${isMicActive ? "bg-green-300" : "bg-black dark:bg-white"} p-2 rounded-full`}
          onPress={() => setIsMicActive(!isMicActive)}
        >
          <Ionicons
            size={22}
            color={isDark ? "dark" : `${isMicActive ? "black" : "white"}`}
            name="mic-outline"
          />
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
}

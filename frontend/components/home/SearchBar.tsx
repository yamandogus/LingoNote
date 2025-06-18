import { View, Text, TextInput } from "react-native";

interface SearchBarProps {
  isDark: boolean;
}

export function SearchBar({ isDark }: SearchBarProps) {
  return (
    <View className={`flex-row items-center ${isDark ? 'bg-[#2a2a2a]' : 'bg-white'} rounded-lg px-4 py-3 mb-8 shadow-sm`}>
      <Text className="mr-3 text-xl text-gray-400">🔍</Text>
      <TextInput
        className={`flex-1 text-base ${isDark ? 'text-gray-200' : 'text-gray-700'}`}
        placeholder="Projeler, etkinlikler, etiketler ara"
        placeholderTextColor={isDark ? "#6B7280" : "#9CA3AF"}
      />
    </View>
  );
} 
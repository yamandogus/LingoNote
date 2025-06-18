import { View, Text } from "react-native";

interface HeaderProps {
  isDark: boolean;
}

export function Header({ isDark }: HeaderProps) {
  return (
    <View className="flex-row items-center justify-between mb-8 pt-4">
      <Text className={`text-3xl font-bold ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
        Günaydın, Kristin
      </Text>
    </View>
  );
} 
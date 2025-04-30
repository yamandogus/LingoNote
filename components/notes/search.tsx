import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";

const Search = () => {
  const { colors } = useTheme();
  return (
    <View className="flex-1 bg-white dark:bg-gray-800 mx-4">
      <TextInput
        placeholder="Not Ara"
        placeholderTextColor={colors.text}
        className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg"
      />
      <Ionicons className="absolute right-4 top-0 transform translate-y-1/2" name="search" size={24} color={colors.text} />
      <View className="flex-row items-center justify-between">
        <Text className="text-gray-500 dark:text-gray-400">
            Tüm Notlar
        </Text>
        <Text className="text-gray-500 dark:text-gray-400">
            Öğrenci Notları
        </Text>
        <Text className="text-gray-500 dark:text-gray-400">
            Proje Notları
        </Text>
      </View>
    </View>
  );
};

export default Search;

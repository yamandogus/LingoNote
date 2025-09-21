import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, useColorScheme, TextInput } from "react-native";

const SearchNote = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  return (
    <View
    className={`flex-row items-center justify-between p-1 rounded-2xl ${isDark ? "bg-gray-800" : "bg-gray-300"} mx-2` }
    >
      {/* Search Icon */}
      <Ionicons name="search-outline" size={22} color={isDark ? "#999" : "#333"} />
      {/* Input */}
      <TextInput
      className={`flex-1 ml-2 text-base dark:text-white py-2 text-gray-800 rounded-full ${isDark ? "bg-gray-800" : "bg-gray-300"}`}
        placeholder="Ara..."
        placeholderTextColor={isDark ? "#999" : "#333"}
        value={""}
      />
    </View>
  );
};

export default SearchNote;

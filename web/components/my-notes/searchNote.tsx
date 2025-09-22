import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, useColorScheme, TextInput } from "react-native";

interface SearchNoteProps {
  onSearch: (searchText: string) => void;
  placeholder?: string;
}

const SearchNote = ({ onSearch, placeholder = "Notlarımda ara..." }: SearchNoteProps) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [searchText, setSearchText] = useState("");

  const handleSearchChange = (text: string) => {
    setSearchText(text);
    onSearch(text);
  };

  const clearSearch = () => {
    setSearchText("");
    onSearch("");
  };

  return (
    <View
      className={`flex-row items-center justify-between p-3 rounded-2xl ${isDark ? "bg-gray-800" : "bg-gray-100"} mx-2 mb-4`}
      style={{
        shadowColor: isDark ? "#000" : "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: isDark ? 0.3 : 0.1,
        shadowRadius: 8,
        elevation: 4,
      }}
    >
      {/* Search Icon */}
      <Ionicons 
        name="search-outline" 
        size={20} 
        color={isDark ? "#9CA3AF" : "#6B7280"} 
        style={{ marginRight: 8 }}
      />
      
      {/* Input */}
      <TextInput
        className={`flex-1 text-base py-1 ${isDark ? "text-white" : "text-gray-800"}`}
        placeholder={placeholder}
        placeholderTextColor={isDark ? "#9CA3AF" : "#6B7280"}
        value={searchText}
        onChangeText={handleSearchChange}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
        clearButtonMode="while-editing"
      />
      
      {/* Clear Button */}
      {searchText.length > 0 && (
        <Ionicons 
          name="close-circle" 
          size={20} 
          color={isDark ? "#9CA3AF" : "#6B7280"}
          onPress={clearSearch}
          style={{ marginLeft: 8 }}
        />
      )}
    </View>
  );
};

export default SearchNote;

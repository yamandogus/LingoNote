import React from "react";
import { View, Text, TextInput, SafeAreaView, ScrollView, StatusBar, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Search = () => {
  const { colors } = useTheme();
  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <SafeAreaView className="flex-1 bg-white dark:bg-gray-800" style={{ paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}>
        <View className="flex-1 px-4">
          <View className="relative">
            <TextInput
              placeholder="Not Ara"
              placeholderTextColor={colors.text}
              className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg"
            />
            <Ionicons
              style={{ position: 'absolute', right: 16, top: '50%', transform: [{ translateY: -12 }] }}
              name="search"
              size={24}
              color={colors.text}
            />
          </View>
          
          <View className="flex-row items-center justify-between mt-4">
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
          
          <ScrollView className="flex-1 mt-4">
            {/* İçerik buraya gelecek */}
          </ScrollView>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Search;

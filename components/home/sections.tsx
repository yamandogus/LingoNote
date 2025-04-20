import { router } from "expo-router";
import React from "react";
import { View, Text, Pressable, useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import LinearGradient from "react-native-linear-gradient";

interface Data {
  id: number;
  title: string;
  content: string;
  icon: string;
  router: "/(tabs)/explore" | "/(tabs)/translate";
  bgColor: string;
  darkBgColor: string;
  iconName: string;
}

const sectionsData: Data[] = [
  {
    id: 1,
    title: "Kamera",
    content: "Tara ve çevir",
    icon: "",
    router: "/(tabs)/explore",
    bgColor: "bg-blue-50",
    darkBgColor: "bg-blue-800/30",
    iconName: "camera-outline",
  },
  {
    id: 2,
    title: "Ses",
    content: "Konuş ve anlayacaksın",
    icon: "",
    router: "/(tabs)/translate",
    bgColor: "bg-green-50",
    darkBgColor: "bg-green-800/30",
    iconName: "mic-outline",
  },
  {
    id: 3,
    title: "Çeviri Yapay Zeka",
    content: "Yapay zekayı kolayca kullan",
    icon: "",
    router: "/(tabs)/translate",
    bgColor: "bg-orange-100",
    darkBgColor: "bg-orange-800/30",
    iconName: "sparkles-outline",
  },
];

const Sections = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const gradientColors = isDark 
    ? ['#1f2937', '#374151'] // Koyu gri tonları - dark mode için daha yumuşak
    : ['#fffbe9', '#ffd700']; // Açık mod için orijinal renkler

  return (
    <LinearGradient
      colors={gradientColors}
      className="flex-1 justify-center items-center px-6 py-2"
    >
      <View className="flex-1 p-4 gap-3">
        {sectionsData.map((section) => (
          <Pressable
            key={section.id}
            onPress={() => router.push(section.router)}
            className={`${isDark ? section.darkBgColor : section.bgColor} p-4 rounded-2xl flex-row items-center justify-between`}
          >
            <View className="flex-row items-center">
              <View className="bg-white dark:bg-gray-700 h-10 w-10 rounded-full items-center justify-center mr-4">
                <Ionicons
                  name={section.iconName as any}
                  size={20}
                  color={isDark ? "#e5e7eb" : "black"}
                />
              </View>
              <View>
                <Text className="font-semibold dark:text-gray-200">{section.title}</Text>
                <Text className="text-gray-600 dark:text-gray-400 text-sm">{section.content}</Text>
              </View>
            </View>
            <Ionicons 
              name="chevron-forward-outline" 
              size={20} 
              color={isDark ? "#e5e7eb" : "black"} 
            />
          </Pressable>
        ))}
      </View>
    </LinearGradient>
  );
};

export default Sections;

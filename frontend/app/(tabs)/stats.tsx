import { NoteCard } from "@/components/my-notes/NoteCard";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState, useEffect } from "react";
import { 
  Platform, 
  ScrollView, 
  Text, 
  useColorScheme, 
  View,
} from "react-native";

export default function StatsScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";


  return (
    <View className="flex-1 ">
      <LinearGradient
        colors={isDark ? ['#0f0c29', '#120f31', '#16162e'] : ['#f8f9fa', '#e9ecef', '#dee2e6']}
        className="flex-1"
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {Platform.OS === 'android' && <View className="h-8" />}
        <ScrollView
          className="flex-1 px-4 pt-6"
          contentContainerStyle={{ paddingBottom: 120 }}
        >
        {/* Header */}
        <View className="px-6 pt-6 pb-4">
          <Text className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Not Takibi
          </Text>
          <Text className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'} mt-1`}>
            Yaklaşan ve süresi dolan notlarınız
          </Text>
        </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

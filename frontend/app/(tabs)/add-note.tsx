import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { ScrollView, Text, useColorScheme, View } from "react-native";

export default function AddNoteScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  return (
    <View className="flex-1">
      <LinearGradient
       colors={isDark ? ['#0f0c29', '#120f31', '#16162e'] : ['#e0e0e0', '#bdbdbd', '#757575']}
       style={{ flex: 1 }}
       start={{ x: 0, y: 0 }}
       end={{ x: 1, y: 1 }}
      >
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <Text>Not Ekleme Sayfası</Text>
      </ScrollView>
      </LinearGradient>
    </View>
  );
}

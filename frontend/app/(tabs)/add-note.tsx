import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { ScrollView, Text, View } from "react-native";

export default function AddNoteScreen() {
  return (
    <View className="flex-1">
      <LinearGradient
       colors={['#0f0c29', '#302b63', '#24243e']}
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

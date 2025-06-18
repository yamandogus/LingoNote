import { Stack } from "expo-router";
import React from "react";
import { ScrollView, Text, View } from "react-native";

export default function MyNotesScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <Text>Notlarım Sayfası</Text>
      </ScrollView>
    </View>
  );
}

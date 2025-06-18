import React from "react";
import { ScrollView, Text, View } from "react-native";

export default function StatsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <Text>İstatistikler Sayfası</Text>
      </ScrollView>
    </View>
  );
}

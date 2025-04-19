import React from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const Translate = () => {
  return (
    <SafeAreaProvider className="flex-1">
      <ScrollView className="flex-1">
        <SafeAreaView>
          <View className="flex-1 p-4">
            <Text className="font-bold text-2xl text-center bg-yellow-400 border-x-2 py-2">
              Translate
            </Text>
          </View>
        </SafeAreaView>
      </ScrollView>
    </SafeAreaProvider>
  );
};

export default Translate;

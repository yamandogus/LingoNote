import TextComp from "@/components/translate/textComp";
import React from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const Translate = () => {
  return (
    <SafeAreaProvider className="flex-1">
      <ScrollView className="flex-1 bg-white dark:bg-gray-800 pt-4">
        <SafeAreaView>
          <View className="flex-1 mx-4">
            <Text className="text-center font-bold text-2xl rounded-lg bg-[#FDE68A] border-l-2 border-r-2 dark:border-white py-2 px-4">
              Çeviri
            </Text>
          </View>
           <View className="flex-1 mx-5 mt-4">
            <TextComp />
           </View>
        </SafeAreaView>
      </ScrollView>
    </SafeAreaProvider>
  );
};

export default Translate;

import React from "react";
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import NoteAdd from "@/components/notes/noteAdd";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const NoteAdded = () => {
  const router = useRouter();
  
  return (
    <SafeAreaProvider className="flex-1">
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <ScrollView className="flex-1 bg-white dark:bg-gray-800">
        <SafeAreaView
          style={{
            paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
          }}
          className="flex-1"
        >
          <View className="flex-1 bg-white dark:bg-gray-800">
            <NoteAdd />
          </View>
          <View className="flex-1 bg-white dark:bg-gray-800 mx-4">
            <TouchableOpacity
              onPress={() => router.push("/(tabs)/notes")}
              className="mb-10 bg-blue-500 p-4 rounded-xl flex-row items-center justify-center"
            >
              <Ionicons name="book" size={20} color="white" />
              <Text className="text-white text-center font-bold text-lg ml-2">
                Notlarıma Git
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ScrollView>
    </SafeAreaProvider>
  );
};

export default NoteAdded;

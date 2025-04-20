import { View, Text, ScrollView} from "react-native";
import { SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";

export default function ExploreScreen() {
  return (
    <SafeAreaProvider className="flex-1">
      <ScrollView className="flex-1 bg-white dark:bg-gray-800">
        <SafeAreaView>
          <View className="flex-1 p-4">
            <Text className="font-bold text-2xl text-center bg-yellow-400 dark:bg-yellow-600 border-x-2 py-2 dark:text-white">
              📝 Notlarım
            </Text>
          </View>
        </SafeAreaView>
      </ScrollView>
    </SafeAreaProvider>
  );
}


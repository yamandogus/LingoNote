import { useNavigation } from "expo-router";
import { View, Text, TouchableOpacity, Image } from "react-native";

interface WelcomeCardProps {
  isDark: boolean;
}

export function WelcomeCard({ isDark }: WelcomeCardProps) {
  const navigation = useNavigation() as any;

  return (
    <View
      className={`flex-row items-center justify-between rounded-2xl mb-6 py-4 px-2 ${isDark ? "bg-blue-900" : "bg-blue-100"}`}
    >
      <View className="flex-1 mr-2">
        <Text
          className={`text-md font-bold mb-2 ${isDark ? "text-blue-100" : "text-blue-900"}`}
        >
          LingoNote ile üretkenliğini artır!
        </Text>
        <Text
          className={`text-sm mb-3 ${isDark ? "text-blue-200" : "text-blue-800"}`}
        >
          Tüm notların tek yerde, her zaman yanında.
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("(tabs)", { screen: "add-note" })}
          className={`px-5 py-2 w-[150px] rounded-full ${isDark ? "bg-blue-700" : "bg-blue-500"}`}
        >
          <Text className="text-white font-semibold">Hemen Not Ekle </Text>
        </TouchableOpacity>
      </View>
      <Image
        source={require("../../assets/images/undraw_book-writer_ri5u.png")}
        style={{ width: 100, height: 100, borderRadius: 16 }}
      />
    </View>
  );
}

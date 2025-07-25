import { useNavigation } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";

interface EmptyNotesProps {
  isDark: boolean;
}

export function EmptyNotes({ isDark }: EmptyNotesProps) {
 const navigation = useNavigation() as any;


  return (
    <View className="flex-1 items-center justify-center py-16">
      <Text className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Henüz hiç notun yok!</Text>
      <Text className={`text-base mb-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Başlamak için hemen bir not ekle.</Text>
      <TouchableOpacity
         onPress={() => navigation.navigate("(tabs)", { screen: "add-note"})}
     
        className={`px-8 py-3 rounded-full ${isDark ? 'bg-blue-700' : 'bg-blue-500'}`}
      >
        <Text className="text-white text-base font-semibold">+ Not Ekle</Text>
      </TouchableOpacity>
    </View>
  );
} 
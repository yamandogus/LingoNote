import { View, Text, ScrollView } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { favoriteStore } from "@/store/favoriteStore";
import NoteList from "@/components/notes/note";




const Favorites = () => {
  const { favorites } = favoriteStore();




  return (
    <SafeAreaProvider className="flex-1">
      <ScrollView className="flex-1 bg-white dark:bg-gray-800 pt-4">
        <SafeAreaView>
          <View className="flex-1 mx-4">
            <Text className="text-center font-bold text-2xl rounded-lg bg-[#FDE68A] border-l-2 border-r-2 dark:border-white py-2 px-4">
              Favori Notlarım
            </Text>
          </View>
           {
            favorites.map((favorite:any) => (
              <NoteList note={favorite} title="Favori Notlarım" />
            ))
           }
        </SafeAreaView>
      </ScrollView>
    </SafeAreaProvider>
  );
};

export default Favorites;

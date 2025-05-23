import { View, Text, ScrollView, StatusBar } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import FavoritesComp from "@/components/favori/favorites";


const Favorites = () => {

  const [modalVisible, setModalVisible] = useState(false);
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [noteId, setNoteId] = useState("");




  return (
    <SafeAreaProvider className="flex-1">
            <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <ScrollView className="flex-1 bg-white dark:bg-gray-800 pt-4">
        <SafeAreaView>
          <View className="flex-1 mx-4">
            <Text className="text-center font-bold text-2xl rounded-lg bg-[#FDE68A] border-l-2 border-r-2 dark:border-white py-2 px-4">
              Favori Notlarım
            </Text>
          </View>
           <FavoritesComp 
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            category={category}
            setCategory={setCategory}
            content={content}
            setContent={setContent}
            title={title}
            setTitle={setTitle}
            noteId={noteId}
           />
        </SafeAreaView>
      </ScrollView>
    </SafeAreaProvider>
  );
};

export default Favorites;

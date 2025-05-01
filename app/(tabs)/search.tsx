import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Platform,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { noteStore, Note } from "@/store/noteStore";
import UpdateNote from "@/components/notes/updateNote";
import LottieView from "lottie-react-native";

interface SearchProps {
  handleRemove: (id: string) => void;
  setModalVisible: (visible: boolean) => void;
  modalVisible: boolean;
  category: string;
  setCategory: (category: string) => void;
  content: string;
  setContent: (content: string) => void;
  title: string;
  setTitle: (title: string) => void;
  noteId: string;
}

const Search = ({ handleRemove }: SearchProps) => {
  const { colors } = useTheme();
  const [search, setSearch] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);
  const { notes: notesFromStore } = noteStore();
  useEffect(() => {
    setNotes(notesFromStore);
  }, [notesFromStore]);

  const animationRef1 = useRef<LottieView>(null);

  useEffect(() => {
    if (animationRef1.current) {
      animationRef1.current.play();
    }
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <SafeAreaView
        className="flex-1 bg-white dark:bg-gray-800"
        style={{
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        }}
      >
        <View className="flex-1 px-4">
          <View className="relative">
            <TextInput
              placeholder="Not Ara"
              placeholderTextColor={"#000"}
              className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mt-4 text-black dark:text-white font-bold"
              value={search}
              onChangeText={setSearch}
            />
            <Ionicons
              style={{
                position: "absolute",
                right: 16,
                top: "60%",
                transform: [{ translateY: -12 }],
              }}
              name="search"
              size={24}
              color={colors.text}
            />
          </View>

          <ScrollView className="flex-1 mt-4">
            {search.length > 2 ? (
              notes
                .filter(
                  (note) =>
                    note.title.toLowerCase().includes(search.toLowerCase()) ||
                    note.category.toLowerCase().includes(search.toLowerCase())
                )
                .map((note) => (
                  <View
                    key={note.id}
                    className="flex-1 bg-gray-200 dark:bg-gray-200 p-4 rounded-lg"
                  >
                    <View className="flex-row justify-between mb-4">
                      <Text className="text-lg font-bold">{note.title}</Text>
                      <TouchableOpacity
                        className="bg-gray-200 dark:bg-gray-800 p-2 rounded-lg"
                        onPress={() => handleRemove(note.id)}
                      >
                        <Ionicons
                          name="heart-dislike"
                          size={24}
                          color="#ef4444"
                        />
                      </TouchableOpacity>
                    </View>

                    <View className="flex-col gap-2 mb-4">
                      <Text className="text-sm text-gray-500">
                        {note.content}
                      </Text>
                      <Text className="text-sm text-gray-900 font-bold">
                        Kategori: {note.category}
                      </Text>
                    </View>
                  </View>
                ))
            ) : (
              <View className="flex-1 items-center justify-center mt-10 bg-gray-100 dark:bg-gray-200 py-4 px-1 rounded-lg">
                <Text className="text-2xl font-bold">Notlarınızı arayın</Text>
                <View className="w-full h-40">
                  <LottieView
                    ref={animationRef1}
                    style={{ width: "30%", height: 150, alignSelf: "center" }}
                    source={require("../../assets/search.json")}
                    autoPlay={false}
                    loop
                    speed={1}
                    resizeMode="cover"
                  />
                </View>
                <Text className="text-md text-gray-500 dark:text-gray-700">
                  Notlarınızı kategori veya başlık aracılığıyla arayabilirsiniz
                </Text>
              </View>
            )}
          </ScrollView>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Search;

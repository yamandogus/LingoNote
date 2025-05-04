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
  useColorScheme,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { noteStore, Note } from "@/store/noteStore";
import UpdateNote from "@/components/notes/updateNote";
import LottieView from "lottie-react-native";
import { favoriteStore } from "@/store/favoriteStore";
import NoteList from "@/components/notes/note";

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

const colorOptions = [
  {
    id: 0,
    name: "Mavi",
    color: "bg-sky-400",
    borderColor: "border-sky-500",
    lightText: "text-white",
    darkBg: "dark:bg-sky-500",
  },
  {
    id: 1,
    name: "Yeşil",
    color: "bg-emerald-400",
    borderColor: "border-emerald-500",
    lightText: "text-white",
    darkBg: "dark:bg-emerald-500",
  },
  {
    id: 2,
    name: "Mor",
    color: "bg-violet-400",
    borderColor: "border-violet-500",
    lightText: "text-white",
    darkBg: "dark:bg-violet-500",
  },
];


const defaultLight = "bg-white";
const defaultDark = "dark:bg-gray-800";
const defaultTextLight = "text-gray-800";
const defaultTextDark = "dark:text-white";

const Search = ({ handleRemove }: SearchProps) => {
  const { colors } = useTheme();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [modalVisible, setModalVisible] = useState(false);
  const [noteTitle, setNoteTitle] = useState("");
  const [selectedNoteId, setSelectedNoteId] = useState("");
  const [category, setCategory] = useState("Genel Notlar");
  const [content, setContent] = useState("");
  const [noteToDeleteId, setNoteToDeleteId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);
  const { notes: notesFromStore, updateNote, toggleFavorite: toggleNoteFavorite, deleteNote } = noteStore();
  const { addFavorite, toggleFavorite, deleteFavorite } = favoriteStore();
  
  useEffect(() => {
    setNotes(notesFromStore);
  }, [notesFromStore]);

  const animationRef1 = useRef<LottieView>(null);

  useEffect(() => {
    if (animationRef1.current) {
      animationRef1.current.play();
    }
  }, []);

  const handleColorChange = (noteId: string, color: string, darkBg: string) => {
    updateNote(noteId, {
      backgroundColor: color,
      darkBackgroundColor: darkBg,
    });
  };
  
  const handleToggleFavorite = (noteId: string) => {
    const currentNote = notes.find(n => n.id === noteId);
    
    if (currentNote) {
      if (!currentNote.isFavorite) {
        addFavorite(currentNote);
        toggleNoteFavorite(noteId);
      } else {
        toggleNoteFavorite(noteId);
        deleteFavorite(noteId);
      }
    }
  };

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
        <View className="flex-1">
          <View className="relative">
            <TextInput
              placeholder="Not Ara"
              placeholderTextColor={isDark ? "white" : "black"}
              className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mt-4 text-black dark:text-white font-bold mx-4"
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
                    className={`${note.backgroundColor || defaultLight} ${
                      note.darkBackgroundColor || defaultDark
                    } rounded-2xl p-6 shadow-lg border ${
                      note.backgroundColor
                        ? note.backgroundColor === "bg-violet-400"
                          ? "border-violet-500"
                          : note.backgroundColor === "bg-sky-400"
                          ? "border-sky-500"
                          : "border-emerald-500"
                        : "border-gray-200 dark:border-gray-700"
                    } shadow-[0_8px_30px_rgb(0,0,0,0.12)] mx-2 mb-4`}
                  >
                    <View className="flex-row justify-between items-start mb-4">
                      <Text
                        className={`text-xl font-bold ${
                          note.backgroundColor === "bg-yellow-400"
                            ? "text-gray-800"
                            : note.backgroundColor
                            ? "text-white"
                            : defaultTextLight
                        } ${defaultTextDark}`}
                      >
                        {note.title}
                      </Text>
                      <TouchableOpacity
                        onPress={() => handleToggleFavorite(note.id)}
                      >
                        <Ionicons
                          name={note.isFavorite ? "heart" : "heart-outline"}
                          size={24}
                          color={note.isFavorite ? "#ec0707" : (note.backgroundColor ? "white" : "#4B5563")}
                        />
                      </TouchableOpacity>
                    </View>

                    <Text
                      className={`${
                        note.backgroundColor === "bg-yellow-400"
                          ? "text-gray-800"
                          : note.backgroundColor
                          ? "text-gray-100"
                          : defaultTextLight
                      } ${defaultTextDark} mb-4 text-base leading-relaxed`}
                    >
                      {note.content}
                    </Text>

                    <Text
                      className={`text-sm mb-2 ${
                        note.backgroundColor === "bg-violet-400"
                          ? "text-white"
                          : note.backgroundColor
                          ? "text-white"
                          : "text-gray-500"
                      } dark:text-gray-400`}
                    >
                      Kategori: {note.category}
                    </Text>

                    <View className="flex-row items-center justify-between mt-2">
                      <View className="flex-row gap-2">
                        {colorOptions.map((option) => (
                          <TouchableOpacity
                            key={option.id}
                            onPress={() =>
                              handleColorChange(note.id, option.color, option.darkBg)
                            }
                            className={`${option.color} ${
                              option.darkBg
                            } rounded-full w-6 h-6 flex items-center justify-center border ${
                              note.backgroundColor === option.color
                                ? "border-2 border-white shadow-md"
                                : "border border-white shadow-sm"
                            }`}
                            accessibilityLabel={`${option.name} renk seçeneği`}
                          />
                        ))}
                        <TouchableOpacity
                          onPress={() => handleColorChange(note.id, "", "")}
                          className={`bg-white dark:bg-gray-800 rounded-full w-6 h-6 flex items-center justify-center border ${
                            !note.backgroundColor
                              ? "border-2 border-blue-500 shadow-md"
                              : "border border-white shadow-sm"
                          }`}
                          accessibilityLabel="Varsayılan renk seçeneği"
                        />
                      </View>

                      <View className="flex-row gap-2">
                        <TouchableOpacity
                          style={{ borderWidth: 0.5, borderColor: "white" }}
                          onPress={() => {
                            setModalVisible(true);
                            setContent(note.content);
                            setNoteTitle(note.title);
                            setSelectedNoteId(note.id);
                            setCategory(note.category);
                          }}
                          className="bg-blue-500 dark:bg-blue-600 rounded-lg px-4 py-2 flex-row items-center gap-1"
                        >
                          <Ionicons
                            name="create-outline"
                            size={16}
                            color={note.backgroundColor ? "white" : "#4B5563"}
                          />
                          <Text
                            className={`${
                              note.backgroundColor ? "text-white" : "text-gray-800"
                            } ${
                              note.backgroundColor === "bg-yellow-400"
                                ? "text-gray-800"
                                : "text-white"
                            } font-medium `}
                          >
                            Düzenle
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => setNoteToDeleteId(note.id)}
                          className="bg-red-500 dark:bg-red-600 rounded-lg px-4 py-2 flex-row items-center gap-1"
                        >
                          <Ionicons name="trash-outline" size={16} color="white" />
                          <Text className="text-white font-medium">Sil</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                ))
            ) : (
              <View className="flex-1 items-center justify-center mt-10 bg-gray-100 dark:bg-gray-200 py-4 mx-2 px-1 rounded-lg">
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
        
        <UpdateNote
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          category={category}
          setCategory={setCategory}
          content={content}
          setContent={setContent}
          title={noteTitle}
          setTitle={setNoteTitle}
          noteId={selectedNoteId}
        />
        
        <Modal
          animationType="slide"
          transparent={true}
          visible={noteToDeleteId !== null}
          onRequestClose={() => setNoteToDeleteId(null)}
        >
          <View className="flex-1 justify-center items-center bg-black/50">
            <View className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-[90%] max-w-md shadow-2xl">
              <View className="flex-row items-center gap-3 mb-4">
                <View className="bg-red-100 dark:bg-red-900 p-3 rounded-full">
                  <Ionicons name="warning" size={24} color="#EF4444" />
                </View>
                <Text className="text-xl font-bold text-gray-900 dark:text-white">Notu Sil</Text>
              </View>
              <Text className="text-gray-600 dark:text-gray-300 mb-6">
                Bu notu silmek istediğinize emin misiniz? Bu işlem geri alınamaz.
              </Text>
              <View className="flex-row justify-end gap-3">
                <TouchableOpacity
                  className="bg-gray-100 dark:bg-gray-700 rounded-xl px-5 py-3"
                  onPress={() => setNoteToDeleteId(null)}
                >
                  <Text className="text-gray-700 dark:text-gray-300 font-medium">İptal</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="bg-red-500 dark:bg-red-600 rounded-xl px-5 py-3"
                  onPress={() => {
                    if (noteToDeleteId) deleteNote(noteToDeleteId);
                    setNoteToDeleteId(null);
                  }}
                >
                  <Text className="text-white font-medium">Sil</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Search;

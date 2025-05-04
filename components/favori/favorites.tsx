import { favoriteStore } from "@/store/favoriteStore";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import UpdateNote from "../notes/updateNote";
import { noteStore } from "@/store/noteStore";

interface FavoritesCompProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  category: string;
  setCategory: (category: string) => void;
  content: string;
  setContent: (content: string) => void;
  title: string;
  setTitle: (title: string) => void;
  noteId: string;
}

const FavoritesComp = ({
  modalVisible,
  setModalVisible,
  category,
  setCategory,
  content,
  setContent,
  title,
}: FavoritesCompProps) => {
  const { favorites, deleteFavorite } = favoriteStore();
  const [noteToDeleteId, setNoteToDeleteId] = useState<string | null>(null);
  const [noteTitle, setNoteTitle] = useState<string>("");
  const [selectedNoteId, setSelectedNoteId] = useState<string>("");
  const { deleteNote, updateNote } = noteStore();
  const { updateFavorite } = favoriteStore();

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

  const handleColorChange = (noteId: string, color: string, darkBg: string) => {
    updateNote(noteId, {
      backgroundColor: color,
      darkBackgroundColor: darkBg,
    });

    updateFavorite(noteId, {
      backgroundColor: color,
      darkBackgroundColor: darkBg,
    });
  };

  const handleToggleFavorite = (noteId: string) => {
    updateNote(noteId, { isFavorite: false });
    deleteFavorite(noteId);
  };

  const defaultLight = "bg-white";
  const defaultDark = "dark:bg-gray-800";
  const defaultTextLight = "text-gray-800";
  const defaultTextDark = "dark:text-white";

  const EmptyNote = ({ categoryTitle }: { categoryTitle: string }) => {
    return (
      <View className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 items-center justify-center">
        <Text className="text-gray-500 dark:text-gray-400 text-center text-lg">
          {categoryTitle ? `${categoryTitle} kategorisinde` : "Favorilerde"} hiç
          not bulunmuyor.
        </Text>
      </View>
    );
  };

  return (
    <>
      <View className="space-y-4 mx-2 mt-4 gap-4">
        {favorites.length > 0 ? (
          favorites.map((note) => (
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
              } shadow-[0_8px_30px_rgb(0,0,0,0.12)]`}
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
                  <Ionicons name="heart" size={24} color="red" />
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
                    onPress={() => {
                      setNoteToDeleteId(note.id);
                    }}
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
          <>
          <EmptyNote categoryTitle={title} />
          </>
        )}
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
                <Text className="text-xl font-bold text-gray-900 dark:text-white">
                  Notu Sil
                </Text>
              </View>
              <Text className="text-gray-600 dark:text-gray-300 mb-6">
                Bu notu silmek istediğinize emin misiniz? Bu işlem geri
                alınamaz.
              </Text>
              <View className="flex-row justify-end gap-3">
                <TouchableOpacity
                  className="bg-gray-100 dark:bg-gray-700 rounded-xl px-5 py-3"
                  onPress={() => setNoteToDeleteId(null)}
                >
                  <Text className="text-gray-700 dark:text-gray-300 font-medium">
                    İptal
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="bg-red-500 dark:bg-red-600 rounded-xl px-5 py-3"
                  onPress={() => {
                    if (noteToDeleteId) {
                      deleteNote(noteToDeleteId);
                      deleteFavorite(noteToDeleteId);
                    }
                    setNoteToDeleteId(null);
                  }}
                >
                  <Text className="text-white font-medium">Sil</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
};

export default FavoritesComp;

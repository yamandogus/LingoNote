import { favoriteStore } from "@/store/favoriteStore";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import UpdateNote from "../notes/updateNote";

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

const FavoritesComp = ({modalVisible, setModalVisible, category, setCategory, content, setContent, title, setTitle, noteId}: FavoritesCompProps) => {
  const { favorites, deleteFavorite } = favoriteStore();
  const [selectedNote, setSelectedNote] = useState<{id: string, title: string} | null>(null);

  const handleRemove = (id: string) => {
    deleteFavorite(id);
  };

  const handleEdit = (note: {id: string, title: string}) => {
    setSelectedNote(note);
    setModalVisible(true);
  };

  return (
    <View className="flex-1 bg-white dark:bg-gray-800 mt-4">
      {favorites.map((favorite) => (
        <View
          key={favorite.id}
          className="flex-1 bg-gray-200 dark:bg-gray-200 mx-4 p-4 rounded-lg mb-4"
        >
          <View className="flex-row justify-between mb-4">
            <Text className="text-lg font-bold">{favorite.title}</Text>
            <TouchableOpacity
              onPress={() => handleRemove(favorite.id)}
            >
              <Ionicons name="heart-dislike" size={24} color="#ef4444" />
            </TouchableOpacity>
          </View>

          <View className="flex-col gap-2 mb-4">
            <Text className="text-sm text-gray-500">{favorite.content}</Text>
            <Text className="text-sm text-gray-900 font-bold">Kategori: {favorite.category}</Text>
          </View>
          <View className="flex-row justify-end gap-2">
            <TouchableOpacity 
              onPress={() => handleEdit({id: favorite.id, title: favorite.title})} 
              className="bg-blue-500 text-white py-2 px-4 rounded-lg"
            >
              <Text className="text-sm font-bold">Düzenle</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => handleRemove(favorite.id)} 
              className="bg-red-500 text-white py-2 px-4 rounded-lg"
            >
              <Text className="text-sm font-bold">Sil</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
      {selectedNote && (
        <UpdateNote
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          category={category}
          setCategory={setCategory}
          content={content}
          setContent={setContent}
          title={selectedNote.title}
          setTitle={setTitle}
          noteId={selectedNote.id}
        />
      )}
    </View>
  );
};

export default FavoritesComp;

import { favoriteStore } from "@/store/favoriteStore";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
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

  const handleRemove = (id: string) => {
    deleteFavorite(id);
  };

  return (
    <View className="flex-1 bg-white dark:bg-gray-800 mt-4">
      {favorites.map((favorite) => (
        <View
          key={favorite.id}
          className="flex-1 bg-gray-200 dark:bg-gray-200 mx-4 p-4 rounded-lg"
        >
          <View className="flex-row justify-between mb-4">
            <Text className="text-lg font-bold">{favorite.title}</Text>
            <TouchableOpacity
              className="bg-gray-200 dark:bg-gray-800 p-2 rounded-lg"
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
            <TouchableOpacity onPress={() => setModalVisible(true)} className="bg-blue-500 text-white py-2 px-4 rounded-lg">
              <Text className="text-sm font-bold">Düzenle</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleRemove(favorite.id)} className="bg-red-500 text-white py-2 px-4 rounded-lg">
              <Text className="text-sm font-bold">Sil</Text>
            </TouchableOpacity>
          </View>
          <UpdateNote
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              category={category}
              setCategory={setCategory}
              content={content}
              setContent={setContent}
              title={favorite.title}
              setTitle={setTitle}
              noteId={favorite.id}
            />
        </View>
      ))}
    </View>
  );
};

export default FavoritesComp;

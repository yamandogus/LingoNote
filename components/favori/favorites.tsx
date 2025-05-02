import { favoriteStore } from "@/store/favoriteStore";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
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

const FavoritesComp = ({
  modalVisible,
  setModalVisible,
  category,
  setCategory,
  content,
  setContent,
  title,
  setTitle,
  noteId,
}: FavoritesCompProps) => {
  const { favorites, deleteFavorite } = favoriteStore();
  const [selectedNote, setSelectedNote] = useState<{
    id: string;
    title: string;
  } | null>(null);
  const [favoriteToDeleteId, setFavoriteToDeleteId] = useState<string | null>(null);

  const handleRemove = (id: string) => {
    deleteFavorite(id);
  };

  const handleEdit = (note: { id: string; title: string }) => {
    setSelectedNote(note);
    setModalVisible(true);
  };

  const handleDelete = (id: string) => {
    deleteFavorite(id);
    setModalVisible(false);
    deleteFavorite(id);
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
            <TouchableOpacity onPress={() => handleRemove(favorite.id)}>
              <Ionicons name="heart-dislike" size={24} color="#ef4444" />
            </TouchableOpacity>
          </View>

          <View className="flex-col gap-2 mb-4">
            <Text className="text-sm text-gray-500">{favorite.content}</Text>
            <Text className="text-sm text-gray-900 font-bold">
              Kategori: {favorite.category}
            </Text>
          </View>
          <View className="flex-row justify-end gap-2">
            <TouchableOpacity
              onPress={() =>
                handleEdit({ id: favorite.id, title: favorite.title })
              }
              className="bg-blue-500 text-white py-2 px-4 rounded-lg"
            >
              <Text className="text-sm font-bold">Düzenle</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setFavoriteToDeleteId(favorite.id)}
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={favoriteToDeleteId !== null}
        onRequestClose={() => setFavoriteToDeleteId(null)}
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
              Bu notu silmek istediğinize emin misiniz? Bu işlem geri alınamaz.
            </Text>
            <View className="flex-row justify-end gap-3">
              <TouchableOpacity
                className="bg-gray-100 dark:bg-gray-700 rounded-xl px-5 py-3"
                onPress={() => setFavoriteToDeleteId(null)}
              >
                <Text className="text-gray-700 dark:text-gray-300 font-medium">
                  İptal
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-red-500 dark:bg-red-600 rounded-xl px-5 py-3"
                onPress={() => {
                  if (favoriteToDeleteId) deleteFavorite(favoriteToDeleteId);
                  setFavoriteToDeleteId(null);
                }}
              >
                <Text className="text-white font-medium">Sil</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default FavoritesComp;

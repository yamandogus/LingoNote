import React from "react";
import { Modal, View, Text, TouchableOpacity, TextInput } from "react-native";
import Sections from "./sections";
import { noteStore } from "@/store/noteStore";

interface ModalProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  category: string;
  setCategory: (category: string) => void;
  title:string,
  content:string,
  setContent?: (content: string) => void,
  setTitle?: (title: string) => void,
  noteId?: string
}

const UpdateNote = ({
  modalVisible,
  setModalVisible,
  category,
  setCategory,
  title,
  content,
  setContent,
  setTitle,
  noteId
}: ModalProps) => {
  const { updateNote } = noteStore();
  
  const handleUpdate = () => {
    if (noteId) {
      updateNote(noteId, {
        title: title,
        content: content,
        category: category
      });
      setModalVisible(false);
    }
  };
  
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View className="flex-1 w-full items-center justify-center bg-black/50">
          <View className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-[92%] h-[80%] shadow-lg">
            <Text className="text-gray-800 mb-2 text-lg font-medium dark:text-gray-100">
              Notunuzu kaydedin
            </Text>
            <View className="flex flex-col gap-1">
              <Text className="text-dark font-bold dark:text-white">
                {" "}
                Başlık
              </Text>
              <TextInput
                placeholder="Başlık giriniz..."
                placeholderTextColor="#9CA3AF"
                value={title}
                onChangeText={setTitle}
                className="bg-gray-100 p-4 rounded-xl mb-1 border border-gray-200 dark:bg-gray-700 dark:text-white text-base min-h-100"
              />
            </View>
            <View className="flex flex-col gap-1 mt-2">
              <Text className="text-dark font-bold dark:text-white">
                {" "}
                İçerik
              </Text>
              <TextInput
                className="bg-gray-100 p-4 rounded-xl mb-1 border border-gray-200 dark:bg-gray-700 dark:text-white text-base min-h-100"
                placeholder="Notunuzu giriniz..."
                placeholderTextColor="#9CA3AF"
                multiline
                value={content}
                onChangeText={setContent}
                textAlignVertical="top"
                numberOfLines={10}
                style={{ height: 200 }}
              />
            </View>
            <View className="mt-4">
              <Text className="text-dark font-bold dark:text-white">
                Kotegori
              </Text>
              <Sections category={category} setCategory={setCategory} />
            </View>
            <TouchableOpacity
              onPress={handleUpdate}
              className="bg-blue-500 dark:bg-blue-600 p-4 rounded-xl mt-4 absolute bottom-3 left-0 right-0 mx-4"
            >
              <Text className="font-medium text-white text-center text-lg">
                Güncelle
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default UpdateNote;

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  Modal,
  Alert,
} from "react-native";
import Sections from "../notes/sections";

const textComp = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [category, setCategory] = useState("Genel Notlarım");
  return (
    <View className="flex-1 bg-white dark:bg-gray-800 flex-col gap-4 p-4">
      <TextInput
        className="bg-gray-50 p-4 min-h-60 rounded-xl mb-2 border border-gray-200 text-gray-800 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 focus:border-blue-500 shadow-lg"
        placeholder="Notunuzu giriniz..."
        placeholderTextColor="#9CA3AF"
        multiline
        textAlignVertical="top"
        numberOfLines={8}
      />
      <TouchableOpacity className="bg-blue-500 dark:bg-blue-600 p-4 rounded-xl mb-2">
        <Text className="font-medium text-white text-center text-lg">
          Çeviri
        </Text>
      </TouchableOpacity>
      <TextInput
        className="bg-gray-50 p-4 min-h-60 rounded-xl mb-2 border border-gray-200 text-gray-800 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 focus:border-blue-500 shadow-lg"
        placeholder="Çeviri sonucunu göreceksiniz..."
        placeholderTextColor="#9CA3AF"
        multiline
        textAlignVertical="top"
        numberOfLines={8}
      />
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
            <View className="shadow-lg">
              <TextInput
                className="bg-gray-50 p-4 min-h-48 rounded-xl mb-4 border border-gray-200 text-gray-800 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                placeholder="Notunuzu giriniz..."
                placeholderTextColor="#9CA3AF"
                multiline
                textAlignVertical="top"
                numberOfLines={6}
              />
            </View>
            <Sections category={category} setCategory={setCategory} />
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              className="bg-blue-500 dark:bg-blue-600 p-4 rounded-xl mt-4 absolute bottom-3 left-0 right-0 mx-4"
            >
              <Text className="font-medium text-white text-center text-lg">
                Notlarıma Ekle
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        className="bg-blue-500 dark:bg-blue-600 p-4 rounded-xl mt-2"
      >
        <Text className="font-medium text-white text-center text-lg">
          Notlarıma Ekle
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default textComp;

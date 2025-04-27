import "react-native-get-random-values";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import Sections from "./sections";
import { noteStore } from "@/store/noteStore";
import { v4 as uuidv4 } from "uuid";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const NoteSchema = Yup.object().shape({
  title: Yup.string().required("Başlık gerekli"),
  content: Yup.string().required("Not içeriği gerekli"),
});

const NoteAdd = () => {
  const [category, setCategory] = useState("Genel Notlar");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { addNote } = noteStore();
  const id = uuidv4();

  const handleAddNote = () => {
    if (title && content) {
      addNote({
        id: id,
        title: title,
        content: content,
        category: category,
      });
      Alert.alert("Başarılı", "Notunuz başarıyla kaydedildi", [
        {
          text: "Tamam",
          onPress: () => {
            setTitle("");
            setContent("");
          },
        },
      ]);
    } else {
      Alert.alert("Hata", "Lütfen tüm alanları doldurunuz");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <ScrollView className="flex-1 px-4">
        <Formik
          initialValues={{ title: "", content: "" }}
          validationSchema={NoteSchema}
          onSubmit={() => {}}
        >
          {({ handleChange, handleSubmit, values, errors, touched }) => (
            <View className="mt-6">
              <View className="mb-4">
                <View className="flex-row items-center mb-2">
                  <Ionicons name="pencil" size={20} color="#4B5563" />
                  <Text className="text-gray-700 ml-2 font-medium dark:text-white text-lg">
                    Başlık
                  </Text>
                </View>
                <TextInput
                  className="bg-gray-100 p-4 rounded-xl mb-1 border border-gray-200 dark:bg-gray-700 dark:text-white text-base"
                  placeholder="Not başlığı..."
                  placeholderTextColor="#9CA3AF"
                  value={title}
                  onChangeText={setTitle}
                  style={styles.inputField}
                />
                {touched.title && errors.title && (
                  <Text className="text-red-500 ml-2 text-sm">
                    {errors.title}
                  </Text>
                )}
              </View>

              <View className="mb-4">
                <View className="flex-row items-center mb-2">
                  <Ionicons name="document-text" size={20} color="#4B5563" />
                  <Text className="text-gray-700 ml-2 font-medium dark:text-white text-lg">
                    İçerik
                  </Text>
                </View>
                <TextInput
                  className="bg-gray-100 p-4 rounded-xl mb-1 border border-gray-200 dark:bg-gray-700 dark:text-white text-base"
                  placeholder="Notunuzu giriniz..."
                  placeholderTextColor="#9CA3AF"
                  multiline
                  textAlignVertical="top"
                  numberOfLines={10}
                  value={content}
                  onChangeText={setContent}
                  style={[styles.inputField, { height: 280 }]}
                />
                {touched.content && errors.content && (
                  <Text className="text-red-500 ml-2 text-sm">
                    {errors.content}
                  </Text>
                )}
              </View>

              <View className="mb-6">
                <View className="flex-row items-center mb-2">
                  <Ionicons name="folder" size={20} color="#4B5563" />
                  <Text className="text-gray-700 ml-2 font-medium dark:text-white text-lg">
                    Kategori
                  </Text>
                </View>
                <Sections category={category} setCategory={setCategory} />
              </View>

              <TouchableOpacity
                onPress={handleAddNote}
                className="mb-10 bg-blue-500 p-4 rounded-xl flex-row items-center justify-center"
              >
                <Ionicons name="add-circle" size={20} color="white" />
                <Text className="text-white text-center font-bold text-lg ml-2">
                  Notlarıma Ekle
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  inputField: {
    fontSize: 16,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  button: {
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default NoteAdd;

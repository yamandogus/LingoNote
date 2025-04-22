import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import Sections from "./sections";

const NoteSchema = Yup.object().shape({
  title: Yup.string().required("Başlık gerekli"),
  content: Yup.string().required("Not içeriği gerekli"),
});

const NoteAdd = () => {
  const [category, setCategory] = useState("Genel");

  return (
    <ScrollView className="flex-1 px-4">
      <Formik
        initialValues={{ title: "", content: "" }}
        validationSchema={NoteSchema}
        onSubmit={() => {}}
      >
        {({ handleChange, handleSubmit, values, errors, touched }) => (
          <View className="mt-6">
            <Text className="text-gray-700 mb-2 font-medium dark:text-white text-lg">Başlık</Text>
            <TextInput
              className="bg-gray-100 p-4 rounded-lg mb-2 border border-gray-300 dark:bg-gray-200 dark:text-black text-base"
              placeholder="Not başlığı..."
              value={values.title}
              onChangeText={handleChange("title")}
              style={styles.inputField}
            />
            {touched.title && errors.title && (
              <Text className="text-red-500 mb-2 text-base">{errors.title}</Text>
            )}

            <Text className="text-gray-700 mb-2 mt-4 font-medium dark:text-white text-lg">İçerik</Text>
            <TextInput
              className="bg-gray-100 p-4 rounded-lg mb-2 border border-gray-300 dark:bg-gray-200 dark:text-black text-base"
              placeholder="Notunuzu giriniz..."
              multiline
              textAlignVertical="top"
              numberOfLines={10}
              value={values.content}
              onChangeText={handleChange("content")}
              style={[styles.inputField, { height: 280 }]}
            />
            {touched.content && errors.content && (
              <Text className="text-red-500 mb-2 text-base">{errors.content}</Text>
            )}

            <Text className="text-gray-700 mb-2 mt-4 font-medium dark:text-white text-lg">Kategori</Text>
            <Sections category={category} setCategory={setCategory} />
            <TouchableOpacity
              className="bg-blue-500 p-5 rounded-lg mt-4 mb-10"
              style={styles.button}
            >
              <Text className="text-white text-center font-bold text-lg">Notlarıma Ekle</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  inputField: {
    fontSize: 16,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1
  },
  button: {
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2
  }
});

export default NoteAdd;

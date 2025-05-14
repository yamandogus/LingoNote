import "react-native-get-random-values";
import React, { useState } from "react";
import { launchImageLibrary } from "react-native-image-picker";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Modal,
  Image,
  Alert,
  PermissionsAndroid,
} from "react-native";
import { Formik, FormikErrors, FormikTouched } from "formik";
import * as Yup from "yup";
import Sections from "./sections";
import { noteStore } from "@/store/noteStore";
import { v4 as uuidv4 } from "uuid";
import { Ionicons } from "@expo/vector-icons";

const NoteSchema = Yup.object().shape({
  title: Yup.string().required("Başlık gerekli"),
  content: Yup.string().required("Not içeriği gerekli"),
});

interface FormValues {
  title: string;
  content: string;
}

const NoteAdd = () => {
  const [category, setCategory] = useState("");
  const [addedSuccess, setAddedSuccess] = useState(false);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [alert, setAlert] = useState(false);
  const { addNote } = noteStore();
  const id = uuidv4();

  const requestCameraPermission = async () => {
    console.log("requestCameraPermission");
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          {
            title: "Galeri İzni",
            message: "Uygulama galeriye erişim izni istiyor",
            buttonNeutral: "Daha Sonra Sor",
            buttonNegative: "İptal",
            buttonPositive: "Tamam"
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  const pickImage = async () => {
    console.log("pickImage");
    try {
      const hasPermission = await requestCameraPermission();
      
      if (!hasPermission) {
        Alert.alert('İzin Hatası', 'Galeri erişim izni verilmedi');
        return;
      }
      
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.8,
        selectionLimit: 1,
      });
      
      if (result.didCancel) {
        console.log('Kullanıcı resim seçimini iptal etti');
      } else if (result.errorCode) {
        console.log('ImagePicker Error: ', result.errorMessage);
        Alert.alert('Hata', 'Resim seçilirken bir hata oluştu');
      } else if (result.assets && result.assets.length > 0) {
        setImageUri(result.assets[0].uri || null);
      }
    } catch (error) {
      console.log('Resim seçme hatası:', error);
      Alert.alert('Hata', 'Resim seçilirken bir hata oluştu');
    }
  };

  const handleAddNote = () => {
    if (title && content && category) {
      addNote({
        id: id,
        title: title,
        content: content,
        category: category,
        imageUri: imageUri,
      });
      setAddedSuccess(true);
      setTimeout(() => {
        setAddedSuccess(false);
        setTitle("");
        setContent("");
        setCategory("");
        setImageUri(null);
      }, 2000);
    } else {
      setAlert(true);
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
          onSubmit={handleAddNote}
        >
          {({
            errors,
            touched,
          }: {
            errors: FormikErrors<FormValues>;
            touched: FormikTouched<FormValues>;
          }) => (
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
                <TouchableOpacity onPress={pickImage}>
                  <View className="flex-row items-center mb-2">
                    <Ionicons name="image" size={20} color="#4B5563" />
                    <Text className="text-gray-700 ml-2 font-medium dark:text-white text-lg">
                      Resim Seç
                    </Text>
                  </View>
                  {imageUri && (
                    <Image
                      source={{ uri: imageUri }}
                      style={{ width: 100, height: 100 }}
                    />
                  )}
                </TouchableOpacity>
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

              <Modal
                visible={addedSuccess}
                onRequestClose={() => setAddedSuccess(false)}
                transparent={true}
              >
                <View className="relative w-[300px] h-[50px] top-[50px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 dark:bg-green-500 p-4 rounded-lg">
                  <Text className="text-white text-center text-lg font-bold">
                    Notunuz başarıyla kaydedildi
                  </Text>
                </View>
              </Modal>
            </View>
          )}
        </Formik>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={alert}
        onRequestClose={() => setAlert(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-[90%] max-w-md shadow-2xl">
            <View className="flex-row items-center gap-3 mb-4">
              <View className="bg-red-100 dark:bg-red-900 p-3 rounded-full">
                <Ionicons name="warning" size={24} color="#EF4444" />
              </View>
              <Text className="text-xl font-bold text-gray-900 dark:text-white">
                Hata
              </Text>
            </View>
            <Text className="text-gray-600 dark:text-gray-300 mb-6">
              Lütfen tüm alanları doldurunuz.
            </Text>
            <Text className="text-gray-600 dark:text-gray-300 mb-6">
              <Text className="font-bold">
                {title === ""
                  ? "Başlık"
                  : content === ""
                  ? "İçerik"
                  : category === ""
                  ? "Kategori"
                  : ""}
              </Text>{" "}
              alanını doldurunuz.
            </Text>
            <View className="flex-row justify-end gap-3">
              <TouchableOpacity
                className="bg-red-500 dark:bg-red-600 rounded-xl px-5 py-3"
                onPress={() => {
                  setAlert(false);
                }}
              >
                <Text className="text-white font-medium">Tekrar Dene</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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

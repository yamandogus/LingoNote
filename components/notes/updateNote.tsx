import React, { useState } from "react";
import { Modal, View, Text, TouchableOpacity, TextInput, Image, Alert, Platform, PermissionsAndroid } from "react-native";
import Sections from "./sections";
import { noteStore } from "@/store/noteStore";
import { favoriteStore } from "@/store/favoriteStore";
import { Ionicons } from "@expo/vector-icons";
import { launchImageLibrary } from "react-native-image-picker";

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
  const { updateNote, notes } = noteStore();
  const { updateFavorite } = favoriteStore();
  const [imageUri, setImageUri] = useState<string | null>(null);
  
  // Mevcut notu bulup resim URI'sini al
  React.useEffect(() => {
    if (noteId) {
      const currentNote = notes.find(note => note.id === noteId);
      if (currentNote && currentNote.imageUri) {
        setImageUri(currentNote.imageUri);
      } else {
        setImageUri(null);
      }
    }
  }, [noteId, notes]);

  const requestCameraPermission = async () => {
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
  
  const handleUpdate = () => {
    if (noteId) {
      const updatedNote = {
        title: title,
        content: content,
        category: category,
        imageUri: imageUri
      };
      
      updateNote(noteId, updatedNote);
      updateFavorite(noteId, updatedNote);
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
            <View className="flex flex-row justify-between">
            <Text className="text-gray-800 mb-2 text-lg dark:text-gray-100 font-bold pb-2">
              Notunuzu Güncelleyin
            </Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
            </View>
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
              <TouchableOpacity onPress={pickImage} className="mb-2">
                <View className="flex-row items-center mb-2">
                  <Ionicons name="image" size={20} color="#4B5563" />
                  <Text className="text-gray-700 ml-2 font-medium dark:text-white">
                    {imageUri ? "Resmi Değiştir" : "Resim Ekle"}
                  </Text>
                </View>
              </TouchableOpacity>
              
              {imageUri && (
                <View className="mb-2">
                  <Image
                    source={{ uri: imageUri }}
                    className="w-full h-40 rounded-lg"
                    resizeMode="cover"
                  />
                  <TouchableOpacity 
                    onPress={() => setImageUri(null)}
                    className="absolute top-2 right-2 bg-red-500 rounded-full p-1"
                  >
                    <Ionicons name="close" size={16} color="white" />
                  </TouchableOpacity>
                </View>
              )}
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

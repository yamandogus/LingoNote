import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, Button, Alert } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from "@expo/vector-icons";

const Favorites = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('İzin Gerekli', 'Galeriye erişim için izin vermeniz gerekiyor.');
      }
    })();
  }, []);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImageUri(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Hata', 'Resim seçilirken bir hata oluştu.');
    }
  };

  return (
    <SafeAreaProvider className="flex-1">
      <ScrollView className="flex-1 bg-white dark:bg-gray-800 pt-4">
        <SafeAreaView>
          <View className="flex-1 mx-4">
            <Text className="text-center font-bold text-2xl rounded-lg bg-[#FDE68A] border-l-2 border-r-2 dark:border-white py-2 px-4">
              Favori Notlarım
            </Text>
          </View>
          <View className="flex-1 mx-5 mt-4">
            <TouchableOpacity 
              onPress={pickImage}
              className="bg-blue-500 p-3 rounded-lg mb-4"
            >
              <Text className="text-white text-center font-bold">Resim Ekle</Text>
            </TouchableOpacity>
            {imageUri && (
              <Image
                source={{ uri: imageUri }}
                style={{ width: 200, height: 200, marginTop: 16, borderRadius: 12 }}
              />
            )}
            {/* Favori notlar listesi burada olacak */}
            <View className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-4">
              <View className="flex-row justify-between items-center">
                <Text className="text-lg font-semibold dark:text-white">Örnek Not</Text>
                <TouchableOpacity>
                  <Ionicons name="heart" size={24} color="#EF4444" />
                </TouchableOpacity>
              </View>
              <Text className="text-gray-600 dark:text-gray-300 mt-2">
                Bu bir örnek favori nottur.
              </Text>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </SafeAreaProvider>
  );
};

export default Favorites;

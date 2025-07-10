import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  Platform,
  Modal,
  SafeAreaView,
  useWindowDimensions,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Ionicons from "@expo/vector-icons/Ionicons";
// @ts-ignore
import ImageZoom from "react-native-image-pan-zoom";

const AddImage = ({
  imageUri,
  setImageUri,
}: {
  imageUri: string | null;
  setImageUri: (uri: string | null) => void;
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isImageVisible, setIsImageVisible] = useState(true);
  const { width: deviceWidth, height: deviceHeight } = useWindowDimensions();

  const requestPermissions = async (
    permissionType: "camera" | "mediaLibrary"
  ) => {
    if (Platform.OS === "web") return true;
    const permissionRequest =
      permissionType === "camera"
        ? ImagePicker.requestCameraPermissionsAsync
        : ImagePicker.requestMediaLibraryPermissionsAsync;
    const { status } = await permissionRequest();
    if (status !== "granted") {
      Alert.alert(
        "İzin Gerekli",
        `Devam etmek için ${
          permissionType === "camera" ? "kamera" : "galeri"
        } izni vermeniz gerekiyor.`
      );
      return false;
    }
    return true;
  };

  const pickImage = async (source: "gallery" | "camera") => {
    const hasPermission = await requestPermissions(
      source === "camera" ? "camera" : "mediaLibrary"
    );
    if (!hasPermission) return;

    const launchPicker =
      source === "camera"
        ? ImagePicker.launchCameraAsync
        : ImagePicker.launchImageLibraryAsync;

    let result = await launchPicker({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      setIsImageVisible(true);
    }
  };

  return (
    <View className="mb-4">
      <View className="flex-row justify-center gap-4 mb-4">
        <TouchableOpacity
          onPress={() => pickImage("gallery")}
          className="bg-blue-500 p-2 rounded-md flex-row items-center gap-2"
        >
          <Text className="text-white">Galeriden Seç</Text>
          <Ionicons name="image" size={20} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => pickImage("camera")}
          className="bg-red-500 p-2 rounded-md flex-row items-center gap-2"
        >
          <Text className="text-white">Fotoğraf Çek</Text>
          <Ionicons name="camera" size={20} color="white" />
        </TouchableOpacity>
      </View>

      {imageUri && (
        <>
          <TouchableOpacity
            onPress={() => setIsImageVisible(!isImageVisible)}
            className="flex-row justify-between items-center bg-gray-200 dark:bg-gray-700 p-3 rounded-t-lg mx-1"
            style={{ marginHorizontal: -24 }}
          >
            <Text className="font-semibold text-gray-700 dark:text-gray-200">
              Eklenen Görseli {!isImageVisible ? "Göster":"Gizle"}
            </Text>
            <Ionicons
              name={isImageVisible ? "chevron-up" : "chevron-down"}
              size={24}
              color="gray"
            />
          </TouchableOpacity>

          {isImageVisible && (
            <View
              style={{
                marginHorizontal: -10,
                marginTop:10,
                marginBottom: 16,
                borderBottomLeftRadius: 8,
                borderBottomRightRadius: 8,
                overflow: "hidden",
              }}
            >
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Image
                  className="rounded-t-lg"
                  source={{ uri: imageUri }}
                  style={{ width: "100%", height: 220 }}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            </View>
          )}

          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <SafeAreaView className="flex-1 bg-black/90 justify-center items-center">
              <TouchableOpacity
                className="absolute top-10 right-10 z-10"
                onPress={() => setModalVisible(false)}
              >
                <Ionicons name="close-circle" size={40} color="white" />
              </TouchableOpacity>
              {/* 
                // @ts-ignore */}
              <ImageZoom
                cropWidth={deviceWidth}
                cropHeight={deviceHeight}
                imageWidth={deviceWidth}
                imageHeight={deviceHeight}
              >
                <Image
                  style={{ width: deviceWidth, height: deviceHeight }}
                  resizeMode="contain"
                  source={{ uri: imageUri }}
                />
              </ImageZoom>
            </SafeAreaView>
          </Modal>
        </>
      )}
    </View>
  );
};


export default AddImage;
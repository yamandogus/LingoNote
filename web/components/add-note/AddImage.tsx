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
  useColorScheme,
  Pressable,
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
  const { width: deviceWidth, height: deviceHeight } = useWindowDimensions();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

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
    }
  };

  const removeImage = () => {
    setImageUri(null);
  };

  return (
    <View className="my-2 px-4">
      {/* Image Action Buttons */}
      <View className="flex-row items-center justify-start gap-3">
        <Pressable
          onPress={() => pickImage("gallery")}
          className={`flex-row items-center px-4 py-2.5 rounded-full border transition-all duration-200 active:scale-95 ${
            isDark
              ? "bg-gray-800 border-gray-700 hover:bg-gray-700"
              : "bg-gray-50 border-gray-200 hover:bg-gray-100"
          }`}
        >
          <Ionicons
            name="image-outline"
            size={18}
            color={isDark ? "#9CA3AF" : "#6B7280"}
          />
          <Text className={`ml-2 text-sm font-medium ${
            isDark ? "text-gray-300" : "text-gray-700"
          }`}>
            Galeri
          </Text>
        </Pressable>

        <Pressable
          onPress={() => pickImage("camera")}
          className={`flex-row items-center px-4 py-2.5 rounded-full border transition-all duration-200 active:scale-95 ${
            isDark
              ? "bg-gray-800 border-gray-700 hover:bg-gray-700"
              : "bg-gray-50 border-gray-200 hover:bg-gray-100"
          }`}
        >
          <Ionicons
            name="camera-outline"
            size={18}
            color={isDark ? "#9CA3AF" : "#6B7280"}
          />
          <Text className={`ml-2 text-sm font-medium ${
            isDark ? "text-gray-300" : "text-gray-700"
          }`}>
            Kamera
          </Text>
        </Pressable>
      </View>

      {/* Image Preview */}
      {imageUri && (
        <View className={`relative rounded-2xl overflow-hidden border ${
          isDark ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-gray-50"
        }`}>
          <TouchableOpacity 
            onPress={() => setModalVisible(true)}
            activeOpacity={0.9}
          >
            <Image
              source={{ uri: imageUri }}
              className="w-full h-48 rounded-2xl"
              resizeMode="cover"
            />
          </TouchableOpacity>
          
          {/* Remove Image Button */}
          <TouchableOpacity
            onPress={removeImage}
            className="absolute top-3 right-3 w-8 h-8 bg-black/60 rounded-full items-center justify-center backdrop-blur-sm"
            activeOpacity={0.8}
          >
            <Ionicons name="close" size={16} color="white" />
          </TouchableOpacity>

          {/* Image Info Overlay */}
          <View className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
            <Text className="text-white text-xs font-medium opacity-90">
              Tap to view fullscreen
            </Text>
          </View>
        </View>
      )}

      {/* Modern Image Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        statusBarTranslucent
      >
        <View className="flex-1 bg-black">
          {/* Header */}
          <SafeAreaView className="absolute top-0 left-0 right-0 z-10">
            <View className="flex-row items-center justify-between px-6 py-4">
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                className="w-10 h-10 bg-black/40 rounded-full items-center justify-center backdrop-blur-sm"
                activeOpacity={0.8}
              >
                <Ionicons name="arrow-back" size={20} color="white" />
              </TouchableOpacity>
              
              <TouchableOpacity
                onPress={() => {
                  removeImage();
                  setModalVisible(false);
                }}
                className="w-10 h-10 bg-red-500/80 rounded-full items-center justify-center backdrop-blur-sm"
                activeOpacity={0.8}
              >
                <Ionicons name="trash-outline" size={18} color="white" />
              </TouchableOpacity>
            </View>
          </SafeAreaView>

          {/* Zoomable Image */}
          <View className="flex-1 items-center justify-center">
            {/* @ts-ignore */}
            <ImageZoom
              cropWidth={deviceWidth}
              cropHeight={deviceHeight}
              imageWidth={deviceWidth}
              imageHeight={deviceHeight}
              enableSwipeDown={true}
              onSwipeDown={() => setModalVisible(false)}
            >
              <Image
                style={{ width: deviceWidth, height: deviceHeight }}
                resizeMode="contain"
                source={{ uri: imageUri || "" }}
              />
            </ImageZoom>
          </View>

          {/* Bottom Gradient */}
          <View className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/60 to-transparent" />
        </View>
      </Modal>
    </View>
  );
};


export default AddImage;
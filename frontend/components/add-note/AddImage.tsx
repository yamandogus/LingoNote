import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Ionicons from "@expo/vector-icons/build/Ionicons";

const AddImage = ({
  imageUri,
  setImageUri,
}: {
  imageUri: string | null;
  setImageUri: (uri: string | null) => void;
}) => {
  const requestMediaLibraryPermissions = async () => {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "İzin Gerekli",
          "Galeriden resim seçmek için kamera rulo izni vermeniz gerekiyor."
        );
        return false;
      }
    }
    return true;
  };

  const requestCameraPermissions = async () => {
    if (Platform.OS !== "web") {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "İzin Gerekli",
          "Kamerayı kullanmak için kamera izni vermeniz gerekiyor."
        );
        return false;
      }
    }
    return true;
  };

  const handleSelectFromGallery = async () => {
    const hasPermission = await requestMediaLibraryPermissions();
    if (!hasPermission) return;

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleTakePhoto = async () => {
    const hasPermission = await requestCameraPermissions();
    if (!hasPermission) return;

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };
  return (
    <View className="flex flex-row gap-4 justify-center mb-4">
      <TouchableOpacity
        onPress={handleSelectFromGallery}
        className="bg-blue-500 p-2 rounded-md flex flex-row items-center gap-2"
      >
        <Text className="flex flex-row items-center gap-2 text-white">
          Galeriden Seç
        </Text>
        <Ionicons name="image" size={20} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleTakePhoto}
        className="bg-red-500 p-2 rounded-md flex flex-row items-center gap-2"
      >
        <Text className="flex flex-row items-center gap-2 text-white">
          Fotoğraf Çek
        </Text>
        <Ionicons name="camera" size={20} color="white" />
      </TouchableOpacity>
      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={{
            width: "100%",
            height: 200,
            borderRadius: 8,
            marginBottom: 10,
          }}
          resizeMode="contain"
        />
      )}
    </View>
  );
};

export default AddImage;
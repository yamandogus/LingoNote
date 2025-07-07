import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  Platform,
  PermissionsAndroid,
} from "react-native";
import { launchImageLibrary, launchCamera } from "react-native-image-picker";
import Ionicons from "@expo/vector-icons/build/Ionicons";

const AddImage = ({
  imageUri,
  setImageUri,
}: {
  imageUri: string | null;
  setImageUri: (uri: string | null) => void;
}) => {
  const requestCameraPermission = async () => {
    if (Platform.OS === "android") {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const handleSelectFromGallery = async () => {
    launchImageLibrary({ mediaType: "photo" }, (response) => {
      if (response.didCancel) {
        // Kullanıcı iptal etti
        return;
      }
      if (response.errorCode) {
        Alert.alert("Hata", "Galeri açılırken hata oluştu: " + response.errorMessage);
        return;
      }
      if (response.assets && response.assets.length > 0) {
        setImageUri(response.assets[0].uri || null);
      }
    });
  };

  const handleTakePhoto = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      Alert.alert("İzin Gerekli", "Kamera izni verilmedi.");
      return;
    }
    launchCamera({ mediaType: "photo" }, (response) => {
      if (response.didCancel) {
        // Kullanıcı iptal etti
        return;
      }
      if (response.errorCode) {
        Alert.alert("Hata", "Kamera açılırken hata oluştu: " + response.errorMessage);
        return;
      }
      if (response.assets && response.assets.length > 0) {
        setImageUri(response.assets[0].uri || null);
      }
    });
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

import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  Platform,
  ScrollView,
  Text,
  useColorScheme,
  View,
  KeyboardAvoidingView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { noteService } from "../../services/note";
import { useRouter } from "expo-router";

// Components
import TitleInput from "../../components/add-note/TitleInput";
import ContentInput from "../../components/add-note/ContentInput";
import CategorySelector from "../../components/add-note/CategorySelector";
import ColorSelector from "../../components/add-note/ColorSelector";
import SaveButton from "../../components/add-note/SaveButton";

const COLORS = [
  "#A7C7E7",
  "#B7E5B4",
  "#FFF6B7",
  "#FFD6A5",
  "#D7B4F3",
  "#FFB7B2",
];

export const categories = [
  "Tümü", "Kişisel", "İş", "Eğitim", "Sağlık", "Fikirler",
];
export default function AddNoteScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const router = useRouter();

  const [selectedColor, setSelectedColor] = useState<string>("#A7C7E7");
  const [selectedCategory, setSelectedCategory] = useState<string>("Tümü");
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState({
    title: false,
    content: false,
  });

  const handleAddNote = async () => {
    if (!title.trim() || !content.trim() || selectedCategory === "Tümü") {
      Toast.show({
        type: "error",
        text1: "Not ekleme başarısız",
        text2: "Lütfen tüm alanları doldurunuz.",
        position: "top",
      });
      return; // Prevent note creation if validation fails
    }

    setIsLoading(true);

    try {
      const noteData = {
        title: title.trim(),
        content: content.trim(),
        category: selectedCategory,
        color: selectedColor,
        image: imageUri,
      };

      await noteService.createNote(noteData);

      Toast.show({
        type: "success",
        text1: "Başarılı!",
        text2: "Not başarıyla eklendi.",
        position: "top",
      });
   
      // Formu temizle
      setTitle("");
      setContent("");
      setSelectedCategory("Tümü");
      setSelectedColor("#A7C7E7");
      setImageUri(null);

      // Notlar sayfasına yönlendir
      setTimeout(() => {
        router.push("/(tabs)/my-notes");
      }, 1000);
    } catch (error) {
      console.error("Not ekleme hatası:", error);
      Toast.show({
        type: "error",
        text1: "Hata!",
        text2: "Not eklenirken bir hata oluştu. Lütfen tekrar deneyin.",
        position: "top",
      });
    } finally {
      setIsLoading(false);
    }
  };
  const gradientColors = isDark
  ? ["#1a1a2e", "#16213e", "#0f3460"]
  : ["#f8f9fa", "#e9ecef", "#dee2e6"];



  return (
    <LinearGradient
      colors={gradientColors as [string, string, string]}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      {Platform.OS === "android" && <View style={{ height: 32 }} />}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 120, // Increased padding to avoid being hidden by tab bar
          paddingTop: Platform.OS === "android" ? 16 : 16,
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <View className="px-2">
            {/* Modern Header */}
            <View className="mb-4 mt-4">
              <View className="flex-row items-center justify-center mb-3">
                <View 
                  className="w-12 h-12 rounded-2xl items-center justify-center mr-3"
                  style={{
                    backgroundColor: selectedColor,
                    shadowColor: selectedColor,
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.3,
                    shadowRadius: 8,
                    elevation: 6,
                  }}
                >
                  <Ionicons name="add" size={24} color="white" />
                </View>
                <View>
                  <Text className="text-3xl font-bold dark:text-white text-gray-900">
                    Yeni Not
                  </Text>
                  <Text className="text-base dark:text-gray-400 text-gray-500">
                    Fikirlerinizi kaydedin
                  </Text>
                </View>
              </View>
            </View>

            {/* Form Container */}
            <View 
              className="rounded-3xl p-2 backdrop-blur-sm mb-6"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.1,
                shadowRadius: 20,
                elevation: 8,
              }}
            >
              <TitleInput
                title={title}
                setTitle={setTitle}
                isFocused={isFocused.title}
                setIsFocused={setIsFocused}
                selectedColor={selectedColor}
                isDark={isDark}
              />

              <ContentInput
                content={content}
                setContent={setContent}
                isFocused={isFocused.content}
                setIsFocused={setIsFocused}
                selectedColor={selectedColor}
                isDark={isDark}
                imageUri={imageUri}
                setImageUri={setImageUri}
              />

              <CategorySelector
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedColor={selectedColor}
                isDark={isDark}
                categories={categories}
              />

              <ColorSelector
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
                isDark={isDark}
                colors={COLORS}
              />
            </View>

            {/* Save Button */}
            <SaveButton
              onPress={handleAddNote}
              isLoading={isLoading}
              selectedColor={selectedColor}
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </LinearGradient>
  );
}

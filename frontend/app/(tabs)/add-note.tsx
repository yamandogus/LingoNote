import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  Platform,
  ScrollView,
  Text,
  useColorScheme,
  View,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { KATEGORILER } from "./my-notes";
import Toast from "react-native-toast-message";
import { noteService } from "../../services/note";
import { useRouter } from "expo-router";

// Components
import TitleInput from "../../components/add-note/TitleInput";
import ContentInput from "../../components/add-note/ContentInput";
import CategorySelector from "../../components/add-note/CategorySelector";
import ColorSelector from "../../components/add-note/ColorSelector";
import SaveButton from "../../components/add-note/SaveButton";
import AddImage from "../../components/add-note/AddImage";
import ErrorAlert from "@/components/add-note/ErrorAlert";

const COLORS = [
  "#A7C7E7",
  "#B7E5B4",
  "#FFF6B7",
  "#FFD6A5",
  "#D7B4F3",
  "#FFB7B2",
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
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isFocused, setIsFocused] = useState({
    title: false,
    content: false,
  });

  const handleAddNote = async () => {
    if (!title.trim() || !content.trim() || selectedCategory === "Tümü") {
      const errors = [];
      
      if (!title.trim()) {
        errors.push("• Başlık alanı boş olamaz");
      }
      if (!content.trim()) {
        errors.push("• İçerik alanı boş olamaz");
      }
      if (selectedCategory === "Tümü") {
        errors.push("• Bir kategori seçmelisiniz");
      }
      
      setErrorMessage(errors.join("\n"));
      setShowError(true);
      return;
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



  return (
    <LinearGradient
      colors={
        isDark
          ? ["#0f0c29", "#120f31", "#16162e"]
          : ["#f8f9fa", "#e9ecef", "#dee2e6"]
      }
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
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <View className="px-4">
            <Text className="text-2xl font-bold text-center mb-8 dark:text-white text-gray-800">
              Yeni Not Ekle
            </Text>
            <AddImage imageUri={imageUri} setImageUri={setImageUri} />
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
            />

            <CategorySelector
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedColor={selectedColor}
              isDark={isDark}
              categories={KATEGORILER}
            />

            <ColorSelector
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
              isDark={isDark}
              colors={COLORS}
            />

            <SaveButton
              onPress={handleAddNote}
              isLoading={isLoading}
              selectedColor={selectedColor}
            />
            {showError && <ErrorAlert  onClose={()=> setShowError(false)} errorMessage={errorMessage}/>}
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </LinearGradient>
  );
}

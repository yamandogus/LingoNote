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
  const [isFocused, setIsFocused] = useState({
    title: false,
    content: false,
  });

  const handleAddNote = async () => {
    // Validasyon
    if (!title.trim()) {
      Alert.alert("Hata", "Lütfen not başlığını girin.");
      return;
    }

    if (!content.trim()) {
      Alert.alert("Hata", "Lütfen not içeriğini girin.");
      return;
    }

    if (selectedCategory === "Tümü") {
      Alert.alert("Hata", "Lütfen bir kategori seçin.");
      return;
    }

    setIsLoading(true);

    try {
      const noteData = {
        title: title.trim(),
        content: content.trim(),
        category: selectedCategory,
        color: selectedColor,
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
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <LinearGradient
         colors={isDark ? ['#0f0c29', '#120f31', '#16162e'] : ['#f8f9fa', '#e9ecef', '#dee2e6']}
         style={{ flex: 1 }}
         start={{ x: 0, y: 0 }}
         end={{ x: 1, y: 1 }}
      >
        <ScrollView 
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 32, paddingTop: Platform.OS === "android" ? 32 : 16 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="px-6 py-4">
            <Text className="text-2xl font-bold text-center mb-8 dark:text-white text-gray-800">
              Yeni Not Ekle
            </Text>
            
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
          </View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

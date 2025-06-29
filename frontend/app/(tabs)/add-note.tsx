import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { KATEGORILER } from "./my-notes";
import Toast from "react-native-toast-message";
import { noteService } from "../../services/note";
import { useRouter } from "expo-router";

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
            
            {/* Başlık Input */}
            <View className="mb-6">
              <Text className="text-sm font-medium mb-1.5 dark:text-gray-300 text-gray-600">
                Başlık
              </Text>
              <TextInput
                value={title}
                onChangeText={setTitle}
                className={`rounded-xl px-4 py-3 text-base ${
                  isDark ? "bg-gray-800 text-white" : "bg-white text-gray-900"
                }`}
                style={{
                  borderWidth: 2,
                  borderColor: isFocused.title ? selectedColor : isDark ? "#374151" : "#e5e7eb",
                  shadowColor: isFocused.title ? `${selectedColor}40` : "transparent",
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 1,
                  shadowRadius: 8,
                  elevation: isFocused.title ? 4 : 0,
                }}
                placeholder="Not başlığını yazın"
                placeholderTextColor={isDark ? "#9ca3af" : "#9ca3af"}
                onFocus={() => setIsFocused({...isFocused, title: true})}
                onBlur={() => setIsFocused({...isFocused, title: false})}
              />
            </View>

            {/* İçerik Input */}
            <View className="mb-6">
              <Text className="text-sm font-medium mb-1.5 dark:text-gray-300 text-gray-600">
                İçerik
              </Text>
              <TextInput
                value={content}
                onChangeText={setContent}
                multiline
                className={`rounded-xl px-4 py-3 text-base min-h-[150px] ${
                  isDark ? "bg-gray-800 text-white" : "bg-white text-gray-900"
                }`}
                style={{
                  textAlignVertical: "top",
                  borderWidth: 2,
                  borderColor: isFocused.content ? selectedColor : isDark ? "#374151" : "#e5e7eb",
                  shadowColor: isFocused.content ? `${selectedColor}40` : "transparent",
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 1,
                  shadowRadius: 8,
                  elevation: isFocused.content ? 4 : 0,
                }}
                placeholder="Not içeriğinizi yazın..."
                placeholderTextColor={isDark ? "#9ca3af" : "#9ca3af"}
                onFocus={() => setIsFocused({...isFocused, content: true})}
                onBlur={() => setIsFocused({...isFocused, content: false})}
              />
            </View>


            {/* Kategoriler */}
            <View className="mb-6">
              <Text className="text-sm font-medium mb-2 dark:text-gray-300 text-gray-600">
                Kategori Seçin
              </Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingRight: 20 }}
                className="pb-2 -mx-1"
              >
                {KATEGORILER.map((kategori, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => setSelectedCategory(kategori)}
                    className={`py-2 px-4 mx-1 rounded-full ${
                      selectedCategory === kategori 
                        ? `bg-[${selectedColor}]` 
                        : isDark 
                          ? "bg-gray-700" 
                          : "bg-gray-100"
                    }`}
                    style={{
                      backgroundColor: selectedCategory === kategori ? selectedColor : isDark ? "#374151" : "#f3f4f6",
                      shadowColor: selectedCategory === kategori ? `${selectedColor}80` : "transparent",
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 1,
                      shadowRadius: 4,
                      elevation: selectedCategory === kategori ? 3 : 0,
                    }}
                  >
                    <Text 
                      className={`text-sm font-medium ${
                        selectedCategory === kategori 
                          ? "text-white" 
                          : isDark 
                            ? "text-gray-200" 
                            : "text-gray-700"
                      }`}
                    >
                      {kategori}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>


            {/* Renk Seçimi */}
            <View className="mb-8">
              <Text className="text-sm font-medium mb-3 dark:text-gray-300 text-gray-600">
                Renk Seçin
              </Text>
              <View className="flex-row flex-wrap justify-start items-center">
                {COLORS.map((color) => (
                  <TouchableOpacity
                    key={color}
                    onPress={() => setSelectedColor(color)}
                    className="m-1.5"
                  >
                    <View 
                      className="w-10 h-10 rounded-full items-center justify-center"
                      style={{
                        backgroundColor: color,
                        borderWidth: 3,
                        borderColor: selectedColor === color 
                          ? isDark ? "#fff" : "#1f2937" 
                          : "transparent",
                        shadowColor: selectedColor === color ? color : "transparent",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.8,
                        shadowRadius: 4,
                        elevation: selectedColor === color ? 4 : 0,
                      }}
                    >
                      {selectedColor === color && (
                        <View className="w-5 h-5 rounded-full bg-white/80 items-center justify-center">
                          <View 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: color }}
                          />
                        </View>
                      )}
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Kaydet Butonu */}
            <TouchableOpacity
              onPress={handleAddNote}
              disabled={isLoading}
              className={`py-4 rounded-xl overflow-hidden ${isLoading ? 'opacity-50' : ''}`}
              style={{
                backgroundColor: selectedColor,
                shadowColor: selectedColor,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.5,
                shadowRadius: 12,
                elevation: 5,
              }}
            >
              <Text className="text-center text-gray-600 dark:text-black text-lg font-bold">
                {isLoading ? "Kaydediliyor..." : "Notu Kaydet"}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

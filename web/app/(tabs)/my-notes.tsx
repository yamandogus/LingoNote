import React, { useState } from "react";
import {
  View,
  ScrollView,
  useColorScheme,
  Platform,
  Text,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { CategoryFilter } from "@/components/my-notes/CategoryFilter";
import { NoteList } from "@/components/my-notes/NoteList";
import { EmptyNotes } from "@/components/my-notes/EmptyNotes";
import { FabAddNote } from "@/components/my-notes/FabAddNote";
import { useNavigation, useFocusEffect } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Note } from "@/services/api";
import { noteService } from "@/services/note";
import Toast from "react-native-toast-message";

export const categories = [
  "Tümü",
  "İş",
  "Kişisel",
  "Eğitim",
  "Sağlık",
  "Fikirler",
  "Favoriler",
];

export default function MyNotesScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [activeCategory, setActiveCategory] = useState("Tümü");
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation() as any;

  useFocusEffect(
    React.useCallback(() => {
      loadNotes();
    }, [])
  );

  const loadNotes = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await noteService.getNotes();
      setNotes(response.notes);
    } catch (error) {
      console.error("Notlar yüklenirken hata:", error);
      setError("Notlar yüklenirken bir hata oluştu");
      Toast.show({
        type: "error",
        text1: "Hata!",
        text2: "Notlar yüklenemedi. Lütfen tekrar deneyin.",
        position: "top",
      });
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadNotes();
    setRefreshing(false);
  };

  const handleDeleteNote = async (noteId: string) => {
    try {
      await noteService.deleteNote(noteId);
      // Notu listeden kaldır
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
      Toast.show({
        type: "success",
        text1: "Başarılı!",
        text2: "Not başarıyla silindi.",
        position: "top",
      });
    } catch (error) {
      console.error("Not silinirken hata:", error);
      Toast.show({
        type: "error",
        text1: "Hata!",
        text2: "Not silinirken bir hata oluştu.",
        position: "top",
      });
    }
  };

  const handleUpdateNote = async (noteId: string, updatedData: any) => {
    try {
      const response = await noteService.updateNote(noteId, updatedData);
      // Notu listede güncelle
      setNotes((prevNotes) =>
        prevNotes.map((note) => (note.id === noteId ? response.note : note))
      );
      Toast.show({
        type: "success",
        text1: "Başarılı!",
        text2: "Not başarıyla güncellendi.",
        position: "top",
      });
    } catch (error) {
      console.error("Not güncellenirken hata:", error);
      Toast.show({
        type: "error",
        text1: "Hata!",
        text2: "Not güncellenirken bir hata oluştu.",
        position: "top",
      });
    }
  };

  const favoriteNotes = notes.filter((note) => note.isFavorite);

  const filteredNotes =
    activeCategory === "Favoriler"
      ? favoriteNotes
      : activeCategory === "Tümü"
        ? notes
        : notes.filter((note) => note.category === activeCategory);


  const handleAddNote = () => {
    navigation.navigate("/add-note");
  };

  return (
    <View className={`flex-1`}>
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
       <View className="pt-6">
       <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onSelect={setActiveCategory}
          isDark={isDark}
          notes={notes}
        />
       </View>
        <ScrollView
          className="flex-1 px-2 pt-6"
          contentContainerStyle={{ paddingBottom: 120 }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={isDark ? "#ffffff" : "#000000"}
              colors={isDark ? ["#ffffff"] : ["#000000"]}
            />
          }
        >
          {error ? (
            <View className="flex-1 justify-center items-center py-8">
              <Text
                className={`text-lg text-center ${isDark ? "text-red-400" : "text-red-600"}`}
              >
                {error}
              </Text>
              <TouchableOpacity
                onPress={loadNotes}
                className={`mt-4 px-6 py-3 rounded-lg ${
                  isDark ? "bg-blue-600" : "bg-blue-500"
                }`}
              >
                <Text className="text-white font-medium">Tekrar Dene</Text>
              </TouchableOpacity>
            </View>
          ) : filteredNotes.length > 0 ? (
            <NoteList
              notes={filteredNotes}
              isDark={isDark}
              handleDeleteNote={handleDeleteNote}
              handleUpdateNote={handleUpdateNote}
            />
          ) : loading ? (
            <View className="flex-1 justify-center items-center py-8">
              <Text
                className={`text-lg ${isDark ? "text-white" : "text-gray-900"}`}
              >
                Notlar yükleniyor...
              </Text>
            </View>
          ) : (
            <EmptyNotes isDark={isDark} />
          )}
        </ScrollView>
        <FabAddNote
          onPress={handleAddNote}
          isDark={isDark}
          navigation={navigation}
        />
      </LinearGradient>
    </View>
  );
}

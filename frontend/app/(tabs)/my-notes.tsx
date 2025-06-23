import { useState } from "react";
import { View, ScrollView, useColorScheme, Platform } from "react-native";
import { CategoryFilter } from "@/components/my-notes/CategoryFilter";
import { NoteList } from "@/components/my-notes/NoteList";
import { EmptyNotes } from "@/components/my-notes/EmptyNotes";
import { FabAddNote } from "@/components/my-notes/FabAddNote";
import { useNavigation } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

export const KATEGORILER = ["Tümü", "İş", "Kişisel", "Eğitim", "Sağlık", "Fikirler"];

const ORNEK_NOTLAR = [
  {
    id: "1",
    title: "Toplantı Notları",
    summary: "Bugünkü toplantıda konuşulan ana başlıklar ve alınan kararlar...",
    date: "25 Eylül 2023",
    tags: ["İş"],
    color: "blue"
  },
  {
    id: "2",
    title: "Alışveriş Listesi",
    summary: "Süt, yumurta, ekmek, kahve ve sebzeler alınacak.",
    date: "24 Eylül 2023",
    tags: ["Kişisel"],
    color: "green"
  },
  {
    id: "3",
    title: "React Native Ders Notları",
    summary: "Component, props, state ve hook'lar hakkında özet bilgiler...",
    date: "22 Eylül 2023",
    tags: ["Eğitim"],
    color: "purple"
  },
];

export default function MyNotesScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [activeCategory, setActiveCategory] = useState("Tümü");
  const [notes, setNotes] = useState(ORNEK_NOTLAR);
  const navigation = useNavigation() as any;

  const filteredNotes =
    activeCategory === "Tümü"
      ? notes
      : notes.filter((note) => note.tags.includes(activeCategory));

  const handleAddNote = () => {
    navigation.navigate("/add-note");
  };

  return (
    <View className={`flex-1`}>
      <LinearGradient
          colors={isDark ? ['#0f0c29', '#120f31', '#16162e'] : ['#f8f9fa', '#e9ecef', '#dee2e6']}
          style={{ flex: 1 }}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
      >
        {Platform.OS === 'android' && <View style={{ height: 32 }} />}
        <ScrollView
          className="flex-1 px-4 pt-6"
          contentContainerStyle={{ paddingBottom: 120 }}
        >
          <CategoryFilter
            categories={KATEGORILER}
            activeCategory={activeCategory}
            onSelect={setActiveCategory}
            isDark={isDark}
          />
          {filteredNotes.length > 0 ? (
            <NoteList notes={filteredNotes} isDark={isDark} />
          ) : (
            <EmptyNotes  isDark={isDark} />
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

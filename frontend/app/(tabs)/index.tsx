import { ScrollView, View, useColorScheme } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Header } from "@/components/home/Header";
import { UpNext } from "@/components/home/UpNext";
import { SearchBar } from "@/components/home/SearchBar";
import { NoteCard } from "@/components/home/NoteCard";
import { Categories } from "@/components/home/Categories";

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const notes = [
    {
      title: "Tasarım Düzeni",
      progress: 85,
      progressColor: "blue",
      status: { text: "Acil", bgColor: "red-100", textColor: "red-700" },
      teamCount: 9
    },
    {
      title: "Finans",
      progress: 17,
      progressColor: "green",
      status: { text: "Yeni", bgColor: "blue-100", textColor: "blue-700" },
      teamCount: 2
    },
    {
      title: "Geniş Dünya",
      progress: 69,
      progressColor: "purple",
      status: { text: "İşlemde", bgColor: "yellow-100", textColor: "yellow-700" },
      teamCount: 2
    },
    {
      title: "Yooki",
      progress: 100,
      progressColor: "yellow",
      status: { text: "Tamamlandı", bgColor: "green-100", textColor: "green-700" },
      teamCount: 15
    }
  ];

  return (
    <View className={`flex-1 ${isDark ? 'bg-[#1a1a1a]' : 'bg-white'}`}>
      <StatusBar style={isDark ? "light" : "dark"} />
      <ScrollView className="flex-1 px-4 py-8" contentContainerStyle={{ paddingBottom: 100 }}>
        <Header isDark={isDark} />
        <UpNext isDark={isDark} />
        <SearchBar isDark={isDark} />
        
        <View className="flex-row flex-wrap justify-between">
          {notes.map((note, index) => (
            <NoteCard
              key={index}
              isDark={isDark}
              {...note}
            />
          ))}
        </View>

        <Categories isDark={isDark} />
      </ScrollView>
    </View>
  );
}

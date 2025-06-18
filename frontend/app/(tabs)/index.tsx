import { View, ScrollView, useColorScheme } from "react-native";
import { ProfileIcon } from "@/components/home/ProfileIcon";
import { WelcomeCard } from "@/components/home/WelcomeCard";
import { CategoriesBar } from "@/components/home/CategoriesBar";
import { NoteOfTheDay } from "@/components/home/NoteOfTheDay";
import { StatsBar } from "@/components/home/StatsBar";
import { MotivationQuote } from "@/components/home/MotivationQuote";

const GUNUN_NOTU = {
  title: "Fikirlerim",
  summary: "Bugün aklıma gelen yeni uygulama fikrini not aldım...",
  date: "27 Eylül 2023"
};

const STATS = {
  totalNotes: 12,
  favoriteCategory: "İş",
  lastDate: "26 Eylül 2023"
};

const MOTIVATION = "Her gün bir not, her gün bir adım!";

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const handleAddNote = () => {
    alert("Not ekleme ekranına yönlendirilecek!");
  };

  return (
    <View className={`flex-1 ${isDark ? 'bg-[#18181b]' : 'bg-white'}`}> 
      <ScrollView className="flex-1 px-4 pt-6" contentContainerStyle={{ paddingBottom: 60 }}>
        <ProfileIcon isDark={isDark} />
        <WelcomeCard isDark={isDark} onAddNote={handleAddNote} />
        <CategoriesBar isDark={isDark} />
        <NoteOfTheDay isDark={isDark} note={GUNUN_NOTU} />
        <StatsBar isDark={isDark} stats={STATS} />
        <MotivationQuote isDark={isDark} quote={MOTIVATION} />
      </ScrollView>
    </View>
  );
}

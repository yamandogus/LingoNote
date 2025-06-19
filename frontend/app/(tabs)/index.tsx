import { View, ScrollView, useColorScheme } from "react-native";
import { ProfileIcon } from "@/components/home/ProfileIcon";
import { WelcomeCard } from "@/components/home/WelcomeCard";
import { CategoriesBar } from "@/components/home/CategoriesBar";
import { NoteOfTheDay } from "@/components/home/NoteOfTheDay";
import { StatsBar } from "@/components/home/StatsBar";
import { MotivationQuote } from "@/components/home/MotivationQuote";
import { LinearGradient } from "expo-linear-gradient";

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
    <View className={`flex-1 `}> 
    <LinearGradient
       colors={isDark ? ['#0f0c29', '#120f31', '#16162e'] : ['#e0e0e0', '#bdbdbd', '#757575']}
       style={{ flex: 1 }}
       start={{ x: 0, y: 0 }}
       end={{ x: 1, y: 1 }}
      >
      <ScrollView className="flex-1 px-4 pt-6" contentContainerStyle={{ paddingBottom: 60 }}>
        {/* <ProfileIcon isDark={isDark} /> */}
        <WelcomeCard isDark={isDark} onAddNote={handleAddNote} />
        <CategoriesBar isDark={isDark} />
        <NoteOfTheDay isDark={isDark} note={GUNUN_NOTU} />
        <StatsBar isDark={isDark} stats={STATS} />
        <MotivationQuote isDark={isDark} quote={MOTIVATION} />
      </ScrollView>
      </LinearGradient> 
    </View>
  );
}

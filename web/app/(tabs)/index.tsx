import {
  View,
  ScrollView,
  useColorScheme,
  Platform,
  Image,
  Text,
  BackHandler,
} from "react-native";
import { WelcomeCard } from "@/components/home/WelcomeCard";
import { CategoriesBar } from "@/components/home/CategoriesBar";
import { NoteOfTheDay } from "@/components/home/NoteOfTheDay";
import { StatsBar } from "@/components/home/StatsBar";
import { MotivationQuote } from "@/components/home/MotivationQuote";
import { LinearGradient } from "expo-linear-gradient";
import Header from "@/components/home/Header";
import { useEffect, useState } from "react";
import HomeExit from "@/components/application/homeExit";

const GUNUN_NOTU = {
  title: "Fikirlerim",
  summary: "Bugün aklıma gelen yeni uygulama fikrini not aldım...",
  date: "27 Eylül 2023",
};

const STATS = {
  totalNotes: 12,
  favoriteCategory: "İş",
  lastDate: "26 Eylül 2023",
};

const MOTIVATION = "Her gün bir not, her gün bir adım!";

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const backAction = () => {
      setShowModal(true);
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, []);

  // useEffect(() => {
  //   const backAction = () => {
  //     Alert.alert('Hold on!', 'Are you sure you want to go back?', [
  //       {
  //         text: 'Cancel',
  //         onPress: () => null,
  //         style: 'cancel',
  //       },
  //       {text: 'YES', onPress: () => BackHandler.exitApp()},
  //     ]);
  //     return true;
  //   };
  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     backAction,
  //   );

  //   return () => backHandler.remove();
  // }, []);

  const gradientColors = isDark
    ? ["#1a1a2e", "#16213e", "#0f3460"]
    : ["#f8f9fa", "#e9ecef", "#dee2e6"];

  // Günün kelimesi ve not alma ipucu
  const WORD_OF_DAY = {
    word: "İlham",
    meaning: "Bir şeyi yapma isteği ve motivasyonu.",
  };
  const TIP =
    "Kısa notlar almak, fikirlerini daha hızlı ve etkili şekilde yakalamanı sağlar.";

  return (
    <View className={`flex-1`}>
      <HomeExit showModal={showModal} setShowModal={setShowModal} />
      <LinearGradient
        colors={gradientColors as [string, string, string]}
        style={{ flex: 1 }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {Platform.OS === "android" && <View style={{ height: 32 }} />}
        <ScrollView
          className="flex-1 px-4 pt-6"
          contentContainerStyle={{ paddingBottom: 120 }}
        >
          <Header />
          <View className="flex-col text-center bg-[#ffffef] rounded-xl mb-6">
            <Text className="italic font-bold text-[24px] text-center">
              LİNGONOTE
            </Text>
            <View className="flex-row mb-4 rounded-md">
              <Image
                className="flex-1 rounded-lg mr-2"
                style={{ height: 220 }}
                resizeMode="contain"
                source={require("../../assets/images/homePage.png")}
              />
              <Image
                className="flex-1 rounded-lg"
                style={{ height: 220 }}
                resizeMode="contain"
                source={require("../../assets/images/homePage2.png")}
              />
            </View>
          </View>

          {/* Günün Kelimesi */}
          <View
            className={`rounded-xl mb-4 px-4 py-3 ${isDark ? "bg-[#232946]" : "bg-[#e0e7ff]"}`}
            style={{
              shadowColor: isDark ? "#232946" : "#e0e7ff",
              shadowOpacity: 0.08,
              shadowRadius: 6,
              elevation: 2,
            }}
          >
            <Text
              className={`font-bold text-lg ${isDark ? "text-[#eebbc3]" : "text-[#232946]"}`}
            >
              Günün Kelimesi
            </Text>
            <Text
              className={`mt-1 text-base ${isDark ? "text-gray-200" : "text-gray-700"}`}
            >
              {WORD_OF_DAY.word}
            </Text>
            <Text
              className={`text-sm italic ${isDark ? "text-gray-400" : "text-gray-500"}`}
            >
              {WORD_OF_DAY.meaning}
            </Text>
          </View>

          {/* Not Alma İpucu */}
          <View
            className={`rounded-xl mb-4 px-4 py-3 ${isDark ? "bg-gray-900" : "bg-[#fffbe6]"}`}
            style={{
              shadowColor: isDark ? "#111" : "#fffbe6",
              shadowOpacity: 0.08,
              shadowRadius: 6,
              elevation: 2,
            }}
          >
            <Text
              className={`font-bold text-lg ${isDark ? "text-yellow-300" : "text-yellow-700"}`}
            >
              Not Alma İpucu
            </Text>
            <Text
              className={`mt-1 text-base ${isDark ? "text-gray-200" : "text-gray-700"}`}
            >
              {TIP}
            </Text>
          </View>

          <WelcomeCard isDark={isDark} />
          <CategoriesBar isDark={isDark} />
          <NoteOfTheDay isDark={isDark} note={GUNUN_NOTU} />
          <StatsBar isDark={isDark} stats={STATS} />
          <MotivationQuote isDark={isDark} quote={MOTIVATION} />
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

import {
  View,
  ScrollView,
  useColorScheme,
  Platform,
  Image,
  Text,
  Alert,
  BackHandler,
} from "react-native";
import { WelcomeCard } from "@/components/home/WelcomeCard";
import { CategoriesBar } from "@/components/home/CategoriesBar";
import { NoteOfTheDay } from "@/components/home/NoteOfTheDay";
import { StatsBar } from "@/components/home/StatsBar";
import { MotivationQuote } from "@/components/home/MotivationQuote";
import { LinearGradient } from "expo-linear-gradient";
import Header from "@/components/home/Header";
import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
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
  const [showModal, setShowModal] = useState(false)

  useEffect(()=>{
  const backAction = () =>{
    setShowModal(true);
    return true;
  }
  const backHandler = BackHandler.addEventListener(
    "hardwareBackPress",
    backAction
  )
  return () => backHandler.remove();
  }, [])


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

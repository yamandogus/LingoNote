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
import { Ionicons } from "@expo/vector-icons";
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
          className="flex-1 px-5 pt-6"
          contentContainerStyle={{ paddingBottom: 140 }}
          showsVerticalScrollIndicator={false}
        >
          <Header />
          
          {/* Modern Brand Section */}
          <View 
            className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl mb-8 overflow-hidden"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.1,
              shadowRadius: 20,
              elevation: 8,
            }}
          >
            {/* Brand Header */}
            <View className="flex-row items-center justify-center pt-6 pb-4">
              <View 
                className="w-12 h-12 bg-orange-500 rounded-2xl items-center justify-center mr-3"
                style={{
                  shadowColor: "#f97316",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                  elevation: 6,
                }}
              >
                <Ionicons name="book" size={24} color="white" />
              </View>
              <View>
                <Text className="text-3xl font-bold text-gray-900 dark:text-white">
                  LİNGONOTE
                </Text>
                <Text className="text-sm text-gray-600 dark:text-gray-300">
                  Fikirlerinizin dijital evi
                </Text>
              </View>
            </View>
            
            {/* Keep original image layout */}
            <View className="flex-row mb-4 rounded-md px-4">
              <Image
                className="flex-1 rounded-xl mr-2"
                style={{ height: 220, borderRadius: 12 }}
                resizeMode="contain"
                source={require("../../assets/images/homePage.png")}
              />
              <Image
                className="flex-1 rounded-xl"
                style={{ height: 220, borderRadius: 12 }}
                resizeMode="contain"
                source={require("../../assets/images/homePage2.png")}
              />
            </View>
            
            {/* Quick Stats */}
            <View className="flex-row justify-around py-4 border-t border-gray-200/50 dark:border-gray-600/50">
              <View className="items-center">
                <Text className="text-2xl font-bold text-orange-500">100+</Text>
                <Text className="text-xs text-gray-600 dark:text-gray-300">Kullanıcı</Text>
              </View>
              <View className="items-center">
                <Text className="text-2xl font-bold text-blue-500">500+</Text>
                <Text className="text-xs text-gray-600 dark:text-gray-300">Not</Text>
              </View>
              <View className="items-center">
                <Text className="text-2xl font-bold text-green-500">24/7</Text>
                <Text className="text-xs text-gray-600 dark:text-gray-300">Erişim</Text>
              </View>
            </View>
          </View>

          {/* Modern Word of the Day */}
          <View
            className="rounded-3xl mb-6 p-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.1,
              shadowRadius: 20,
              elevation: 8,
            }}
          >
            <View className="flex-row items-center mb-4">
              <View 
                className="w-12 h-12 bg-purple-500 rounded-2xl items-center justify-center mr-4"
                style={{
                  shadowColor: "#8b5cf6",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                  elevation: 6,
                }}
              >
                <Ionicons name="library" size={24} color="white" />
              </View>
              <View className="flex-1">
                <Text className="text-xl font-bold text-gray-900 dark:text-white">
                  Günün Kelimesi
                </Text>
                <Text className="text-sm text-gray-500 dark:text-gray-400">
                  Bugünün ilham verici kelimesi
                </Text>
              </View>
            </View>
            <View 
              className="bg-purple-50 dark:bg-purple-900/30 rounded-2xl p-4"
              style={{
                borderWidth: 1,
                borderColor: isDark ? "#8b5cf650" : "#8b5cf620",
              }}
            >
              <Text className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                {WORD_OF_DAY.word}
              </Text>
              <Text className="text-base text-gray-700 dark:text-gray-300">
                {WORD_OF_DAY.meaning}
              </Text>
            </View>
          </View>

          {/* Modern Tip Section */}
          <View
            className="rounded-3xl mb-6 p-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.1,
              shadowRadius: 20,
              elevation: 8,
            }}
          >
            <View className="flex-row items-center mb-4">
              <View 
                className="w-12 h-12 bg-yellow-500 rounded-2xl items-center justify-center mr-4"
                style={{
                  shadowColor: "#eab308",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                  elevation: 6,
                }}
              >
                <Ionicons name="bulb" size={24} color="white" />
              </View>
              <View className="flex-1">
                <Text className="text-xl font-bold text-gray-900 dark:text-white">
                  Not Alma İpucu
                </Text>
                <Text className="text-sm text-gray-500 dark:text-gray-400">
                  Daha etkili not almak için
                </Text>
              </View>
            </View>
            <View 
              className="bg-yellow-50 dark:bg-yellow-900/30 rounded-2xl p-4"
              style={{
                borderWidth: 1,
                borderColor: isDark ? "#eab30850" : "#eab30820",
              }}
            >
              <Text className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                {TIP}
              </Text>
            </View>
          </View>

          {/* Enhanced Components Section */}
          <View className="space-y-6">
            <WelcomeCard isDark={isDark} />
            <CategoriesBar isDark={isDark} />
            <NoteOfTheDay isDark={isDark} note={GUNUN_NOTU} />
            <StatsBar isDark={isDark} stats={STATS} />
            <MotivationQuote isDark={isDark} quote={MOTIVATION} />
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

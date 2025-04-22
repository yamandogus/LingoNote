import { View, Text, Pressable } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import PagerView from "react-native-pager-view";
import { useRef, useState } from "react";
import NoteAdd from "@/components/notes/noteAdd";
import Categories from "@/components/notes/categories";
import LottieView from "lottie-react-native";
import MyNotes from "@/components/notes/myNotes";
import Todos from "@/components/notes/todos";
import Assignments from "@/components/notes/assignments";
import ProjectNotes from "@/components/notes/projectNotes";
import Other from "@/components/notes/other";

export default function ExploreScreen() {
  const [currentPage, setCurrentPage] = useState(0);
  const animationRef1 = useRef<LottieView>(null);
  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-white dark:bg-gray-800">
        <View style={{ flex: 1 }}>
          <View style={{ padding: 16 }}>
            <Text className="text-center font-bold text-2xl rounded-lg bg-[#FDE68A] border-l-2 border-r-2 dark:border-white py-2 px-4">
              📝 Notlarım
            </Text>
          </View>
          <View>
            {currentPage === 0 && (
              <LottieView
                ref={animationRef1}
                style={{ width: "30%", height: 150, alignSelf: "center" }}
                source={require("../../assets/notes.json")}
                autoPlay={true}
                loop
                speed={1}
                resizeMode="cover"
              />
            )}
          </View>
          <PagerView
            style={{ flex: 1 }}
            initialPage={0}
            onPageSelected={(e) => setCurrentPage(e.nativeEvent.position)}
          >
            <View key="1">
              <Text className="text-xl font-bold text-center mt-5 dark:text-white">
                Kategoriler
              </Text>
              <Categories />
            </View>
            <View key="2">
              <Pressable
                onPress={() => setCurrentPage(2)}
                className="text-xl font-bold text-center mt-5 dark:text-white"
              >
                <Text className="text-xl font-bold text-center mt-5 dark:text-white">
                  Not Ekle
                </Text>
              </Pressable>
              <NoteAdd />
            </View>
            <View key="3">
              <Pressable
                onPress={() => setCurrentPage(3)}
                className="text-xl font-bold text-center mt-5 dark:text-white"
              >
                <Text className="text-2xl font-bold text-center mt-5 dark:text-white">
                  {" "}
                  Genel Notlarım
                </Text>
              </Pressable>
              <MyNotes />
            </View>
            <View key="4">
              <Pressable
                onPress={() => setCurrentPage(4)}
                className="text-xl font-bold text-center mt-5 dark:text-white"
              >
                <Text className="text-2xl font-bold text-center mt-5 dark:text-white">
                  Yapılacaklar
                </Text>
              </Pressable>
              <Todos />
            </View>
            <View key="5">
              <Pressable
                onPress={() => setCurrentPage(5)}
                className="text-xl font-bold text-center mt-5 dark:text-white"
              >
                <Text className="text-2xl font-bold text-center mt-5 dark:text-white">
                  Ödevler
                </Text>
              </Pressable>
              <Assignments />
            </View>
            <View key="6">
              <Pressable
                onPress={() => setCurrentPage(6)}
                className="text-xl font-bold text-center mt-5 dark:text-white"
              >
                <Text className="text-2xl font-bold text-center mt-5 dark:text-white">
                  Proje Notları
                </Text>
              </Pressable>
              <ProjectNotes />
            </View>
            <View key="7">
              <Pressable
                onPress={() => setCurrentPage(7)}
                className="text-xl font-bold text-center mt-5 dark:text-white"
              >
                <Text className="text-2xl font-bold text-center mt-5 dark:text-white">
                  Diğer
                </Text>
              </Pressable>
              <Other />
            </View>
          </PagerView>
          <View className="flex-row justify-center items-center mb-5">
            {[...Array(7)].map((_, index) => (
              <View
                key={index}
                className={`w-2.5 h-2.5 rounded-full mx-1 ${
                  currentPage === index ? "bg-blue-500 w-3 h-3" : "bg-gray-300"
                }`}
              />
            ))}
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

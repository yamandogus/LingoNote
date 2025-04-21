import { View, Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import PagerView from "react-native-pager-view";
import { useRef, useState } from "react";
import NoteAdd from "@/components/notes/noteAdd";
import Categories from "@/components/notes/categories";
import LottieView from "lottie-react-native";

export default function ExploreScreen() {
  const [currentPage, setCurrentPage] = useState(0);
  const animationRef1 = useRef<LottieView>(null);
  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-white dark:bg-gray-800">
        <View style={{ flex: 1 }}>
          <View style={{ padding: 16 }}>
            <Text
              className="text-center font-bold text-2xl rounded-lg bg-[#FDE68A] border-l-2 border-r-2 py-2 px-4"
            >
              📝 Notlarım
            </Text>
          </View>
          <View>
          <LottieView
            ref={animationRef1}
            style={{ width: "30%", height: 150, alignSelf: "center" }}
            source={require("../../assets/notes.json")}
            autoPlay={true}
            loop
            speed={1}
            resizeMode="cover"
          />
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
            <Text className="text-xl font-bold text-center mt-5 dark:text-white">
                Not Ekle
              </Text>
              <NoteAdd />
            </View>
          </PagerView>


          <View className="flex-row justify-center items-center mb-5">
            <View
              className={`w-2.5 h-2.5 rounded-full mx-1 ${
                currentPage === 0 ? "bg-blue-500 w-3 h-3" : "bg-gray-300"
              }`}
            />
            <View
              className={`w-2.5 h-2.5 rounded-full mx-1 ${
                currentPage === 1 ? "bg-blue-500 w-3 h-3" : "bg-gray-300"
              }`}
            />
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

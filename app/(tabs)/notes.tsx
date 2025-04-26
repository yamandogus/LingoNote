import { View, Text, Pressable, TouchableOpacity } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import PagerView from "react-native-pager-view";
import { useRef, useState } from "react";
import NoteAdd from "@/components/notes/noteAdd";
import Categories from "@/components/notes/categories";
import MyNotes from "@/components/notes/myNotes";
import Todos from "@/components/notes/todos";
import Assignments from "@/components/notes/assignments";
import ProjectNotes from "@/components/notes/projectNotes";
import Other from "@/components/notes/other";
import { Ionicons } from "@expo/vector-icons";

export default function ExploreScreen() {
  const [currentPage, setCurrentPage] = useState(0);
  const pagerRef = useRef<PagerView>(null);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    pagerRef.current?.setPage(page);
  };

  const handleBackToCategories = () => {
    setCurrentPage(0);
    pagerRef.current?.setPage(0);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-white dark:bg-gray-800">
        <View style={{ flex: 1 }}>
          <View style={{ padding: 16, flexDirection: "row", alignItems: "center" }}>
            {currentPage !== 0 && (
              <TouchableOpacity
                onPress={handleBackToCategories}
                style={{ position: "absolute", left: 16, zIndex: 10 }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Ionicons name="arrow-back" size={24} color="#4B5563" className="ml-2 bg-white rounded-lg px-4 py-1"/>
                </View>
              </TouchableOpacity>
            )}
            <Text className="text-center font-bold text-2xl rounded-lg bg-[#FDE68A] border-l-2 border-r-2 dark:border-white py-2 px-4 flex-1">
              📝{" "}
              {currentPage === 0
                ? "Notlarınızı Özelleştirin"
                : currentPage === 1
                ? "Not Ekle"
                : currentPage === 2
                ? "Genel Notlarım"
                : currentPage === 3
                ? "Yapılacaklar"
                : currentPage === 4
                ? "Ödevler"
                : currentPage === 5
                ? "Proje Notları"
                : "Diğer"}
            </Text>
          </View>
          <PagerView
            ref={pagerRef}
            style={{ flex: 1 }}
            initialPage={0}
            onPageSelected={(e) => setCurrentPage(e.nativeEvent.position)}
          >
            <View key="1">
              <Categories setCurrentPage={handlePageChange} />
            </View>
            <View key="2">
              <NoteAdd />
            </View>
            <View key="3">
              <MyNotes />
            </View>
            <View key="4">
              <Todos />
            </View>
            <View key="5">
              <Assignments />
            </View>
            <View key="6">
              <ProjectNotes />
            </View>
            <View key="7">
              <Other />
            </View>
          </PagerView>
          <View className="flex-row justify-center items-center mb-2 pt-2">
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

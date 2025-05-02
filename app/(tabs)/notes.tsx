import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  ScrollView,
} from "react-native";
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
  const [pageName, setPageName] = useState("📚 Notlarınızı Özelleştirin");
  const pagerRef = useRef<PagerView>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    pagerRef.current?.setPage(page);
  };

  const handleBackToCategories = () => {
    setCurrentPage(0);
    pagerRef.current?.setPage(0);
  };

  const pages = [
    {
      title: "📚 Notlarınızı Özelleştirin",
      component: Categories,
    },
    {
      title: "✏️ Not Ekle",
      component: NoteAdd,
    },
    {
      title: "📋 Genel Notlarım",
      component: MyNotes,
    },
    {
      title: "✅ Yapılacaklar",
      component: Todos,
    },
    {
      title: "📝 Ödevler",
      component: Assignments,
    },
    {
      title: "🔍 Proje Notları",
      component: ProjectNotes,
    },
    {
      title: "📎 Diğer",
      component: Other,
    },
  ];

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1  bg-white dark:bg-gray-800 pt-4">
        <View className="flex-1">
          <View className="flex-row justify-center items-center mb-2 pt-2">
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              ref={scrollViewRef}
            >
              {pages.map((page, index) => (
                <TouchableOpacity
                  className={`flex-1 mx-2 px-4 py-2 rounded-full ${
                    pageName === page.title ? 'bg-blue-500' : 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700'
                  }`}
                  key={index}
                  onPress={() => {
                    setPageName(page.title);
                    handlePageChange(index);
                    scrollViewRef.current?.scrollTo({ x: index * 100, animated: true });
                  }}
                >
                  <Text className={`text-center font-bold text-md ${
                    pageName === page.title ? 'text-white' : 'text-dark dark:text-white'
                  }`}>
                    {page.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          <View className="flex-1">
            {pageName === "📚 Notlarınızı Özelleştirin" && (
              <Categories/>
            )}
            {pageName === "✏️ Not Ekle" && <NoteAdd />}
            {pageName === "📋 Genel Notlarım" && <MyNotes />}
            {pageName === "✅ Yapılacaklar" && <Todos />}
            {pageName === "📝 Ödevler" && <Assignments />}
            {pageName === "🔍 Proje Notları" && <ProjectNotes />}
            {pageName === "📎 Diğer" && <Other />}
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

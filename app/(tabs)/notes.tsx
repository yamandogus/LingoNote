import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useRef, useState } from "react";
import NoteAdd from "@/components/notes/noteAdd";
import Categories from "@/components/notes/categories";
import MyNotes from "@/components/notes/myNotes";
import Todos from "@/components/notes/todos";
import Assignments from "@/components/notes/assignments";
import ProjectNotes from "@/components/notes/projectNotes";
import Other from "@/components/notes/other";
import { noteStore } from "@/store/noteStore";
export default function ExploreScreen() {
  const [pageName, setPageName] = useState("📚 Notlarınızı Özelleştirin");
  const notes = noteStore();
  const scrollViewRef = useRef<ScrollView>(null);

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
      notes: notes.notes.filter((note) => note.category === "Genel Notlarım")
        .length,
    },
    {
      title: "✅ Yapılacaklar",
      component: Todos,
      notes: notes.notes.filter((note) => note.category === "Yapılacaklar")
        .length,
    },
    {
      title: "📝 Ödevler",
      component: Assignments,
      notes: notes.notes.filter((note) => note.category === "Ödevler").length,
    },
    {
      title: "🔍 Proje Notları",
      component: ProjectNotes,
      notes: notes.notes.filter((note) => note.category === "Proje Notları")
        .length,
    },
    {
      title: "📎 Diğer",
      component: Other,
      notes: notes.notes.filter((note) => note.category === "Diğer").length,
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
                  className={`flex-1 flex-row items-center justify-center mx-2 px-4 py-2 rounded-full gap-2 ${
                    pageName === page.title
                      ? "bg-blue-500"
                      : "bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
                  }`}
                  key={index}
                  onPress={() => {
                    setPageName(page.title);
                    scrollViewRef.current?.scrollTo({
                      x: index * 100,
                      animated: true,
                    });
                  }}
                >
                  <Text
                    className={`text-center font-bold text-md ${
                      pageName === page.title
                        ? "text-white"
                        : "text-dark dark:text-white"
                    }`}
                  >
                    {page.title}
                  </Text>
                  <Text
                    className={`text-center text-md font-bold ${
                      pageName === page.title
                        ? "text-white"
                        : "text-dark dark:text-white"
                    } `}
                  >
                    {page.notes}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          <View className="flex-1">
            {pageName === "📚 Notlarınızı Özelleştirin" && <Categories />}
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

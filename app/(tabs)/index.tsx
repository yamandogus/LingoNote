import { router } from "expo-router";
import { View, Text, ScrollView, Pressable, Image, StatusBar } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Animation from "@/components/home/animation";
import Suggestions from "@/components/home/suggestions";

type RouteType = "/(tabs)/notes" | "/(tabs)/favorites" | "/(tabs)/search";

interface SectionType {
  id: number;
  title: string;
  content: string;
  router: RouteType;
  bgColor: string;
  iconName: keyof typeof Ionicons.glyphMap;
}

export default function HomeScreen() {
  const sections: SectionType[] = [
    {
      id: 1,
      title: "Notlar",
      content: "Notlarınızı kaydedin",
      router: "/(tabs)/notes",
      bgColor: "bg-blue-50",
      iconName: "document-outline",
    },
    {
      id: 2,
      title: "Favoriler",
      content: "Favorilerinizi görün",
      router: "/(tabs)/favorites",
      bgColor: "bg-green-50",
      iconName: "heart-outline",
    },
    {
      id: 3,
      title: "Notlarınızı arayın",
      content: "Notlarınızı arayın",
      router: "/(tabs)/search",
      bgColor: "bg-orange-100",
      iconName: "search-outline",
    },
  ];
  const handleNavigation = (route: RouteType) => {
    router.push(route as any);
  };

  return (
    <SafeAreaProvider className="flex-1">
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <ScrollView className="flex-1 bg-white dark:bg-gray-800">
        <SafeAreaView className="flex-1">
          <View className="pt-4">
            <View className="flex-row justify-between items-center mb-8 px-6 ">
              <View className="flex-row items-center">
                <Image
                  source={require("../../assets/avatar.png")}
                  className="w-10 h-10 rounded-full mr-3"
                  defaultSource={require("../../assets/avatar.png")}
                />
                <View>
                  <Text className="text-lg font-semibold dark:text-white">
                    Doğuş
                  </Text>
                  <Text className="text-gray-500 text-xs dark:text-gray-400">
                    Pro Hesap
                  </Text>
                </View>
              </View>

              <Pressable className="p-2 bg-gray-100 rounded-full">
                <Ionicons
                  name="notifications-outline"
                  size={20}
                  color="black"
                />
              </Pressable>
            </View>
            <View className="flex-1 h-72 my-4">
              <Image
                source={require("../../assets/images/LingoNote.png")}
                style={{ width: "100%", height: "110%", borderRadius: 5 }}
              />
            </View>
            <View className="mb-8 px-6 my-10">
              <Text className="text-2xl font-bold dark:text-white">
                Hadi notlarınızı kaydedelim
              </Text>
              <Text className="text-gray-400 dark:text-gray-400">
                kolayca her şeyi notlarınızda kaydedebilirsiniz
              </Text>
            </View>

            <View className="space-y-3 gap-4 px-6 ">
              {sections.map((section) => (
                <Pressable
                  key={section.id}
                  onPress={() => handleNavigation(section.router)}
                  className={`${section.bgColor} p-4 rounded-2xl flex-row items-center justify-between`}
                >
                  <View className="flex-row items-center">
                    <View className="bg-white h-10 w-10 rounded-full items-center justify-center mr-4">
                      <Ionicons
                        name={section.iconName}
                        size={20}
                        color="black"
                      />
                    </View>
                    <View>
                      <Text className="font-semibold">{section.title}</Text>
                      <Text className="text-gray-600 text-sm">
                        {section.content}
                      </Text>
                    </View>
                  </View>
                  <Ionicons
                    name="chevron-forward-outline"
                    size={20}
                    color="black"
                  />
                </Pressable>
              ))}
            </View>
          </View>

          <View className="flex-1">
            <View className="px-6 pt-4 text-black dark:text-white">
              <Animation />
              <Suggestions />
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </SafeAreaProvider>
  );
}

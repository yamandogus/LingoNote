import { router } from "expo-router";
import { View, Text, ScrollView, Pressable, Image } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Animation from "@/components/home/animation";

type RouteType = "/(tabs)/notes" | "/(tabs)/translate";

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
      title: "Çeviri",
      content: "Çeviri yapın",
      router: "/(tabs)/translate",
      bgColor: "bg-green-50",
      iconName: "language-outline",
    },
    {
      id: 3,
      title: "Çeviri Yapay Zeka",
      content: "Yapay zekayı kolayca kullan",
      router: "/(tabs)/translate",
      bgColor: "bg-orange-100",
      iconName: "sparkles-outline",
    },
  ];

  const handleNavigation = (route: RouteType) => {
    router.push(route);
  };

  return (
    <SafeAreaProvider className="flex-1">
      <ScrollView className="flex-1 bg-white dark:bg-gray-800">
        <SafeAreaView className="flex-1">
          <View className="px-6 pt-4">
            <View className="flex-row justify-between items-center mb-8">
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

            <View className="mb-8">
              <Text className="text-2xl font-bold dark:text-white">
                Hadi çevirelim
              </Text>
              <Text className="text-gray-400 dark:text-gray-400">
                kolayca her şeyi
              </Text>
            </View>

            <View className="space-y-3 gap-4">
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
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </SafeAreaProvider>
  );
}

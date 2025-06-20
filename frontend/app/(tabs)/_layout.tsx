import { Tabs, useNavigation } from "expo-router";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";


export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const backgroundColor = isDark ? "#121212" : "#ffffff";
  const headerBackground = isDark ? "#1a1a1a" : "#ffffff";

  const navigation = useNavigation() as any;


  const commonHeaderOptions = {
    headerStyle: {
      backgroundColor: headerBackground,
      height: 80,
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0,
    },
    headerTitleStyle: {
      fontSize: 16,
      fontWeight: '500' as const,
      color: isDark ? "#ffffff" : "#000000",
    },
    headerTitleAlign: "left" as const,
    headerShadowVisible: false,
    contentStyle: { backgroundColor },
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarShowLabel: false,
        headerBackground: () => (
          <LinearGradient
            colors={isDark ? ['#0f0c29', '#120f31', '#16162e'] : ['#e0e0e0', '#bdbdbd', '#757575']}
            style={{ flex: 1 }}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
        ),
        tabBarStyle: {
          height: 60,
          paddingTop: 10,
          paddingHorizontal: 10,
          borderRadius: 30,
          marginHorizontal: 20,
          marginBottom: 25,
          position: "absolute",
          bottom: 0,
          borderTopWidth: 0,
          borderWidth: 1,
          borderColor: isDark ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)",
          shadowColor: isDark ? "#ffffff" : "#000000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          ...commonHeaderOptions,
          // headerShown: true,
          // headerTitle: "Ana Sayfa",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={28}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="stats"
        options={{
          ...commonHeaderOptions,
          // headerShown: true,
          // headerTitle: "İstatistikler",
          headerLeft: () => (
            <TouchableOpacity
              className="ml-4"
              onPress={() => navigation.navigate("(tabs)", { screen: "index" })}
            >
              <Ionicons
                name="arrow-back"
                size={24}
                color={Colors[colorScheme ?? "light"].tint}
              />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "bar-chart" : "bar-chart-outline"}
              size={28}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="add-note"
        options={{
          ...commonHeaderOptions,
          // headerShown: true,
          // headerTitle: "Not Ekle",
          headerLeft: () => (
            <TouchableOpacity
              className="ml-4"
              onPress={() => navigation.navigate("(tabs)", { screen: "index" })}
            >
              <Ionicons
                name="arrow-back"
                size={24}
                color={Colors[colorScheme ?? "light"].tint}
              />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "add-circle" : "add-circle-outline"}
              size={30}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="my-notes"
        options={{
          ...commonHeaderOptions,
          // headerShown: true,
          // headerTitle: "Notlarım",
          headerLeft: () => (
            <TouchableOpacity
              className="ml-4"
              onPress={() => navigation.navigate("(tabs)", { screen: "index" })}
            >
              <Ionicons
                name="arrow-back"
                size={24}
                color={Colors[colorScheme ?? "light"].tint}
              />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "book" : "book-outline"}
              size={28}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          ...commonHeaderOptions,
          // headerShown: true,
          // headerTitle: "Profil",
          headerLeft: () => (
            <TouchableOpacity
              className="ml-4"
              onPress={() => navigation.navigate("(tabs)", { screen: "index" })}
            >
              <Ionicons
                name="arrow-back"
                size={24}
                color={Colors[colorScheme ?? "light"].tint}
              />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={28}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}

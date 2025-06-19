import { Tabs } from "expo-router";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { TouchableOpacity } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        headerTitle: "",
        tabBarShowLabel: false,
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
          borderColor: isDark
            ? "rgba(255, 255, 255, 0.2)"
            : "rgba(0, 0, 0, 0.2)",
          backgroundColor: isDark ? "#1a1a1a" : "#ffffff",
          shadowColor: isDark ? "#ffffff" : "#000000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: true,
          headerTitle: "Ana Sayfa",
          headerTitleStyle: {
            fontSize: 14,
            fontWeight: "bold",
            // marginLeft: 16,
          },
          headerStyle: {
            height: 70,
          },
          headerTitleAlign: "left",
          headerShadowVisible: false,
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
          headerShown: true,
          headerLeft: () => (
            <TouchableOpacity
            className="ml-4"
              onPress={() => {
                /* handle back press */
              }}
            >
              <Ionicons
                name="arrow-back"
                size={24}
                color={Colors[colorScheme ?? "light"].tint}
              />
            </TouchableOpacity>
          ),
          headerTitle: "İstatistikler",
          headerTitleAlign: "left",
         
          headerTitleStyle: {
            marginLeft: 16,
            fontSize: 14,
            fontWeight: "bold",
          },
          headerStyle: {
            height: 80,
          },
          headerShadowVisible: false,
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
          headerShown: true,
          headerTitle: "Not Ekle",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                /* handle back press */
              }}
              className="ml-4"
            >
              <Ionicons
                name="arrow-back"
                size={24}
                color={Colors[colorScheme ?? "light"].tint}
              />
            </TouchableOpacity>
          ),
          headerTitleStyle: {
            fontSize: 14,
            marginLeft: 16,
            fontWeight: "bold",
          },
          headerStyle: {
            height: 80,
          },
          headerShadowVisible: false,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "add-circle" : "add-circle-outline"}
              size={28}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="my-notes"
        options={{
          headerShown: true,
          headerTitle: "Notlarım",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                /* handle back press */
              }}
              className="ml-4"
            >
              <Ionicons
                name="arrow-back"
                size={24}
                color={Colors[colorScheme ?? "light"].tint}
              />
            </TouchableOpacity>
          ),
          headerTitleStyle: {
            fontSize: 14,
            marginLeft: 16,
            fontWeight: "bold",
          },
          headerStyle: {
            height: 80,
          },
          headerShadowVisible: false,
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
          headerShown: true,
          headerTitle: "Profil",
          headerLeft: () => (
            <TouchableOpacity
              className="ml-4"
              onPress={() => {
                /* handle back press */
              }}
            >
              <Ionicons
                name="arrow-back"
                size={24}
                color={Colors[colorScheme ?? "light"].tint}
              />
            </TouchableOpacity>
          ),
          headerTitleStyle: {
            fontSize: 14,
            marginLeft: 16,
            fontWeight: "bold",
          },
          headerStyle: {
            height: 80, 
          },
          headerShadowVisible: false,
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

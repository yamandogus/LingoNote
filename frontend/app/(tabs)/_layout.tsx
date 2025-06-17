import { Tabs } from "expo-router";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  


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
          },
          headerStyle: {
            height: 80,
          },
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
          headerTitle: "İstatistikler",
          headerTitleStyle: {
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
          headerTitleStyle: {
            fontSize: 14,
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
          headerTitleStyle: {
            fontSize: 14,
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
          headerTitleStyle: {
            fontSize: 14,
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

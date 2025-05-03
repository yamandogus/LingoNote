import { Tabs } from "expo-router";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Animated, useColorScheme } from "react-native";
import { View } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const tabs = [
    {
      name: "index",
      title: "Ana Sayfa",
      focusedIcon: "home" as const,
      unfocusedIcon: "home-outline" as const,
    },
    {
      name: "notes",
      title: "Notlarım",
      focusedIcon: "document-text" as const,
      unfocusedIcon: "document-text-outline" as const,
    },
    {
      name: "favorites",
      title: "Favoriler",
      focusedIcon: "heart" as const,
      unfocusedIcon: "heart-outline" as const,
    },
    {
      name: "search",
      title: "Ara",
      focusedIcon: "search" as const,
      unfocusedIcon: "search-outline" as const,
    },
  ];

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: isDark ? "#60A5FA" : "#2563EB",
        tabBarInactiveTintColor: isDark ? "#94A3B8" : "#64748B",
        tabBarStyle: {
          backgroundColor: isDark ? "#1F2937" : "#FFFFFF",
          borderTopWidth: 0,
          elevation: 0,
          shadowColor: "transparent",
          height: 50,
          marginBottom: 2,
          borderBottomColor: "transparent",
        },
        tabBarLabelStyle: {
          fontWeight: "600",
          fontSize: 12,
          letterSpacing: 0.3,
          marginTop: -2,
        },
        tabBarIconStyle: {
          marginTop: 2,
        },
        headerShown: false,
      }}
    >
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name={focused ? tab.focusedIcon : tab.unfocusedIcon}
                size={24}
                color={focused ? "#60A5FA" : "#94A3B8"}
              />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}

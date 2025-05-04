import { Tabs } from "expo-router";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "react-native";
import { View } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";


  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: isDark ? "#60A5FA" : "#2563EB",
        tabBarInactiveTintColor: isDark ? "#94A3B8" : "#64748B",
        tabBarStyle: {
          backgroundColor: isDark ? "#1F2937" : "#FFFFFF",
          borderTopWidth: 0.4,
          elevation: 0,
          shadowColor: "transparent",
          height: 60,
          paddingHorizontal: 10,
          paddingBottom: 10,
          borderBottomColor: "transparent",
        },
        tabBarLabelStyle: {
          fontWeight: "600",
          fontSize: 12,
          letterSpacing: 0.4,
          marginTop: -2,
        },
        tabBarIconStyle: {
          marginTop: 4,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        key={"index"}
        name={"index"}
        options={{
          title: "Ana Sayfa",
          tabBarIcon: ({ focused, color }) => (
            <View className="flex-1 items-center justify-center">
              {focused && (
                <View
                  className={`absolute bottom-[-16px] w-[200%] h-1 rounded-full ${
                    isDark ? "bg-blue-500" : "bg-blue-500"
                  }`}
                />
              )}
              <Ionicons name={focused ? "home" : "home-outline"} size={24} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        key={"notes"}
        name={"notes"}
        options={{
          title: "Notlarım",
          tabBarIcon: ({ focused, color }) => (
            <View className="flex-1 items-center justify-center">
              {focused && (
                <View
                  className={`absolute bottom-[-16px] w-[200%] h-1 rounded-full ${
                    isDark ? "bg-blue-500" : "bg-blue-500"
                  }`}
                />
              )}
              <Ionicons name={focused ? "document-text" : "document-text-outline"} size={24} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        key={"noteAdded"}
        name={"noteAdded"}
        options={{
          title: "",
          tabBarIcon: ({ focused, color }) => (
            <View style={{
              position: 'absolute',
              bottom: 1,
              width: 55,
              height: 55,
              borderRadius: 28,
              backgroundColor: isDark ? "#FFFFFF" : "#1F2937",
              justifyContent: 'center',
              alignItems: 'center',
              elevation: 8,
              shadowColor: isDark ? "#e9e9e9" : "#242323",
              shadowOffset: {
                width: 0,
                height: 4,
              },
              shadowOpacity: 0.30,
              shadowRadius: 0,
            }}>
              <Ionicons name="add" size={30} color={isDark ? "#1F2937" : "#FFFFFF"} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        key={"favorites"}
        name={"favorites"}
        options={{
          title: "Favoriler",
          tabBarIcon: ({ focused, color }) => (
            <View className="flex-1 items-center justify-center">
              {focused && (
                <View
                  className={`absolute bottom-[-16px] w-[200%] h-1 rounded-full ${
                    isDark ? "bg-blue-500" : "bg-blue-500"
                  }`}
                />
              )}
              <Ionicons name={focused ? "heart" : "heart-outline"} size={24} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        key={"search"}
        name={"search"}
        options={{
          title: "Ara",
          tabBarIcon: ({ focused, color }) => (
            <View className="flex-1 items-center justify-center">
              {focused && (
                <View
                  className={`absolute bottom-[-16px] w-[200%] h-1 rounded-full ${
                    isDark ? "bg-blue-500" : "bg-blue-500"
                  }`}
                />
              )}
              <Ionicons name={focused ? "search" : "search-outline"} size={24} color={color} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

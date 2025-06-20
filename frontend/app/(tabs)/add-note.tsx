import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { KATEGORILER } from "./my-notes";
const COLORS = [
  "#A7C7E7", // soft blue
  "#B7E5B4", // soft green
  "#FFF6B7", // soft yellow
  "#FFD6A5", // soft orange
  "#D7B4F3", // soft lilac
  "#FFB7B2", // soft pink
];

export default function AddNoteScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [selectedColor, setSelectedColor] = useState<string>("#FFB300");
  const [selectedCategory, setSelectedCategory] = useState<string>("Tümü");
  return (
    <View className="flex-1">
      <LinearGradient
        colors={
          isDark
            ? ["#0f0c29", "#120f31", "#16162e"]
            : ["#e0e0e0", "#bdbdbd", "#757575"]
        }
        style={{ flex: 1 }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {Platform.OS === "android" && <View style={{ height: 32 }} />}
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
          <Text className="text-lg font-bold dark:text-gray-200 text-center my-4">
            Not Ekleme Sayfası
          </Text>
          <View className="mx-4 flex-col gap-8">
            <TextInput
              className="rounded-md"
              style={{
                borderWidth: 2,
                borderColor: selectedColor,
                backgroundColor: isDark ? "#444" : "white",
                color: isDark ? "white" : "black",
              }}
              placeholder="Başlık giriniz..."
              placeholderTextColor={isDark ? "white" : "black"}
            />
            <TextInput
              multiline={true}
              numberOfLines={10}
              className="rounded-md"
              style={{
                height: 200,
                textAlignVertical: "top",
                borderWidth: 2,
                borderColor: selectedColor,
                backgroundColor: isDark ? "#444" : "white",
                color: isDark ? "white" : "black",
              }}
              placeholder="Not içeriğini giriniz..."
              placeholderTextColor={isDark ? "white" : "black"}
            />
            <View className="flex-row items-center justify-between my-2">
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 8 }}
              >
                {KATEGORILER.map((kategori, index) => (
                  <TouchableOpacity
                    onPress={() => setSelectedCategory(kategori)}
                    key={index}
                    className={`${selectedCategory === kategori ? "bg-blue-300":"bg-slate-200"} py-2 px-4 font-bold rounded-lg`}
                  >
                    <Text>{kategori}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
            <View className="flex-row items-center justify-center gap-2 ml-2">
              {COLORS.map((color) => (
                <TouchableOpacity
                  key={color}
                  onPress={() => setSelectedColor(color)}
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 14,
                    backgroundColor: color,
                    borderWidth: selectedColor === color ? 3 : 1,
                    borderColor: selectedColor === color ? "#222" : "#ccc",
                    marginLeft: 4,
                  }}
                />
              ))}
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

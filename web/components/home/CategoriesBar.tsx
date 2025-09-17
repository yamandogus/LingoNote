import { View, Text, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const KATEGORILER = [
  {
    name: "Tümü",
    color: "#2563eb",
    icon: "home-outline",
    iconPack: "Ionicons",
  },
  {
    name: "İş",
    color: "#2563eb",
    icon: "briefcase-outline",
    iconPack: "Ionicons",
  },
  {
    name: "Kişisel",
    color: "#22c55e",
    icon: "person-circle-outline",
    iconPack: "Ionicons",
  },
  {
    name: "Eğitim",
    color: "#a21caf",
    icon: "school-outline",
    iconPack: "Ionicons",
  },
  {
    name: "Sağlık",
    color: "#eab308",
    icon: "medkit-outline",
    iconPack: "Ionicons",
  },
  {
    name: "Fikirler",
    color: "#f97316",
    icon: "bulb-outline",
    iconPack: "Ionicons",
  },
];

interface CategoriesBarProps {
  isDark: boolean;
}

export function CategoriesBar({ isDark }: CategoriesBarProps) {
  return (
    <View>
      <Text
        className={`text-lg font-bold mb-3 ${isDark ? "text-white" : "text-gray-900"}`}
      >
        Kategoriler
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="flex-row my-2"
      >
        {KATEGORILER.map((cat) => (
          <View
            key={cat.name}
            style={{
              alignItems: "center",
              marginRight: 16,
            }}
          >
            <View
              style={{
                backgroundColor: cat.color,
                borderRadius: 18,
                padding: 18,
                marginBottom: 8,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.12,
                shadowRadius: 6,
                elevation: 4,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons name={cat.icon as any} size={28} color="#fff" />
            </View>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
                color: isDark ? "#e5e7eb" : "#374151",
                letterSpacing: 0.2,
              }}
            >
              {cat.name}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

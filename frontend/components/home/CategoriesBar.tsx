import { View, Text, ScrollView, Image } from "react-native";

const KATEGORILER = [
  { name: "İş", color: "#2563eb", icon: require('@/assets/images/icon.png') },
  { name: "Kişisel", color: "#22c55e", icon: require('@/assets/images/icon.png') },
  { name: "Eğitim", color: "#a21caf", icon: require('@/assets/images/icon.png') },
  { name: "Sağlık", color: "#eab308", icon: require('@/assets/images/icon.png') },
  { name: "Fikirler", color: "#f97316", icon: require('@/assets/images/icon.png') },
];

interface CategoriesBarProps {
  isDark: boolean;
}

export function CategoriesBar({ isDark }: CategoriesBarProps) {
  return (
    <View>
      <Text className={`text-lg font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>Kategoriler</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row mb-2">
        {KATEGORILER.map((cat) => (
          <View
            key={cat.name}
            className="items-center mr-4"
          >
            <View style={{ backgroundColor: cat.color, borderRadius: 16, padding: 14, marginBottom: 6 }}>
              <Image source={cat.icon} style={{ width: 28, height: 28 }} />
            </View>
            <Text className={`text-xs font-semibold ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>{cat.name}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
} 
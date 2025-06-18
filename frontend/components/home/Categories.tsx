import { View, Text, ScrollView } from "react-native";

interface CategoriesProps {
  isDark: boolean;
}

const categories = [
  { name: "İş", color: "blue" },
  { name: "Kişisel", color: "green" },
  { name: "Eğitim", color: "purple" },
  { name: "Hobiler", color: "yellow" },
  { name: "Sağlık", color: "red" },
];

export function Categories({ isDark }: CategoriesProps) {
  return (
    <View className="mt-8 mb-8">
      <Text className={`text-2xl font-bold ${isDark ? 'text-gray-100' : 'text-gray-800'} mb-4`}>
        Kategoriler
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="flex-row space-x-3 gap-5"
      >
        {categories.map((category) => (
          <View
            key={category.name}
            className={`${isDark ? `bg-${category.color}-900` : `bg-${category.color}-100`} p-4 rounded-lg items-center justify-center min-w-[100px]`}
          >
            <Text className={`${isDark ? `text-${category.color}-200` : `text-${category.color}-700`} font-semibold`}>
              {category.name}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
} 
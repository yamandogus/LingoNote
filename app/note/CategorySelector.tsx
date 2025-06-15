import { FontAwesome } from "@expo/vector-icons";
import { Control, Controller } from "react-hook-form";
import { ScrollView, Text, TouchableOpacity, View, useColorScheme } from "react-native";
import { FormData } from "./NoteForm";
import { categories } from "./constants";

interface CategorySelectorProps {
  control: Control<FormData>;
}

export function CategorySelector({ control }: CategorySelectorProps) {
  const colorScheme = useColorScheme();
  const textColor = colorScheme === "dark" ? "text-gray-100" : "text-gray-900";

  return (
    <View className="my-3">
      <Text className={`mb-1 ml-1 font-semibold ${textColor}`}>
        Kategori:
      </Text>
      <Controller
        control={control}
        name="category"
        render={({ field: { onChange, value } }) => (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="my-2"
          >
            <View className="flex-row items-center">
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat.id}
                  onPress={() => onChange(cat.id)}
                  className={`mx-2 rounded-lg flex-row items-center gap-2 border-2 border-black dark:border-white px-4 py-1 ${
                    value === cat.id ? "bg-[#d9f99d]" : "bg-gray-200 dark:bg-gray-700"
                  }`}
                >
                  <FontAwesome
                    name={cat.icon as any}
                    size={20}
                    color={value === cat.id ? "black" : "black"}
                  />
                  <Text
                    className={`font-semibold text-sm ${
                      value === cat.id ? "text-black" : "text-black dark:text-white"
                    }`}
                  >
                    {cat.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        )}
      />
    </View>
  );
} 
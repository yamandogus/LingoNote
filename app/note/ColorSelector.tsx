import { FontAwesome } from "@expo/vector-icons";
import { Control, Controller } from "react-hook-form";
import { Text, TouchableOpacity, View, useColorScheme } from "react-native";
import { FormData } from "./NoteForm";
import { colors } from "./constants";

interface ColorSelectorProps {
  control: Control<FormData>;
}

export function ColorSelector({ control }: ColorSelectorProps) {
  const colorScheme = useColorScheme();
  const textColor = colorScheme === "dark" ? "text-gray-100" : "text-gray-900";

  return (
    <View className="mb-3">
      <Text className={`mb-2 ml-1 font-semibold ${textColor}`}>
        Not rengi:
      </Text>
      <Controller
        control={control}
        name="color"
        rules={{ required: "Rengi seçiniz" }}
        render={({ field: { onChange, value } }) => (
          <View className="flex-row items-center justify-start">
            {colors.map((color) => (
              <View key={color}>
                <TouchableOpacity
                  key={color}
                  onPress={() => onChange(color)}
                  className={`mx-2 ${
                    value === color
                      ? "border-2 border-black dark:border-white"
                      : "border-2 border-transparent"
                  }`}
                  style={{
                    backgroundColor: color,
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                  }}
                />
                {value === color && (
                  <View className="absolute top-2 right-4">
                    <FontAwesome name="check" size={20} color="green" />
                  </View>
                )}
              </View>
            ))}
          </View>
        )}
      />
    </View>
  );
} 
import { FontAwesome } from "@expo/vector-icons";
import { Control, Controller } from "react-hook-form";
import { TouchableOpacity, useColorScheme } from "react-native";
import { FormData } from "./NoteForm";

interface FavoriteButtonProps {
  control: Control<FormData>;
}

export function FavoriteButton({ control }: FavoriteButtonProps) {
  const colorScheme = useColorScheme();

  return (
    <Controller
      control={control}
      name="isFavorite"
      render={({ field: { onChange, value } }) => (
        <TouchableOpacity onPress={() => onChange(!value)}>
          <FontAwesome
            name={value ? "star" : "star-o"}
            size={30}
            color={
              value
                ? "#facc15"
                : colorScheme === "dark"
                  ? "#888"
                  : "#aaa"
            }
          />
        </TouchableOpacity>
      )}
    />
  );
} 
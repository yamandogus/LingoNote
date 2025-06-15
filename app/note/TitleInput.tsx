import { Control, Controller, FieldErrors } from "react-hook-form";
import { Text, TextInput, View, useColorScheme } from "react-native";
import { FormData } from "./NoteForm";

interface TitleInputProps {
  control: Control<FormData>;
  errors: FieldErrors<FormData>;
}

export function TitleInput({ control, errors }: TitleInputProps) {
  const colorScheme = useColorScheme();
  const textColor = colorScheme === "dark" ? "text-gray-100" : "text-gray-900";
  const inputBg = colorScheme === "dark" ? "#222" : "#fff";
  const borderColor = colorScheme === "dark" ? "#444" : "#e5e7eb";

  return (
    <View className="mb-3">
      <Text className={`mb-1 ml-1 text-base font-semibold ${textColor}`}>
        Başlık
      </Text>
      <Controller
        control={control}
        name="title"
        rules={{ required: "Başlık zorunludur" }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            className={`text-base ${textColor}`}
            placeholder="Başlık"
            placeholderTextColor={colorScheme === "dark" ? "#aaa" : "#888"}
            value={value}
            style={{
              backgroundColor: inputBg,
              borderRadius: 10,
              padding: 8,
              borderWidth: 1,
              borderColor: errors.title ? "red" : borderColor,
            }}
            onChangeText={onChange}
          />
        )}
      />
      {errors.title && (
        <Text className="text-red-500 text-sm mt-1">{errors.title.message}</Text>
      )}
    </View>
  );
} 
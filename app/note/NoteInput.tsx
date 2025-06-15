import { Control, Controller } from "react-hook-form";
import { Text, TextInput, View, useColorScheme } from "react-native";
import { FormData } from "./NoteForm";

interface NoteInputProps {
  control: Control<FormData>;
}

export function NoteInput({ control }: NoteInputProps) {
  const colorScheme = useColorScheme();
  const textColor = colorScheme === "dark" ? "text-gray-100" : "text-gray-900";
  const inputBg = colorScheme === "dark" ? "#222" : "#fff";
  const borderColor = colorScheme === "dark" ? "#444" : "#e5e7eb";

  return (
    <View className="mb-3">
      <Text className={`mb-1 ml-1 text-base font-semibold ${textColor}`}>
        Not
      </Text>
      <Controller
        control={control}
        name="note"
        render={({ field: { onChange, value } }) => (
          <View
            style={{
              backgroundColor: control._formValues.color,
              borderRadius: 14,
              padding: 0,
            }}
          >
            <TextInput
              className={`text-base ${textColor}`}
              placeholder="Notunu buraya yaz..."
              placeholderTextColor={colorScheme === "dark" ? "#aaa" : "#888"}
              multiline
              value={value}
              onChangeText={onChange}
              style={{
                backgroundColor: inputBg,
                borderRadius: 10,
                padding: 10,
                borderWidth: 1,
                borderColor: borderColor,
                minHeight: 120,
                textAlignVertical: "top",
              }}
            />
          </View>
        )}
      />
    </View>
  );
} 
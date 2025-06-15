import { ThemedView } from "@/components/ThemedView";
import { useForm } from "react-hook-form";
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    useColorScheme,
} from "react-native";
import Toast from "react-native-toast-message";
import { CategorySelector } from "./CategorySelector";
import { ColorSelector } from "./ColorSelector";
import { categories, colors } from "./constants";
import { DateSelector } from "./DateSelector";
import { FavoriteButton } from "./FavoriteButton";
import { NoteInput } from "./NoteInput";
import { TitleInput } from "./TitleInput";

export type FormData = {
  title: string;
  note: string;
  category: number;
  color: string;
  isFavorite: boolean;
  endDate: Date | null;
};

export default function NoteForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      title: "",
      note: "",
      category: categories[0].id,
      color: colors[0],
      isFavorite: false,
      endDate: null,
    },
  });

  const colorScheme = useColorScheme();
  const bgColor = colorScheme === "dark" ? "bg-black" : "bg-gray-50";
  const textColor = colorScheme === "dark" ? "text-gray-100" : "text-gray-900";

  const onSubmit = (data: FormData) => {
    Toast.show({
      type: "success",
      text1: "Not kaydedildi!",
      text2: data.note
        ? data.note.substring(0, 30) + (data.note.length > 30 ? "..." : "")
        : "Boş not",
    });
  };

  return (
    <ThemedView className={`flex-1 ${bgColor}`}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <TitleInput control={control} errors={errors} />
            <NoteInput control={control} />
            <CategorySelector control={control} />
            <ColorSelector control={control} />
            
            <View className="mb-6">
              <View className="flex-row items-center justify-between mb-3">
                <Text className="text-gray-500 text-base">
                  Eklenen Tarih: {new Date().toLocaleDateString("tr-TR")}
                </Text>
                <FavoriteButton control={control} />
              </View>
              <DateSelector control={control} />
            </View>

            <TouchableOpacity
              className="py-3 rounded-xl items-center"
              style={{ backgroundColor: "#d9f99d", borderRadius: 10 }}
              onPress={handleSubmit(onSubmit)}
            >
              <Text className="text-lg font-bold">Notu Ekle</Text>
            </TouchableOpacity>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ThemedView>
  );
} 
import { ThemedView } from "@/components/ThemedView";
import { FontAwesome } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  useColorScheme,
} from "react-native";
import Toast from "react-native-toast-message";

const categories = [
  { id: 1, title: "Tümü" },
  { id: 2, title: "Önemli" },
  { id: 3, title: "Öğrenmek" },
  { id: 4, title: "Yapılacaklar" },
  { id: 5, title: "Görevlerim" },
  { id: 6, title: "Günlük" },
  { id: 7, title: "Diğer" },
];

const colors = [
  "#fecaca",
  "#bbf7d0",
  "#a7f3d0",
  "#bae6fd",
  "#ddd6fe",
  "#fbcfe8",
];

type FormData = {
  title: string;
  note: string;
  category: number;
  color: string;
  isFavorite: boolean;
  endDate: Date | null;
};

export default function NotesScreen() {
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      title: "",
      note: "",
      category: categories[0].id,
      color: colors[0],
      isFavorite: false,
      endDate: null
    }
  });

  const [showPicker, setShowPicker] = useState(false);
  const colorScheme = useColorScheme();

  const bgColor = colorScheme === "dark" ? "bg-black" : "bg-gray-50";
  const textColor = colorScheme === "dark" ? "text-gray-100" : "text-gray-900";
  const inputBg = colorScheme === "dark" ? "#222" : "#fff";
  const borderColor = colorScheme === "dark" ? "#444" : "#e5e7eb";

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
            <Text className={`text-2xl font-bold mb-3 text-center ${textColor}`}>
              Yeni Not Ekle
            </Text>

            <View className="mb-3">
              <Text className={`mb-1 ml-1 text-base font-semibold ${textColor}`}>Başlık</Text>
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

            <View className="mb-3">
              <Text className={`mb-1 ml-1 text-base font-semibold ${textColor}`}>Not</Text>
              <Controller
                control={control}
                name="note"
                render={({ field: { onChange, value } }) => (
                  <View style={{ backgroundColor: control._formValues.color, borderRadius: 14, padding: 0 }}>
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
                        textAlignVertical: 'top',
                      }}
                    />
                  </View>
                )}
              />
            </View>

            <View className="my-3">
              <Text className={`mb-1 ml-1 font-semibold ${textColor}`}>Kategori:</Text>
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
                          className={`mx-2 rounded-full border-2 border-black dark:border-white px-4 py-1 ${value === cat.id ? 'bg-[#d9f99d]' : 'bg-gray-200 dark:bg-gray-700'}`}
                        >
                          <Text className={`font-semibold text-sm ${value === cat.id ? 'text-black' : 'text-black dark:text-white'}`}>{cat.title}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </ScrollView>
                )}
              />
            </View>

            <View className="mb-3">
              <Text className={`mb-2 ml-1 font-semibold ${textColor}`}>Not rengi:</Text>
              <Controller
                control={control}
                name="color"
                render={({ field: { onChange, value } }) => (
                  <View className="flex-row items-center justify-start">
                    {colors.map((color) => (
                      <TouchableOpacity
                        key={color}
                        onPress={() => onChange(color)}
                        className={`mx-2 ${value === color ? "border-2 border-black dark:border-white" : "border-2 border-transparent"}`}
                        style={{
                          backgroundColor: color,
                          width: 36,
                          height: 36,
                          borderRadius: 18,
                        }}
                      />
                    ))}
                  </View>
                )}
              />
            </View>

            <View className="mb-6">
              <View className="flex-row items-center justify-between mb-3">
                <Text className="text-gray-500 text-base">
                  Eklenen Tarih: {new Date().toLocaleDateString("tr-TR")}
                </Text>
                <Controller
                  control={control}
                  name="isFavorite"
                  render={({ field: { onChange, value } }) => (
                    <TouchableOpacity onPress={() => onChange(!value)}>
                      <FontAwesome
                        name={value ? "star" : "star-o"}
                        size={30}
                        color={value ? "#facc15" : colorScheme === "dark" ? "#888" : "#aaa"}
                      />
                    </TouchableOpacity>
                  )}
                />
              </View>

              <Controller
                control={control}
                name="endDate"
                render={({ field: { onChange, value } }) => (
                  <View className="flex-row items-center justify-between">
                    <Text className="text-gray-500 text-base">
                      Bitiş Tarihi: {value ? value.toLocaleDateString("tr-TR") : "Seçilmedi"}
                    </Text>
                    <TouchableOpacity
                      className="px-4 py-2 bg-gray-200 dark:bg-gray-200 rounded-full"
                      onPress={() => setShowPicker(true)}
                    >
                      <Text className="text-base font-semibold">Tarih Seç</Text>
                    </TouchableOpacity>
                    {showPicker && (
                      <DateTimePicker
                        value={value || new Date()}
                        mode="date"
                        display="default"
                        onChange={(event, selectedDate) => {
                          setShowPicker(Platform.OS === "ios");
                          if (selectedDate) {
                            onChange(selectedDate);
                          }
                        }}
                        minimumDate={new Date()}
                      />
                    )}
                  </View>
                )}
              />
            </View>

            <TouchableOpacity
              className="py-3 rounded-xl items-center"
              style={{ backgroundColor: '#d9f99d', borderRadius: 10 }}
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

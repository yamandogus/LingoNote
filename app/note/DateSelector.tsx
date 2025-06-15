import { useState } from "react";
import { Control, Controller } from "react-hook-form";
import { Modal, Text, TouchableOpacity, View, useColorScheme } from "react-native";
import { Calendar as RNCalendar } from "react-native-calendars";
import { FormData } from "./NoteForm";

interface DateSelectorProps {
  control: Control<FormData>;
}

export function DateSelector({ control }: DateSelectorProps) {
  const [showPicker, setShowPicker] = useState(false);
  const colorScheme = useColorScheme();

  return (
    <Controller
      control={control}
      name="endDate"
      render={({ field: { onChange, value } }) => (
        <View className="flex-row items-center justify-between">
          <Text className="text-gray-500 text-base">
            Bitiş Tarihi:{" "}
            {value ? value.toLocaleDateString("tr-TR") : "Seçilmedi"}
          </Text>
          <TouchableOpacity
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-full"
            onPress={() => setShowPicker(true)}
          >
            <Text className="text-base font-semibold text-black dark:text-white">
              Tarih Seç
            </Text>
          </TouchableOpacity>
          <Modal
            visible={showPicker}
            transparent={true}
            animationType="fade"
            onRequestClose={() => setShowPicker(false)}
          >
            <View className="flex-1 justify-center items-center bg-black/50">
              <View className="bg-white dark:bg-gray-800 rounded-xl p-4 w-[90%]">
                <RNCalendar
                  onDayPress={(day) => {
                    onChange(new Date(day.timestamp));
                    setShowPicker(false);
                  }}
                  markedDates={{
                    [value?.toISOString().split("T")[0] || ""]: {
                      selected: true,
                      selectedColor: "#d9f99d",
                    },
                  }}
                  minDate={new Date().toISOString().split("T")[0]}
                  theme={{
                    backgroundColor:
                      colorScheme === "dark" ? "#1f2937" : "#ffffff",
                    calendarBackground:
                      colorScheme === "dark" ? "#1f2937" : "#ffffff",
                    textSectionTitleColor:
                      colorScheme === "dark" ? "#ffffff" : "#000000",
                    selectedDayBackgroundColor: "#d9f99d",
                    selectedDayTextColor: "#000000",
                    todayTextColor: "#d9f99d",
                    dayTextColor:
                      colorScheme === "dark" ? "#ffffff" : "#000000",
                    textDisabledColor:
                      colorScheme === "dark" ? "#4b5563" : "#d1d5db",
                    monthTextColor:
                      colorScheme === "dark" ? "#ffffff" : "#000000",
                    arrowColor:
                      colorScheme === "dark" ? "#ffffff" : "#000000",
                  }}
                />
                <TouchableOpacity
                  className="mt-4 bg-gray-200 dark:bg-gray-700 py-2 rounded-lg"
                  onPress={() => setShowPicker(false)}
                >
                  <Text className="text-center font-semibold text-black dark:text-white">
                    Kapat
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      )}
    />
  );
} 
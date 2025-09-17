import { View, Text, Image } from "react-native";

interface NoteOfTheDayProps {
  isDark: boolean;
  note: {
    title: string;
    summary: string;
    date: string;
  };
}

export function NoteOfTheDay({ isDark, note }: NoteOfTheDayProps) {
  return (
    <View
      className={`flex-row rounded-2xl px-2 py-4 my-6 ${isDark ? "bg-purple-900" : "bg-purple-100"}`}
    >
      <Image
        source={require("../../assets/images/undraw_data-input_whqw.png")}
        style={{ width: 100, height: 100, borderRadius: 16 }}
      />
      <View className="flex-1 ml-4">
        <Text
          className={`text-base font-bold mb-1 ${isDark ? "text-purple-100" : "text-purple-900"}`}
        >
          Günün Notu
        </Text>
        <Text
          className={`text-lg font-semibold mb-1 ${isDark ? "text-white" : "text-gray-900"}`}
        >
          {note.title}
        </Text>
        <Text
          className={`text-sm mb-2 ${isDark ? "text-purple-200" : "text-purple-800"}`}
          style={{ flexShrink: 1 }}
        >
          {note.summary}
        </Text>
        <Text
          className={`text-xs ${isDark ? "text-purple-300" : "text-purple-700"}`}
        >
          {note.date}
        </Text>
      </View>
    </View>
  );
}

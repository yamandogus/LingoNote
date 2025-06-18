import { View, Text } from "react-native";

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
    <View className={`rounded-2xl p-4 mb-6 ${isDark ? 'bg-purple-900' : 'bg-purple-100'}`}> 
      <Text className={`text-base font-bold mb-1 ${isDark ? 'text-purple-100' : 'text-purple-900'}`}>Günün Notu</Text>
      <Text className={`text-lg font-semibold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{note.title}</Text>
      <Text className={`text-sm mb-2 ${isDark ? 'text-purple-200' : 'text-purple-800'}`}>{note.summary}</Text>
      <Text className={`text-xs ${isDark ? 'text-purple-300' : 'text-purple-700'}`}>{note.date}</Text>
    </View>
  );
} 
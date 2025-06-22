import { View, Text } from "react-native";

interface Note {
  id: string;
  title: string;
  summary: string;
  date: string;
  tags: string[];
  color: string;
}

interface NoteListProps {
  notes: Note[];
  isDark: boolean;
}

export function NoteList({ notes, isDark }: NoteListProps) {
  if (!notes.length) return null;
  return (
    <View>
      {notes.map((note) => (
        <View
          key={note.id}
          className={`mb-4 p-4 rounded-2xl ${isDark ? "bg-gray-800" : "bg-gray-50"} shadow-lg border-[0.5px] border-cyan-50 relative overflow-hidden`}
        >
          <View className={`absolute top-0 right-0 w-10 h-6 bg-${note.color}-500 rounded-bl-full`}>
          </View>
          <Text
            className={`text-base font-bold mb-1 ${isDark ? "text-white" : "text-gray-900"}`}
          >
            {note.title}
          </Text>
          <Text
            className={`text-sm mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}
          >
            {note.summary}
          </Text>
          <View className="flex-row items-center justify-between border-t-[0.5px] dark:border-gray-600 border-gray-300 pt-2">
            <View className="flex-col gap-1">
              <Text
                className={`text-xs font-medium ${isDark ? "text-gray-400" : "text-gray-500"}`}
              >
                Oluşturulma Tarihi: {note.date}
              </Text>
              <Text
                className={`text-xs font-medium ${isDark ? "text-gray-400" : "text-gray-500"}`}
              >
                Bitiş Tarihi: {note.date}
              </Text>
            </View>
            <View className="flex-row">
              {note.tags.map((tag) => (
                <View
                  key={tag}
                  className={`px-2 py-0.5 rounded-full ml-1 ${isDark ? "bg-blue-900" : "bg-blue-100"}`}
                >
                  <Text
                    className={`text-xs ${isDark ? "text-blue-200" : "text-blue-700"}`}
                  >
                    {tag}
                  </Text>
                </View>
              ))}
            </View>
            <View className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-50 to-cyan-100 w-20 h-20 rounded-full">
            </View>
          </View>
        </View>
      ))}
    </View>
  );
}

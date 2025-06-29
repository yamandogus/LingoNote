import { View, Text } from "react-native";

interface Note {
  id: string;
  title: string;
  content: string;
  category: string;
  color: string;
  userId: string;
  createdAt: string;
}

interface NoteListProps {
  notes: Note[];
  isDark: boolean;
}

export function NoteList({ notes, isDark }: NoteListProps) {
  if (!notes.length) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getSummary = (content: string) => {
    return content.length > 100 ? content.substring(0, 100) + '...' : content;
  };

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
            {getSummary(note.content)}
          </Text>
          <View className="flex-row items-center justify-between border-t-[0.5px] dark:border-gray-600 border-gray-300 pt-2">
            <View className="flex-col gap-1">
              <Text
                className={`text-xs font-medium ${isDark ? "text-gray-400" : "text-gray-500"}`}
              >
                Kategori: {note.category}
              </Text>
              <Text
                className={`text-xs font-medium ${isDark ? "text-gray-400" : "text-gray-500"}`}
              >
                Oluşturulma: {formatDate(note.createdAt)}
              </Text>
            </View>
            <View className="flex-row">
              <View
                className={`px-2 py-0.5 rounded-full ${isDark ? "bg-blue-900" : "bg-blue-100"}`}
              >
                <Text
                  className={`text-xs ${isDark ? "text-blue-200" : "text-blue-700"}`}
                >
                  {note.category}
                </Text>
              </View>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
}

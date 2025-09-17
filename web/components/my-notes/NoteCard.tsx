import { View, Text} from "react-native";

interface NoteCardProps {
  isDark: boolean;
  title: string;
  progress: number;
  progressColor: string;
  status: {
    text: string;
    bgColor: string;
    textColor: string;
  };
  teamCount: number;
}

export function NoteCard({ isDark, title, progress, progressColor, status, teamCount }: NoteCardProps) {
  return (
    
    <View className={`${isDark ? 'bg-[#2a2a2a]' : 'bg-white'} rounded-xl shadow-sm p-4 mb-4 w-[48%]`}>
      <View className="flex-row justify-between items-center mb-2">
        <Text className={`text-lg font-semibold ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
          {title}
        </Text>
        <View className={`w-12 h-12 rounded-full border-2 border-${progressColor}-200 items-center justify-center`}>
          <Text className={`text-sm text-${progressColor}-500`}>{progress}%</Text>
        </View>
      </View>
      <View className={`bg-${status.bgColor} rounded-md px-2 py-1 self-start mb-2`}>
        <Text className={`text-xs text-${status.textColor} font-medium`}>{status.text}</Text>
      </View>
      <Text className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-2`}>Takım</Text>
      <View className="flex-row -space-x-2">
        {Array.from({ length: Math.min(teamCount, 4) }).map((_, index) => (
          <View key={index} className={`w-6 h-6 rounded-full bg-gray-${(index + 3) * 100} border border-white`} />
        ))}
        {teamCount > 4 && (
          <View className="w-6 h-6 rounded-full bg-gray-700 border border-white items-center justify-center">
            <Text className="text-xs text-white">+{teamCount - 4}</Text>
          </View>
        )}
      </View>

    </View>
  );
} 
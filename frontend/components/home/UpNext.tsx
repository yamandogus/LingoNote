import { View, Text } from "react-native";

interface UpNextProps {
  isDark: boolean;
}

export function UpNext({ isDark }: UpNextProps) {
  return (
    <View className={`${isDark ? 'bg-[#2a2a2a]' : 'bg-white'} rounded-xl shadow-sm p-5 mb-8 flex-row items-center`}>
      <View className="mr-6 items-center">
        <Text className={`text-5xl font-bold ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>25</Text>
        <Text className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Eylül</Text>
      </View>
      <View className="flex-1">
        <Text className={`text-base font-semibold ${isDark ? 'text-gray-400' : 'text-gray-500'} mb-2`}>
          Sıradaki
        </Text>
        <View className="flex-row items-center mb-1">
          <View className="w-1.5 h-6 bg-yellow-500 rounded-full mr-2" />
          <Text className={`text-base ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
            Toplantı öğle yemeği James Strobinsty ile
          </Text>
        </View>
        <View className="flex-row items-center">
          <View className="w-1.5 h-6 bg-blue-500 rounded-full mr-2" />
          <Text className={`text-base ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
            Dave&#39;in doğum günü partisi
          </Text>
        </View>
      </View>
    </View>
  );
} 
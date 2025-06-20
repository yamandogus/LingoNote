import { View, Text } from "react-native";

interface MotivationQuoteProps {
  isDark: boolean;
  quote: string;
}

export function MotivationQuote({ isDark, quote }: MotivationQuoteProps) {
  return (
    <View className={`rounded-xl p-4 mt-6 my-2 ${isDark ? 'bg-orange-900' : 'bg-orange-100'}`}> 
      <Text className={`text-base italic text-center ${isDark ? 'text-orange-100' : 'text-orange-800'}`}>{quote}</Text>
    </View>
  );
} 
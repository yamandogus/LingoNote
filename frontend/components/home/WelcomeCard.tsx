import { View, Text, TouchableOpacity, Image } from "react-native";

interface WelcomeCardProps {
  isDark: boolean;
  onAddNote: () => void;
}

export function WelcomeCard({ isDark, onAddNote }: WelcomeCardProps) {
  return (
    <View className={`flex-row items-center justify-between rounded-2xl mb-6 p-5 ${isDark ? 'bg-blue-900' : 'bg-blue-100'}`}>
      <View className="flex-1 mr-2">
        <Text className={`text-lg font-bold mb-2 ${isDark ? 'text-blue-100' : 'text-blue-900'}`}>LingoNote ile üretkenliğini artır!</Text>
        <Text className={`text-sm mb-3 ${isDark ? 'text-blue-200' : 'text-blue-800'}`}>Tüm notların tek yerde, her zaman yanında.</Text>
        <TouchableOpacity
          onPress={onAddNote}
          className={`px-5 py-2 rounded-full ${isDark ? 'bg-blue-700' : 'bg-blue-500'}`}
        >
          <Text className="text-white font-semibold">Hemen Not Ekle</Text>
        </TouchableOpacity>
      </View>
      <Image
        source={require('@/assets/images/partial-react-logo.png')}
        style={{ width: 70, height: 70, borderRadius: 16 }}
      />
    </View>
  );
} 
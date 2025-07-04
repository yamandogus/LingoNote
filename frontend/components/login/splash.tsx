import { LinearGradient } from "expo-linear-gradient";
import { Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";

export function SplashScreen({
  visible,
  colorScheme,
}: {
  visible: boolean;
  colorScheme: string;
}) {
  const isDark = colorScheme === "dark";
  const gradientColors = isDark
    ? ["#1a1a2e", "#16213e", "#0f3460"]
    : ["#f8f9fa", "#e9ecef", "#dee2e6"];
  if (!visible) return null;
  return (
    <LinearGradient
      colors={gradientColors as [string, string, string]}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 999,
      }}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View className="flex-1 items-center justify-center space-y-4">
        <View className="w-28 h-28 border-8 border-gray-300 border-t-blue-400 rounded-full items-center justify-center animate-spin">
          <Svg viewBox="0 0 24 24" fill="blue" height={24} width={24}>
            <Path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
          </Svg>
        </View>
        <Text className="text-blue-500 text-lg font-semibold">
          LingoNote Yükleniyor...
        </Text>
      </View>
    </LinearGradient>
  );
}

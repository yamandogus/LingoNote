import { LinearGradient } from "expo-linear-gradient";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

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
      <View className="pt-16 flex-row justify-center space-x-1">
        {[
          { char: "L", y: 6 },
          { char: "i", y: 4 },
          { char: "n", y: -2 },
          { char: "g", y: -5 },
          { char: "o", y: -7 },
          { char: "N", y: -4 },
          { char: "o", y: -2 },
          { char: "t", y: 0 },
          { char: "e", y: 6 },
        ].map(({ char, y }, index) => (
          <Text
            key={index}
            className="uppercase"
            style={{
              transform: [{ translateY: y }],
              fontSize: 50,
              fontWeight: "900",
              fontFamily: "sans-serif-condensed", // istersen custom fontla değiştir
              color: index >= 5 ? "#3B82F6" : isDark ? "white" : "#111827",
              textShadowColor: "rgba(0,0,0,0.3)",
              textShadowOffset: { width: 1, height: 2 },
              textShadowRadius: 4,
            }}
          >
            {char}
          </Text>
        ))}
      </View>
      <Text className="absolute top-24 right-9 text-4xl font-bold">🖊️</Text>

      <View className="flex-1 items-center justify-center space-y-4">
        <View className="w-28 h-28 border-8 border-gray-300 border-t-blue-400 rounded-full items-center justify-center animate-bounce">
          <Ionicons name="book" size={24} color="#3B82F6" />
        </View>
        <View className="mt-10">
          <Text className="dark:text-gray-300 font-bold text-2xl">
            LingoNote Yükleniyor...
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
}

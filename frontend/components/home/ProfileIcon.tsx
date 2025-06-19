import { View, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

interface ProfileIconProps {
  isDark: boolean;
  userName?: string;
}

export function ProfileIcon({ isDark, userName = "Doğuş" }: ProfileIconProps) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
       <LinearGradient
       colors={['#0f0c29', '#302b63', '#24243e']}
       style={{ flex: 1 }}
       start={{ x: 0, y: 0 }}
       end={{ x: 1, y: 1 }}
      >
      <Text style={{ color: isDark ? '#fff' : '#18181b', fontWeight: 'bold', fontSize: 16, marginRight: 10 }}>
        Hoşgeldin, {userName}
      </Text>
      <TouchableOpacity>
        <Ionicons name="person-circle" size={40} color={isDark ? '#2a43d3' : '#2020d3'} />
      </TouchableOpacity>
      </LinearGradient>
    </View>
  );
} 
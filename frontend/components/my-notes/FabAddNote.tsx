import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface FabAddNoteProps {
  onPress: () => void;
  isDark: boolean;
  navigation: any;
}

export function FabAddNote({ onPress, isDark, navigation }: FabAddNoteProps) {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("add-note")}
      style={{
        position: 'absolute',
        right: 24,
        bottom: 120,
        backgroundColor: isDark ? '#2563eb' : '#3b82f6',
        borderRadius: 32,
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: isDark ? '#fff' : '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.18,
        shadowRadius: 6,
        elevation: 6,
      }}
    >
      <Ionicons name="add" size={32} color="#fff" />
    </TouchableOpacity>
  );
} 
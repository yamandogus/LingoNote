import { View, TouchableOpacity, Image } from "react-native";

interface ProfileIconProps {
  isDark: boolean;
}

export function ProfileIcon({ isDark }: ProfileIconProps) {
  return (
    <View style={{ alignItems: 'flex-end', marginBottom: 12 }}>
      <TouchableOpacity>
        <Image
          source={require('@/assets/images/icon.png')}
          style={{ width: 40, height: 40, borderRadius: 20, borderWidth: 2, borderColor: isDark ? '#fff' : '#eee' }}
        />
      </TouchableOpacity>
    </View>
  );
} 
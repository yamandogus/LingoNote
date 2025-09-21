import { View, TouchableOpacity, useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ModernSwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  color: string;
  trackColor?: {
    false: string;
    true: string;
  };
  thumbColor?: string;
  size?: "small" | "medium" | "large";
  style?: any;
  icon?: {
    active: string;
    inactive: string;
  };
}

export default function ModernSwitch({
  value,
  onValueChange,
  color,
  trackColor = {
    false: "#e5e7eb",
    true: `${color}30`,
  },
  thumbColor,
  size = "medium",
  style,
  icon,
}: ModernSwitchProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const sizes = {
    small: { width: 44, height: 24, thumbSize: 18, padding: 3 },
    medium: { width: 52, height: 28, thumbSize: 22, padding: 3 },
    large: { width: 60, height: 32, thumbSize: 26, padding: 3 },
  };

  const switchSize = sizes[size];
  
  const getThumbColor = () => {
    if (thumbColor) return thumbColor;
    return value ? color : (isDark ? "#f9fafb" : "#ffffff");
  };

  const getTrackColor = () => {
    return value 
      ? (trackColor.true.includes(color) ? trackColor.true : `${color}30`)
      : (isDark ? "#374151" : trackColor.false);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onValueChange(!value)}
      style={[
        {
          width: switchSize.width,
          height: switchSize.height,
          borderRadius: switchSize.height / 2,
          backgroundColor: getTrackColor(),
          justifyContent: "center",
          paddingHorizontal: switchSize.padding,
          shadowColor: value ? color : "#000",
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: value ? 0.4 : 0.1,
          shadowRadius: 6,
          elevation: value ? 5 : 2,
          borderWidth: 1,
          borderColor: value ? `${color}40` : (isDark ? "#4b5563" : "#d1d5db"),
        },
        style,
      ]}
    >
      {/* Track Highlight */}
      {value && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: switchSize.height / 2,
            backgroundColor: `${color}15`,
          }}
        />
      )}
      
      {/* Thumb */}
      <View
        style={{
          width: switchSize.thumbSize,
          height: switchSize.thumbSize,
          borderRadius: switchSize.thumbSize / 2,
          backgroundColor: getThumbColor(),
          alignSelf: value ? "flex-end" : "flex-start",
          alignItems: "center",
          justifyContent: "center",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
          elevation: 3,
          borderWidth: 1,
          borderColor: value ? `${color}20` : (isDark ? "#6b7280" : "#e5e7eb"),
        }}
      >
        {icon && (
          <Ionicons
            name={(value ? icon.active : icon.inactive) as any}
            size={size === "large" ? 14 : size === "medium" ? 12 : 10}
            color={value ? "#ffffff" : (isDark ? "#9ca3af" : "#6b7280")}
          />
        )}
      </View>
    </TouchableOpacity>
  );
}
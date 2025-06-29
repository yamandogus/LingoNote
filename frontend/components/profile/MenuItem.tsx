import React from "react";
import { View, Text, Switch } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface MenuItemProps {
  icon: React.ReactElement<{ name: string; size?: number; color: string }>;
  title: string;
  subtitle?: string;
  isToggle?: boolean;
  toggleValue?: boolean;
  onToggleChange?: (value: boolean) => void;
  showChevron?: boolean;
  color: string;
}

export default function MenuItem({
  icon,
  title,
  subtitle,
  isToggle,
  toggleValue,
  onToggleChange,
  showChevron,
  color,
}: MenuItemProps) {
  return (
    <View className="flex-row items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
      <View className="flex-row items-center flex-1">
        <View
          className="w-10 h-10 rounded-full items-center justify-center mr-3"
          style={{ backgroundColor: `${color}15` }}
        >
          {React.cloneElement(icon, { size: 20 })}
        </View>
        <View className="flex-1">
          <Text className="text-base font-medium text-gray-900 dark:text-white">
            {title}
          </Text>
          {subtitle && (
            <Text className="text-sm text-gray-500 dark:text-gray-400">
              {subtitle}
            </Text>
          )}
        </View>
      </View>
      {isToggle && onToggleChange ? (
        <Switch
          value={toggleValue}
          onValueChange={onToggleChange}
          trackColor={{ false: "#767577", true: `${color}80` }}
          thumbColor={toggleValue ? color : "#f4f3f4"}
        />
      ) : showChevron ? (
        <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
      ) : null}
    </View>
  );
} 
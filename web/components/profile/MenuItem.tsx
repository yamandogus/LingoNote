import React from "react";
import { View, Text, Switch } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ModernSwitch from "./ModernSwitch";

interface MenuItemProps {
  icon: React.ReactElement<{ name: string; size?: number; color: string }>;
  title: string;
  subtitle?: string;
  isToggle?: boolean;
  toggleValue?: boolean;
  onToggleChange?: (value: boolean) => void;
  showChevron?: boolean;
  color: string;
  component?: React.ReactNode;
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
    <View className="flex-row items-center justify-between px-5 py-4 border-b border-gray-50 dark:border-gray-700/50">
      <View className="flex-row items-center flex-1">
        {/* Modern Icon Container */}
        <View
          className="w-12 h-12 rounded-2xl items-center justify-center mr-4"
          style={{ 
            backgroundColor: `${color}10`,
            borderWidth: 1,
            borderColor: `${color}20`,
          }}
        >
          {React.cloneElement(icon, { size: 22, color })}
        </View>
        
        {/* Content */}
        <View className="flex-1">
          <Text className="text-base font-semibold text-gray-900 dark:text-white mb-0.5">
            {title}
          </Text>
          {subtitle && (
            <Text className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              {subtitle}
            </Text>
          )}
        </View>
      </View>
      
      {/* Action Elements */}
      {isToggle && onToggleChange ? (
        <View className="ml-3">
          <ModernSwitch
            value={toggleValue || false}
            onValueChange={onToggleChange}
            color={color}
            size="medium"
            icon={{
              active: title === "Bildirimler" ? "notifications" : "moon",
              inactive: title === "Bildirimler" ? "notifications-off" : "sunny",
            }}
          />
        </View>
      ) : showChevron ? (
        <View className="ml-3">
          <View 
            className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 items-center justify-center"
          >
            <Ionicons 
              name="chevron-forward" 
              size={16} 
              color="#9ca3af" 
            />
          </View>
        </View>
      ) : null}
    </View>
  );
} 
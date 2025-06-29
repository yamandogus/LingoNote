import React from "react";
import { View, TouchableOpacity, Alert } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import MenuItem from "./MenuItem";

interface MenuListProps {
  notificationsEnabled: boolean;
  setNotificationsEnabled: (enabled: boolean) => void;
  darkModeEnabled: boolean;
  setDarkModeEnabled: (enabled: boolean) => void;
  logout: () => void;
}

export default function MenuList({
  notificationsEnabled,
  setNotificationsEnabled,
  darkModeEnabled,
  setDarkModeEnabled,
  logout,
}: MenuListProps) {
  const handleProfileEdit = () => {
    Alert.alert("Bilgi", "Profil düzenleme özelliği yakında eklenecek!");
  };

  const handlePrivacySettings = () => {
    Alert.alert("Bilgi", "Gizlilik ayarları yakında eklenecek!");
  };

  const handleHelpSupport = () => {
    Alert.alert("Bilgi", "Yardım ve destek özelliği yakında eklenecek!");
  };

  const handleAbout = () => {
    Alert.alert("Hakkında", "LingoNote v1.0.0\n\nDil öğrenme notlarınızı organize etmenizi sağlayan uygulama.");
  };

  const menuItems = [
    {
      id: "profile",
      icon: <Ionicons name="person-outline" color="#6366f1" />,
      title: "Profil Ayarları",
      subtitle: "Kişisel bilgilerinizi düzenleyin",
      showChevron: true,
      color: "#6366f1",
      onPress: handleProfileEdit,
    },
    {
      id: "notifications",
      icon: <Ionicons name="notifications-outline" color="#f59e0b" />,
      title: "Bildirimler",
      isToggle: true,
      toggleValue: notificationsEnabled,
      onToggleChange: setNotificationsEnabled,
      color: "#f59e0b",
    },
    {
      id: "theme",
      icon: <Ionicons name="moon-outline" color="#8b5cf6" />,
      title: "Koyu Tema",
      isToggle: true,
      toggleValue: darkModeEnabled,
      onToggleChange: setDarkModeEnabled,
      color: "#8b5cf6",
    },
    {
      id: "privacy",
      icon: <MaterialIcons name="security" color="#10b981" />,
      title: "Gizlilik",
      subtitle: "Gizlilik ayarlarınızı yönetin",
      showChevron: true,
      color: "#10b981",
      onPress: handlePrivacySettings,
    },
    {
      id: "help",
      icon: <Ionicons name="help-circle-outline" color="#3b82f6" />,
      title: "Yardım & Destek",
      showChevron: true,
      color: "#3b82f6",
      onPress: handleHelpSupport,
    },
    {
      id: "about",
      icon: <Ionicons name="information-circle-outline" color="#6b7280" />,
      title: "Hakkında",
      showChevron: true,
      color: "#6b7280",
      onPress: handleAbout,
    },
    {
      id: "login",
      icon: <Ionicons name="log-out-outline" color="#ef4444" />,
      title: "Çıkış Yap",
      subtitle: "Hesabınızdan çıkış yapın",
      showChevron: true,
      color: "#ef4444",
      onPress: logout,
    },
  ];

  return (
    <View className="mx-4 rounded-2xl overflow-hidden bg-white dark:bg-gray-800 shadow-sm mb-8">
      {menuItems.map((item) => (
        <TouchableOpacity
          key={item.id}
          activeOpacity={0.7}
          onPress={() => {
            if (item.onPress) {
              item.onPress();
            } else if (item.onToggleChange && item.toggleValue !== undefined) {
              item.onToggleChange(!item.toggleValue);
            }
          }}
        >
          <MenuItem {...item} />
        </TouchableOpacity>
      ))}
    </View>
  );
} 
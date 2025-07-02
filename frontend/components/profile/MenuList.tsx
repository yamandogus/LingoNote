import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Alert,
  Modal,
  Text,
  useColorScheme,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import MenuItem from "./MenuItem";
import ProfileOptions from "../application/profileOptions";
import Security from "../application/security";
import HelpAndSupport from "../application/helpAndSupport";
import About from "../application/about";

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
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  const isDark = useColorScheme() === "dark";

  const menuItems = [
    {
      id: "profile",
      icon: <Ionicons name="person-outline" color="#6366f1" />,
      title: "Profil Ayarları",
      subtitle: "Kişisel bilgilerinizi düzenleyin",
      showChevron: true,
      color: "#6366f1",
      component: <ProfileOptions />,
      onPress: () => {
        Alert.alert("Bilgi", "Profil düzenleme özelliği yakında eklenecek!");
      },
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
      component: <Security />,
      onPress: () => {
        Alert.alert("Bilgi", "Gizlilik ayarları yakında eklenecek!");
      },
    },
    {
      id: "help",
      icon: <Ionicons name="help-circle-outline" color="#3b82f6" />,
      title: "Yardım & Destek",
      showChevron: true,
      color: "#3b82f6",
      component: <HelpAndSupport />,
    },
    {
      id: "about",
      icon: <Ionicons name="information-circle-outline" color="#6b7280" />,
      title: "Hakkında",
      showChevron: true,
      color: "#6b7280",
      component: <About />,
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

  const handleMenuPress = (item: any) => {
    if (item.component) {
      setModalContent(item.component);
      setModalVisible(true);
    } else if (item.onPress) {
      item.onPress();
    } else if (item.onToggleChange && item.toggleValue !== undefined) {
      item.onToggleChange(!item.toggleValue);
    }
  };

  return (
    <View className="mx-4 rounded-2xl overflow-hidden bg-white dark:bg-gray-800 shadow-sm mb-8">
      {menuItems.map((item) => (
        <View key={item.id}>
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.7}
            onPress={() => handleMenuPress(item)}
          >
            <MenuItem {...item} />
          </TouchableOpacity>
        </View>
      ))}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View
            className={`w-[90%] max-h-[80%] rounded-2xl p-6 ${
              isDark ? "bg-gray-800" : "bg-white"
            }`}
          >
            {modalContent}
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              className="w-1/2 mt-4 self-center border  border-gray-200 dark:border-gray-700 rounded-lg p-2 bg-red-600 dark:bg-red-600"
            >
              <Text className=" text-white font-bold text-center">Kapat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

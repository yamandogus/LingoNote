import React, { useState } from "react";
import { View, TouchableOpacity, Alert, Modal, Text } from "react-native";
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
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: 'white', borderRadius: 16, padding: 20, minWidth: 300, minHeight: 200 }}>
            {modalContent}
            <TouchableOpacity onPress={() => setModalVisible(false)} style={{ marginTop: 20, alignSelf: 'center' }}>
              <Text style={{ color: '#6366f1', fontWeight: 'bold' }}>Kapat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

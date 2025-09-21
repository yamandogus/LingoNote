import React, { use, useState } from "react";
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
import LogautSelect from "../application/logaut";
import { useAuth } from "@/contexts/AuthContext";

interface MenuListProps {
  notificationsEnabled: boolean;
  setNotificationsEnabled: (enabled: boolean) => void;
  darkModeEnabled: boolean;
  setDarkModeEnabled: (enabled: boolean) => void;
}

export default function MenuList({
  notificationsEnabled,
  setNotificationsEnabled,
  darkModeEnabled,
  setDarkModeEnabled,
}: MenuListProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const isDark = useColorScheme() === "dark";
  const logout = useAuth();

  const menuItems = [
    {
      id: "profile",
      icon: <Ionicons name="person-outline" color="#6366f1" />,
      title: "Profil Ayarları",
      subtitle: "Kişisel bilgilerinizi düzenleyin",
      showChevron: true,
      color: "#6366f1",
      component: <ProfileOptions />,
    },
    {
      id: "notifications",
      icon: <Ionicons name="notifications-outline" color="#f59e0b" />,
      title: "Bildirimler",
      subtitle: "Bildirimleri yönetin",
      isToggle: true,
      toggleValue: notificationsEnabled,
      onToggleChange: setNotificationsEnabled,
      color: "#f59e0b",
    },
    {
      id: "theme",
      icon: <Ionicons name="moon-outline" color="#8b5cf6" />,
      title: "Koyu Tema",
      subtitle: "Görünümü değiştirin",
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
      subtitle: "Size nasıl yardımcı olabiliriz?",
      showChevron: true,
      color: "#3b82f6",
      component: <HelpAndSupport />,
    },
    {
      id: "about",
      icon: <Ionicons name="information-circle-outline" color="#6b7280" />,
      title: "Hakkında",
      subtitle: "Uygulama bilgileri",
      showChevron: true,
      color: "#6b7280",
      component: <About />,
    },
    {
      id: "logout",
      icon: <Ionicons name="log-out-outline" color="#ef4444" />,
      title: "Çıkış Yap",
      subtitle: "Hesabınızdan güvenle çıkış yapın",
      showChevron: true,
      color: "#ef4444",
      component: <LogautSelect />,
    },
  ];

  const handleMenuPress = (item: any) => {
    setSelectedItemId(item.id);
    if (item.component) {
      setModalContent(item.component);
      setModalVisible(true);
    } else if (item.onPress) {
      item.onPress();
    } else if (item.onToggleChange && item.toggleValue !== undefined) {
      item.onToggleChange(!item.toggleValue);
    }
  };

  const logoutModalControl =
    selectedItemId === "logout" && modalContent !== <LogautSelect />;

  return (
    <View 
      className="mx-4 rounded-3xl overflow-hidden bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm mb-8"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.1,
        shadowRadius: 24,
        elevation: 8,
      }}
    >
      {menuItems.map((item, index) => (
        <View key={item.id}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => handleMenuPress(item)}
            className={`${index === menuItems.length - 1 ? '' : ''}`}
            style={{
              backgroundColor: 'transparent',
            }}
          >
            <MenuItem {...item} />
          </TouchableOpacity>
        </View>
      ))}
      
      {/* Modern Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <View
            className={`w-[92%] max-h-[85%] rounded-3xl p-6 ${
              isDark ? "bg-gray-800" : "bg-white"
            }`}
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 20 },
              shadowOpacity: 0.25,
              shadowRadius: 40,
              elevation: 20,
            }}
          >
            {modalContent}
            
            {/* Modern Action Buttons */}
            {logoutModalControl ? (
              <View className="flex-row gap-3 mt-6">
                <TouchableOpacity
                  onPress={() => logout.logout()}
                  className="flex-1 bg-red-500 py-4 rounded-2xl"
                  style={{
                    shadowColor: "#ef4444",
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.3,
                    shadowRadius: 12,
                    elevation: 6,
                  }}
                >
                  <Text className="text-white font-bold text-center text-base">
                    Çıkış Yap
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  className="flex-1 bg-gray-200 dark:bg-gray-700 py-4 rounded-2xl"
                >
                  <Text className="text-gray-800 dark:text-gray-200 font-semibold text-center text-base">
                    İptal
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                className="mt-6 bg-blue-500 py-4 rounded-2xl"
                style={{
                  shadowColor: "#3b82f6",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 12,
                  elevation: 6,
                }}
              >
                <Text className="text-white font-bold text-center text-base">
                  Kapat
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
  SafeAreaView,
  Platform,
  Switch,
  Image,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import AvatarSelector from "@/components/profile/avatar";

type MenuItem = {
  id: string;
  icon: React.ReactElement<{ name: string; size?: number; color: string }>;
  title: string;
  subtitle?: string;
  isToggle?: boolean;
  toggleValue?: boolean;
  onToggleChange?: (value: boolean) => void;
  showChevron?: boolean;
  color: string;
};

const ProfileScreen = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(isDark);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const menuItems: MenuItem[] = [
    {
      id: "profile",
      icon: <Ionicons name="person-outline" color="#6366f1" />,
      title: "Profil Ayarları",
      subtitle: "Kişisel bilgilerinizi düzenleyin",
      showChevron: true,
      color: "#6366f1",
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
    },
    {
      id: "help",
      icon: <Ionicons name="help-circle-outline" color="#3b82f6" />,
      title: "Yardım & Destek",
      showChevron: true,
      color: "#3b82f6",
    },
    {
      id: "about",
      icon: <Ionicons name="information-circle-outline" color="#6b7280" />,
      title: "Hakkında",
      showChevron: true,
      color: "#6b7280",
    },
  ];

  const MenuItem = ({
    icon,
    title,
    subtitle,
    isToggle,
    toggleValue,
    onToggleChange,
    showChevron,
    color,
  }: Omit<MenuItem, "id" | "onPress">) => (
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
  const gradientColors = isDark
    ? ["#1a1a2e", "#16213e", "#0f3460"]
    : ["#f8f9fa", "#e9ecef", "#dee2e6"];

  const handleAvatarSelect = (avatarUrl: string) => {
    setAvatar(avatarUrl);
    setModalVisible(false);
  };

  return (
    <SafeAreaView className={`flex-1`}>
      <LinearGradient
        colors={gradientColors as [string, string, string]}
        style={{ flex: 1 }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {Platform.OS === "android" && <View style={{ height: 32 }} />}
        <ScrollView className="flex-1">
          <View className="items-center mt-10 px-6">
            <View className="w-24 h-24 rounded-full bg-white dark:bg-gray-800 items-center justify-center shadow-lg mb-4">
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                {avatar ? (
                  <Image
                    source={{ uri: avatar }}
                    style={{ width: 100, height: 100, borderRadius: 50 }}
                  />
                ) : (
                  <View
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: 50,
                      backgroundColor: "#ccc",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text>Seç</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
            <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              John Mobbin
            </Text>

            {/* Stats */}
            <View className="flex-row justify-between w-full mt-8 mb-6">
              <View className="items-center bg-amber-100 dark:bg-amber-100/30 px-8 py-2 rounded-full">
                <Text className="text-2xl font-bold text-gray-900 dark:text-white">
                  128
                </Text>
                <Text className="text-gray-500 dark:text-gray-400 text-sm">
                  Not
                </Text>
              </View>
              <View className="items-center bg-amber-100 dark:bg-amber-100/30 px-8 py-2 rounded-full">
                <Text className="text-2xl font-bold text-gray-900 dark:text-white">
                  24
                </Text>
                <Text className="text-gray-500 dark:text-gray-400 text-sm">
                  Favori
                </Text>
              </View>
              <View className="items-center bg-amber-100 dark:bg-amber-100/30 px-8 py-2 rounded-full">
                <Text className="text-2xl font-bold text-gray-900 dark:text-white">
                  5
                </Text>
                <Text className="text-gray-500 dark:text-gray-400 text-sm">
                  Planlanan
                </Text>
              </View>
            </View>
          </View>

          <View className="mx-4 rounded-2xl overflow-hidden bg-white dark:bg-gray-800 shadow-sm mb-8">
            {menuItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.7}
                onPress={() => item.onToggleChange?.(!item.toggleValue)}
              >
                <MenuItem {...item} />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
        <AvatarSelector
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSelectAvatar={handleAvatarSelect}
        />
      </LinearGradient>
    </SafeAreaView>
  );
};

export default ProfileScreen;

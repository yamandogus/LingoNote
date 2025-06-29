import React, { useState } from "react";
import {
  View,
  ScrollView,
  useColorScheme,
  SafeAreaView,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AvatarSelector from "@/components/profile/avatar";
import Stats from "@/components/profile/stats";
import ProfileHeader from "@/components/profile/ProfileHeader";
import MenuList from "@/components/profile/MenuList";
import { useAuth } from "@/contexts/AuthContext";

const ProfileScreen = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(isDark);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { logout, user } = useAuth();

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
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 120 }}
        >
          <ProfileHeader
            user={user}
            avatar={avatar}
            setModalVisible={setModalVisible}
          />

          <Stats />

          <MenuList
            notificationsEnabled={notificationsEnabled}
            setNotificationsEnabled={setNotificationsEnabled}
            darkModeEnabled={darkModeEnabled}
            setDarkModeEnabled={setDarkModeEnabled}
            logout={logout}
          />
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

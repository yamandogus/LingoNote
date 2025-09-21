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
  const { user, updateProfile } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);

  const gradientColors = isDark
    ? ["#1a1a2e", "#16213e", "#0f3460"]
    : ["#f8f9fa", "#e9ecef", "#dee2e6"];

  const handleAvatarSelect = async (avatarUrl: string) => {
    setModalVisible(false);
    try {
      await updateProfile({ avatar: avatarUrl });
      console.log(user?.avatar);
      console.log("avatarUrl", avatarUrl);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <LinearGradient
        colors={gradientColors as [string, string, string]}
        style={{ flex: 1 }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {Platform.OS === "android" && <View style={{ height: 32 }} />}
        
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 140 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Profile Header with modern styling */}
          <ProfileHeader
            user={user}
            avatar={user?.avatar ?? null}
            setModalVisible={setModalVisible}
          />

          {/* Stats Section with enhanced design */}
          <Stats />

          {/* Menu List with modern card design */}
          <MenuList
            notificationsEnabled={notificationsEnabled}
            setNotificationsEnabled={setNotificationsEnabled}
            darkModeEnabled={darkModeEnabled}
            setDarkModeEnabled={setDarkModeEnabled}
          />
        </ScrollView>
        
        {/* Modern Avatar Selector Modal */}
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

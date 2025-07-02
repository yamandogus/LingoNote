import React, { useState } from "react";
import {
  View,
  ScrollView,
  useColorScheme,
  SafeAreaView,
  Platform,
  Button,
  Modal,
  TextInput,
  Text,
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
  const { logout, user, updateProfile } = useAuth();
  const [avatar, setAvatar] = useState<string | null>(user?.avatar || null);
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editUsername, setEditUsername] = useState(user?.username || "");
  const [editEmail, setEditEmail] = useState(user?.email || "");

  const gradientColors = isDark
    ? ["#1a1a2e", "#16213e", "#0f3460"]
    : ["#f8f9fa", "#e9ecef", "#dee2e6"];

  const handleAvatarSelect = async (avatarUrl: string) => {
    if (user?.avatar) return; // Avatar zaten seçildiyse tekrar seçilemesin
    setAvatar(avatarUrl);
    setModalVisible(false);
    try {
      await updateProfile({ avatar: avatarUrl });
    } catch (e) {
      // Hata yönetimi eklenebilir
    }
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
            avatar={user?.avatar || avatar}
            setModalVisible={user?.avatar ? undefined : setModalVisible}
          />

          <Stats />

          <MenuList
            notificationsEnabled={notificationsEnabled}
            setNotificationsEnabled={setNotificationsEnabled}
            darkModeEnabled={darkModeEnabled}
            setDarkModeEnabled={setDarkModeEnabled}
            logout={logout}
          />

          <Button title="Profil Ayarları" onPress={() => setEditModalVisible(true)} />
          <Modal visible={editModalVisible} animationType="slide" onRequestClose={() => setEditModalVisible(false)}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}>Profil Bilgilerini Düzenle</Text>
              <TextInput
                value={editUsername}
                onChangeText={setEditUsername}
                placeholder="Kullanıcı Adı"
                style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 8, width: 250, marginBottom: 12 }}
              />
              <TextInput
                value={editEmail}
                onChangeText={setEditEmail}
                placeholder="Email"
                style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 8, width: 250, marginBottom: 12 }}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <Button title="Kaydet" onPress={async () => {
                try {
                  await updateProfile({ username: editUsername, email: editEmail });
                  setEditModalVisible(false);
                } catch (e) {}
              }} />
              <Button title="İptal" onPress={() => setEditModalVisible(false)} color="#888" />
            </View>
          </Modal>
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

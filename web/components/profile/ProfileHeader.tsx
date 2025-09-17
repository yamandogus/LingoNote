import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

interface ProfileHeaderProps {
  user: {
    username?: string;
    email?: string;
    createdAt?: string;
    avatar?: string;
  } | null;
  avatar: string | null;
  setModalVisible: (visible: boolean) => void;
}

export default function ProfileHeader({
  user,
  avatar,
  setModalVisible,
}: ProfileHeaderProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <View className="items-center mt-10 px-6">
      <View className="w-24 h-24 rounded-full bg-white dark:bg-gray-800 items-center justify-center shadow-lg mb-4">
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          {avatar ? (
            <Image
              source={{ uri: user?.avatar ?? avatar }}
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
        {user?.username}
      </Text>
      <Text className="text-sm text-gray-500 dark:text-gray-400 mb-2">
        {user?.email}
      </Text>
      <Text className="text-xs text-gray-400 dark:text-gray-500 mb-4">
        Üye olma tarihi: {user?.createdAt ? formatDate(user.createdAt) : 'Bilinmiyor'}
      </Text>
    </View>
  );
} 
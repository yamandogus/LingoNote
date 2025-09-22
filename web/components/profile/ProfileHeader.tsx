import { View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

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
    <View className="w-full mt-8 px-4">
      <View className="flex flex-row items-center bg-white dark:bg-gray-800 rounded-2xl p-4 backdrop-blur-sm">
      {/* Modern Avatar Container */}
      <View className="relative mr-4">
        <TouchableOpacity 
          onPress={() => setModalVisible(true)}
          activeOpacity={0.8}
          className="relative"
        >
          <View 
            className="w-28 h-28 rounded-3xl bg-white dark:bg-gray-800 items-center justify-center"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.15,
              shadowRadius: 20,
              elevation: 12,
            }}
          >
            {avatar ? (
              <Image
                source={{ uri: user?.avatar ?? avatar }}
                className="w-20 h-20 rounded-2xl"
                style={{
                  borderWidth: 2,
                  borderColor: "rgba(255, 255, 255, 0.2)",
                }}
              />
            ) : (
              <View className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-400 to-purple-500 items-center justify-center">
                <Ionicons name="person-add" size={24} color="white" />
                <Text className="text-white text-xs font-medium mt-1">Seç</Text>
              </View>
            )}
          </View>
          {/* Edit Indicator */}
          <View 
            className="absolute bottom-2 right-2 w-7 h-7 bg-blue-500 rounded-full items-center justify-center"
            style={{
              shadowColor: "#3b82f6",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 6,
            }}
          >
            <Ionicons name="camera" size={14} color="white" />
          </View>
        </TouchableOpacity>
      </View>

      {/* User Info Card */}
      <View 
        className="flex-1 bg-white/80 dark:bg-gray-800/80 rounded-2xl p-4 backdrop-blur-sm"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.08,
          shadowRadius: 16,
          elevation: 4,
        }}
      >
        <Text className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {user?.username || "Kullanıcı"}
        </Text>
        <View className="flex-row items-center mb-2">
          <Ionicons name="mail" size={14} color="#6b7280" />
          <Text className="text-sm text-gray-600 dark:text-gray-300 ml-2 flex-1" numberOfLines={1}>
            {user?.email || "email@örnek.com"}
          </Text>
        </View>
        <View className="flex-row items-center">
          <Ionicons name="calendar" size={14} color="#6b7280" />
          <Text className="text-xs text-gray-500 dark:text-gray-400 ml-2 flex-1" numberOfLines={1}>
            Üye: {user?.createdAt ? formatDate(user.createdAt) : 'Bilinmiyor'}
          </Text>
        </View>
      </View>
    </View>
    </View>
  );
} 
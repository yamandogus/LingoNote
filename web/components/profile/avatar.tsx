// AvatarSelector.tsx
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  Dimensions,
  useColorScheme,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export const dummyAvatars = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  name: `Avatar ${i + 1}`,
  src: `https://api.dicebear.com/7.x/adventurer/png?seed=${i + 1}`,
}));

const AVATAR_MARGIN = 12;
const SCREEN_WIDTH = Dimensions.get('window').width;
const CONTAINER_WIDTH = Math.min(SCREEN_WIDTH * 0.92, 420);
const NUM_COLUMNS = 5; // 5 sütunlu modern grid
const AVATAR_SIZE = (CONTAINER_WIDTH - (NUM_COLUMNS + 1) * AVATAR_MARGIN) / NUM_COLUMNS;

const AvatarSelector = ({ visible, onClose, onSelectAvatar }: any) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <Modal 
      visible={visible} 
      transparent 
      animationType="slide" 
      statusBarTranslucent
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
        }}
      >
        <View
          className={`${isDark ? "bg-gray-800" : "bg-white"} rounded-3xl overflow-hidden`}
          style={{ 
            width: CONTAINER_WIDTH, 
            maxHeight: '85%',
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 20 },
            shadowOpacity: 0.25,
            shadowRadius: 40,
            elevation: 20,
          }}
        >
          {/* Header */}
          <LinearGradient
            colors={isDark ? ['#374151', '#1f2937'] : ['#f8fafc', '#e2e8f0']}
            className="px-6 py-6 border-b border-gray-200 dark:border-gray-700"
          >
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <View className="w-10 h-10 bg-blue-500 rounded-2xl items-center justify-center mr-3">
                  <Ionicons name="person" size={20} color="white" />
                </View>
                <View>
                  <Text className="text-xl font-bold dark:text-white text-gray-900">
                    Avatar Seç
                  </Text>
                  <Text className="text-sm text-gray-500 dark:text-gray-400">
                    Profil resminizi seçin
                  </Text>
                </View>
              </View>
              <TouchableOpacity 
                onPress={onClose}
                className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full items-center justify-center"
              >
                <Ionicons name="close" size={18} color={isDark ? "#9ca3af" : "#6b7280"} />
              </TouchableOpacity>
            </View>
          </LinearGradient>

          {/* Avatar Grid */}
          <ScrollView 
            className="flex-1 px-6 py-6"
            showsVerticalScrollIndicator={false}
          >
            <View style={{ 
              flexDirection: 'row', 
              flexWrap: 'wrap', 
              justifyContent: 'space-between',
              paddingBottom: 20,
            }}>
              {dummyAvatars.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => onSelectAvatar(item.src)}
                  activeOpacity={0.8}
                  style={{
                    marginBottom: AVATAR_MARGIN,
                    width: AVATAR_SIZE,
                    height: AVATAR_SIZE,
                    borderRadius: AVATAR_SIZE / 4,
                    overflow: 'hidden',
                  }}
                  className="bg-gray-100 dark:bg-gray-700"
                >
                  <View
                    className="w-full h-full items-center justify-center"
                    style={{
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.1,
                      shadowRadius: 8,
                      elevation: 3,
                    }}
                  >
                    <Image
                      source={{ uri: item.src }}
                      style={{
                        width: AVATAR_SIZE - 8,
                        height: AVATAR_SIZE - 8,
                        borderRadius: (AVATAR_SIZE - 8) / 4,
                      }}
                      className="bg-gray-200 dark:bg-gray-600"
                    />
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {/* Footer */}
          <View className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
            <TouchableOpacity 
              onPress={onClose} 
              className="bg-gray-200 dark:bg-gray-700 py-4 rounded-2xl"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
                elevation: 3,
              }}
            >
              <Text className="text-gray-800 dark:text-gray-200 text-center font-semibold text-base">
                Kapat
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AvatarSelector;

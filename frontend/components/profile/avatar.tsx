// AvatarSelector.tsx
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  Dimensions,
  useColorScheme,
} from "react-native";

export const dummyAvatars = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  name: `Avatar ${i + 1}`,
  src: `https://api.dicebear.com/7.x/adventurer/png?seed=${i + 1}`,
}));

const AVATAR_MARGIN = 8;
const SCREEN_WIDTH = Dimensions.get('window').width;
const CONTAINER_WIDTH = Math.min(SCREEN_WIDTH * 0.95, 400);
const NUM_COLUMNS = 6; // 6 sütunlu grid
const AVATAR_SIZE = (CONTAINER_WIDTH - (NUM_COLUMNS + 1) * AVATAR_MARGIN) / NUM_COLUMNS;

const AvatarSelector = ({ visible, onClose, onSelectAvatar }: any) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <Modal visible={visible} transparent animationType="slide" className={isDark ? "bg-gray-800": "bg-slate-50"}>
      <View
        style={{
          flex: 1,
          backgroundColor: "#585858aa",
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
        }}
      >
        <View
        className={isDark ? "bg-gray-800": "bg-slate-50"}
          style={{borderRadius: 16, padding: 24, width: CONTAINER_WIDTH, alignItems: 'center' }}
        >
          <Text className="text-xl dark:text-white/90 font-bold mb-4">
            Avatar Seç
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
            {dummyAvatars.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => onSelectAvatar(item.src)}
                style={{
                  margin: AVATAR_MARGIN / 2,
                  width: AVATAR_SIZE,
                  height: AVATAR_SIZE,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Image
                  source={{ uri: item.src }}
                  style={{
                    width: AVATAR_SIZE,
                    height: AVATAR_SIZE,
                    borderRadius: AVATAR_SIZE / 2,
                    backgroundColor: '#eee',
                  }}
                />
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity onPress={onClose} style={{ marginTop: 16 }} className="bg-slate-200 py-2 px-6 rounded-lg">
            <Text style={{ color: "#2563eb", textAlign: "center", fontWeight: 'bold' }}>Kapat</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default AvatarSelector;

import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Colors } from "@/constants/Colors";

const ProfileOptions = () => {
  const { user, updateProfile } = useAuth();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [info, setInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    setInfo(null);
    try {
      await updateProfile({ username, email, password: password || undefined });
      setInfo("Profil başarıyla güncellendi.");
      setPassword("");
    } catch (e) {
      setInfo("Bir hata oluştu, lütfen tekrar deneyin.");
    }
    setLoading(false);
  };

  return (
    <View style={{ gap: 16 }}>
      <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
        Profil Ayarları
      </Text>
      <Text className="text-gray-500 dark:text-gray-400 text-sm underline">
        Kullanıcı Adı
      </Text>
      <TextInput
        value={username}
        onChangeText={setUsername}
        className="border border-gray-700 dark:border-gray-400 rounded-lg p-2 text-gray-900 dark:text-white"
      />
      <Text className="text-gray-500 dark:text-gray-400 text-sm underline">
        E-posta
      </Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        className="border border-gray-700 dark:border-gray-400 rounded-lg p-2 text-gray-900 dark:text-white"
        keyboardType="email-address"
      />
      <Text className="text-gray-500 dark:text-gray-400 text-sm underline">
        Şifre Değiştir
      </Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        className="border border-gray-700 dark:border-gray-400 rounded-lg p-2 text-gray-900 dark:text-white"
        secureTextEntry
        placeholder="Yeni şifre"
        placeholderTextColor={isDark ? "#888" : "#aaa"}
      />
      <TouchableOpacity
        onPress={handleSave}
        disabled={loading}
        className="w-1/2 mt-4 self-center border border-gray-700 dark:border-gray-400 rounded-lg p-2 text-gray-900 dark:text-white bg-green-400 dark:bg-green-700"
      >
        <Text className="text-gray-900 dark:text-white font-bold text-center">
          {loading ? "Kaydediliyor..." : "Kaydet"}
        </Text>
      </TouchableOpacity>
      {info && <Text className="text-center mt-2">{info}</Text>}
    </View>
  );
};

export default ProfileOptions;

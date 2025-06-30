import { View, Text, TextInput, Button } from "react-native";
import { useState } from "react";

const ProfileOptions = () => {
  const [username, setUsername] = useState("yaman");
  const [email, setEmail] = useState("yaman@example.com");
  const [password, setPassword] = useState("");

  return (
    <View style={{ gap: 16 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 8 }}>Profil Ayarları</Text>
      <Text>Kullanıcı Adı</Text>
      <TextInput value={username} onChangeText={setUsername} style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 8 }} />
      <Text>E-posta</Text>
      <TextInput value={email} onChangeText={setEmail} style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 8 }} keyboardType="email-address" />
      <Text>Şifre Değiştir</Text>
      <TextInput value={password} onChangeText={setPassword} style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 8 }} secureTextEntry placeholder="Yeni şifre" />
      <Button title="Kaydet" onPress={() => {}} color="#6366f1" />
    </View>
  );
};

export default ProfileOptions;
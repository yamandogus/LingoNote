import { View, Text, Switch } from "react-native";
import { useState } from "react";

const Security = () => {
  const [twoFA, setTwoFA] = useState(false);

  return (
    <View style={{ gap: 16 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 8 }}>Güvenlik Ayarları</Text>
      <Text>İki Adımlı Doğrulama (2FA)</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <Switch value={twoFA} onValueChange={setTwoFA} />
        <Text>{twoFA ? 'Aktif' : 'Pasif'}</Text>
      </View>
      <Text style={{ marginTop: 16, fontWeight: 'bold' }}>Güvenlik İpuçları</Text>
      <Text>- Şifrenizi kimseyle paylaşmayın.</Text>
      <Text>- Düzenli olarak şifrenizi değiştirin.</Text>
      <Text>- Hesabınızda olağan dışı bir durum fark ederseniz destek ile iletişime geçin.</Text>
    </View>
  );
};

export default Security;
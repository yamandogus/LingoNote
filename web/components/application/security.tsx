import { View, Text, Switch } from "react-native";
import { useState } from "react";

const Security = () => {

  const [twoFA, setTwoFA] = useState(false);

  return (
    <View className="gap-4">
      <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
        Güvenlik Ayarları
      </Text>
      <Text className="text-gray-500 dark:text-gray-400 text-sm underline">
        İki Adımlı Doğrulama (2FA)
      </Text>
      <View className="flex-row items-center gap-2">
        <Switch value={twoFA} onValueChange={setTwoFA} thumbColor="#6366f1" trackColor={{ true: "#6366f1", false: "#ffffff" }}/>
        <Text className="text-gray-500 dark:text-gray-200 text-sm ">{twoFA ? 'Aktif' : 'Pasif'}</Text>
      </View>
      <Text className="text-gray-500 dark:text-gray-200 text-sm ">Güvenlik İpuçları</Text>
      <Text className="text-gray-500 dark:text-gray-200 text-sm ">- Şifrenizi kimseyle paylaşmayın.</Text>
      <Text className="text-gray-500 dark:text-gray-200 text-sm ">- Düzenli olarak şifrenizi değiştirin.</Text>
      <Text className="text-gray-500 dark:text-gray-200 text-sm ">- Hesabınızda olağan dışı bir durum fark ederseniz destek ile iletişime geçin.</Text>
    </View>
  );
};

export default Security;
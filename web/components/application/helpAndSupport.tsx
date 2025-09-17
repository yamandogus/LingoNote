import { View, Text, Linking, TouchableOpacity } from "react-native";

const HelpAndSupport = () => {

  return (
    <View style={{ gap: 16 }}>
      <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
        Yardım & Destek
      </Text>
      <Text className="text-gray-500 dark:text-gray-400 text-sm underline">
        Sıkça Sorulan Sorular
      </Text>
      <Text className="text-gray-500 dark:text-gray-200 text-sm ">
        - Notlarımı nasıl kaydedebilirim?{"\n"}  → Ana ekrandan Not Ekle butonunu kullanabilirsiniz.{"\n"}
        - Hesabımı nasıl silebilirim?{"\n"}  → Profil ayarlarından hesabınızı silebilirsiniz.{"\n"}
        - Şifremi unuttum, ne yapmalıyım?{"\n"}  → Giriş ekranında Şifremi Unuttum seçeneğini kullanın.
      </Text>
        <Text className="text-gray-500 dark:text-gray-400 text-sm underline mt-4">
          Destek
      </Text>
      <Text className="text-gray-500 dark:text-gray-200 text-sm ">Her türlü soru ve sorun için bize ulaşabilirsiniz:</Text>
      <TouchableOpacity onPress={() => Linking.openURL('mailto:destek@lingonote.com')}
        className="border border-gray-700 dark:border-gray-400 rounded-lg p-2 text-gray-900 dark:text-white bg-green-400 dark:bg-green-700">
        <Text className="text-gray-900 dark:text-white font-bold text-center">
          destek@lingonote.com
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default HelpAndSupport;
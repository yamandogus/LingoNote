import { View, Text, Linking, TouchableOpacity } from "react-native";

const HelpAndSupport = () => {
  return (
    <View style={{ gap: 16 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 8 }}>Yardım & Destek</Text>
      <Text style={{ fontWeight: 'bold' }}>Sıkça Sorulan Sorular</Text>
      <Text>- Notlarımı nasıl kaydedebilirim?{"\n"}  → Ana ekrandan Not Ekle butonunu kullanabilirsiniz.</Text>
      <Text>- Hesabımı nasıl silebilirim?{"\n"}  → Profil ayarlarından hesabınızı silebilirsiniz.</Text>
      <Text>- Şifremi unuttum, ne yapmalıyım?{"\n"}  → Giriş ekranında Şifremi Unuttum seçeneğini kullanın.</Text>
      <Text style={{ fontWeight: 'bold', marginTop: 12 }}>Destek</Text>
      <Text>Her türlü soru ve sorun için bize ulaşabilirsiniz:</Text>
      <TouchableOpacity onPress={() => Linking.openURL('mailto:destek@lingonote.com')}>
        <Text style={{ color: '#6366f1', textDecorationLine: 'underline' }}>destek@lingonote.com</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HelpAndSupport;
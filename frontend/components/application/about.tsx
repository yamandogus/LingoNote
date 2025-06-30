import { View, Text } from "react-native";

const About = () => {
  return (
    <View style={{ gap: 16 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 8 }}>Hakkında</Text>
      <Text>LingoNote, dil öğrenenler için özel olarak geliştirilmiş bir not alma uygulamasıdır. Notlarınızı kategorilere ayırabilir, renklerle kişiselleştirebilir ve ilerlemenizi takip edebilirsiniz.</Text>
      <Text>Sürüm: 1.0.0</Text>
      <Text>Geliştirici: Yaman & LingoNote Ekibi</Text>
      <Text>İletişim: destek@lingonote.com</Text>
    </View>
  );
};

export default About;
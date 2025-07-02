import { View, Text } from "react-native";

const About = () => {

  return (
    <View style={{ gap: 16 }}>
      <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
        Hakkında
      </Text>
      <Text className="text-gray-500 dark:text-gray-200 text-sm ">
        LingoNote, dil öğrenenler için özel olarak geliştirilmiş bir not alma uygulamasıdır. Notlarınızı kategorilere ayırabilir, renklerle kişiselleştirebilir ve ilerlemenizi takip edebilirsiniz.
      </Text>
      <Text className="text-gray-500 dark:text-gray-200 text-sm ">Sürüm: 1.0.0</Text>
      <Text className="text-gray-500 dark:text-gray-200 text-sm ">Geliştirici: Yaman & LingoNote Ekibi</Text>
      <Text className="text-gray-500 dark:text-gray-200 text-sm ">İletişim: destek@lingonote.com</Text>
    </View>
  );
};

export default About;
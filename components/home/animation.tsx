import React from "react";
import { View,Text } from "react-native";
import LottieView from "lottie-react-native";

const Animation = () => {
  return (
    <View className="w-full h-[200px] items-center justify-center">
      <LottieView
        style={{width: '50%', height: 200}}
        source={require("../../assets/animation_1.json")}
        autoPlay
        loop
        speed={1}
        resizeMode="cover"
      />
      <Text className="font-bold my-4">Çoklu dil desteği ile notlarınızı istediğiniz dillerde kaydedin.</Text>
      <LottieView
        style={{width: '50%', height: 200}}
        source={require("../../assets/animation_2.json")}
        autoPlay
        loop
        speed={1}
        resizeMode="cover"
      />
       <Text className="font-bold my-4">Anında çeviri yaparak öğrenme sürecinizi hızlandırın.</Text>
      <LottieView
        style={{width: '50%', height: 200}}
        source={require("../../assets/animation_4.json")}
        autoPlay
        loop
        speed={1}
        resizeMode="cover"
      />
      <Text className="font-bold my-4 px-4">Kişiselleştirilmiş kelime bankası oluşturun ve kelimeleri kolayca tekrar edin.</Text>
      <LottieView
        style={{width: '50%', height: 200}}
        source={require("../../assets/animation_3.json")}
        autoPlay
        loop
        speed={1}
        resizeMode="cover"
      />
      <Text className="font-bold my-4 px-4">Notlarınızı kategorize ederek dil öğrenme yolculuğunuzu düzenli tutun.</Text>
    </View>
  );
};

export default Animation;

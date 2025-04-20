import React, { useState, useEffect, useRef } from "react";
import { View, Text, useColorScheme } from "react-native";
import LottieView from "lottie-react-native";

const Animation = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  // Her animasyon için ayrı ref kullanarak birbirlerini etkilemelerini önleyelim
  const animationRef1 = useRef<LottieView>(null);
  const animationRef2 = useRef<LottieView>(null);
  const animationRef3 = useRef<LottieView>(null);
  const animationRef4 = useRef<LottieView>(null);

  useEffect(() => {
    // Component mount olduğunda animasyonları başlat
    if (animationRef1.current) {
      animationRef1.current.play();
    }
    if (animationRef2.current) {
      animationRef2.current.play();
    }
    if (animationRef3.current) {
      animationRef3.current.play();
    }
    if (animationRef4.current) {
      animationRef4.current.play();
    }
  }, []);

  return (
    <View className="w-full px-4 pt-6 pb-10">
      <View className="mb-8">
        <LottieView
          ref={animationRef1}
          style={{ width: "50%", height: 150, alignSelf: "center" }}
          source={require("../../assets/animation_1.json")}
          autoPlay={false}
          loop
          speed={1}
          resizeMode="cover"
        />
        <View className="mt-2">
          <Text className="font-bold text-start dark:text-gray-300">
            Çoklu dil desteği ile notlarınızı istediğiniz dillerde kaydedin.
          </Text>
        </View>
      </View>

      <View className="mb-8">
        <LottieView
          ref={animationRef2}
          style={{ width: "50%", height: 150, alignSelf: "center" }}
          source={require("../../assets/animation_2.json")}
          autoPlay={false}
          loop
          speed={1}
          resizeMode="cover"
        />
        <View className="mt-2">
          <Text className="font-bold text-start dark:text-gray-300">
            Anında çeviri yaparak öğrenme sürecinizi hızlandırın.
          </Text>
        </View>
      </View>

      <View className="mb-8">
        <LottieView
          ref={animationRef3}
          style={{ width: "50%", height: 150, alignSelf: "center" }}
          source={require("../../assets/animation_4.json")}
          autoPlay={false}
          loop
          speed={1}
          resizeMode="cover"
        />
        <View className="mt-2">
          <Text className="font-bold text-start dark:text-gray-300">
            Kişiselleştirilmiş kelime bankası oluşturun ve kelimeleri kolayca tekrar edin.
          </Text>
        </View>
      </View>

      <View>
        <LottieView
          ref={animationRef4}
          style={{ width: "50%", height: 150, alignSelf: "center" }}
          source={require("../../assets/animation_3.json")}
          autoPlay={false}
          loop
          speed={1}
          resizeMode="cover"
        />
        <View className="mt-2">
          <Text className="font-bold text-start dark:text-gray-300">
            Notlarınızı kategorize ederek dil öğrenme yolculuğunuzu düzenli tutun.
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Animation;

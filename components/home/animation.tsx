import React, { useState, useEffect, useRef } from "react";
import { View, Text, useColorScheme } from "react-native";
import LottieView from "lottie-react-native";

const Animation = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const animationRef1 = useRef<LottieView>(null);
  const animationRef2 = useRef<LottieView>(null);
  const animationRef3 = useRef<LottieView>(null);
  const animationRef4 = useRef<LottieView>(null);

  useEffect(() => {
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
    <View>
      <View className="w-full flex-row justify-center px-4 pt-6 pb-10 gap-20">
        <View className="mb-4">
          <LottieView
            ref={animationRef1}
            style={{ width: "30%", height: 150, alignSelf: "center" }}
            source={require("../../assets/animation_1.json")}
            autoPlay={false}
            loop
            speed={1}
            resizeMode="cover"
          />
          <View className="mt-2">
            <Text className="font-bold text-center dark:text-gray-300">
              Anında Çeviri
            </Text>
          </View>
        </View>

        <View className="mb-4">
          <LottieView
            ref={animationRef2}
            style={{ width: "30%", height: 150, alignSelf: "center" }}
            source={require("../../assets/animation_2.json")}
            autoPlay={false}
            loop
            speed={1}
            resizeMode="cover"
          />
          <View className="mt-2">
            <Text className="font-bold text-center dark:text-gray-300">
              Notlarınızı kaydedin
            </Text>
          </View>
        </View>
      </View>
      <View className="w-full flex-row justify-center px-4 pb-10 gap-20">
        <View>
          <LottieView
            ref={animationRef4}
            style={{ width: "20%", height: 150, alignSelf: "center" }}
            source={require("../../assets/animation_3.json")}
            autoPlay={true}
            loop
            speed={1}
            resizeMode="cover"
          />
          <View className="mt-2">
            <Text className="font-bold text-center dark:text-gray-300">
              Notlar Daha Eğlenceli
            </Text>
          </View>
        </View>
        <View>
          <LottieView
            ref={animationRef4}
            style={{ width: "30%", height: 150, alignSelf: "center" }}
            source={require("../../assets/notes.json")}
            autoPlay={false}
            loop
            speed={1}
            resizeMode="cover"
          />
          <View className="mt-2">
            <Text className="font-bold text-center dark:text-gray-300">
              Kişisel Notlar
            </Text>
          </View>
        </View>
      </View>
   
    </View>
  );
};

export default Animation;

import React from 'react';
import { Image, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function OnboardingScreen() {
  const isDark = useColorScheme() === 'dark';
  const DoneButton = ({ ...props }) => (
    <TouchableOpacity
      {...props}
      className="bg-blue-500 px-6 py-3 rounded-full mx-4"
    >
      <Text className="text-white font-bold">Hemen Başla</Text>
    </TouchableOpacity>
  );

  const SkipButton = ({ ...props }) => (
    <TouchableOpacity
      {...props}
      className="px-6 py-3 mx-4"
    >
      <Text className="text-gray-600 font-medium">Atla</Text>
    </TouchableOpacity>
  );

  const NextButton = ({ ...props }) => (
    <TouchableOpacity
      {...props}
      className="px-6 py-3 mx-4 flex-row items-center"
    >
      <Text className="text-blue-500 font-medium mr-2">İleri</Text>
      <Ionicons name="arrow-forward" size={16} color="#3b82f6" />
    </TouchableOpacity>
  );

  const Title1 = () => <Text className='text-2xl font-bold mb-2 dark:text-white'>Hoş geldin!</Text>;
  const Subtitle1 = () => <Text className='text-md dark:text-white'>Bu uygulama ile notlarını kolayca tutabilirsin</Text>;

  const Title2 = () => <Text className='text-2xl font-bold mb-2 dark:text-white'>Organize ol</Text>;
  const Subtitle2 = () => <Text className='text-md dark:text-white'>Notlarını kategorilere ayır ve düzenli kal</Text>;

  const Title3 = () => <Text className='text-2xl font-bold mb-2 dark:text-white'>Başlayalım!</Text>;
  const Subtitle3 = () => <Text className='text-md dark:text-white'>Haydi hemen ilk notunu oluştur</Text>;

  return (
    <Onboarding
      onSkip={() => router.replace("/(tabs)")}
      onDone={() => router.replace("/(tabs)")}
      DoneButtonComponent={DoneButton}
      SkipButtonComponent={SkipButton}
      NextButtonComponent={NextButton}
      bottomBarHighlight={false}
      pages={[
        {
          backgroundColor:'#fff',
          image: <Image style={{width: 300, height: 300}} source={require('../assets/openSvg/undraw_note-list_47ij-removebg-preview.png')} />,
          title: <Title1 />,
          subtitle: <Subtitle1 />,
        },
        {
          backgroundColor: '#fff',
          image: <Image style={{width: 300, height: 300}} source={require('../assets/openSvg/undraw_notebook_8ihb-removebg-preview.png')} />,
          title: <Title2 />,
          subtitle: <Subtitle2 />,
        },
        {
          backgroundColor: '#fff',
          image: <Image style={{width: 300, height: 300}} source={require('../assets/openSvg/undraw_process_7lkc-removebg-preview.png')} />,
          title: <Title3 />,
          subtitle: <Subtitle3 />,
        },
      ]}
    />
  );
}

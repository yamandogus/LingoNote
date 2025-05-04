import React from 'react';
import { Image } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

const OnboardingScreen = ({ navigation }: { navigation: any }) => {
  return (
    <Onboarding
      onSkip={() => navigation.replace("Home")}  // Skip'e basınca ana sayfa
      onDone={() => navigation.replace("Home")}  // "Get Started" benzeri son buton
      pages={[
        {
          backgroundColor: '#fff',
          image: <Image source={require('../../assets/openSvg/undraw_note-list_47ij.png')} style={{ width: 200, height: 200 }} />,
          title: 'Hoş geldin!',
          subtitle: 'Bu uygulama ile notlarını kolayca tutabilirsin',
        },
        {
          backgroundColor: '#fdeb93',
          image: <Image source={require('../../assets/openSvg/undraw_note-list_47ij.png')} style={{ width: 200, height: 200 }} />,
          title: 'Organize ol',
          subtitle: 'Notlarını kategorilere ayır',
        },
        {
          backgroundColor: '#e9bcbe',
          image: <Image source={require('../../assets/openSvg/undraw_note-list_47ij.png')} style={{ width: 200, height: 200 }} />,
          title: 'Başlayalım!',
          subtitle: 'Haydi hemen ilk notunu oluştur',
        },
      ]}
    />
  );
};

export default OnboardingScreen;

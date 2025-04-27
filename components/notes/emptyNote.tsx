import LottieView from 'lottie-react-native';
import React, { useRef, useEffect } from 'react'
import { View, Text, Dimensions } from 'react-native'

interface EmptyNoteProps {
  categoryTitle?: string;
}

const EmptyNote = ({ categoryTitle }: EmptyNoteProps = {}) => {
    const animationRef1 = useRef<LottieView>(null);
    const { height } = Dimensions.get('window');

    useEffect(() => {
        if (animationRef1.current) {
            animationRef1.current.play();
        }
    }, []);
    
    const getMessage = () => {
      if (!categoryTitle) return 'Bu kategoride henüz not bulunmuyor.';
      
      switch(categoryTitle) {
        case 'Yapılacaklar':
          return 'Henüz yapılacak görev eklenmemiş.';
        case 'Ödevler':
          return 'Henüz ödev notu eklenmemiş.';
        default:
          return `${categoryTitle} kategorisinde henüz not bulunmuyor.`;
      }
    };
    
  return (
    <View style={{ 
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: height * 0.1 
    }}>
      <LottieView
          ref={animationRef1}
          style={{ width: 120, height: 120 }}
          source={require("../../assets/emty.json")}
      />
      <Text className='text-lg font-semibold text-center mt-4 px-6 text-gray-800 dark:text-gray-200'>
          {getMessage()}
      </Text>
    </View>
  )
}

export default EmptyNote
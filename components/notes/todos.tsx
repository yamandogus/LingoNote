import React from 'react'
import { View, Text } from 'react-native';

const Todos = () => {
  return (
    <View className='flex-1 bg-white dark:bg-gray-800'>
        <Text className='text-xl font-bold text-center mt-5 dark:text-white'>
            Yapılacaklar buraya eklenecek
        </Text>
    </View>
  )
}

export default Todos;



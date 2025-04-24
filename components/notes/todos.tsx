import React from 'react'
import { View, Text } from 'react-native';
import { noteStore } from '@/store/noteStore';
import NoteList from './note';
const Todos = () => {
  const { notes } = noteStore();
  return (
    <View className='flex-1 bg-white dark:bg-gray-800'>
        <Text className='text-xl font-bold text-center mt-5 dark:text-white'>
            Yapılacaklar buraya eklenecek
        </Text>
        <NoteList note={notes} title="Yapılacaklar" />
    </View>
  )
}

export default Todos;



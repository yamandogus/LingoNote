import React from 'react'
import { View, Text } from 'react-native';
import { noteStore } from '@/store/noteStore';
import NoteList from './note';
const Other = () => {
  const { notes } = noteStore();
  return (
    <View className='flex-1 bg-white dark:bg-gray-800'>
        <Text className='text-xl font-bold text-center mt-5 dark:text-white'>
            Diğer buraya eklenecek
        </Text>
        <NoteList note={notes} title="Diğer" />
    </View>
  )
}

export default Other;
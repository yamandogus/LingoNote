import { noteStore } from '@/store/noteStore';
import React from 'react'
import { View, Text } from 'react-native';
import NoteList from './note';

const ProjectNotes = () => {
  const { notes } = noteStore();
  return (
    <View className='flex-1 bg-white dark:bg-gray-800'>
        <Text className='text-xl font-bold text-center mt-5 dark:text-white'>
            Proje Notları buraya eklenecek
        </Text>
        <NoteList note={notes} title="Proje Notları" />
    </View>
  )
}

export default ProjectNotes;


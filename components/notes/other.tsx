import React from 'react'
import { View, Text } from 'react-native';
import { noteStore } from '@/store/noteStore';
import NoteList from './note';
import EmptyNote from './emptyNote';

const Other = () => {
  const { notes } = noteStore();
  return (
    <View className='flex-1 bg-white dark:bg-gray-800'>
        {notes.some(note => note.category === "Diğer") ? (
            <NoteList note={notes} title="Diğer" />
        ) : (
            <EmptyNote categoryTitle="Diğer" />
        )}
    </View>
  )
}

export default Other;
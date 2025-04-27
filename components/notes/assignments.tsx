import React from 'react'
import { View, Text } from 'react-native';
import { noteStore } from '@/store/noteStore';
import NoteList from './note';
import EmptyNote from './emptyNote';

const Assignments = () => {
  const { notes } = noteStore();
  return (
    <View className='flex-1 bg-white dark:bg-gray-800'>
        {notes.some(note => note.category === "Ödevler") ? (
            <NoteList note={notes} title="Ödevler" />
        ) : (
            <EmptyNote categoryTitle="Ödevler" />
        )}
    </View>
  )
}

export default Assignments;


import React from 'react'
import { View, Text, ScrollView } from 'react-native';
import { noteStore } from '@/store/noteStore';
import NoteList from './note';
import EmptyNote from './emptyNote';

const Todos = () => {
  const { notes } = noteStore();
  return (
    <View className='flex-1 bg-white dark:bg-gray-800'>
      {notes.some((note) => note.category === "Yapılacaklar") ? (
        <ScrollView>
          <NoteList note={notes} title="Yapılacaklar" />
        </ScrollView>
      ) : (
        <EmptyNote categoryTitle="Yapılacaklar" />
      )}
    </View>
  )
}

export default Todos;



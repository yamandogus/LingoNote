import React from 'react'
import { ScrollView, View } from 'react-native';
import { noteStore } from '@/store/noteStore';
import NoteList from './note';
import EmptyNote from './emptyNote';

const MyNotes = () => {
  const { notes } = noteStore();
  
  return (
    <View className='flex-1 bg-white dark:bg-gray-800'>
      {notes.some(note => note.category === "Genel Notlar") ? (
        <ScrollView>
          <NoteList note={notes} title="Genel Notlar" />
        </ScrollView>
      ) : (
        <EmptyNote categoryTitle="Genel Notlar" />
      )}
    </View>
  );
};

export default MyNotes;


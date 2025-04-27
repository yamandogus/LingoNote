import { noteStore } from '@/store/noteStore';
import React from 'react'
import { View} from 'react-native';
import NoteList from './note';
import EmptyNote from './emptyNote';

const ProjectNotes = () => {
  const { notes } = noteStore();
  return (
    <View className='flex-1 bg-white dark:bg-gray-800'>
      {notes.some(note => note.category === "Proje Notları") ? (
        <NoteList note={notes} title="Proje Notları" />
      ) : (
        <EmptyNote categoryTitle="Proje Notları" />
      )}
    </View>
  )
}

export default ProjectNotes;


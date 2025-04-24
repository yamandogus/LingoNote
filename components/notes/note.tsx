import React from 'react'
import { View, Text } from 'react-native'
import { Note } from '@/store/noteStore'

interface NoteProps {
  note: Note[]
  title: string
}

const NoteList = ({note, title}: NoteProps) => {
  return (
    <View className='space-y-4 mx-2 mt-4'>
        {note.map((note) => (
          note.category === title && (
            <View 
              key={note.id} 
              className='bg-gray-200 dark:bg-gray-700 rounded-lg p-4 shadow-sm'
            >
              <Text className='text-lg font-bold mb-2 dark:text-white'>{note.title}</Text>
              <Text className='text-gray-700 dark:text-gray-300'>{note.content}</Text>
              <Text className='text-xs text-gray-500 dark:text-gray-400 mt-2'>
                Kategori: {note.category}
              </Text>
            </View>
          )
        ))}
      </View>
  )
}

export default NoteList
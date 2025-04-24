import React from 'react'
import { View, Text } from 'react-native';
import { noteStore } from '@/store/noteStore';
const Assignments = () => {
  const { notes } = noteStore();
  return (
    <View className='flex-1 bg-white dark:bg-gray-800'>
        <Text className='text-xl font-bold text-center mt-5 dark:text-white'>
            Ödeveler için eklenen notlar
        </Text>
        <View className='space-y-4'>
        {notes.map((note) => (
          note.category === "Ödevler" && (
            <View 
              key={note.id} 
              className='bg-white dark:bg-gray-700 rounded-lg p-4 shadow-sm'
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
    </View>
  )
}

export default Assignments;


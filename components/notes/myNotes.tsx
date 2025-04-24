import React from 'react'
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { noteStore } from '@/store/noteStore';
import NoteList from './note';
const MyNotes = () => {
  const { notes } = noteStore();
  
  if (notes.length === 0) {
    return (
      <View className='flex-1 justify-center items-center bg-white dark:bg-gray-800 p-4'>
        <Text className='text-xl font-bold text-center mb-2 dark:text-white'>
          Henüz not eklenmemiş
        </Text>
        <Text className='text-gray-600 dark:text-gray-300 text-center'>
          Not eklemek için "Not Ekle" menüsünü kullanabilirsiniz.
        </Text>
      </View>
    );
  }
  
  return (
    <ScrollView className='flex-1 bg-white dark:bg-gray-800'>
      <Text className='text-xl font-bold mb-4 dark:text-white text-center'>
        Genel Notlarım
      </Text>
      <NoteList note={notes} title="Genel Notlarım" />
    </ScrollView>
  );
};


export default MyNotes;


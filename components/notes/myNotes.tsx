import React from 'react'
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { noteStore } from '@/store/noteStore';

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
    <ScrollView className='flex-1 bg-white dark:bg-gray-800 p-4'>
      <Text className='text-xl font-bold mb-4 dark:text-white'>
        Genel Notlarım
      </Text>
      <View className='space-y-4'>
        {notes.map((note) => (
          <View 
            key={note.id} 
            className='bg-white dark:bg-gray-700 rounded-lg p-4 shadow-sm'
            style={styles.noteCard}
          >
            <Text className='text-lg font-bold mb-2 dark:text-white'>{note.title}</Text>
            <Text className='text-gray-700 dark:text-gray-300'>{note.content}</Text>
            <Text className='text-xs text-gray-500 dark:text-gray-400 mt-2'>
              Kategori: {note.category}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  noteCard: {
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1
  }
});

export default MyNotes;


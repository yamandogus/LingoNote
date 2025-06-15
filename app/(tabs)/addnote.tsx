import { ThemedView } from '@/components/ThemedView';
import { FontAwesome } from '@expo/vector-icons';
import { Text, TouchableOpacity } from 'react-native';
import Toast from 'react-native-toast-message';

export default function NotesScreen() {


  return (
    <ThemedView className="flex-1 items-center justify-center">
      <TouchableOpacity className="bg-yellow-100 w-20 h-20 rounded-full items-center justify-center mb-6 shadow-lg">
        <FontAwesome name="plus" size={36} color="#222" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => Toast.show({
        type: 'success',
        text1: 'Hello',
        text2: 'This is some something 👋'
      })} className="text-lg text-gray-200 dark:text-gray-400 font-bold mb-2">
        <Text className="text-gray-200 dark:text-gray-400 font-bold mb-2">Not Ekle</Text>
      </TouchableOpacity>
    </ThemedView>
  );
} 
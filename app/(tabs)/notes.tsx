import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

export default function NotesScreen() {
  return (
    <ThemedView className="flex-1 items-center justify-center">
      <TouchableOpacity className="bg-yellow-100 w-20 h-20 rounded-full items-center justify-center mb-6 shadow-lg">
        <FontAwesome name="plus" size={36} color="#222" />
      </TouchableOpacity>
      <ThemedText type="title">Not Ekle</ThemedText>
    </ThemedView>
  );
} 
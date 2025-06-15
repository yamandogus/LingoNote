import { ThemedView } from '@/components/ThemedView';
import NotesScrollTabs from '@/components/notes/notesScrollTabs';

export default function ExploreScreen() {
  return (
    <ThemedView className=" px-4">
      <NotesScrollTabs />
    </ThemedView>
  );
}

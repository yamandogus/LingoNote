import { ThemedView } from '@/components/ThemedView';
import { Header } from '@/components/home/Header';
import { MotivationBox } from '@/components/home/MotivationBox';
import { NotificationBox } from '@/components/home/NotificationBox';
import { RecentNotes } from '@/components/home/RecentNotes';
import { Stats } from '@/components/home/Stats';
import { TaskBoxes } from '@/components/home/TaskBoxes';
import { UpcomingEvent } from '@/components/home/UpcomingEvent';
import { ScrollView } from 'react-native';

export default function HomeScreen() {
  return (
    <ThemedView className="flex-1 bg-gray-50 pt-1 px-4">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        <Header />
        <Stats />
        <TaskBoxes />
        <UpcomingEvent />
        <NotificationBox />
        <MotivationBox />
        <RecentNotes />
      </ScrollView>
    </ThemedView>
  );
}

import { FontAwesome } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, useColorScheme, View } from 'react-native';

type IconName =
  | 'list'
  | 'star'
  | 'check-square-o'
  | 'calendar'
  | 'tasks'
  | 'book'
  | 'ellipsis-h';

const tabs = [
  { id: 1, title: 'Tümü', icon: 'list' },
  { id: 2, title: 'Önemli', icon: 'star' },
  { id: 3, title: 'Yapılacaklar', icon: 'check-square-o' },
  { id: 4, title: 'Günlük', icon: 'calendar' },
  { id: 5, title: 'Görevler', icon: 'tasks' },
  { id: 6, title: 'Öğrenmek', icon: 'book' },
  { id: 7, title: 'Diğer', icon: 'ellipsis-h' },
];

const NotesScrollTabs = () => {
  const [activeTab, setActiveTab] = useState<number>(1);
  const scrollViewRef = useRef<ScrollView>(null);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  useEffect(() => {
    const tabIndex = tabs.findIndex((tab) => tab.id === activeTab);
    if (scrollViewRef.current && tabIndex !== -1) {
      // UYARI OLUŞMASIN DİYE SCROLLU useEffect içinde yapıyoruz
      scrollViewRef.current.scrollTo({
        x: tabIndex * 100,
        animated: true,
      });
    }
  }, [activeTab]); // Aktif sekme değişince scroll eder

  const handleTabPress = (id: number) => {
    setActiveTab(id);
  };

  return (
    <ScrollView
      horizontal
      ref={scrollViewRef}
      showsHorizontalScrollIndicator={false}
      className="my-4"
    >
      <View className="flex-row gap-x-2 px-2">
        {tabs.map(({ id, icon, title }) => {
          const isActive = activeTab === id;
          return (
            <TouchableOpacity
              key={id}
              onPress={() => handleTabPress(id)}
              className={`flex-row gap-x-2 items-center px-4 py-2 rounded-md border-2 ${
                isActive
                  ? 'bg-lime-200 border-lime-600'
                  : 'bg-gray-200 border-black dark:border-white'
              }`}
            >
              <FontAwesome
                name={icon as IconName}
                size={16}
                color={'#000000'}
              />
              <Text className="text-sm font-semibold">{title}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default NotesScrollTabs;

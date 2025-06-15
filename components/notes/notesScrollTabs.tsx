import React, { useRef, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

const tabs = [
  { id: 1, title: 'Tümü' },
  { id: 2, title: 'Önemli' },
  { id: 3, title: 'Öğrenmek' },
  { id: 4, title: 'Yapılacaklar' },
  { id: 5, title: 'Görevlerim' },
  { id: 6, title: 'Günlük' },
  { id: 7, title: 'Diğer' },
];

const NotesScrollTabs = () => {
  const [activeTab, setActiveTab] = useState(1);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleTabPress = (id: number) => {
    setActiveTab(id);
    const tabIndex = tabs.findIndex(tab => tab.id === id);
    if (scrollViewRef.current && tabIndex !== -1) {
      scrollViewRef.current.scrollTo({
        x: tabIndex * 100,
        animated: true
      });
    }
  };

  return (
    <ScrollView
      horizontal
      ref={scrollViewRef}
      showsHorizontalScrollIndicator={false}
      className="mb-2 my-4"
    >
      <View className="flex-row">
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            onPress={() => handleTabPress(tab.id)}
            className={`mx-4 rounded-full px-4 py-1 ${activeTab === tab.id ? 'bg-[#d9f99d]' : 'bg-gray-200'}`}
          >
            <Text className="text-lg font-bold">{tab.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default NotesScrollTabs;

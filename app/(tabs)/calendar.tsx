import { FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import { Calendar as RNCalendar } from 'react-native-calendars';

type IconName = 'list' | 'star' | 'check-square-o' | 'calendar' | 'tasks' | 'book' | 'ellipsis-h';

const filterOptions: { id: string; title: string; icon: IconName }[] = [
  { id: 'all', title: 'Tümü', icon: 'list' },
  { id: 'important', title: 'Önemli', icon: 'star' },
  { id: 'todo', title: 'Yapılacaklar', icon: 'check-square-o' },
  { id: 'daily', title: 'Günlük', icon: 'calendar' },
  { id: 'tasks', title: 'Görevler', icon: 'tasks' },
  { id: 'learn', title: 'Öğrenmek', icon: 'book' },
  { id: 'other', title: 'Diğer', icon: 'ellipsis-h' },
];

export default function CalendarScreen() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedDate, setSelectedDate] = useState('');
  const [range, setRange] = useState<{start: string|null, end: string|null}>({start: null, end: null});
  const colorScheme = useColorScheme();

  const isDark = colorScheme === 'dark';
  const bgColor = isDark ? 'bg-gray-800' : 'bg-white';
  const textColor = isDark ? 'text-white' : 'text-black';
  const borderColor = isDark ? 'border-gray-700' : 'border-gray-200';

  // Takvimde aralık seçimi için işaretleme fonksiyonu
  const getMarkedDates = () => {
    if (!range.start) return {};
    if (!range.end || range.start === range.end) {
      return {
        [range.start]: {
          startingDay: true,
          endingDay: true,
          color: '#d9f99d',
          textColor: '#000',
        },
      };
    }
    // Tarihleri sırala
    const start = new Date(range.start);
    const end = new Date(range.end);
    let current = new Date(start);
    const marked: any = {};
    while (current <= end) {
      const dateStr = current.toISOString().split('T')[0];
      marked[dateStr] = {
        color: '#d9f99d',
        textColor: '#000',
        startingDay: dateStr === range.start,
        endingDay: dateStr === range.end,
      };
      current.setDate(current.getDate() + 1);
    }
    return marked;
  };

  // Takvimde gün seçimi
  const handleDayPress = (day: {dateString: string}) => {
    if (!range.start || (range.start && range.end)) {
      setRange({start: day.dateString, end: null});
    } else if (range.start && !range.end) {
      if (new Date(day.dateString) < new Date(range.start)) {
        setRange({start: day.dateString, end: range.start});
      } else {
        setRange({start: range.start, end: day.dateString});
      }
    }
  };

  return (
    <ScrollView className="flex-1 bg-gray-50 dark:bg-gray-800">
      {/* Filtreler */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        className="px-2 py-2 border-b border-gray-200 dark:border-gray-700"
      >
        {filterOptions.map((filter) => (
          <TouchableOpacity
            key={filter.id}
            onPress={() => setSelectedFilter(filter.id)}
            className={`mr-2 px-3 py-1 rounded-lg border transition-all duration-200 ${
              selectedFilter === filter.id 
                ? 'bg-[#d9f99d] border-[#a3e635]' 
                : `${bgColor} ${borderColor}`
            }`}
            style={{ minWidth: 90, alignItems: 'center', justifyContent: 'center' }}
          >
            <View className="flex-row items-center justify-center">
              <FontAwesome 
                name={filter.icon} 
                size={15} 
                color={selectedFilter === filter.id ? '#000' : isDark ? '#fff' : '#000'} 
              />
              <Text 
                className={`ml-2 font-semibold text-sm ${
                  selectedFilter === filter.id ? 'text-black' : textColor
                }`}
              >
                {filter.title}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Takvim */}
      <View className="flex p-4">
        <RNCalendar
          onDayPress={handleDayPress}
          markedDates={getMarkedDates()}
          markingType="period"
          theme={{
            backgroundColor: isDark ? '#1f2937' : '#ffffff',
            calendarBackground: isDark ? '#1f2937' : '#ffffff',
            textSectionTitleColor: isDark ? '#ffffff' : '#000000',
            selectedDayBackgroundColor: '#d9f99d',
            selectedDayTextColor: '#000000',
            todayTextColor: '#d9f99d',
            dayTextColor: isDark ? '#ffffff' : '#000000',
            textDisabledColor: isDark ? '#4b5563' : '#d1d5db',
            monthTextColor: isDark ? '#ffffff' : '#000000',
            arrowColor: isDark ? '#ffffff' : '#000000',
          }}
        />
      </View>

      {/* Seçili Tarih veya Aralık Notları */}
      {(range.start && range.end) && (
        <View className={`p-4 border-t ${borderColor}`}>
          <Text className={`text-lg font-bold mb-2 ${textColor}`}>
            {new Date(range.start).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
            {' - '}
            {new Date(range.end).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
          </Text>
          <View className={`p-4 rounded-lg ${bgColor} border ${borderColor}`}>
            <Text className={`${textColor}`}>
              Bu tarihler arasında henüz not bulunmuyor.
            </Text>
          </View>
        </View>
      )}
      {(range.start && !range.end) && (
        <View className={`p-4 border-t ${borderColor}`}>
          <Text className={`text-lg font-bold mb-2 ${textColor}`}>
            {new Date(range.start).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
          </Text>
          <View className={`p-4 rounded-lg ${bgColor} border ${borderColor}`}>
            <Text className={`${textColor}`}>
              Başlangıç tarihi seçildi. Bitiş tarihi seçiniz.
            </Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
} 
import { Tabs } from 'expo-router';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        tabBarLabelStyle: {
          fontWeight: 'bold',
          fontSize: 11, // yazı boyutu
          letterSpacing: 0.5, // harf aralığı
        },
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Ana Sayfa',
          tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Notlarım',
          tabBarIcon: ({ color }) => <Ionicons name="document-text-outline" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="translate"
        options={{
          title: 'Çeviri',
          tabBarIcon: ({ color }) => <Ionicons name="language" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}

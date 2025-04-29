import { Tabs } from 'expo-router';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: isDark ? '#22D3EE' : '#0EA5E9',
        tabBarInactiveTintColor: isDark ? '#9CA3AF' : '#6B7280', 
        tabBarStyle: {
          backgroundColor: isDark ? '#1E293B' : '#F0F9FF', 
          borderTopWidth: 0,
          elevation: 5,
          shadowColor: isDark ? '#000' : '#CBD5E1',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
          height: 60,
          paddingBottom: 6,
        },
        tabBarLabelStyle: {
          fontWeight: 'bold',
          fontSize: 11,
          letterSpacing: 0.5,
          marginTop: -5,
        },
        tabBarIconStyle: {
          marginTop: 5,
        },
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Ana Sayfa',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              name={focused ? "home" : "home-outline"} 
              size={focused ? 26 : 24} 
              color={color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="notes"
        options={{
          title: 'Notlarım',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              name={focused ? "document-text" : "document-text-outline"} 
              size={focused ? 26 : 24} 
              color={color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favoriler',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              name={focused ? "heart" : "heart-outline"} 
              size={focused ? 26 : 24}
              color={color} 
            />
          ),
        }}
      />
    </Tabs>
  );
}

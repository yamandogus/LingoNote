import React from 'react';
import { Link, Stack } from 'expo-router';
import { Text, View, TouchableOpacity } from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Sayfa Bulunamadı' }} />
      <View className="flex-1 items-center justify-center p-5 bg-gray-100 dark:bg-gray-900">
        <Text className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          Bu sayfa mevcut değil.
        </Text>
        <Link href="/" asChild>
          <TouchableOpacity className="bg-blue-500 py-3 px-6 rounded-full mt-4">
            <Text className="text-white font-medium">Ana Sayfaya Dön</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </>
  );
}

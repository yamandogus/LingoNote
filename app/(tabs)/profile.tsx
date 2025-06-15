import { ThemedView } from '@/components/ThemedView';
import { Feather, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { Switch, Text, TouchableOpacity, View } from 'react-native';

export default function ProfileScreen() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ThemedView className="flex-1 bg-gray-50 px-4 pt-10">
      {/* Avatar */}
      <View className="items-center mb-6">
        <View className="w-24 h-24 rounded-full bg-blue-200 items-center justify-center relative">
          <FontAwesome name="user" size={60} color="#2563eb" />
          <TouchableOpacity className="absolute bottom-2 right-2 bg-white rounded-full p-1 border border-gray-200">
            <Feather name="edit-2" size={16} color="#2563eb" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Profile Section */}
      <Text className="text-lg text-gray-800 dark:text-gray-400 font-bold mb-2">Bilgilerim</Text>
      <View className="bg-blue-50 rounded-2xl p-4 mb-2 flex-row items-center justify-between">
        <View className="flex-row items-center">
          <FontAwesome name="user-o" size={20} color="#2563eb" />
          <Text className="ml-2 text-gray-700">Kullanıcı Adı</Text>
        </View>
        <Text className="text-gray-500">cagla</Text>
        <Feather name="chevron-right" size={20} color="#b0b0b0" />
      </View>
      <View className="bg-blue-50 rounded-2xl p-4 mb-2 flex-row items-center justify-between">
        <View className="flex-row items-center">
          <MaterialIcons name="email" size={20} color="#2563eb" />
          <Text className="ml-2 text-gray-700">E-posta</Text>
        </View>
        <Text className="text-gray-500">cagla@gmail.com</Text>
        <Feather name="chevron-right" size={20} color="#b0b0b0" />
      </View>
      <View className="bg-blue-50 rounded-2xl p-4 mb-2 flex-row items-center justify-between">
        <View className="flex-row items-center">
          <Feather name="lock" size={20} color="#2563eb" />
          <Text className="ml-2 text-gray-700">Şifre</Text>
        </View>
        <Text className="text-gray-500">••••••••</Text>
        <Feather name="chevron-right" size={20} color="#b0b0b0" />
      </View>
      <View className="bg-blue-50 rounded-2xl p-4 mb-4 flex-row items-center justify-between">
        <View className="flex-row items-center">
          <Feather name="moon" size={20} color="#2563eb" />
          <Text className="ml-2 text-gray-700">Koyu Mod</Text>
        </View>
        <Switch value={darkMode} onValueChange={setDarkMode} trackColor={{ false: '#d1d5db', true: '#2563eb' }} thumbColor={darkMode ? '#2563eb' : '#f4f3f4'} />
      </View>

      {/* Account Section */}
      <Text className="text-lg text-gray-800 dark:text-gray-400 font-bold mb-2 mt-2">Hesabım</Text>
      <View className="bg-blue-50 rounded-2xl p-4 mb-2 flex-row items-center justify-between">
        <View className="flex-row items-center">
          <FontAwesome name="globe" size={20} color="#2563eb" />
          <Text className="ml-2 text-gray-700">Dil</Text>
        </View>
        <Text className="text-gray-500">Türkçe</Text>
        <Feather name="chevron-right" size={20} color="#b0b0b0" />
      </View>
      <View className="bg-blue-50 rounded-2xl p-4 mb-4 flex-row items-center justify-between">
        <View className="flex-row items-center">
          <FontAwesome name="calendar" size={20} color="#2563eb" />
          <Text className="ml-2 text-gray-700">Doğum Tarihi</Text>
        </View>
        <Text className="text-gray-500">June 30, 1990</Text>
        <Feather name="chevron-right" size={20} color="#b0b0b0" />
      </View>

      {/* Log out & Delete */}
      <View className="flex-row items-center justify-between mt-4">
        <TouchableOpacity className="mb-2">
          <Text className="text-blue-600 font-bold text-base border border-blue-600 rounded-2xl px-4 py-2">Çıkış Yap</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text className="text-red-500 font-bold text-base border border-red-500 rounded-2xl px-4 py-2">Hesabımı Sil</Text>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
} 
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
      <Text className="text-xs text-gray-400 font-bold mb-2">PROFILE</Text>
      <View className="bg-blue-50 rounded-2xl p-4 mb-2 flex-row items-center justify-between">
        <View className="flex-row items-center">
          <FontAwesome name="user-o" size={20} color="#2563eb" />
          <Text className="ml-2 text-gray-700">Username</Text>
        </View>
        <Text className="text-gray-500">Çağla Yılmaz</Text>
        <Feather name="chevron-right" size={20} color="#b0b0b0" />
      </View>
      <View className="bg-blue-50 rounded-2xl p-4 mb-2 flex-row items-center justify-between">
        <View className="flex-row items-center">
          <MaterialIcons name="email" size={20} color="#2563eb" />
          <Text className="ml-2 text-gray-700">E-mail</Text>
        </View>
        <Text className="text-gray-500">cagla@email.com</Text>
        <Feather name="chevron-right" size={20} color="#b0b0b0" />
      </View>
      <View className="bg-blue-50 rounded-2xl p-4 mb-2 flex-row items-center justify-between">
        <View className="flex-row items-center">
          <Feather name="lock" size={20} color="#2563eb" />
          <Text className="ml-2 text-gray-700">Password</Text>
        </View>
        <Text className="text-gray-500">••••••••</Text>
        <Feather name="chevron-right" size={20} color="#b0b0b0" />
      </View>
      <View className="bg-blue-50 rounded-2xl p-4 mb-4 flex-row items-center justify-between">
        <View className="flex-row items-center">
          <Feather name="moon" size={20} color="#2563eb" />
          <Text className="ml-2 text-gray-700">Dark Mode</Text>
        </View>
        <Switch value={darkMode} onValueChange={setDarkMode} trackColor={{ false: '#d1d5db', true: '#2563eb' }} thumbColor={darkMode ? '#2563eb' : '#f4f3f4'} />
      </View>

      {/* Account Section */}
      <Text className="text-xs text-gray-400 font-bold mb-2 mt-2">ACCOUNT</Text>
      <View className="bg-blue-50 rounded-2xl p-4 mb-2 flex-row items-center justify-between">
        <View className="flex-row items-center">
          <FontAwesome name="globe" size={20} color="#2563eb" />
          <Text className="ml-2 text-gray-700">Language</Text>
        </View>
        <Text className="text-gray-500">English (UK)</Text>
        <Feather name="chevron-right" size={20} color="#b0b0b0" />
      </View>
      <View className="bg-blue-50 rounded-2xl p-4 mb-4 flex-row items-center justify-between">
        <View className="flex-row items-center">
          <FontAwesome name="calendar" size={20} color="#2563eb" />
          <Text className="ml-2 text-gray-700">Birthday</Text>
        </View>
        <Text className="text-gray-500">June 30, 1990</Text>
        <Feather name="chevron-right" size={20} color="#b0b0b0" />
      </View>

      {/* Log out & Delete */}
      <TouchableOpacity className="mb-2">
        <Text className="text-blue-600 font-bold text-base">Log out</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text className="text-red-500 font-bold text-base">Delete My Account</Text>
      </TouchableOpacity>
    </ThemedView>
  );
} 
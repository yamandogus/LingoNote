import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  useColorScheme,
  Platform,
  Switch,
  StyleSheet
} from "react-native";
import { 
  Ionicons, 
  MaterialIcons, 
  Feather,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

type MenuItem = {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  isToggle?: boolean;
  toggleValue?: boolean;
  onToggleChange?: (value: boolean) => void;
  showChevron?: boolean;
};

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(isDark);

  const stats = [
    { icon: 'file-text', value: '128', label: 'Toplam Not' },
    { icon: 'star', value: '24', label: 'Favori' },
    { icon: 'calendar', value: '5', label: 'Planlanan' },
  ];

  const menuItems: MenuItem[] = [
    {
      icon: <Ionicons name="person-outline" size={24} color="#6366f1" />,
      title: 'Profil Ayarları',
      subtitle: 'Kişisel bilgilerinizi düzenleyin',
      showChevron: true,
    },
    {
      icon: <Ionicons name="notifications-outline" size={24} color="#f59e0b" />,
      title: 'Bildirimler',
      isToggle: true,
      toggleValue: notificationsEnabled,
      onToggleChange: setNotificationsEnabled,
    },
    {
      icon: <Ionicons name="moon-outline" size={24} color="#8b5cf6" />,
      title: 'Koyu Tema',
      isToggle: true,
      toggleValue: darkModeEnabled,
      onToggleChange: setDarkModeEnabled,
    },
    {
      icon: <MaterialIcons name="security" size={24} color="#10b981" />,
      title: 'Gizlilik',
      subtitle: 'Gizlilik ayarlarınızı yönetin',
      showChevron: true,
    },
    {
      icon: <Ionicons name="help-circle-outline" size={24} color="#3b82f6" />,
      title: 'Yardım & Destek',
      showChevron: true,
    },
    {
      icon: <Ionicons name="information-circle-outline" size={24} color="#6b7280" />,
      title: 'Hakkında',
      showChevron: true,
    },
  ];

  const renderMenuItem = (item: MenuItem, index: number) => (
    <TouchableOpacity
      key={index}
      onPress={item.onPress}
      className={`flex-row items-center p-4 border-b border-gray-200 ${isDark ? 'bg-[#1f2937]' : 'bg-white'}`}
      activeOpacity={0.7}
    >
      <View className="w-12 h-12 items-center justify-center">
        {item.icon}
      </View>
      <View className="flex-1 ml-4">
        <Text className={`text-lg font-semibold ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
          {item.title}
        </Text>
        {item.subtitle && (
          <Text className={`text-sm text-gray-600 mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {item.subtitle}
          </Text>
        )}
      </View>
      {item.isToggle ? (
        <Switch
          value={item.toggleValue}
          onValueChange={item.onToggleChange}
          trackColor={{ false: '#e5e7eb', true: isDark ? '#4f46e5' : '#6366f1' }}
          thumbColor="#ffffff"
        />
      ) : item.showChevron ? (
        <Ionicons 
          name="chevron-forward" 
          size={20} 
          color={isDark ? '#6b7280' : '#9ca3af'} 
        />
      ) : null}
    </TouchableOpacity>
  );

  return (
    <View className={`flex-1 ${isDark ? 'bg-[#0f172a]' : 'bg-white'}`}>
      <LinearGradient
        colors={isDark ? ['#0f172a', '#1e293b'] : ['#6366f1', '#8b5cf6']}
        className="h-24"
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {Platform.OS === 'android' && <View style={{ height: 32 }} />}
        <View   className="flex-1 items-center">
          <View className="w-24 h-24 items-center justify-center">
            <Image
              source={require("@/assets/images/icon.png")}
              className="w-24 h-24 rounded-full"
            />
            <View className="w-6 h-6 rounded-full bg-green-500 items-center justify-center" />
          </View>
          <Text className="text-lg font-semibold text-white">Yaman Doğuş</Text>
          <Text className="text-sm text-gray-600 mt-1 text-white">yaman@example.com</Text>
          
          <View className="flex-row justify-around mt-8">
            {stats.map((stat, index) => (
              <View key={index}>
                <View className="w-12 h-12 items-center justify-center">
                  <Feather 
                    name={stat.icon as any} 
                    size={18} 
                    color="#ffffff" 
                  />
                </View>
                <Text className="text-lg font-semibold text-white">{stat.value}</Text>
                <Text className="text-sm text-gray-600 mt-1 text-white">{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>
      </LinearGradient>
      
      <ScrollView 
        className="flex-1"
        showsVerticalScrollIndicator={false}
      >
        {/* Menu Items */}
        <View className="flex-1">
          {menuItems.map((item, index) => renderMenuItem(item, index))}
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          className={`flex-row items-center p-4 border-t border-gray-200 ${isDark ? 'bg-[#1f2937]' : 'bg-white'}`}
          activeOpacity={0.8}
        >
          <Ionicons 
            name="log-out-outline" 
            size={22} 
            color="#ef4444" 
            className="mr-2" 
          />
          <Text className="text-lg font-semibold text-white">Çıkış Yap</Text>
        </TouchableOpacity>

        {/* App Version */}
        <Text className="text-sm text-gray-600 mt-1 text-white">LingoNote v1.0.0</Text>
      </ScrollView>
    </View>
  );
}

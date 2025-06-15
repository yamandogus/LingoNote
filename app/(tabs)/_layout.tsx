import { FontAwesome } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { TouchableOpacity, View } from 'react-native';

function CustomTabButton({ children, onPress }: any) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      className="flex-1 items-center justify-center"
      style={{ height: '100%' }}
    >
      {children}
    </TouchableOpacity>
  );
}

function CustomPlusButton({ children, onPress, accessibilityState }: any) {
  const focused = accessibilityState?.selected;
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      className="items-center justify-center"
      style={{
        top: -36,
        shadowColor: 'rgba(0, 0, 0, 0.15)',
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 6,
      }}
    >
      <View
        className="rounded-full items-center justify-center"
        style={{
          width: 64,
          height: 64,
          backgroundColor: focused ? '#d9f99d' : '#d9f99d',
          borderWidth: focused ? 2 : 0,
          borderColor: focused ? '#a3e635' : 'transparent',
        }}
      >
        <FontAwesome name="plus" size={32} color={focused ? '#222' : '#000000'} />
      </View>
    </TouchableOpacity>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#d9f99d',
        tabBarInactiveTintColor: '#94a3b8',
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          left: 16,
          right: 16,
          bottom: 16,
          borderRadius: 32,
          backgroundColor: '#19202b',
          height: 60,
          paddingTop: 20,
          borderTopWidth: 0,
          shadowColor: '#000',
          shadowOpacity: 0.12,
          shadowRadius: 12,
          elevation: 10,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View className="flex-1 justify-center items-center h-full">
              <FontAwesome name="home" size={28} color={focused ? '#d9f99d' : color} />
            </View>
          ),
          tabBarButton: (props) => <CustomTabButton {...props} />,
          title: 'Ana Sayfa',
        }}
      />
      <Tabs.Screen
        name="mynotes"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View className="flex-1 justify-center items-center h-full">
              <FontAwesome name="file-text-o" size={28} color={focused ? '#d9f99d' : color} />
            </View>
          ),
          tabBarButton: (props) => <CustomTabButton {...props} />,
          title: 'Notlarım',
        }}
      />
      <Tabs.Screen
        name="addnote"
        options={{
          tabBarIcon: () => null,
          tabBarButton: (props) => <CustomPlusButton {...props} />,
          title: 'Not Ekle',
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View className="flex-1 justify-center items-center h-full">
              <FontAwesome name="line-chart" size={28} color={focused ? '#d9f99d' : color} />
            </View>
          ),
          tabBarButton: (props) => <CustomTabButton {...props} />,
          title: 'Takvim',
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View className="flex-1 justify-center items-center h-full">
              <FontAwesome name="user-o" size={28} color={focused ? '#d9f99d' : color} />
            </View>
          ),
          tabBarButton: (props) => <CustomTabButton {...props} />,
          title: 'Profil',
        }}
      />
    </Tabs>
  );
}

import { View, Text, Switch } from "react-native";
import { useState } from "react";

interface SettingsDetailsProps {
  isDark: boolean;
}

export function SettingsDetails({ isDark }: SettingsDetailsProps) {
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState("Türkçe");

  return (
    <View style={{ marginTop: 16, backgroundColor: isDark ? '#232323' : '#f3f4f6', borderRadius: 18, padding: 16 }}>
      {/* Dil Seçimi */}
      <View style={{ marginBottom: 18 }}>
        <Text style={{ color: isDark ? '#fff' : '#18181b', fontWeight: 'bold', fontSize: 16, marginBottom: 4 }}>Dil</Text>
        <Text style={{ color: isDark ? '#d1d5db' : '#6b7280', fontSize: 15 }}>{language}</Text>
      </View>
      {/* Bildirimler */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
        <View>
          <Text style={{ color: isDark ? '#fff' : '#18181b', fontWeight: 'bold', fontSize: 16 }}>Bildirimler</Text>
          <Text style={{ color: isDark ? '#d1d5db' : '#6b7280', fontSize: 13 }}>Uygulama bildirimlerini aç/kapat</Text>
        </View>
        <Switch
          value={notifications}
          onValueChange={setNotifications}
          trackColor={{ false: '#d1d5db', true: '#2563eb' }}
          thumbColor={isDark ? '#fff' : '#2563eb'}
        />
      </View>
      {/* Uygulama Hakkında */}
      <View>
        <Text style={{ color: isDark ? '#fff' : '#18181b', fontWeight: 'bold', fontSize: 16, marginBottom: 4 }}>Uygulama Hakkında</Text>
        <Text style={{ color: isDark ? '#d1d5db' : '#6b7280', fontSize: 14 }}>LingoNote v1.0.0 - Notlarını kolayca yönet!</Text>
      </View>
    </View>
  );
} 
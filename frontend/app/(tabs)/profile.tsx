import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  useColorScheme,
  Platform,
} from "react-native";
import { Ionicons, MaterialIcons, Feather } from "@expo/vector-icons";
import { SettingsDetails } from "@/components/SettingsDetails";
import { LinearGradient } from "expo-linear-gradient";

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [showSettings, setShowSettings] = useState(false);

  return (
    <View className="flex-1">
      <LinearGradient
       colors={isDark ? ['#0f0c29', '#120f31', '#16162e'] : ['#e0e0e0', '#bdbdbd', '#757575']}
        style={{ flex: 1 }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {Platform.OS === 'android' && <View style={{ height: 32 }} />}
        <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 100 }}>
          {/* Profil Fotoğrafı ve Kullanıcı Bilgileri */}
          <View style={{ alignItems: "center", marginBottom: 24 }}>
            <View style={{
              width: 110,
              height: 110,
              borderRadius: 55,
              backgroundColor: isDark ? '#18181b' : '#fff',
              justifyContent: 'center',
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.15,
              shadowRadius: 8,
              elevation: 8,
            }}>
              <Image
                source={require("@/assets/images/icon.png")}
                style={{
                  width: 90,
                  height: 90,
                  borderRadius: 45,
                  borderWidth: 3,
                  borderColor: isDark ? "#fff" : "#e5e7eb",
                }}
              />
            </View>
            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                color: isDark ? "#fff" : "#18181b",
                marginTop: 14,
              }}
            >
              Yaman
            </Text>
            <Text
              style={{ color: isDark ? "#d1d5db" : "#6b7280", fontSize: 15, marginTop: 2 }}
            >
              yaman@example.com
            </Text>
          </View>

          {/* Modern İstatistik Kartları */}
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 28 }}>
            {[{
              icon: <Ionicons name="document-text-outline" size={28} color={isDark ? "#60a5fa" : "#2563eb"} />,
              value: 12,
              label: 'Not',
            }, {
              icon: <MaterialIcons name="category" size={28} color={isDark ? "#fbbf24" : "#eab308"} />,
              value: 5,
              label: 'Kategori',
            }, {
              icon: <Feather name="star" size={28} color={isDark ? "#f472b6" : "#be185d"} />,
              value: 3,
              label: 'Favori',
            }].map((item, idx) => (
              <View key={idx} style={{
                backgroundColor: isDark ? '#232323' : '#fff',
                borderRadius: 16,
                alignItems: 'center',
                paddingVertical: 16,
                paddingHorizontal: 18,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.08,
                shadowRadius: 6,
                elevation: 4,
                minWidth: 80,
              }}>
                {item.icon}
                <Text style={{ fontWeight: 'bold', color: isDark ? '#fff' : '#18181b', marginTop: 6, fontSize: 18 }}>{item.value}</Text>
                <Text style={{ color: isDark ? '#d1d5db' : '#6b7280', fontSize: 13, marginTop: 2 }}>{item.label}</Text>
              </View>
            ))}
          </View>

          {/* Modern Ayarlar ve Diğer Seçenekler */}
          <View
            style={{
              backgroundColor: isDark ? "#232323" : "#f3f4f6",
              borderRadius: 18,
              padding: 16,
              marginBottom: 24,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.07,
              shadowRadius: 6,
              elevation: 2,
            }}
          >
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 12,
                borderBottomWidth: 1,
                borderBottomColor: isDark ? '#333' : '#e5e7eb',
              }}
            >
              <Ionicons
                name="person-outline"
                size={22}
                color={isDark ? "#fff" : "#18181b"}
                style={{ marginRight: 16 }}
              />
              <Text
                style={{ color: isDark ? "#fff" : "#18181b", fontSize: 16 }}
              >
                Profil Bilgilerim
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 12,
                borderBottomWidth: 1,
                borderBottomColor: isDark ? '#333' : '#e5e7eb',
              }}
              onPress={() => setShowSettings(!showSettings)}
            >
              <Ionicons
                name="settings-outline"
                size={22}
                color={isDark ? "#fff" : "#18181b"}
                style={{ marginRight: 16 }}
              />
              <Text
                style={{ color: isDark ? "#fff" : "#18181b", fontSize: 16 }}
              >
                Ayarlar
              </Text>
              <Ionicons
                name={showSettings ? "chevron-up" : "chevron-down"}
                size={20}
                color={isDark ? "#fff" : "#18181b"}
                style={{ marginLeft: 8 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 12,
              }}
            >
              <Ionicons
                name="moon-outline"
                size={22}
                color={isDark ? "#fff" : "#18181b"}
                style={{ marginRight: 16 }}
              />
              <Text
                style={{ color: isDark ? "#fff" : "#18181b", fontSize: 16 }}
              >
                Tema: {isDark ? "Koyu" : "Açık"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Ayar Detayları */}
          {showSettings && <SettingsDetails isDark={isDark} />}

          {/* Modern Çıkış Butonu */}
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 10,
              paddingVertical: 16,
              borderRadius: 14,
              backgroundColor: isDark ? "#ef4444" : "#fee2e2",
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.10,
              shadowRadius: 8,
              elevation: 3,
            }}
          >
            <Ionicons
              name="log-out-outline"
              size={22}
              color={isDark ? "#fff" : "#b91c1c"}
              style={{ marginRight: 10 }}
            />
            <Text
              style={{
                color: isDark ? "#fff" : "#b91c1c",
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              Çıkış Yap
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

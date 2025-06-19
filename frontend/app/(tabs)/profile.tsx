import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  useColorScheme,
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
        colors={["#0f0c29", "#302b63", "#24243e"]}
        style={{ flex: 1 }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 100 }}>
          {/* Profil Fotoğrafı ve Kullanıcı Bilgileri */}
          <View style={{ alignItems: "center", marginBottom: 24 }}>
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
            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                color: isDark ? "#fff" : "#18181b",
                marginTop: 12,
              }}
            >
              Yaman
            </Text>
            <Text
              style={{ color: isDark ? "#d1d5db" : "#6b7280", fontSize: 15 }}
            >
              yaman@example.com
            </Text>
          </View>

          {/* İstatistikler */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 28,
            }}
          >
            <View style={{ alignItems: "center" }}>
              <Ionicons
                name="document-text-outline"
                size={28}
                color={isDark ? "#60a5fa" : "#2563eb"}
              />
              <Text
                style={{
                  fontWeight: "bold",
                  color: isDark ? "#fff" : "#18181b",
                  marginTop: 4,
                }}
              >
                12
              </Text>
              <Text
                style={{ color: isDark ? "#d1d5db" : "#6b7280", fontSize: 13 }}
              >
                Not
              </Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <MaterialIcons
                name="category"
                size={28}
                color={isDark ? "#fbbf24" : "#eab308"}
              />
              <Text
                style={{
                  fontWeight: "bold",
                  color: isDark ? "#fff" : "#18181b",
                  marginTop: 4,
                }}
              >
                5
              </Text>
              <Text
                style={{ color: isDark ? "#d1d5db" : "#6b7280", fontSize: 13 }}
              >
                Kategori
              </Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Feather
                name="star"
                size={28}
                color={isDark ? "#f472b6" : "#be185d"}
              />
              <Text
                style={{
                  fontWeight: "bold",
                  color: isDark ? "#fff" : "#18181b",
                  marginTop: 4,
                }}
              >
                3
              </Text>
              <Text
                style={{ color: isDark ? "#d1d5db" : "#6b7280", fontSize: 13 }}
              >
                Favori
              </Text>
            </View>
          </View>

          {/* Ayarlar ve Diğer Seçenekler */}
          <View
            style={{
              backgroundColor: isDark ? "#232323" : "#f3f4f6",
              borderRadius: 18,
              padding: 16,
              marginBottom: 24,
            }}
          >
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 12,
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

          {/* Çıkış */}
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginTop:10,
              paddingVertical: 14,
              borderRadius: 12,
              backgroundColor: isDark ? "#ef4444" : "#fee2e2",
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

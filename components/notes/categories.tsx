import React from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const categories = [
  {
    title: "✏️ Not Ekle",
    icon: (
      <MaterialCommunityIcons
        name="note-edit-outline"
        size={36}
        color="#25d125"
      />
    ),
    desc: "Yeni notlarınızı hızlıca ekleyin.",
    bg: "#e6fbe6",
  },
  {
    title: "📋 Genel Notlarım",
    icon: (
      <MaterialCommunityIcons
        name="clipboard-list-outline"
        size={36}
        color="#2563eb"
      />
    ),
    desc: "Tüm genel notlarınızı burada görüntüleyin.",
    bg: "#e6f0fb",
  },
  {
    title: "✅ Yapılacaklar",
    icon: (
      <MaterialCommunityIcons
        name="check-circle-outline"
        size={36}
        color="#f59e42"
      />
    ),
    desc: "Yapılacaklarınızı kolayca yönetin.",
    bg: "#fff7e6",
  },
  {
    title: "📝 Ödevler",
    icon: (
      <MaterialCommunityIcons
        name="notebook-outline"
        size={36}
        color="#a78bfa"
      />
    ),
    desc: "Ödevlerinizi takip edin ve düzenleyin.",
    bg: "#f3e8ff",
  },
  {
    title: "🔍 Proje Notları",
    icon: (
      <MaterialCommunityIcons
        name="file-search-outline"
        size={36}
        color="#10b981"
      />
    ),
    desc: "Projelerinizle ilgili notlarınızı saklayın.",
    bg: "#d1fae5",
  },
  {
    title: "📎 Diğer",
    icon: <MaterialCommunityIcons name="paperclip" size={36} color="#fb7185" />,
    desc: "Diğer tüm notlarınızı burada tutun.",
    bg: "#ffe4e6",
  },
];

const Categories = () => {
  return (
    <ScrollView>
      <View className="w-full h-52 bg-white mt-2">
      <Image
        source={require("../../assets/openSvg/undraw_process_7lkc.png")}
        style={{ width: "100%", height: "90%", resizeMode: "contain", marginTop: 10 }}
      />
      </View>
      <View className="flex-1 px-6 py-8">
        <Text className="text-2xl font-bold text-center mb-6 dark:text-white">
          Notlarınızı Kategorilerle Yönetin
        </Text>
        <Text className="text-md text-center text-gray-700 dark:text-gray-200 mb-6">
          Her kategori, notlarınızı daha düzenli ve erişilebilir hale getirir.
          Aşağıdan kategorilerin işlevlerini keşfedin!
        </Text>
        <View>
          {categories.map((cat, idx) => (
            <View
              key={idx}
              style={{ backgroundColor: cat.bg }}
              className="flex-row items-center rounded-xl p-4 mb-4 shadow-sm"
            >
              <View className="mr-4">{cat.icon}</View>
              <View>
                <Text className="font-bold text-lg mb-1 ">{cat.title}</Text>
                <Text className="text-gray-700 ">{cat.desc}</Text>
              </View>
            </View>
          ))}
        </View>
        {/* Dipnotlar */}
        <View className="mt-8 px-2">
          <Text className="text-sm text-gray-500 dark:text-gray-400 mb-1">
            • Notlarınızı istediğiniz zaman güncelleyebilir veya silebilirsiniz.
          </Text>
          <Text className="text-sm text-gray-500 dark:text-gray-400 mb-1">
            • Kategoriler arasında geçiş yapmak için üstteki menüyü kullanın.
          </Text>
          <Text className="text-sm text-gray-500 dark:text-gray-400 mb-1">
            • Notlarınızı favorilere ekleyerek daha hızlı erişim
            sağlayabilirsiniz.
          </Text>
          <Text className="text-sm text-blue-500 dark:text-blue-300 mt-2">
            Tüm verileriniz güvende ve sadece size özeldir.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default Categories;

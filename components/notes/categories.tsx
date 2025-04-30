import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Categories = ({
  setCurrentPage,
}: {
  setCurrentPage: (page: number) => void;
}) => {
  const categories = [
    {
      id: 0,
      name: "Not Ekle",
      color: "#25d125",
      page: 1,
    },
    {
      id: 1,
      name: "Genel Notlar",
      color: "#FDE68A",
      page: 2,
    },
    {
      id: 2,
      name: "Yapılacaklar",
      color: "#BFDBFE",
      page: 3,
    },
    {
      id: 3,
      name: "Ödevler",
      color: "#C7D2FE",
      page: 4,
    },
    {
      id: 4,
      name: "Proje Notları",
      color: "#BBF7D0",
      page: 5,
    },
    {
      id: 5,
      name: "Diğer",
      color: "#FEDDC7",
      page: 6,
    },
    {
      id:6,
      name: "Not Ara",
      color: "#d38afd",
      page: 7,
    }
  ];
  return (
    <View className="flex-1 px-6">
      {categories.map((category) => (
        <TouchableOpacity
          key={category.id}
          style={{ backgroundColor: category.color }}
          onPress={() => {
            setCurrentPage(category.page);
          }}
          className="flex-row items-center justify-between my-4 p-3 rounded-lg"
        >
          <Text className="text-lg font-bold dark:text-gray-800">
            {category.name}
          </Text>
          <View className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
            <Ionicons name="chevron-forward" size={20} color="#4B5563" />
          </View>
        </TouchableOpacity>
      ))}
      <View className="flex-col justify-between my-4 p-3 rounded-lg mt-10">
        <Text className="text-lg font-bold text-red-500 dark:text-red-400">
          Önemli!!
        </Text>
        <Text className="text-sm text-gray-700 dark:text-gray-200">
          Bu notlarınızı daha iyi bir şekilde yönetebilirsiniz. Eklenen notları
          güncelleyebilir, silebilir veya gün bazında favorilere ekleyerek
          görevler şeklinde yönetimini sağlabilirsiniz.
        </Text>
      </View>
    </View>
  );
};

export default Categories;

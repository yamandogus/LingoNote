import React from "react";
import { View, Text } from "react-native";

const Categories = () => {
  const categories = [
    {
      id: 0,
      name: "Not Ekle",
      color: "#FDE68A", 
    },
    {
      id: 1,
      name: "Genel Notlar",
      color: "#FDE68A", 
    },
    {
      id: 2,
      name: "Yapılacaklar",
      color: "#BFDBFE", 
    },
    {
      id: 3,
      name: "Ödevler",
      color: "#C7D2FE", 
    },
    {
      id: 4,
      name: "Proje Notları",
      color: "#BBF7D0", 
    },
    {
      id: 5,
      name: "Diğer",
      color: "#FEDDC7", 
    },
  ];
  return (
    <View className="flex-1 px-6">
      {categories.map((category) => (
        <View
          key={category.id}
          style={{ backgroundColor: category.color }}
          className="flex-row items-center justify-between my-4 p-3 rounded-lg"
        >
          <Text className="text-lg font-bold dark:text-gray-800">
            {category.name}
          </Text>
          <View className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
            <Text className="text-xl font-bold">+</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default Categories;

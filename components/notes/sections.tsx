import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

const Sections = ({ category, setCategory }: { category: string, setCategory: (category: string) => void }) => {
  return (
    <View className="flex-row flex-wrap mb-6 justify-center">
    {["Genel Notlarım", "Yapılacaklar", "Ödevler", "Proje Notları", "Diğer"].map((cat) => (
      <TouchableOpacity
        key={cat}
        onPress={() => setCategory(cat)}
        className={`px-4 py-3 rounded-full m-1 ${
          category === cat ? "bg-blue-500" : "bg-gray-200"
        }`}
      >
        <Text 
          className={`${category === cat ? "text-white" : "text-gray-800"} text-base font-medium`}
        >
          {cat}
        </Text>
      </TouchableOpacity>
    ))}
  </View>
  )
}

export default Sections;
import { Text, ScrollView, TouchableOpacity } from "react-native";

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onSelect: (cat: string) => void;
  isDark: boolean;
}

export function CategoryFilter({ categories, activeCategory, onSelect, isDark }: CategoryFilterProps) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row mb-4">
      {categories.map((cat) => (
        <TouchableOpacity
          key={cat}
          onPress={() => onSelect(cat)}
          className={`flex-row items-center justify-center gap-2 px-4 py-2 mr-2 rounded-full ${activeCategory === cat ? (isDark ? 'bg-blue-700' : 'bg-blue-200') : (isDark ? 'bg-[#48a748]' : 'bg-gray-100')}`}
        >
          <Text className={`font-semibold ${activeCategory === cat ? (isDark ? 'text-white' : 'text-blue-700') : (isDark ? 'text-gray-200' : 'text-gray-700')}`}>{cat}</Text>
          <Text className="font-bold dark:text-slate-100">{cat.length}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
} 
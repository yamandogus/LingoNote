import { Text, ScrollView, TouchableOpacity } from "react-native";

interface Note {
  id: string;
  title: string;
  content: string;
  category: string;
  color: string;
  userId: string;
  createdAt: string;
}

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onSelect: (cat: string) => void;
  isDark: boolean;
  notes: Note[];
}

export function CategoryFilter({ categories, activeCategory, onSelect, isDark, notes }: CategoryFilterProps) {

  const getCategoryCount = (category: string) => {
    if (category === "Tümü") {
      return notes.length;
    }
    return notes.filter(note => note.category === category).length;
  };

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row mb-4">
      {categories.map((cat) => (
        <TouchableOpacity
          key={cat}
          onPress={() => onSelect(cat)}
          className={`flex-row items-center justify-center gap-2 px-4 py-2 mr-2 border-[0.5px] border-gray-200 rounded-full ${activeCategory === cat ? (isDark ? 'bg-blue-700' : 'bg-blue-200') : (isDark ? 'bg-[#48a748]' : 'bg-green-200')}`}
        >
          <Text className={`font-semibold ${activeCategory === cat ? (isDark ? 'text-white' : 'text-blue-700') : (isDark ? 'text-gray-200' : 'text-gray-700')}`}>{cat}</Text>
          <Text className={`font-bold ${activeCategory === cat ? (isDark ? 'text-white' : 'text-blue-700') : (isDark ? 'text-gray-200' : 'text-gray-700')}`}>
            {getCategoryCount(cat)}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
} 
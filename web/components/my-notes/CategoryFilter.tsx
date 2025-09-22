import { Text, ScrollView, TouchableOpacity } from "react-native";
import { useRef, useEffect } from "react";

interface Note {
  id: string;
  title: string;
  content: string;
  category: string;
  color: string;
  userId: string;
  createdAt: string;
  isFavorite: boolean;
}

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onSelect: (cat: string) => void;
  isDark: boolean;
  notes: Note[];
}

export function CategoryFilter({ categories, activeCategory, onSelect, isDark, notes }: CategoryFilterProps) {
  const scrollViewRef = useRef<ScrollView>(null);
  const categoryRefs = useRef<{ [key: string]: number }>({});

  // Auto scroll to active category when it changes
  useEffect(() => {
    if (scrollViewRef.current && categoryRefs.current[activeCategory] !== undefined) {
      const activeIndex = categories.indexOf(activeCategory);
      if (activeIndex !== -1) {
        // Calculate approximate scroll position (adjust multiplier as needed)
        const scrollPosition = activeIndex * 100; // Approximate width per category
        scrollViewRef.current.scrollTo({
          x: scrollPosition,
          animated: true,
        });
      }
    }
  }, [activeCategory, categories]);

  const getCategoryCount = (category: string) => {
    if (category === "Tümü") {
      return notes.length;
    }else if (category === "Favoriler") {
      return notes.filter(note => note.isFavorite).length;
    }
    return notes.filter(note => note.category === category).length;
  };

  return (
    <ScrollView 
      ref={scrollViewRef}
      horizontal 
      showsHorizontalScrollIndicator={false} 
      className="flex-row mb-6 px-4"
      contentContainerStyle={{ paddingRight: 20 }}
    >
      {categories.map((cat, index) => {
        const isActive = activeCategory === cat;
        const count = getCategoryCount(cat);
        
        return (
          <TouchableOpacity
            key={cat}
            onPress={() => onSelect(cat)}
            onLayout={(event) => {
              const { x } = event.nativeEvent.layout;
              categoryRefs.current[cat] = x;
            }}
            className={`flex-row items-center justify-center gap-2 px-5 py-2 mr-3 rounded-2xl shadow-sm transition-all duration-200 ${
              isActive 
                ? (isDark 
                    ? 'bg-blue-600 border border-blue-500/30 shadow-lg shadow-blue-500/25' 
                    : 'bg-blue-500 border border-blue-300 shadow-lg shadow-blue-200/50'
                  )
                : (isDark 
                    ? 'bg-gray-800/70 border border-gray-700/50' 
                    : 'bg-white/90 border border-gray-200/80'
                  )
            }`}
            style={{
              elevation: isActive ? 8 : 2,
            }}
          >
            <Text className={`font-semibold text-sm ${
              isActive 
                ? 'text-white'
                : (isDark ? 'text-gray-300' : 'text-gray-700')
            }`}>
              {cat}
            </Text>
            
            {/* Modern Badge for Count */}
            <Text className={`font-bold text-xs px-2 py-1 rounded-full min-w-[20px] text-center ${
              isActive
                ? (isDark 
                    ? 'bg-white/20 text-white border border-white/30'
                    : 'bg-white/30 text-white border border-white/40'
                  )
                : (isDark 
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    : 'bg-blue-50 text-blue-600 border border-blue-200'
                  )
            }`}>
              {count}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
} 
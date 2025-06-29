import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import ContentInput from "../add-note/ContentInput";
import CategorySelector from "../add-note/CategorySelector";
import ColorSelector from "../add-note/ColorSelector";

interface Note {
  id: string;
  title: string;
  content: string;
  category: string;
  color: string;
  userId: string;
  createdAt: string;
}

interface UpdateNoteProps {
  note: Note;
  setIsModalVisible: (visible: boolean) => void;
  setNote: (note: Note) => void;
  categories: string[];
  colors: string[];
  isDark: boolean;
  onSave: (note: Note) => void;
}

export default function UpdateNote({
  note,
  setIsModalVisible,
  setNote,
  categories,
  colors,
  isDark,
  onSave,
}: UpdateNoteProps) {
  return (
    <View>
      <View className="flex-row justify-end">
        <TouchableOpacity
          className="bg-gray-100 p-2 rounded-full"
          onPress={() => setIsModalVisible(false)}
        >
          <Ionicons
            className=" rounded-full"
            name="close"
            size={20}
            color="red"
          />
        </TouchableOpacity>
      </View>
      <View>
        <TextInput
          className="text-2xl font-bold"
          value={note.title}
          onChangeText={(text) => setNote({ ...note, title: text })}
        />
        <ContentInput
          content={note.content}
          setContent={(text) => setNote({ ...note, content: text })}
          isFocused={false}
          setIsFocused={() => {}}
          selectedColor={note.color}
          isDark={isDark}
        />
        <CategorySelector
          selectedCategory={note.category}
          setSelectedCategory={(text) => setNote({ ...note, category: text })}
          isDark={isDark}
          selectedColor={note.color}
          categories={categories}
        />
        <ColorSelector
          selectedColor={note.color}
          setSelectedColor={(text) => setNote({ ...note, color: text })}
          isDark={isDark}
          colors={colors}
        />
        <TouchableOpacity
          className="mt-4 py-3 rounded-xl bg-blue-500"
          onPress={() => onSave(note)}
        >
          <Text className="text-center text-white font-bold">Kaydet</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

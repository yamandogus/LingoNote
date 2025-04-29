import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Note, noteStore } from "@/store/noteStore";
import UpdateNote from "./updateNote";
import EmptyNote from "./emptyNote";
import { Ionicons } from '@expo/vector-icons';
import { favoriteStore } from "@/store/favoriteStore";

interface NoteProps {
  note: Note[];
  title: string;
}

const NoteList = ({ note, title }: NoteProps) => {
  const { deleteNote, updateNote } = noteStore();
  const { addFavorite } = favoriteStore();
  const [modalVisible, setModalVisible] = useState(false);
  const [category, setCategory] = useState("Genel Notlar");
  const [content, setContent] = useState("");
  const [noteTitle, setNoteTitle] = useState("");
  const [selectedNoteId, setSelectedNoteId] = useState("");

  const colorOptions = [
    {
      id: 0,
      name: "Mavi",
      color: "bg-sky-400",
      borderColor: "border-sky-500",
      lightText: "text-white",
      darkBg: "dark:bg-sky-500",
    },
    {
      id: 1,
      name: "Yeşil",
      color: "bg-emerald-400",
      borderColor: "border-emerald-500",
      lightText: "text-white",
      darkBg: "dark:bg-emerald-500",
    },
    {
      id: 2,
      name: "Mor",
      color: "bg-violet-400",
      borderColor: "border-violet-500",
      lightText: "text-white",
      darkBg: "dark:bg-violet-500",
    },
  ];

  const handleColorChange = (noteId: string, color: string, darkBg: string) => {
    updateNote(noteId, {
      backgroundColor: color,
      darkBackgroundColor: darkBg,
    });
  };

  const defaultLight = "bg-white";
  const defaultDark = "dark:bg-gray-800";
  const defaultTextLight = "text-gray-800";
  const defaultTextDark = "dark:text-white";

  const categoryNotes = note.filter(item => item.category === title);


  return (
    <View className="space-y-4 mx-2 mt-4 gap-4">
      {categoryNotes.length > 0 ? (
        categoryNotes.map((note) => (
          <View
            key={note.id}
            className={`${note.backgroundColor || defaultLight} ${
              note.darkBackgroundColor || defaultDark
            } rounded-2xl p-6 shadow-lg border ${
              note.backgroundColor
                ? note.backgroundColor === "bg-violet-400"
                  ? "border-violet-500"
                  : note.backgroundColor === "bg-sky-400"
                  ? "border-sky-500"
                  : "border-emerald-500"
                : "border-gray-200 dark:border-gray-700"
            } shadow-[0_8px_30px_rgb(0,0,0,0.12)]`}
          >
            <View className="flex-row justify-between items-start mb-4">
              <Text
                className={`text-xl font-bold ${
                  note.backgroundColor === "bg-yellow-400"
                    ? "text-gray-800"
                    : note.backgroundColor
                    ? "text-white"
                    : defaultTextLight
                } ${defaultTextDark}`}
              >
                {note.title}
              </Text>
              <TouchableOpacity onPress={() => {
                addFavorite(note);
              }}>
                <Ionicons 
                  name="heart-outline" 
                  size={24} 
                  color={note.backgroundColor ? "white" : "#4B5563"} 
                />
              </TouchableOpacity>
            </View>

            <Text
              className={`${
                note.backgroundColor === "bg-yellow-400"
                  ? "text-gray-800"
                  : note.backgroundColor
                  ? "text-gray-100"
                  : defaultTextLight
              } ${defaultTextDark} mb-4 text-base leading-relaxed`}
            >
              {note.content}
            </Text>

            <Text
              className={`text-sm mb-2 ${
                note.backgroundColor === "bg-violet-400"
                  ? "text-white"
                  : note.backgroundColor
                  ? "text-white"
                  : "text-gray-500"
              } dark:text-gray-400`}
            >
              Kategori: {note.category}
            </Text>

            <View className="flex-row items-center justify-between mt-2">
              <View className="flex-row gap-2">
                {colorOptions.map((option) => (
                  <TouchableOpacity
                    key={option.id}
                    onPress={() =>
                      handleColorChange(note.id, option.color, option.darkBg)
                    }
                    className={`${option.color} ${
                      option.darkBg
                    } rounded-full w-6 h-6 flex items-center justify-center border ${
                      note.backgroundColor === option.color
                        ? "border-2 border-white shadow-md"
                        : "border border-white shadow-sm"
                    }`}
                    accessibilityLabel={`${option.name} renk seçeneği`}
                  />
                ))}
                <TouchableOpacity
                  onPress={() => handleColorChange(note.id, "", "")}
                  className={`bg-white dark:bg-gray-800 rounded-full w-6 h-6 flex items-center justify-center border ${
                    !note.backgroundColor
                      ? "border-2 border-blue-500 shadow-md"
                      : "border border-white shadow-sm"
                  }`}
                  accessibilityLabel="Varsayılan renk seçeneği"
                />
              </View>

              <View className="flex-row gap-2">
                <TouchableOpacity
                  style={{borderWidth: 0.5, borderColor: "white"}}
                  onPress={() => {
                    setModalVisible(true);
                    setContent(note.content);
                    setNoteTitle(note.title);
                    setSelectedNoteId(note.id);
                    setCategory(note.category);
                  }}
                  className="bg-blue-500 dark:bg-blue-600 rounded-lg px-4 py-2 flex-row items-center gap-1"
                >
                  <Ionicons 
                    name="create-outline" 
                    size={16} 
                    color={note.backgroundColor ? "white" : "#4B5563"} 
                  />
                  <Text className={`${note.backgroundColor ? "text-white" : "text-gray-800"} ${note.backgroundColor === "bg-yellow-400" ? "text-gray-800" : "text-white"} font-medium `}>
                    Düzenle
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => deleteNote(note.id)}
                  className="bg-red-500 dark:bg-red-600 rounded-lg px-4 py-2 flex-row items-center gap-1"
                >
                  <Ionicons name="trash-outline" size={16} color="white" />
                  <Text className="text-white font-medium">Sil</Text>
                </TouchableOpacity>
              </View>
            </View>

            <UpdateNote
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              category={category}
              setCategory={setCategory}
              content={content}
              setContent={setContent}
              title={noteTitle}
              setTitle={setNoteTitle}
              noteId={selectedNoteId}
            />
          </View>
        ))
      ) : (
        <EmptyNote categoryTitle={title} />
      )}
    </View>
  );
};

export default NoteList;

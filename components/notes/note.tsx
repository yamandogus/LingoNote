import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Note, noteStore } from "@/store/noteStore";
import UpdateNote from "./updateNote";
import EmptyNote from "./emptyNote";

interface NoteProps {
  note: Note[];
  title: string;
}

const NoteList = ({ note, title }: NoteProps) => {
  const { deleteNote, updateNote } = noteStore();
  const [modalVisible, setModalVisible] = useState(false);
  const [category, setCategory] = useState("Genel Notlar");
  const [content, setContent] = useState("");
  const [noteTitle, setNoteTitle] = useState("");
  const [selectedNoteId, setSelectedNoteId] = useState("");

  const colorOptions = [
    {
      id: 0,
      name: "Mavi",
      color: "bg-blue-500",
      borderColor: "border-blue-600",
      lightText: "text-white",
      darkBg: "dark:bg-blue-600",
    },
    {
      id: 1,
      name: "Yeşil",
      color: "bg-green-500",
      borderColor: "border-green-600",
      lightText: "text-white",
      darkBg: "dark:bg-green-600",
    },
    {
      id: 2,
      name: "Sarı",
      color: "bg-yellow-400",
      borderColor: "border-yellow-500",
      lightText: "text-gray-800",
      darkBg: "dark:bg-yellow-500",
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

  // Kategori içindeki notları filtrele
  const categoryNotes = note.filter(item => item.category === title);

  return (
    <View className="space-y-4 mx-2 mt-4 gap-4">
      {categoryNotes.length > 0 ? (
        categoryNotes.map(
          (note) => (
            <View
              key={note.id}
            className={`${note.backgroundColor || defaultLight} ${
                note.darkBackgroundColor || defaultDark
              } rounded-lg p-4 shadow-md border ${
                note.backgroundColor
                  ? note.backgroundColor === "bg-yellow-400"
                    ? "border-yellow-500"
                    : note.backgroundColor === "bg-blue-500"
                    ? "border-blue-600"
                    : "border-green-600"
                  : "border-gray-200 dark:border-gray-700"
              } shadow-[27px 27px 60px 32px rgba(0,0,0,0.1)]`}
            >
              <Text
                className={`text-lg font-bold mb-2 ${
                  note.backgroundColor === "bg-yellow-400"
                    ? "text-gray-800"
                    : note.backgroundColor
                    ? "text-white"
                    : defaultTextLight
                } ${defaultTextDark}`}
              >
                {note.title}
              </Text>
              <Text
                className={`${
                  note.backgroundColor === "bg-yellow-400"
                    ? "text-gray-800"
                    : note.backgroundColor
                    ? "text-gray-100"
                    : defaultTextLight
                } ${defaultTextDark} mb-4`}
              >
                {note.content}
              </Text>
              <Text
                className={`text-xs ${
                  note.backgroundColor === "bg-yellow-400"
                    ? "text-gray-700"
                    : note.backgroundColor
                    ? "text-gray-200"
                    : "text-gray-500"
                } dark:text-gray-400 mt-2`}
              >
                Kategori: {note.category}
              </Text>

              <View className="flex flex-row justify-between mt-4 mb-2">
                <View className="flex flex-row gap-2">
                  {colorOptions.map((option) => (
                    <TouchableOpacity
                      key={option.id}
                      onPress={() =>
                        handleColorChange(note.id, option.color, option.darkBg)
                      }
                      className={`${option.color} ${
                        option.darkBg
                      } rounded-full w-8 h-8 flex items-center justify-center border-2 ${
                        note.backgroundColor === option.color
                          ? "border-white dark:border-gray-200"
                          : "border-transparent"
                      }`}
                      accessibilityLabel={`${option.name} renk seçeneği`}
                    />
                  ))}

                  <TouchableOpacity
                    onPress={() => handleColorChange(note.id, "", "")}
                    className={`bg-white dark:bg-gray-800 rounded-full w-8 h-8 flex items-center justify-center border-2 ${
                      !note.backgroundColor
                        ? "border-blue-500 dark:border-blue-400"
                        : "border-gray-300 dark:border-gray-600"
                    }`}
                    accessibilityLabel="Varsayılan renk seçeneği"
                  />
                </View>

                <View className="flex flex-row gap-2">
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(true);
                      setContent(note.content);
                      setNoteTitle(note.title);
                      setSelectedNoteId(note.id);
                      setCategory(note.category);
                    }}
                    className={`${
                      note.backgroundColor
                        ? "bg-white bg-opacity-30 dark:bg-white dark:bg-opacity-30"
                        : "bg-gray-100 dark:bg-gray-700"
                    } rounded-lg px-4 py-1`}
                  >
                    <Text className={"text-dark font-bold"}>Düzenle</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => deleteNote(note.id)}
                    className="bg-red-500 dark:bg-red-600 rounded-lg px-4 py-1"
                  >
                    <Text className="text-white font-bold">Sil</Text>
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
          )
        )
      ) : (
        <EmptyNote categoryTitle={title} />
      )}
    </View>
  );
};

export default NoteList;

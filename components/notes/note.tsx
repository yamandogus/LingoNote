import React, { useState } from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";
import { Note, noteStore } from "@/store/noteStore";
import UpdateNote from "./updateNote";

interface NoteProps {
  note: Note[];
  title: string;
}

const NoteList = ({ note, title }: NoteProps) => {
  const { deleteNote } = noteStore();
  const [modalVisible, setModalVisible] = useState(false);
  const [category, setCategory] = useState("Genel Notlar");
  const [content, setContent] = useState("");
  const [noteTitle, setNoteTitle] = useState("");
  const [selectedNoteId, setSelectedNoteId] = useState("");
  const { updateNote } = noteStore();
  return (
    <View className="space-y-4 mx-2 mt-4 gap-4">
      {note.map(
        (note) =>
          note.category === title && (
            <View
              key={note.id}
              className="bg-gray-200 dark:bg-gray-700 rounded-lg p-4 shadow-sm"
            >
              <Text className="text-lg font-bold mb-2 dark:text-white">
                {note.title}
              </Text>
              <Text className="text-gray-700 dark:text-gray-300">
                {note.content}
              </Text>
              <Text className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Kategori: {note.category}
              </Text>
              <View className="flex flex-row justify-end gap-8 items-end">
                <TouchableOpacity
                  onPress={() => deleteNote(note.id)}
                  className="bg-red-500 rounded-lg px-4 py-1"
                >
                  <Text className="text-white  font-bold">Sil</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(true);
                    updateNote(note.id, { content: note.content });
                    setContent(note.content);
                    setNoteTitle(note.title);
                    setSelectedNoteId(note.id);
                    setCategory(note.category);
                  }}
                  className="bg-green-500 rounded-lg px-4 py-1"
                >
                  <Text className="text-white  font-bold">Güncelle</Text>
                </TouchableOpacity>
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
      )}
    </View>
  );
};

export default NoteList;

import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import UpdateNote from "./updateNote";

interface Note {
  id: string;
  title: string;
  content: string;
  category: string;
  color: string;
  userId: string;
  createdAt: string;
}

interface NoteListProps {
  notes: Note[];
  isDark: boolean;
  handleDeleteNote: (id: string) => void;
  handleUpdateNote: (id: string, updatedData: Note) => void;
}

const COLORS = [
  "#A7C7E7", 
  "#B7E5B4", 
  "#FFF6B7",  
  "#FFD6A5", 
  "#D7B4F3", 
  "#FFB7B2",
];

const KATEGORILER = [
  "Tümü", "Kişisel", "İş", "Eğitim", "Sağlık", "Spor", "Hobi", "Diğer"
];

export function NoteList({
  notes,
  isDark,
  handleUpdateNote,
  handleDeleteNote,
}: NoteListProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  if (!notes.length) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getSummary = (content: string) => {
    return content.length > 100 ? content.substring(0, 100) + "..." : content;
  };

  const openEditModal = (note: Note) => {
    setSelectedNote(note);
    setIsModalVisible(true);
  };

  return (
    <View>
      {notes.map((note) => (
        <View
          key={note.id}
          style={{ borderColor: note.color }}
          className={`mb-4 p-4 rounded-2xl ${isDark ? "bg-gray-800" : "bg-gray-50"} shadow-lg border-[0.7px] relative overflow-hidden`}
        >
          <View
            className="absolute top-0 right-0 w-10 h-6 rounded-bl-full"
            style={{ backgroundColor: note.color }}
          ></View>
          <Text
            className={`text-base font-bold mb-1 ${isDark ? "text-white" : "text-gray-900"}`}
          >
            {note.title}
          </Text>
          <Text
            className={`text-sm mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}
          >
            {getSummary(note.content)}
          </Text>
          <View className="flex-row items-center justify-between border-t-[0.5px] dark:border-gray-600 border-gray-300 pt-2">
            <View className="flex-col gap-1">
              <Text
                className={`text-xs font-medium ${isDark ? "text-gray-400" : "text-gray-500"}`}
              >
                Kategori: {note.category}
              </Text>
              <Text
                className={`text-xs font-medium ${isDark ? "text-gray-400" : "text-gray-500"}`}
              >
                Oluşturulma: {formatDate(note.createdAt)}
              </Text>
            </View>
            <View className="flex-row">
              <View
                className={`px-2 py-0.5 rounded-full ${isDark ? "bg-blue-900" : "bg-blue-100"}`}
              >
                <Text
                  className={`text-xs ${isDark ? "text-blue-200" : "text-blue-700"}`}
                >
                  {note.category}
                </Text>
              </View>
            </View>
          </View>
          <View className="flex-row gap-2 justify-end mt-4">
            <TouchableOpacity
              className={`p-2 rounded-full ${isDark ? "bg-red-900" : "bg-red-100"}`}
              onPress={() => { setSelectedNote(note); setDeleteModalVisible(true); }}
            >
              <Ionicons name="trash-outline" size={20} color={isDark ? "white" : "black"} />
            </TouchableOpacity>
            <TouchableOpacity
              className={`p-2 rounded-full ${isDark ? "bg-blue-900" : "bg-blue-100"}`}
              onPress={() => openEditModal(note)}
            >
              <Ionicons name="pencil-outline" size={20} color={isDark ? "white" : "black"} />
            </TouchableOpacity>
          </View>
        </View>
      ))}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className={`w-[90%] max-h-[80%] rounded-2xl p-6 ${isDark ? 'bg-gray-600' : 'bg-white'}`}>
            {selectedNote && (
              <UpdateNote
                note={selectedNote}
                setNote={setSelectedNote as (note: Note) => void}
                setIsModalVisible={setIsModalVisible}
                categories={KATEGORILER.filter(k => k !== "Tümü")}
                colors={COLORS}
                isDark={isDark}
                onSave={(updatedNote: Note) => {
                  handleUpdateNote(updatedNote.id, updatedNote);
                  setIsModalVisible(false);
                }}
              />
            )}
          </View>
        </View>
      </Modal>
      <Modal
        visible={deleteModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setDeleteModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className={`w-[90%] max-h-[80%] rounded-2xl p-6 ${isDark ? 'bg-gray-600' : 'bg-white'}`}>
            <Text className="text-2xl font-bold dark:text-white text-gray-900">Not Sil</Text>
            <Text className="text-sm text-gray-500 dark:text-gray-400">Bu notu silmek istediğinize emin misiniz?</Text>
          <View className="flex-row justify-end mt-4 gap-4">
            <TouchableOpacity
              className="bg-blue-500/20 p-2 rounded-full"
              onPress={() => setDeleteModalVisible(false)}
            >
              <Text className=" text-sm px-2 dark:text-white text-gray-900">İPTAL</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-red-500/20 p-2 rounded-full"
              onPress={() => { if(selectedNote) { handleDeleteNote(selectedNote.id); } setDeleteModalVisible(false); setSelectedNote(null); }}
            >
              <Text className="text-sm px-4 dark:text-white text-gray-900">SİL</Text>
            </TouchableOpacity>
          </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}


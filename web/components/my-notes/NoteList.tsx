import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { View, Text, TouchableOpacity, Modal, Image, StatusBar } from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";
import UpdateNote from "./updateNote";
import { noteService } from "@/services/note";
import Toast from "react-native-toast-message";

interface Note {
  id: string;
  title: string;
  content: string;
  category: string;
  color: string;
  userId: string;
  isFavorite: boolean;
  createdAt: string;
  image?: string;
}

interface NoteListProps {
  notes: Note[];
  isDark: boolean;
  handleDeleteNote: (id: string) => void;
  handleUpdateNote: (id: string, updatedData: Note) => void;
  onNoteUpdate?: () => void; // Notları yeniden yüklemek için
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
  "Tümü", "Kişisel", "İş", "Eğitim", "Sağlık", "Fikirler",
];

export function NoteList({
  notes,
  isDark,
  handleUpdateNote,
  handleDeleteNote,
  onNoteUpdate,
}: NoteListProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [visibleImages, setVisibleImages] = useState<Set<string>>(new Set());
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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

  const toggleImageVisibility = (noteId: string) => {
    setVisibleImages((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(noteId)) {
        newSet.delete(noteId);
      } else {
        newSet.add(noteId);
      }
      return newSet;
    });
  };

  const openImageModal = (imageUri: string) => {
    setSelectedImage(imageUri);
    setImageModalVisible(true);
  };

  const closeImageModal = () => {
    setImageModalVisible(false);
    setSelectedImage(null);
  };

  const handleToggleFavorite = async (note: Note) => {
    try {
      await noteService.toggleFavorite(note.id);
      
      // Notu güncelle
      const updatedNote = { ...note, isFavorite: !note.isFavorite };
      handleUpdateNote(note.id, updatedNote);
      
      Toast.show({
        type: "success",
        text1: "Başarılı!",
        text2: updatedNote.isFavorite ? "Not favorilere eklendi." : "Not favorilerden çıkarıldı.",
        position: "top",
      });
    } catch (error) {
      console.error("Favori durumu değiştirilemedi:", error);
      Toast.show({
        type: "error",
        text1: "Hata!",
        text2: "Favori durumu değiştirilemedi.",
        position: "top",
      });
    }
  };

  return (
    <View>
      {notes.map((note) => (
        <View
          key={note.id}
          style={{ borderColor: note.color }}
          className={`mb-4 p-4 rounded-2xl ${isDark ? "bg-gray-800" : "bg-gray-50"} shadow-2xl dark:shadow-lg border-[0.9px] relative overflow-hidden`}
        >
          <View
            className="absolute top-0 right-0 w-10 h-6 rounded-bl-full"
            style={{ backgroundColor: note.color }}
          ></View>
          <Text
            className={`text-base font-bold mb-1 ${isDark ? "text-white" : "text-gray-900"} `}
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
          {/* Modern Action Buttons */}
          <View className="flex-row justify-between items-center mt-4">
            {/* Favorite Button - Left Side */}
            <TouchableOpacity
              className={`flex-row items-center px-3 py-2 rounded-xl ${note.isFavorite 
                ? (isDark ? 'bg-red-500/20 border border-red-500/30' : 'bg-red-50 border border-red-200') 
                : (isDark ? 'bg-gray-700/50 border border-gray-600' : 'bg-gray-100 border border-gray-200')
              }`}
              onPress={() => handleToggleFavorite(note)}
            >
              <Ionicons 
                name={note.isFavorite ? "heart" : "heart-outline"} 
                size={18} 
                color={note.isFavorite ? '#ef4444' : (isDark ? '#9ca3af' : '#6b7280')} 
              />
              <Text className={`ml-2 text-xs font-medium ${
                note.isFavorite 
                  ? 'text-red-500' 
                  : (isDark ? 'text-gray-400' : 'text-gray-600')
              }`}>
                {note.isFavorite ? 'Favorited' : 'Favorite'}
              </Text>
            </TouchableOpacity>

            {/* Action Buttons - Right Side */}
            <View className="flex-row gap-2">
              {note.image && (
                <TouchableOpacity
                  className={`p-3 rounded-xl ${
                    isDark 
                      ? 'bg-purple-500/20 border border-purple-500/30' 
                      : 'bg-purple-50 border border-purple-200'
                  }`}
                  onPress={() => openImageModal(note.image!)}
                >
                  <Ionicons 
                    name="image" 
                    size={18} 
                    color={isDark ? '#a855f7' : '#9333ea'} 
                  />
                </TouchableOpacity>
              )}
              
              <TouchableOpacity
                className={`p-3 rounded-xl ${
                  isDark 
                    ? 'bg-blue-500/20 border border-blue-500/30' 
                    : 'bg-blue-50 border border-blue-200'
                }`}
                onPress={() => openEditModal(note)}
              >
                <Ionicons 
                  name="create" 
                  size={18} 
                  color={isDark ? '#3b82f6' : '#2563eb'} 
                />
              </TouchableOpacity>
              
              <TouchableOpacity
                className={`p-3 rounded-xl ${
                  isDark 
                    ? 'bg-red-500/20 border border-red-500/30' 
                    : 'bg-red-50 border border-red-200'
                }`}
                onPress={() => { setSelectedNote(note); setDeleteModalVisible(true); }}
              >
                <Ionicons 
                  name="trash" 
                  size={18} 
                  color={isDark ? '#ef4444' : '#dc2626'} 
                />
              </TouchableOpacity>
            </View>
          </View>
          {/* Görsel Görüntüleme */}
          {note.image && (
            <View className="flex-row justify-between items-center mt-4">
              <Text className="text-sm font-bold text-gray-400">
                {visibleImages.has(note.id) ? "Görseli Gizle" : "Görseli Göster"}
              </Text>
              <TouchableOpacity 
                className="bg-blue-500/20 p-2 rounded-full" 
                onPress={() => toggleImageVisibility(note.id)}
              >
                <Ionicons 
                  name={visibleImages.has(note.id) ? "arrow-up" : "arrow-down"} 
                  size={20} 
                  color={isDark ? "white" : "black"} 
                />
              </TouchableOpacity>
            </View>
          )}
          
          {/* Görsel Preview */}
          {visibleImages.has(note.id) && note.image && (
            <View className="flex justify-between items-center mt-4">
              <TouchableOpacity onPress={() => openImageModal(note.image!)}>
                <Image
                  source={{ uri: note.image }}
                  style={{ width: 320, height: 180, borderRadius: 10, resizeMode: "cover" }}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      ))}

      {/* Not Düzenleme Modal */}
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

      {/* Not Silme Modal */}
      <Modal
        visible={deleteModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setDeleteModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className={`w-[90%] max-h-[80%] rounded-2xl p-6 ${isDark ? 'dark:bg-gray-800' : 'bg-white'}`}>
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
              className="bg-red-500 p-2 rounded-full"
              onPress={() => { if(selectedNote) { handleDeleteNote(selectedNote.id); } setDeleteModalVisible(false); setSelectedNote(null); }}
            >
              <Text className="text-sm px-4 text-white">SİL</Text>
            </TouchableOpacity>
          </View>
          </View>
        </View>
      </Modal>

      {/* Görsel Görüntüleme Modal */}
      <Modal
        visible={imageModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeImageModal}
      >
        <StatusBar hidden />
        <View style={{ flex: 1, backgroundColor: 'black' }}>
          {/* Kapat Butonu */}
          <TouchableOpacity
            style={{
              position: 'absolute',
              top: 50,
              right: 20,
              zIndex: 1000,
              backgroundColor: 'rgba(0,0,0,0.5)',
              borderRadius: 20,
              padding: 10,
            }}
            onPress={closeImageModal}
          >
            <Ionicons name="close" size={24} color="white" />
          </TouchableOpacity>

          {/* Görsel Görüntüleyici */}
          {selectedImage && (
            <ImageViewer
              imageUrls={[{ url: selectedImage }]}
              index={0}
              onSwipeDown={closeImageModal}
              enableSwipeDown={true}
              backgroundColor="black"
              enableImageZoom={true}
              maxOverflow={100}
              minScale={1}
              maxScale={3}
              style={{ flex: 1 }}
              saveToLocalByLongPress={false}
            />
          )}

          {/* Alt Bilgi */}
          <View
            style={{
              position: 'absolute',
              bottom: 50,
              left: 0,
              right: 0,
              alignItems: 'center',
            }}
          >
            <Text style={{ color: 'white', fontSize: 14, opacity: 0.8 }}>
              Yakınlaştırmak için çimdikleyin • Kapatmak için aşağı kaydırın
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}


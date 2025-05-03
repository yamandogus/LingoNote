import 'react-native-get-random-values';
import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Note{
  id: string,
  title: string,
  content: string,
  category: string,
  backgroundColor?: string,
  darkBackgroundColor?: string,
  isFavorite?: boolean,
  categoryCount?: number,
}
interface NoteState{
    notes: Note[],
    addNote: (note: Note) => void,
    deleteNote: (id: string) => void,
    updateNote: (id: string, content: Partial<Note>) => void,
    toggleFavorite: (id: string) => void,
    updateCategoryCount: (category: string, count: number) => void,
}

const storage = typeof localStorage !== 'undefined' 
  ? localStorage 
  : AsyncStorage;

export const noteStore = create<NoteState>()(
  persist(
    (set) => ({
      notes: [],
      addNote: (note: Note) => {
        set((state) => ({ notes: [...state.notes, note] }));
      },
      deleteNote: (id: string) => {
        set((state) => ({ notes: state.notes.filter((note) => note.id !== id) }));
      },
      updateNote: (id: string, content: Partial<Note>) => {
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id ? { ...note, ...content } : note
          ),
        }));
      },
      toggleFavorite: (id: string) => {
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id ? { ...note, isFavorite: !note.isFavorite } : note
          ),
        }));
        },
      updateCategoryCount: (category: string, count: number) => {
        set((state) => ({
          notes: state.notes.map((note) =>
            note.category === category ? { ...note, categoryCount: count } : note
          ),
        }));
      },
    }),
    {
      name: "noteStore",
      storage: createJSONStorage(() => storage),
    }
  )
)

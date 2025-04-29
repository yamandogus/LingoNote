import 'react-native-get-random-values';
import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Favorite{
  id: string,
  title: string,
  content: string,
  category: string,
  backgroundColor?: string,
  darkBackgroundColor?: string,
}
interface FavoriteState{
    favorites: Favorite[],
    addFavorite: (favorite: Favorite) => void,
    deleteFavorite: (id: string) => void,
    updateFavorite: (id: string, content: Partial<Favorite>) => void
}

const storage = typeof localStorage !== 'undefined' 
  ? localStorage 
  : AsyncStorage;

export const favoriteStore = create<FavoriteState>()(
  persist(
    (set) => ({
      favorites: [],
      addFavorite: (favorite: Favorite) => {
        set((state) => ({ favorites: [...state.favorites, favorite] }));
      },
      deleteFavorite: (id: string) => {
        set((state) => ({ favorites: state.favorites.filter((favorite) => favorite.id !== id) }));
      },
      updateFavorite: (id: string, content: Partial<Favorite>) => {
        set((state) => ({
          favorites: state.favorites.map((favorite) =>
            favorite.id === id ? { ...favorite, ...content } : favorite
          ),
        }));
      },
    }),
    {
      name: "favoriteStore",
      storage: createJSONStorage(() => storage),
    }
  )
)

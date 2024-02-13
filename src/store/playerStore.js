import { create } from "zustand";

const usePlayerStore = create((set) => ({
  isPlaying: false,
  currentMusic: {
    playlist: {
      id: null,
    },
    song: null,
    songs: [],
  },
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setCurrentMusic: (currentMusic) => set({ currentMusic }),
}));

export default usePlayerStore;

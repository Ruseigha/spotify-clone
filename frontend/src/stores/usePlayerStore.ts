import { create } from "zustand"; // Zustand library for state management
import { Song } from "@/types"; // Song type definition

/**
 * PlayerStore Interface
 * 
 * This interface defines the structure of the Zustand store for the music player.
 * It includes the state variables and functions to manage the player's behavior.
 */
interface PlayerStore {
  currentSong: Song | null; // The currently playing song
  isPlaying: boolean; // Whether the player is currently playing
  queue: Song[]; // The queue of songs to be played
  currentIndex: number; // The index of the current song in the queue

  // Functions to manage the player state
  initializeQueue: (songs: Song[]) => void; // Initialize the queue with a list of songs
  playAlbum: (songs: Song[], startIndex?: number) => void; // Play an album starting from a specific index
  setCurrentSong: (song: Song | null) => void; // Set the current song and start playing
  togglePlay: () => void; // Toggle between play and pause
  playNext: () => void; // Play the next song in the queue
  playPrevious: () => void; // Play the previous song in the queue
}

/**
 * usePlayerStore
 * 
 * Zustand store to manage the state of the music player.
 * Provides state variables and functions to control playback, manage the queue, and navigate songs.
 */
export const usePlayerStore = create<PlayerStore>((set, get) => ({
  // Initial state
  currentSong: null, // No song is playing initially
  isPlaying: false, // Player is paused initially
  queue: [], // Empty queue initially
  currentIndex: -1, // No song is selected initially

  /**
   * Initialize the queue with a list of songs.
   * If no current song is set, the first song in the queue is selected.
   * 
   * @param {Song[]} songs - The list of songs to initialize the queue with.
   */
  initializeQueue: (songs) => {
    set({
      queue: songs,
      currentSong: get().currentSong || songs[0], // Set the first song if no current song exists
      currentIndex: get().currentIndex === -1 ? 0 : get().currentIndex, // Set index to 0 if not already set
    });
  },

  /**
   * Play an album by setting the queue and starting playback from a specific index.
   * 
   * @param {Song[]} songs - The list of songs in the album.
   * @param {number} [startIndex=0] - The index to start playback from (default is 0).
   */
  playAlbum: (songs, startIndex = 0) => {
    if (songs.length === 0) return; // Do nothing if the album is empty
    const song = songs[startIndex];
    set({
      queue: songs,
      currentSong: song,
      currentIndex: startIndex,
      isPlaying: true, // Start playback
    });
  },

  /**
   * Set the current song and start playback.
   * If the song exists in the queue, update the current index.
   * 
   * @param {Song | null} song - The song to set as the current song.
   */
  setCurrentSong: (song) => {
    if (!song) return; // Do nothing if no song is provided
    const songIndex = get().queue.findIndex((s) => s._id === song._id); // Find the song in the queue
    set({
      currentSong: song,
      isPlaying: true, // Start playback
      currentIndex: songIndex !== -1 ? songIndex : get().currentIndex, // Update index if song is in the queue
    });
  },

  /**
   * Toggle playback state between play and pause.
   */
  togglePlay: () => {
    const willStartPlaying = !get().isPlaying; // Determine the new playback state
    set({
      isPlaying: willStartPlaying, // Update the playback state
    });
  },

  /**
   * Play the next song in the queue.
   * If the end of the queue is reached, stop playback.
   */
  playNext: () => {
    const { currentIndex, queue } = get();
    const nextIndex = currentIndex + 1; // Calculate the next index
    if (nextIndex < queue.length) {
      const nextSong = queue[nextIndex];
      set({
        currentSong: nextSong,
        currentIndex: nextIndex,
        isPlaying: true, // Start playback
      });
    } else {
      set({ isPlaying: false }); // Stop playback if no more songs
    }
  },

  /**
   * Play the previous song in the queue.
   * If the beginning of the queue is reached, stop playback.
   */
  playPrevious: () => {
    const { currentIndex, queue } = get();
    const prevIndex = currentIndex - 1; // Calculate the previous index
    if (prevIndex >= 0) {
      const prevSong = queue[prevIndex];
      set({
        currentSong: prevSong,
        currentIndex: prevIndex,
        isPlaying: true, // Start playback
      });
    } else {
      set({ isPlaying: false }); // Stop playback if no more songs
    }
  },
}));
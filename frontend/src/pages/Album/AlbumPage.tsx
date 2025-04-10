import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMusicStore } from "@/stores/useMusicStore"; // Zustand store for managing music-related state
import { usePlayerStore } from "@/stores/usePlayerStore"; // Zustand store for managing player state
import { Clock, Music, Pause, Play } from "lucide-react"; // Icons for UI
import { useEffect } from "react"; // React hook for side effects
import { useParams } from "react-router"; // React Router hook for accessing route parameters

/**
 * Utility function to format song duration from seconds to "mm:ss".
 * 
 * @param {number} seconds - The duration of the song in seconds.
 * @returns {string} - The formatted duration string.
 */
export const formateDuration = (seconds: number) => {
  const minute = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${minute}:${remainingSeconds.toString().padStart(2, "0")}`;
};

/**
 * AlbumPage Component
 * 
 * This component displays the details of an album, including its songs, artist, and release year.
 * It also provides functionality to play the album or individual songs.
 * 
 * @returns {JSX.Element} - The AlbumPage component.
 */
const AlbumPage = () => {
  const { albumId } = useParams(); // Get the album ID from the route parameters
  const { fetchAlbumById, currentAlbum, isLoading } = useMusicStore(); // Zustand store for album data
  const { isPlaying, currentSong, playAlbum, togglePlay } = usePlayerStore(); // Zustand store for player state

  // Fetch album details when the component mounts or when the albumId changes
  useEffect(() => {
    if (albumId) fetchAlbumById(albumId);
  }, [fetchAlbumById, albumId]);

  /**
   * Handles playing a specific song from the album.
   * 
   * @param {number} index - The index of the song in the album's song list.
   */
  const handlePlaySongs = (index: number) => {
    playAlbum(currentAlbum!.songs, index); // Play the album starting from the selected song
  };

  /**
   * Handles playing the entire album.
   * If the album is already playing, it toggles play/pause.
   * Otherwise, it starts playing the album from the beginning.
   */
  const handlePlayAlbum = () => {
    const isCurrentAlbumPlaying = currentAlbum?.songs.some(
      (song) => song._id === currentSong?._id
    );
    if (isCurrentAlbumPlaying) togglePlay(); // Toggle play/pause if the album is already playing
    else {
      playAlbum(currentAlbum!.songs, 0); // Start playing the album from the beginning
    }
  };

  // Show nothing if the album data is still loading
  if (isLoading) return null;

  return (
    <div className="h-full">
      {/* Scrollable area for the album page */}
      <ScrollArea className="h-full rounded-md max-h-[calc(100vh-100px)]">
        <div className="relative min-h-full">
          {/* Background gradient for visual effect */}
          <div
            className="absolute inset-0 bg-gradient-to-b from-[#5038a0]/80 via-zinc-900/80 to-zinc-900 pointer-events-none"
            aria-hidden="true"
          />
          <div className="relative z-10">
            {/* Album details section */}
            <div className="flex p-6 gap-6 pb-8">
              {/* Album cover image */}
              <img
                src={currentAlbum?.imageUrl}
                alt={currentAlbum?.title}
                className="w-[240px] h-[240px] shadow-xl rounded"
              />
              <div className="flex flex-col justify-end">
                <p className="text-sm font-medium">Album</p>
                <h2 className="text-7xl font-bold my-4">{currentAlbum?.title}</h2>
                <div className="flex gap-2 items-center text-sm text-zinc-100">
                  <span className="font-medium text-white">{currentAlbum?.artist}</span>
                  <span>• {currentAlbum?.songs.length} songs</span>
                  <span>• {currentAlbum?.releaseYear}</span>
                </div>
              </div>
            </div>

            {/* Play button for the album */}
            <div className="px-6 pb-4 flex items-center gap-6">
              <Button
                size={`icon`}
                className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-400 hover:scale-105 transition-all"
                onClick={handlePlayAlbum}
              >
                {isPlaying &&
                currentAlbum?.songs.some((song) => song._id === currentSong?._id) ? (
                  <Pause className="size-6 text-black" />
                ) : (
                  <Play className="size-6 text-black" />
                )}
              </Button>
            </div>

            {/* Table section for song list */}
            <div className="bg-black/20 backdrop-blur-sm">
              {/* Table header */}
              <div
                className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-10 py-2 text-sm 
            text-zinc-400 border-b border-white/5"
              >
                <div>#</div>
                <div>Title</div>
                <div>Released Date</div>
                <div>
                  <Clock className="h-4 w-4" />
                </div>
              </div>

              {/* Song list */}
              <div className="px-6">
                <div className="space-y-2 py-4">
                  {currentAlbum?.songs.map((song, index) => {
                    const isCurrentSong = currentSong?._id === song._id;
                    return (
                      <div
                        key={song._id}
                        className={`grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-4 py-2 text-sm text-zinc-400 hover:bg-white/5 rounded-md group cursor-pointer`}
                        onClick={() => handlePlaySongs(index)}
                      >
                        {/* Song index or play icon */}
                        <div className="flex items-center justify-center">
                          {isCurrentSong && isPlaying ? (
                            <Music className="size-4 text-green-500" />
                          ) : (
                            <span className="group-hover:hidden">{index + 1}</span>
                          )}
                          {!isCurrentSong && (
                            <Play className="h-4 w-4 hidden group-hover:block" />
                          )}
                        </div>

                        {/* Song details */}
                        <div className="flex items-center gap-3">
                          <img
                            src={song.imageUrl}
                            alt={song.title}
                            className="size-10"
                          />
                          <div>
                            <div className={`font-medium text-white`}>
                              {song.title}
                            </div>
                            <div>{song.artist}</div>
                          </div>
                        </div>

                        {/* Song release date */}
                        <div className="flex items-center">
                          {song.createdAt.split("T")[0]}
                        </div>

                        {/* Song duration */}
                        <div className="flex items-center">
                          {formateDuration(song.duration)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default AlbumPage;
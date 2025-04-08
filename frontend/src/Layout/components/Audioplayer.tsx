import { usePlayerStore } from "@/stores/usePlayerStore";
import { useEffect, useRef } from "react"

const Audioplayer = () => {
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const prevSongRef = useRef<string | null>(null);

  const { isPlaying, currentSong, playNext } = usePlayerStore()
  // handle play/pause logic
  useEffect(() => {
    if (isPlaying) audioRef.current?.play();
    else audioRef.current?.pause();
  }, [isPlaying]);

  // handle song ends
  useEffect(() => {
    const audio = audioRef.current;
    const handleEnded = () => {
      playNext();
    };
    audio?.addEventListener("ended",handleEnded)

    return () => audio?.removeEventListener("ended", handleEnded)
  }, [playNext]);

  // handle song changes
  useEffect(() => {
    if ( !audioRef.current || !currentSong ) return;
    const audio = audioRef.current;
    // check if this is a new song

    const isSongChange = prevSongRef.current !== currentSong?.audioUrl;
    if (isSongChange) {
      audio.src = currentSong?.audioUrl;
      // reset the playback position
      audio.currentTime = 0;
      prevSongRef.current = currentSong?.audioUrl;
      if (isPlaying) audio.play();
    }
  }, [isPlaying, currentSong]);



  return (
    <audio ref={audioRef}/>
  )
}

export default Audioplayer

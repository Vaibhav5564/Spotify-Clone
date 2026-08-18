import { createContext, useRef, useState } from "react";

export const PlayerContext = createContext();

function PlayerProvider({ children }) {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef(null);

  async function toggleSong(song) {
    const isSameSong = currentSong?._id === song._id;

    if (isSameSong) {
      if (isPlaying) {
        audioRef.current?.pause();
      } else {
        try {
          await audioRef.current?.play();
        } catch (error) {
          console.error("Unable to play song:", error);
        }
      }

      return;
    }

    setCurrentSong(song);
    setIsPlaying(true);
  }

  function handlePlay() {
    setIsPlaying(true);
  }

  function handlePause() {
    setIsPlaying(false);
  }

  function handleEnded() {
    setIsPlaying(false);
  }

  return (
    <PlayerContext.Provider
      value={{
        currentSong,
        isPlaying,
        audioRef,
        toggleSong,
        handlePlay,
        handlePause,
        handleEnded,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export default PlayerProvider;
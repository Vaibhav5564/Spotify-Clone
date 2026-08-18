import { createContext, useState } from "react";

export const PlayerContext = createContext();

function PlayerProvider({ children }) {
  const [currentSong, setCurrentSong] = useState(null);

  function playSong(song) {
    setCurrentSong(song);
  }

  function clearSong() {
    setCurrentSong(null);
  }

  return (
    <PlayerContext.Provider
      value={{
        currentSong,
        playSong,
        clearSong,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export default PlayerProvider;
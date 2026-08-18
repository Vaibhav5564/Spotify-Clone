import { useContext } from "react";

import { PlayerContext } from "../context/PlayerContext";

function AudioPlayer() {
  const {
    currentSong,
    audioRef,
    handlePlay,
    handlePause,
    handleEnded,
  } = useContext(PlayerContext);

  return (
    <footer className="audio-player">
      <div className="player-song-info">
        <div className="player-cover">♫</div>

        <div>
          <h3>{currentSong?.title || "No song selected"}</h3>

          <p>
            {currentSong?.artist?.userName ||
              "Select a song to start listening"}
          </p>
        </div>
      </div>

      <audio
        ref={audioRef}
        key={currentSong?._id || "empty-player"}
        className="player-controls"
        controls
        autoPlay={Boolean(currentSong)}
        src={currentSong?.uri || undefined}
        onPlay={handlePlay}
        onPause={handlePause}
        onEnded={handleEnded}
      >
        Your browser does not support audio playback.
      </audio>
    </footer>
  );
}

export default AudioPlayer;
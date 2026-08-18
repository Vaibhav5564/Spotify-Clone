import { useContext } from "react";

import { PlayerContext } from "../context/PlayerContext";

function AudioPlayer() {
  const { currentSong } = useContext(PlayerContext);

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

      {currentSong ? (
        <audio
          key={currentSong._id}
          className="player-controls"
          controls
          autoPlay
          src={currentSong.uri}
        >
          Your browser does not support the audio element.
        </audio>
      ) : (
        <audio className="player-controls" controls>
          Your browser does not support the audio element.
        </audio>
      )}
    </footer>
  );
}

export default AudioPlayer;
import { useContext, useEffect, useState } from "react";

import api from "../services/api";
import { PlayerContext } from "../context/PlayerContext";

function Songs() {
  const { currentSong, isPlaying, toggleSong } =
    useContext(PlayerContext);

  const [musics, setMusics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function getMusics() {
      try {
        const response = await api.get("/music");
        setMusics(response.data.musics || []);
      } catch (error) {
        setMessage(
          error.response?.data?.message || "Failed to load songs"
        );
      } finally {
        setLoading(false);
      }
    }

    getMusics();
  }, []);

  if (loading) {
    return <p>Loading songs...</p>;
  }

  return (
    <main>
      <h1>All Songs</h1>
      <br></br>

      {message && <p>{message}</p>}

      {musics.length === 0 ? (
        <p>No songs available.</p>
      ) : (
        <section>
          {musics.map((music) => {
            const isCurrentSong = currentSong?._id === music._id;
            const isCurrentSongPlaying = isCurrentSong && isPlaying;

            return (
              <article
                key={music._id}
                className={
                  isCurrentSong
                    ? "song-card active-song"
                    : "song-card"
                }
              >
                <h3>{music.title}</h3>

                <h4>
                  Artist:{" "}
                  {music.artist?.userName || "Unknown artist"}
                </h4>
                <br></br>

                <button
                  type="button"
                  className={
                    isCurrentSongPlaying
                      ? "song-play-button pause-button"
                      : "song-play-button"
                  }
                  onClick={() => toggleSong(music)}
                >
                  {isCurrentSongPlaying ? "Pause" : "Play Song"}
                </button>
              </article>
            );
          })}
        </section>
      )}
    </main>
  );
}

export default Songs;
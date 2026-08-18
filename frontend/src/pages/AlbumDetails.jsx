import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../services/api";
import { PlayerContext } from "../context/PlayerContext";

function AlbumDetails() {
  const { albumId } = useParams();
  const { currentSong, playSong } = useContext(PlayerContext);

  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function getAlbumDetails() {
      try {
        const response = await api.get(`/music/albums/${albumId}`);

        setAlbum(response.data.album);
      } catch (error) {
        setMessage(
          error.response?.data?.message || "Failed to load album"
        );
      } finally {
        setLoading(false);
      }
    }

    getAlbumDetails();
  }, [albumId]);

  if (loading) {
    return <p>Loading album...</p>;
  }

  if (message) {
    return <p>{message}</p>;
  }

  if (!album) {
    return <p>Album not found.</p>;
  }

  return (
    <main>
      <h1>{album.title}</h1>
      <br></br>

      <h4>
        Artist: {album.artist?.userName || "Unknown artist"}
      </h4>
      <br></br>

      <section>
        {album.musics?.length > 0 ? (
          album.musics.map((music) => (
            <article
              key={music._id}
              className={
                currentSong?._id === music._id
                  ? "song-card active-song"
                  : "song-card"
              }
            >
              <h3>{music.title}</h3>

              <button
                type="button"
                onClick={() => playSong(music)}
              >
                {currentSong?._id === music._id
                  ? "Playing"
                  : "Play Song"}
              </button>
            </article>
          ))
        ) : (
          <p>No songs available in this album.</p>
        )}
      </section>
    </main>
  );
}

export default AlbumDetails;
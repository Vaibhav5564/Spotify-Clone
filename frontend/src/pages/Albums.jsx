import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../services/api";

function Albums() {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function getAlbums() {
      try {
        const response = await api.get("/music/albums");
        setAlbums(response.data.albums || []);
      } catch (error) {
        setMessage(
          error.response?.data?.message || "Failed to load albums"
        );
      } finally {
        setLoading(false);
      }
    }

    getAlbums();
  }, []);

  if (loading) {
    return <p>Loading albums...</p>;
  }

  return (
    <main>
      <h1>All Albums</h1>
      <br></br><br></br>

      {message && <p>{message}</p>}

      {albums.length === 0 ? (
        <p>No albums available.</p>
      ) : (
        <section>
          {albums.map((album) => (
            <article className="album-card" key={album._id}>
              <div className="album-card-content">
                <div className="album-icon">♪</div>

                <h3>{album.title}</h3>

                <p>
                  Artist: {album.artist?.userName || "Unknown artist"}
                </p>

                <Link
                  className="album-card-link"
                  to={`/albums/${album._id}`}
                >
                  Open Album →
                </Link>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}

export default Albums;
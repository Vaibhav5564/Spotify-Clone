import { useContext, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import api from "../services/api";
import { PlayerContext } from "../context/PlayerContext";

function SearchResults() {
  const [searchParams] = useSearchParams();
  const { currentSong, playSong } = useContext(PlayerContext);

  const searchText = searchParams.get("q")?.trim() || "";

  const [musics, setMusics] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchSearchData() {
      try {
        setLoading(true);
        setMessage("");

        const [musicResponse, albumResponse] = await Promise.all([
          api.get("/music"),
          api.get("/music/albums"),
        ]);

        setMusics(musicResponse.data.musics || []);
        setAlbums(albumResponse.data.albums || []);
      } catch (error) {
        setMessage(
          error.response?.data?.message ||
            "Unable to search songs and albums"
        );
      } finally {
        setLoading(false);
      }
    }

    fetchSearchData();
  }, []);

  const normalizedSearch = searchText.toLowerCase();

  const filteredMusics = musics.filter((music) =>
    music.title?.toLowerCase().includes(normalizedSearch)
  );

  const filteredAlbums = albums.filter((album) =>
    album.title?.toLowerCase().includes(normalizedSearch)
  );

  if (loading) {
    return <p>Searching...</p>;
  }

  return (
    <main className="search-results-page">
      <h1>
        {searchText
          ? `Search results for "${searchText}"`
          : "Search songs and albums"}
      </h1>

      {message && <p>{message}</p>}

      {!searchText && (
        <p>Enter a song name or album name in the search bar.</p>
      )}

      {searchText && (
        <>
          <section className="search-section">
            <h2>Songs</h2>

            {filteredMusics.length === 0 ? (
              <p>No matching songs found.</p>
            ) : (
              <div className="search-grid">
                {filteredMusics.map((music) => (
                  <article
                    key={music._id}
                    className={
                      currentSong?._id === music._id
                        ? "song-card active-song"
                        : "song-card"
                    }
                  >
                    <h3>{music.title}</h3>

                    <p>
                      Artist:{" "}
                      {music.artist?.userName || "Unknown artist"}
                    </p>

                    <button
                      type="button"
                      onClick={() => playSong(music)}
                    >
                      {currentSong?._id === music._id
                        ? "Playing"
                        : "Play Song"}
                    </button>
                  </article>
                ))}
              </div>
            )}
          </section>

          <section className="search-section">
            <h2>Albums</h2>

            {filteredAlbums.length === 0 ? (
              <p>No matching albums found.</p>
            ) : (
              <div className="search-grid">
                {filteredAlbums.map((album) => (
                  <article className="album-card" key={album._id}>
                    <div className="album-card-content">
                      <div className="album-icon">♪</div>

                      <h3>{album.title}</h3>

                      <p>
                        Artist:{" "}
                        {album.artist?.userName || "Unknown artist"}
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
              </div>
            )}
          </section>
        </>
      )}
    </main>
  );
}

export default SearchResults;
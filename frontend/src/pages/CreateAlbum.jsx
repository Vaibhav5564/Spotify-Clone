import { useEffect, useState } from "react";

import api from "../services/api";

function CreateAlbum() {
  const [title, setTitle] = useState("");
  const [musics, setMusics] = useState([]);
  const [selectedMusicIds, setSelectedMusicIds] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getMusics() {
      try {
        const response = await api.get("/music");
        setMusics(response.data.musics || []);
      } catch (error) {
        setMessage(
          error.response?.data?.message || "Failed to load songs"
        );
      }
    }

    getMusics();
  }, []);

  function handleMusicSelection(musicId) {
    setSelectedMusicIds((previousIds) => {
      if (previousIds.includes(musicId)) {
        return previousIds.filter((id) => id !== musicId);
      }

      return [...previousIds, musicId];
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!title || selectedMusicIds.length === 0) {
      setMessage("Album title and at least one song are required");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const response = await api.post("/music/album", {
        title,
        musics: selectedMusicIds,
      });

      setMessage(response.data.message || "Album created successfully");
      setTitle("");
      setSelectedMusicIds([]);
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Failed to create album"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <h1>Create Album</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Album title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />

        <h3>Select Songs</h3>

        {musics.length === 0 ? (
          <p>No songs available.</p>
        ) : (
          musics.map((music) => (
            <label key={music._id}>
              <input
                type="checkbox"
                checked={selectedMusicIds.includes(music._id)}
                onChange={() => handleMusicSelection(music._id)}
              />

              {music.title}
            </label>
          ))
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Creating Album..." : "Create Album"}
        </button>
      </form>

      {message && <p>{message}</p>}
    </main>
  );
}

export default CreateAlbum;
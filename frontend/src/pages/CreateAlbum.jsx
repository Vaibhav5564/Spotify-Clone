import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";

function CreateAlbum() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [musics, setMusics] = useState([]);
  const [selectedMusics, setSelectedMusics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchingSongs, setFetchingSongs] = useState(true);

  const [alert, setAlert] = useState({
    message: "",
    type: "",
  });

  useEffect(() => {
    async function getMusics() {
      try {
        const response = await api.get("/music");

        setMusics(response.data.musics || []);
      } catch (error) {
        setAlert({
          message:
            error.response?.data?.message ||
            "Failed to load songs.",
          type: "error",
        });
      } finally {
        setFetchingSongs(false);
      }
    }

    getMusics();
  }, []);

  function handleMusicSelection(musicId) {
    setSelectedMusics((previousSelected) => {
      if (previousSelected.includes(musicId)) {
        return previousSelected.filter(
          (selectedId) => selectedId !== musicId
        );
      }

      return [...previousSelected, musicId];
    });

    if (alert.message) {
      setAlert({
        message: "",
        type: "",
      });
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!title.trim()) {
      setAlert({
        message: "Please enter an album title.",
        type: "error",
      });

      return;
    }

    if (selectedMusics.length === 0) {
      setAlert({
        message: "Please select at least one song.",
        type: "error",
      });

      return;
    }

    try {
      setLoading(true);

      setAlert({
        message: "",
        type: "",
      });

      const response = await api.post("/music/album", {
        title: title.trim(),
        musics: selectedMusics,
      });

      setAlert({
        message:
          response.data.message ||
          "Album created successfully.",
        type: "success",
      });

      setTitle("");
      setSelectedMusics([]);

      setTimeout(() => {
        navigate("/albums");
      }, 1500);
    } catch (error) {
      console.error(
        "Album creation error:",
        error.response?.data || error
      );

      setAlert({
        message:
          error.response?.data?.error ||
          error.response?.data?.message ||
          "Failed to create album.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="form-page">
      <form className="form-card" onSubmit={handleSubmit}>
        <h1>Create Album</h1>

        {alert.message && (
          <div
            className={`form-alert form-alert-${alert.type}`}
            role="alert"
          >
            <span className="form-alert-icon">
              {alert.type === "success" ? "✓" : "!"}
            </span>

            <span>{alert.message}</span>
          </div>
        )}

        <label htmlFor="album-title">Album title</label>

        <input
          id="album-title"
          type="text"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);

            if (alert.message) {
              setAlert({
                message: "",
                type: "",
              });
            }
          }}
          placeholder="Enter album title"
          required
        />

        <div className="album-song-selection">
          <h2>Select Songs</h2>

          {fetchingSongs ? (
            <p>Loading songs...</p>
          ) : musics.length === 0 ? (
            <p>No songs available. Upload a song first.</p>
          ) : (
            <div className="album-song-list">
              {musics.map((music) => {
                const musicId = music._id || music.id;
                const isSelected =
                  selectedMusics.includes(musicId);

                return (
                  <label
                    className={
                      isSelected
                        ? "album-song-option selected-song"
                        : "album-song-option"
                    }
                    key={musicId}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() =>
                        handleMusicSelection(musicId)
                      }
                    />

                    <div>
                      <strong>{music.title}</strong>

                      <p>
                        {music.artist?.userName ||
                          "Unknown artist"}
                      </p>
                    </div>
                  </label>
                );
              })}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={
            loading ||
            fetchingSongs ||
            musics.length === 0
          }
        >
          {loading ? "Creating Album..." : "Create Album"}
        </button>
      </form>
    </main>
  );
}

export default CreateAlbum;
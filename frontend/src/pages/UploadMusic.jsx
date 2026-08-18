import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";

function UploadMusic() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [musicFile, setMusicFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const [alert, setAlert] = useState({
    message: "",
    type: "",
  });

  async function handleSubmit(event) {
    event.preventDefault();

    if (!title.trim()) {
      setAlert({
        message: "Please enter a song title.",
        type: "error",
      });

      return;
    }

    if (!musicFile) {
      setAlert({
        message: "Please select a music file.",
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

      const formData = new FormData();

      formData.append("title", title.trim());
      formData.append("music", musicFile);

      const response = await api.post(
        "/music/upload",
        formData
      );

      setAlert({
        message:
          response.data.message ||
          "Music uploaded successfully.",
        type: "success",
      });

      setTitle("");
      setMusicFile(null);
      event.target.reset();

      setTimeout(() => {
        navigate("/songs");
      }, 1200);
    } catch (error) {
      console.error(
        "Music upload error:",
        error.response?.data || error
      );

      setAlert({
        message:
          error.response?.data?.error ||
          error.response?.data?.message ||
          "Music upload failed.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="form-page">
      <form
        className="form-card"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <h1>Upload Music</h1>

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

        <label htmlFor="title">Song title</label>

        <input
          id="title"
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
          placeholder="Enter song title"
          required
        />

        <label htmlFor="music">Music file</label>

        <input
          id="music"
          type="file"
          accept="audio/*"
          onChange={(event) => {
            setMusicFile(
              event.target.files?.[0] || null
            );

            if (alert.message) {
              setAlert({
                message: "",
                type: "",
              });
            }
          }}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Upload Music"}
        </button>
      </form>
    </main>
  );
}

export default UploadMusic;
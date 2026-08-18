import { useState } from "react";

import api from "../services/api";

function UploadMusic() {
  const [title, setTitle] = useState("");
  const [musicFile, setMusicFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!title || !musicFile) {
      setMessage("Title and music file are required");
      return;
    }

    const formData = new FormData();

    formData.append("title", title);
    formData.append("music", musicFile);

    try {
      setLoading(true);
      setMessage("");

      const response = await api.post("/music/upload", formData);

      setMessage(response.data.message || "Music uploaded successfully");
      setTitle("");
      setMusicFile(null);

      event.target.reset();
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Music upload failed"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <h1>Upload Music</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Song title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />

        <input
          type="file"
          accept="audio/*"
          onChange={(event) => {
            setMusicFile(event.target.files[0]);
          }}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Upload Music"}
        </button>
      </form>

      {message && <p>{message}</p>}
    </main>
  );
}

export default UploadMusic;
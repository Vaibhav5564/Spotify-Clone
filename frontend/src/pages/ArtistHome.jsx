import { Link } from "react-router-dom";

function ArtistHome() {
  return (
    <main className="dashboard-page">
      <section className="dashboard-hero">
        <p className="dashboard-label">Artist Dashboard</p>

        <h1>Create and manage your music</h1>

        <p>
          Upload songs, create albums, and explore your music library.
        </p>

        <div className="dashboard-actions">
          <Link className="primary-link" to="/upload-music">
            Upload Music
          </Link>

          <Link className="secondary-link" to="/create-album">
            Create Album
          </Link>
        </div>
      </section>

      <section className="dashboard-grid">
        <article className="dashboard-card">
          <h2>Upload Music</h2>
          <p>Add a new audio track to your music collection.</p>
          <Link to="/upload-music">Upload Song</Link>
        </article>

        <article className="dashboard-card">
          <h2>Create Album</h2>
          <p>Select your uploaded songs and organize them into an album.</p>
          <Link to="/create-album">Create Album</Link>
        </article>

        <article className="dashboard-card">
          <h2>Browse Songs</h2>
          <p>Listen to all songs available in the application.</p>
          <Link to="/songs">View Songs</Link>
        </article>

        <article className="dashboard-card">
          <h2>Browse Albums</h2>
          <p>Explore all albums created by artists.</p>
          <Link to="/albums">View Albums</Link>
        </article>
      </section>
    </main>
  );
}

export default ArtistHome;
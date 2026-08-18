import { Link } from "react-router-dom";

function UserHome() {
  return (
    <main className="dashboard-page">
      <section className="dashboard-hero">
        <p className="dashboard-label">Listener Dashboard</p>

        <h1>Discover your next favorite song</h1>

        <p>
          Browse songs, explore albums, and learn how this full-stack music
          application works.
        </p>

        <div className="dashboard-actions">
          <Link className="primary-link" to="/songs">
            Listen to Songs
          </Link>

          <Link className="secondary-link" to="/albums">
            Explore Albums
          </Link>
        </div>
      </section>

      <section className="dashboard-grid">
        <article className="dashboard-card">
          <h2>Learn About This Application</h2>

          <p>
            Understand how the React frontend, Express backend, MongoDB,
            authentication, music uploads, albums, and protected routes work
            together.
          </p>

          <Link to="/about-project">Learn More</Link>
        </article>
      </section>
    </main>
  );
}

export default UserHome;
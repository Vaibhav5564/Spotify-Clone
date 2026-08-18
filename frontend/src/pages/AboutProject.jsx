import { Link } from "react-router-dom";

function AboutProject() {
  const topics = [
    {
      title: "Frontend Architecture",
      description:
        "The frontend is built using React and Vite. React components handle the interface, React Router manages navigation, and Context API stores authentication state.",
    },
    {
      title: "Backend Architecture",
      description:
        "The backend uses Node.js and Express. Routes receive requests, middleware verifies access, controllers handle logic, and Mongoose communicates with MongoDB.",
    },
    {
      title: "Authentication Flow",
      description:
        "Users register and log in through the frontend. The backend validates credentials, creates a JWT, and stores it in an HTTP-only cookie.",
    },
    {
      title: "Role-Based Access",
      description:
        "Listeners can browse songs and albums. Artists can also upload music and create albums.",
    },
    {
      title: "Music Upload Flow",
      description:
        "Multer reads uploaded audio files, ImageKit stores them, and MongoDB stores the returned file URL with song information.",
    },
    {
      title: "Database Relationships",
      description:
        "Music stores an artist ObjectId. Albums store an artist ObjectId and an array of music ObjectIds. Mongoose populate converts those IDs into related document details.",
    },
    {
      title: "Frontend and Backend Connection",
      description:
        "Axios sends requests from React to Express. During Codespaces development, the Vite proxy forwards API requests to the backend.",
    },
    {
      title: "Protected Routes",
      description:
        "ProtectedRoute checks authentication and role before displaying restricted frontend pages.",
    },
  ];

  return (
    <main className="about-project-page">
      <section className="about-project-hero">
        <p className="dashboard-label">Project Overview</p>

      </section>

      <section className="about-project-grid">
        {topics.map((topic) => (
          <details className="about-project-card" key={topic.title}>
            <summary>{topic.title}</summary>
            <p>{topic.description}</p>
          </details>
        ))}

        <article className="complete-guide-card">
          <span className="complete-guide-badge">Complete Reference</span>

          <h2>Full Project Logic and Documentation</h2>

          <p>
            Review the complete technology stack, installed libraries, APIs,
            authentication flow, middleware, uploads, database relationships,
            search logic, environment variables, and request lifecycle.
          </p>

          <Link className="primary-link" to="/project-guide">
            Open Complete Project Guide
          </Link>
        </article>
      </section>
    </main>
  );
}

export default AboutProject;
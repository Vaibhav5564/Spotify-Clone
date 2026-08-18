import { Link } from "react-router-dom";

function ProjectGuide() {
    const sections = [
        {
            number: "01",
            title: "Project Purpose",
            points: [
                "This project is a full-stack Spotify-inspired music application.",
                "Users can register, log in, browse songs, browse albums, search music, and play audio.",
                "Artists receive additional permissions to upload songs and create albums.",
                "The project demonstrates frontend development, backend development, authentication, media storage, database relationships, and role-based authorization.",
            ],
        },
        {
            number: "02",
            title: "Technology Stack",
            points: [
                "Frontend: React with Vite.",
                "Frontend routing: React Router DOM.",
                "API communication: Axios.",
                "Frontend state management: React Context API and localStorage.",
                "Backend: Node.js with Express.",
                "Database: MongoDB Atlas with Mongoose.",
                "Authentication: JSON Web Token stored in cookies.",
                "File handling: Multer with memory storage.",
                "Music storage: ImageKit.",
                "Development environment: GitHub Codespaces.",
            ],
        },
        {
            number: "03",
            title: "Frontend Structure",
            points: [
                "App.jsx defines all application routes.",
                "MainLayout.jsx combines the Navbar, Sidebar, page content, and AudioPlayer.",
                "Pages contain complete screens such as Login, Register, Songs, Albums, and dashboards.",
                "Components contain reusable interface elements such as Navbar, Sidebar, ProtectedRoute, and AudioPlayer.",
                "AuthContext stores the currently logged-in user and authentication state.",
                "api.js creates a reusable Axios instance for backend requests.",
                "App.css contains the application layout and component styling.",
                "index.css contains basic global styles and browser resets.",
            ],
        },
        {
            number: "04",
            title: "Backend Structure",
            points: [
                "server.js loads environment variables, connects to MongoDB, and starts the server.",
                "app.js configures middleware and connects route files to Express.",
                "Routes define API endpoints and decide which middleware and controller should run.",
                "Controllers contain the main logic for authentication, songs, and albums.",
                "Models define how users, songs, and albums are stored in MongoDB.",
                "Middleware verifies JWT tokens and checks user roles.",
                "The storage service uploads audio files to ImageKit.",
            ],
        },
        {
            number: "05",
            title: "Installed Backend Libraries",
            points: [
                "express creates the backend server and API routes.",
                "mongoose connects Node.js to MongoDB and defines schemas and models.",
                "jsonwebtoken creates and verifies authentication tokens.",
                "bcrypt or bcryptjs hashes passwords before storing them.",
                "cookie-parser reads JWT tokens stored inside cookies.",
                "cors allows the frontend to communicate with the backend.",
                "multer processes uploaded music files.",
                "@imagekit/nodejs uploads music files to ImageKit.",
                "dotenv loads values from the backend .env file.",
                "nodemon automatically restarts the backend during development.",
            ],
        },
        {
            number: "06",
            title: "Installed Frontend Libraries",
            points: [
                "react builds the user interface using components.",
                "react-dom renders the React application in the browser.",
                "react-router-dom manages pages, URLs, navigation, and protected routes.",
                "axios sends HTTP requests from React to the Express backend.",
                "Vite runs the frontend development server and builds the production application.",
                "ESLint detects common JavaScript and React code problems.",
            ],
        },
        {
            number: "07",
            title: "Authentication Flow",
            points: [
                "The user submits a username and password from the Login page.",
                "Axios sends a POST request to /api/auth/login.",
                "The backend searches MongoDB for the matching user.",
                "The backend compares the submitted password with the stored hashed password.",
                "After successful login, the backend creates a JWT containing the user ID and role.",
                "The JWT is stored in an HTTP-only cookie.",
                "The frontend stores safe user details in AuthContext for interface decisions.",
                "Future protected requests automatically include the authentication cookie.",
            ],
        },
        {
            number: "08",
            title: "Role-Based Authorization",
            points: [
                "The application has two roles: user and artist.",
                "Both users and artists can browse songs and albums.",
                "Only artists can upload music and create albums.",
                "authUser middleware allows both user and artist roles.",
                "authArtist middleware allows only the artist role.",
                "ProtectedRoute prevents users from opening unauthorized frontend pages.",
                "Backend middleware remains the actual security layer because frontend restrictions can be bypassed.",
            ],
        },
        {
            number: "09",
            title: "Role of Middleware",
            points: [
                "Middleware runs between the incoming request and the controller.",
                "It can read and modify req and res.",
                "It can stop a request by sending an error response.",
                "It can continue execution by calling next().",
                "Authentication middleware reads the token from req.cookies.",
                "jwt.verify checks whether the token is valid.",
                "The decoded user information is assigned to req.user.",
                "Controllers can then use req.user.id without verifying the token again.",
                "Middleware keeps repeated authentication logic outside controllers.",
            ],
        },
        {
            number: "10",
            title: "Music Upload Flow",
            points: [
                "An artist selects an audio file and enters a song title.",
                "React creates a FormData object.",
                "The file is added using the field name music.",
                "Axios sends the multipart request to /api/music/upload.",
                "authArtist verifies that the logged-in account is an artist.",
                "Multer reads the uploaded file and places it in req.file.",
                "The controller converts the file buffer to Base64.",
                "The storage service sends the file to ImageKit.",
                "ImageKit returns a public music URL.",
                "MongoDB stores the title, ImageKit URL, and artist ObjectId.",
            ],
        },
        {
            number: "11",
            title: "Album Creation Flow",
            points: [
                "The artist enters an album title and selects uploaded songs.",
                "The frontend creates an array containing selected music IDs.",
                "Axios sends the title and music ID array to /api/music/album.",
                "authArtist verifies the artist account.",
                "The album controller creates an album document.",
                "The album stores the artist ObjectId and an array of music ObjectIds.",
                "Populate can later replace those IDs with complete artist and music details.",
            ],
        },
        {
            number: "12",
            title: "MongoDB Relationships and Populate",
            points: [
                "A music document stores the artist ID rather than copying the complete user document.",
                "An album stores the artist ID and multiple music IDs.",
                "Schema ref tells Mongoose which model an ObjectId belongs to.",
                'populate("artist") replaces the artist ID with the matching user document.',
                'populate("musics") replaces music IDs with matching music documents.',
                "Populate performs additional database queries using the stored ObjectIds.",
                "Selected fields can be returned to prevent sensitive data such as passwords from being exposed.",
            ],
        },
        {
            number: "13",
            title: "Frontend and Backend Connection",
            points: [
                "React sends API requests using the reusable Axios instance.",
                "The Axios base URL is /api during Codespaces development.",
                "Vite proxy forwards /api requests to the backend on port 3000.",
                "withCredentials allows authentication cookies to be included.",
                "The backend CORS configuration allows requests from the frontend origin.",
                "After deployment, environment variables will contain the real frontend and backend URLs.",
            ],
        },
        {
            number: "14",
            title: "Available APIs",
            points: [
                "POST /api/auth/register creates a new listener or artist account.",
                "POST /api/auth/login verifies credentials and creates a login cookie.",
                "POST /api/auth/logout removes the authentication cookie.",
                "POST /api/music/upload uploads a song and is restricted to artists.",
                "POST /api/music/album creates an album and is restricted to artists.",
                "GET /api/music returns all songs for authenticated users.",
                "GET /api/music/albums returns all albums for authenticated users.",
                "GET /api/music/albums/:albumId returns one album and its songs.",
            ],
        },
        {
            number: "15",
            title: "Search Flow",
            points: [
                "The Navbar stores entered text in React state.",
                "Submitting the form navigates to /search?q=searchText.",
                "SearchResults reads q using useSearchParams.",
                "The page fetches songs and albums.",
                "JavaScript filter checks the song title and album title.",
                "Matching songs and albums are displayed in separate sections.",
                "For larger applications, searching should be handled by a backend API and MongoDB query.",
            ],
        },
        {
            number: "16",
            title: "Important Environment Variables",
            points: [
                "MONGO_URI stores the MongoDB Atlas connection string.",
                "JWT_SECRET signs and verifies authentication tokens.",
                "IMAGEKIT_PRIVATE_KEY authenticates ImageKit uploads.",
                "CLIENT_URL identifies the frontend address allowed by CORS.",
                "VITE_API_URL can store the backend API address for deployment.",
                "Backend secrets must never be placed in frontend environment files.",
                ".env files must not be committed to GitHub.",
            ],
        },
        {
            number: "17",
            title: "Complete Request Lifecycle",
            points: [
                "The user performs an action in a React component.",
                "The component sends an Axios request.",
                "The request reaches an Express route.",
                "Required middleware verifies authentication, role, body, or uploaded file.",
                "The controller performs the main business logic.",
                "The Mongoose model reads or writes data in MongoDB.",
                "External services such as ImageKit may process uploaded files.",
                "The controller sends a JSON response.",
                "React stores the response in state and updates the user interface.",
            ],
        },
        {
            number: "18",
            title: "Future Improvements",
            points: [
                "Add GET /api/auth/me to verify the active user after every refresh.",
                "Create a shared PlayerContext so one central audio player controls every song.",
                "Add album and artist cover images.",
                "Add playlists, likes, recently played songs, and favorites.",
                "Add backend search, filtering, pagination, and sorting.",
                "Add validation libraries and centralized error handling.",
                "Add file-type and file-size restrictions.",
                "Add loading skeletons, notifications, and better empty states.",
                "Deploy the frontend and backend with secure production cookies.",
            ],
        },
    ];

    return (
        <main className="project-guide-page">
            <section className="project-guide-hero">
                <div className="project-guide-top">
                    <Link className="back-button" to="/about-project">
                        ← Back to Project Overview
                    </Link>
                    <br></br><br></br>
                    <p className="dashboard-label">Developer Documentation</p>
                </div>

                


            </section>

            <nav className="guide-navigation">
                {sections.map((section) => (
                    <a key={section.number} href={`#section-${section.number}`}>
                        {section.number}. {section.title}
                    </a>
                ))}
            </nav>

            <section className="project-guide-sections">
                {sections.map((section) => (
                    <article
                        className="project-guide-section"
                        id={`section-${section.number}`}
                        key={section.number}
                    >
                        <div className="guide-section-number">{section.number}</div>

                        <div>
                            <h2>{section.title}</h2>

                            <ul>
                                {section.points.map((point) => (
                                    <li key={point}>{point}</li>
                                ))}
                            </ul>
                        </div>
                    </article>
                ))}
            </section>
        </main>
    );
}

export default ProjectGuide;
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import AboutProject from "./pages/AboutProject";
import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import ProjectGuide from "./pages/ProjectGuide";
import UserHome from "./pages/UserHome";
import ArtistHome from "./pages/ArtistHome";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Songs from "./pages/Songs";
import Albums from "./pages/Albums";
import AlbumDetails from "./pages/AlbumDetails";
import UploadMusic from "./pages/UploadMusic";
import CreateAlbum from "./pages/CreateAlbum";
import SearchResults from "./pages/SearchResults";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route
            path="/"
            element={<Navigate to="/login" replace />}
          />

          <Route
            path="/user-home"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <UserHome />
              </ProtectedRoute>
            }
          />

          <Route
            path="/about-project"
            element={
              <ProtectedRoute allowedRoles={["user", "artist"]}>
                <AboutProject />
              </ProtectedRoute>
            }
          />

          <Route
            path="/artist-home"
            element={
              <ProtectedRoute allowedRoles={["artist"]}>
                <ArtistHome />
              </ProtectedRoute>
            }
          />

          <Route
            path="/project-guide"
            element={
              <ProtectedRoute allowedRoles={["user", "artist"]}>
                <ProjectGuide />
              </ProtectedRoute>
            }
          />

          <Route
            path="/songs"
            element={
              <ProtectedRoute allowedRoles={["user", "artist"]}>
                <Songs />
              </ProtectedRoute>
            }
          />

          <Route
            path="/albums"
            element={
              <ProtectedRoute allowedRoles={["user", "artist"]}>
                <Albums />
              </ProtectedRoute>
            }
          />

          <Route
            path="/albums/:albumId"
            element={
              <ProtectedRoute allowedRoles={["user", "artist"]}>
                <AlbumDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="/search"
            element={
              <ProtectedRoute allowedRoles={["user", "artist"]}>
                <SearchResults />
              </ProtectedRoute>
            }
          />

          <Route
            path="/upload-music"
            element={
              <ProtectedRoute allowedRoles={["artist"]}>
                <UploadMusic />
              </ProtectedRoute>
            }
          />

          <Route
            path="/create-album"
            element={
              <ProtectedRoute allowedRoles={["artist"]}>
                <CreateAlbum />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
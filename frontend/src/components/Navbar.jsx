import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useContext(AuthContext);

  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSearch(event) {
    event.preventDefault();

    const value = searchText.trim();

    if (!value) {
      return;
    }

    navigate(`/search?q=${encodeURIComponent(value)}`);
  }

  async function handleLogout() {
    try {
      setLoading(true);

      await api.post("/auth/logout");

      logout();
      navigate("/login");
    } catch (error) {
      console.error(
        error.response?.data?.message || "Logout failed"
      );
    } finally {
      setLoading(false);
    }
  }

  function handleLogoClick() {
    if (!isAuthenticated) {
      navigate("/");
      return;
    }

    navigate(user?.role === "artist" ? "/artist-home" : "/user-home");
  }

  return (
    <nav className="navbar">
      <button
        type="button"
        className="navbar-logo"
        onClick={handleLogoClick}
      >
        Spotify Clone
      </button>

      {isAuthenticated && (
        <form className="navbar-search" onSubmit={handleSearch}>
          <input
            type="search"
            placeholder="Search songs and albums..."
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
          />

          <button type="submit">Search</button>
        </form>
      )}

      {isAuthenticated && (
        <div className="navbar-account">
          <span className="navbar-user">{user?.userName}</span>

          <button
            type="button"
            className="logout-button"
            onClick={handleLogout}
            disabled={loading}
          >
            {loading ? "Logging out..." : "Logout"}
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
import { NavLink } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

function Sidebar() {
  const { user, isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <aside className="sidebar">
      <h3>Your Library</h3>

      <nav className="sidebar-links">
        <NavLink
          to={user?.role === "artist" ? "/artist-home" : "/user-home"}
        >
          Dashboard
        </NavLink>

        <NavLink to="/songs">All Songs</NavLink>

        <NavLink to="/albums">All Albums</NavLink>

        {user?.role === "artist" && (
          <>
            <NavLink to="/upload-music">Upload Music</NavLink>

            <NavLink to="/create-album">Create Album</NavLink>
          </>
        )}
      </nav>
    </aside>
  );
}

export default Sidebar;
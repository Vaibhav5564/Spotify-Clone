import { Outlet } from "react-router-dom";
import "../App.css";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import AudioPlayer from "../components/AudioPlayer";

function MainLayout() {
  return (
    <div className="app-layout">
      <Navbar />

      <div className="app-content">
        <Sidebar />

        <main className="page-content">
          <Outlet />
        </main>
      </div>

      <AudioPlayer />
    </div>
  );
}

export default MainLayout;
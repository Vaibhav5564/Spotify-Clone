import { createContext, useState } from "react";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("spotifyUser");

    return savedUser ? JSON.parse(savedUser) : null;
  });

  const isAuthenticated = Boolean(user);

  function login(userData) {
    setUser(userData);
    localStorage.setItem("spotifyUser", JSON.stringify(userData));
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("spotifyUser");
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
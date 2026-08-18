import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../services/api";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setLoading(true);
      setMessage("");

      const response = await api.post("/auth/login", formData);

      const loggedInUser = response.data.user;

      login(loggedInUser);

      if (loggedInUser?.role === "artist") {
        navigate("/artist-home");
      } else {
        navigate("/user-home");
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-container">
        <h1>Welcome Back</h1>
        <p>Login to continue listening to your music.</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="userName"
            placeholder="Username"
            value={formData.userName}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {message && <p className="form-message">{message}</p>}

        <p className="auth-switch">
          Don&apos;t have an account?{" "}
          <Link to="/register">Create Account</Link>
        </p>
      </section>
    </main>
  );
}

export default Login;
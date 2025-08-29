import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Please enter both username and password");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/users/login", {
        username,
        password,
      });

      // Save logged-in user in localStorage
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("isLoggedIn", "true");

      // Redirect to home
      navigate("/");
    } catch (err) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 to-pink-800">
      <form
        onSubmit={handleLogin}
        className="bg-gray-900/80 backdrop-blur-md p-10 rounded-3xl shadow-glow w-96 flex flex-col gap-6"
      >
        <h2 className="text-3xl font-bold text-white text-center">Login</h2>

        {error && (
          <p className="text-red-400 text-sm text-center animate-pulse">
            {error}
          </p>
        )}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400/60 bg-gray-800 text-white"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400/60 bg-gray-800 text-white"
          required
        />

        <button
          type="submit"
          className="bg-gradient-to-r from-pink-500 to-indigo-500 text-white py-2 rounded-xl font-semibold hover:scale-105 transition-transform"
        >
          Login
        </button>

        <p className="text-gray-400 text-sm text-center">
          New here?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-indigo-400 cursor-pointer hover:underline"
          >
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignupPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [securityKey, setSecurityKey] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    // Security key validation
    if (securityKey !== "TEAM DAREDEVILS") {
      setError("Invalid Security Key!");
      return;
    }

    // Basic field validation
    if (!username || !email || !password) {
      setError("Please fill all fields!");
      return;
    }

    try {
      // Call backend signup API
      const res = await axios.post("http://localhost:5000/api/users/signup", {
        username,
        email,
        password,
      });

      if (res.status === 201) {
        // Signup successful, navigate to login
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong!");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 to-pink-800">
      <form
        onSubmit={handleSignup}
        className="bg-gray-900/80 backdrop-blur-md p-10 rounded-3xl shadow-glow w-96 flex flex-col gap-6"
      >
        <h2 className="text-3xl font-bold text-white text-center">Sign Up</h2>

        {error && <p className="text-red-400 text-sm text-center">{error}</p>}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400/60 bg-gray-800 text-white"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400/60 bg-gray-800 text-white"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400/60 bg-gray-800 text-white"
        />
        <input
          type="text"
          placeholder="Security Key"
          value={securityKey}
          onChange={(e) => setSecurityKey(e.target.value)}
          className="px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400/60 bg-gray-800 text-white"
        />

        <button
          type="submit"
          className="bg-gradient-to-r from-pink-500 to-indigo-500 text-white py-2 rounded-xl font-semibold hover:scale-105 transition"
        >
          Sign Up
        </button>

        <p className="text-gray-400 text-sm text-center">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-indigo-400 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}

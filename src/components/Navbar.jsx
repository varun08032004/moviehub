import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar({ query, setQuery }) {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear user token
    setDropdownOpen(false); // Close dropdown
    navigate("/login"); // Redirect to login
  };

  return (
    <nav className="glass fixed top-0 inset-x-0 z-50">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center gap-4 relative">
        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="cursor-pointer text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-pink-400"
        >
          MovieHub
        </div>

        {/* Search */}
        <div className="flex-1">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search movies..."
            className="w-full rounded-xl glass px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-400/60"
          />
        </div>

        {/* Favorites */}
        <button
          onClick={() => navigate("/favorites")}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-indigo-500 text-white font-semibold shadow hover:scale-105 transition"
        >
          ⭐ Favorites
        </button>

        {/* Profile */}
        <div className="relative" ref={dropdownRef}>
          <div
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className={`w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 cursor-pointer flex items-center justify-center transform transition ${
              dropdownOpen ? "scale-105" : "scale-100"
            }`}
          >
            <span className="text-white font-semibold">U</span>
          </div>

          {/* Dropdown */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-900/95 backdrop-blur-md rounded-lg shadow-lg py-2 z-50 animate-fadeSlideDown origin-top">
              <button
                onClick={() => {
                  setDropdownOpen(false);
                  navigate("/profile");
                }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-800 transition"
              >
                Profile
              </button>
              <button
                onClick={() => {
                  setDropdownOpen(false);
                  navigate("/settings");
                }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-800 transition"
              >
                Settings
              </button>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-800 transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
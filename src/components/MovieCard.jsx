import React from "react";

// Fallback image if poster is missing or broken
function fallbackPoster(title) {
  const t = encodeURIComponent(title);
  return `https://via.placeholder.com/300x450.png?text=${t}`;
}

// Base URL for your API images (adjust as per your API)
const API_BASE_URL = "https://your-api.com/images"; // replace with your actual API base path

export default function MovieCard({ movie = {}, onOpen = () => {}, onFavorite = () => {} }) {
  // Construct poster URL
  const poster =
    movie.poster && typeof movie.poster === "string" && movie.poster.length > 0
      ? movie.poster.startsWith("http")
        ? movie.poster
        : `${API_BASE_URL}/${movie.poster}`
      : fallbackPoster(movie.title || "No Title");

  const disabled = !movie.link || typeof movie.link !== "string" || movie.link.trim() === "";

  return (
    <div
      className="card card-hover relative group cursor-pointer"
      onClick={() => onOpen(movie)}
    >
      {/* Poster */}
      <img
        src={poster}
        alt={movie.title}
        loading="lazy"
        className="h-[300px] w-full object-cover rounded-lg"
        onError={(e) => {
          e.target.src = fallbackPoster(movie.title); // fallback if broken
        }}
      />

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition flex flex-col justify-end p-3 rounded-lg">
        <h3 className="text-white font-bold text-sm">{movie.title}</h3>
        <p className="text-xs text-white/70 line-clamp-2">
          {movie.overview || "No description available."}
        </p>
        <div className="flex gap-2 mt-2">
          {disabled ? (
            <button
              className="btn btn-primary cursor-not-allowed opacity-60 text-xs"
              title="Add a Terabox link in data/movies.js"
            >
              Watch
            </button>
          ) : (
            <a
              href={movie.link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary text-xs"
              onClick={(e) => e.stopPropagation()}
            >
              ▶ Watch
            </a>
          )}
          <button
            className="btn btn-secondary text-xs"
            onClick={(e) => {
              e.stopPropagation();
              onFavorite(movie);
            }}
          >
            + Favorite
          </button>
        </div>
      </div>
    </div>
  );
} 
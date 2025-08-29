import React, { useState } from "react";
import MovieCard from "./MovieCard";

export default function Favorites({ favorites, setFavorites }) {
  const [selected, setSelected] = useState(null);

  // Remove movie from favorites
  const removeFavorite = (id) => {
    const updated = favorites.filter((movie) => movie.id === undefined ? movie.movieId !== id : movie.id !== id);
    setFavorites(updated);
  };

  if (!favorites || favorites.length === 0) {
    return (
      <div className="pt-24 px-6 max-w-7xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-6">⭐ Your Favorites</h1>
        <p className="text-gray-400">No favorite movies added yet.</p>
      </div>
    );
  }

  return (
    <div className="pt-24 px-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">⭐ Your Favorites</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {favorites.map((movie) => (
          <MovieCard
            key={movie.id || movie.movieId}
            movie={movie}
            onOpen={setSelected}
            onFavorite={() => removeFavorite(movie.id || movie.movieId)}
            isFavorite={true}
          />
        ))}
      </div>

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-gray-800 rounded-2xl max-w-xl w-full p-6 relative shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3 text-white/70 hover:text-white text-xl font-bold"
              onClick={() => setSelected(null)}
            >
              ✕
            </button>
            <img
              src={selected.poster || selected.poster_path}
              alt={selected.title || selected.name}
              className="w-full h-96 object-cover rounded-xl mb-4"
            />
            <h2 className="text-2xl font-semibold mb-2 text-white">{selected.title || selected.name}</h2>
            <p className="text-gray-300 text-sm mb-4">
              {selected.overview || "No description available."}
            </p>
            <div className="flex gap-3">
              {selected.link ? (
                <a
                  href={selected.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
                >
                  ▶ Watch Now
                </a>
              ) : (
                <button
                  className="px-4 py-2 bg-blue-600/60 text-white rounded-lg cursor-not-allowed"
                  disabled
                >
                  No Link
                </button>
              )}
              <button
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
                onClick={() => removeFavorite(selected.id || selected.movieId)}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

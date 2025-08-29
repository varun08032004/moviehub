import { useState } from "react";
import MovieCard from "./MovieCard";

export default function MovieGrid({ movies, favorites, setFavorites }) {
  const [selected, setSelected] = useState(null);

  const addToFavorites = (movie) => {
    // Check if movie already exists in favorites
    const isAlreadyFavorite = favorites.some(
      (fav) => fav.title === movie.title
    );

    if (isAlreadyFavorite) {
      alert("Movie is already in favorites!");
      return;
    }

    const updatedFavorites = [...favorites, movie];
    setFavorites(updatedFavorites);
    alert("Movie added to favorites!");
  };

  if (!movies.length) {
    return (
      <div className="text-center text-white/60 py-20">
        No movies found.
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {movies.map((m, i) => (
          <MovieCard
            key={`${m.title}-${i}`}
            movie={m}
            onOpen={setSelected}
            onFavorite={addToFavorites} // use the function defined here
          />
        ))}
      </div>

      {selected && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-gray-900 rounded-xl max-w-lg w-full p-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-white/60 hover:text-white"
              onClick={() => setSelected(null)}
            >
              ✕
            </button>
            <img
              src={selected.poster}
              alt={selected.title}
              className="w-full h-80 object-cover rounded-lg mb-4"
            />
            <h2 className="text-xl font-bold mb-2">{selected.title}</h2>
            <p className="text-white/70 text-sm mb-4">
              {selected.overview || "No description available."}
            </p>
            <div className="flex gap-2">
              {selected.link ? (
                <a
                  href={selected.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  onClick={(e) => e.stopPropagation()}
                >
                  ▶ Watch Now
                </a>
              ) : (
                <button
                  className="btn btn-primary cursor-not-allowed opacity-60"
                  disabled
                >
                  No Link
                </button>
              )}
              <button
                className="btn btn-secondary"
                onClick={() => addToFavorites(selected)}
              >
                + Favorite
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

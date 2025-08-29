import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import MovieGrid from "../components/MovieGrid";
import { movies as allMovies } from "../data/movies";
import { API_KEY, BASE_URL, IMAGE_BASE_URL } from "../config";

export default function Home({ handleLogout, favorites, setFavorites }) {
  const [query, setQuery] = useState("");
  const [moviesWithPosters, setMoviesWithPosters] = useState(allMovies);
  const [heroIndex, setHeroIndex] = useState(0);
  const [topViewed, setTopViewed] = useState([]);
  const navigate = useNavigate();

  // Check login
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  // Protect home route
  useEffect(() => {
    if (!isLoggedIn) navigate("/login", { replace: true });
  }, [isLoggedIn, navigate]);

  // Fetch posters
  useEffect(() => {
    async function fetchPosters() {
      const updated = await Promise.all(
        allMovies.map(async (m) => {
          if (m.poster) return m;
          try {
            const res = await fetch(
              `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
                m.title
              )}&year=${m.year}`
            );
            const data = await res.json();
            if (data.results?.length > 0) {
              return { ...m, poster: IMAGE_BASE_URL + data.results[0].poster_path };
            }
          } catch (err) {
            console.error("Error fetching poster for", m.title, err);
          }
          return { ...m, poster: "/fallback-poster.jpg" };
        })
      );
      setMoviesWithPosters(updated);
      const shuffled = updated.sort(() => 0.5 - Math.random());
      setTopViewed(shuffled.slice(0, Math.min(6, shuffled.length)));
    }
    fetchPosters();
  }, []);

  // Hero carousel
  useEffect(() => {
    if (!topViewed.length) return;
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % topViewed.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [topViewed]);

  // Filter movies based on search query
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return moviesWithPosters;
    return moviesWithPosters.filter((m) =>
      (m.title + " " + (m.year || "")).toLowerCase().includes(q)
    );
  }, [query, moviesWithPosters]);

  const hero = topViewed[heroIndex];
  const prevHero = () => setHeroIndex((prev) => (prev - 1 + topViewed.length) % topViewed.length);
  const nextHero = () => setHeroIndex((prev) => (prev + 1) % topViewed.length);

  // Add movie to favorites
  const addToFavorites = (movie) => {
    if (!favorites.find((m) => m.id === movie.id)) {
      const updated = [...favorites, movie];
      setFavorites(updated);
      localStorage.setItem("favorites", JSON.stringify(updated));
      alert(`${movie.title} added to favorites ⭐`);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white bg-radial-fade">
      <Navbar query={query} setQuery={setQuery} handleLogout={handleLogout} />
      <div className="h-16" />

      {/* Top Viewed */}
      <div className="mx-auto max-w-7xl px-4 mt-4">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-2 border-b-2 border-red-600 w-fit">
          Top Viewed
        </h3>
      </div>

      {/* Hero Section */}
      {hero && (
        <section className="relative mx-auto max-w-7xl px-4 mt-2">
          <div className="relative rounded-3xl overflow-hidden">
            <img
              src={hero.poster || "/fallback-poster.jpg"}
              alt={hero.title}
              className="h-72 sm:h-96 w-full object-contain rounded-3xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold drop-shadow">
                {hero.title}
              </h2>
            </div>

            <button
              onClick={prevHero}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white text-3xl font-bold"
            >
              ‹
            </button>
            <button
              onClick={nextHero}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white text-3xl font-bold"
            >
              ›
            </button>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {topViewed.map((_, i) => (
                <span
                  key={i}
                  className={`w-3 h-3 rounded-full ${i === heroIndex ? "bg-red-600" : "bg-white/50"}`}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Movies */}
      <main className="mx-auto max-w-7xl px-4 py-8">
        <h3 className="text-xl font-semibold mb-4">All Movies</h3>
        <MovieGrid
          movies={filtered}
          favorites={favorites}
          addToFavorites={addToFavorites}
           setFavorites={setFavorites}
        />
      </main>

      <footer className="text-center text-white/40 py-8">Made with ❤ MovieHub</footer>
    </div>
  );
} 
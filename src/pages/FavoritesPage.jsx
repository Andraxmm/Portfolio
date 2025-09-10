import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../Projects/BuscadorPeliculas/api.js";
import MovieCard from "../Projects/BuscadorPeliculas/MovieCard.jsx";

const LS_KEY = "favMovies";

export default function FavoritesPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    async function loadFavorites() {
      const stored = JSON.parse(localStorage.getItem(LS_KEY)) || [];

      // Si no hay favoritos, salimos
      if (stored.length === 0) {
        setMovies([]);
        setLoading(false);
        return;
      }

      try {
        const results = await Promise.allSettled(
          stored.map((id) => api(`/movie/${id}`))
        );

        const validMovies = results
          .filter((res) => res.status === "fulfilled")
          .map((res) => res.value);

        setMovies(validMovies);
      } catch (error) {
        console.error("Error al cargar favoritos:", error);
        setErr("No se pudieron cargar tus películas favoritas.");
      } finally {
        setLoading(false);
      }
    }

    loadFavorites();
  }, []);

  return (
    <main className="container-p py-8">
      <Link to="/peliculas" replace className="btn-outline mb-4 inline-block">
        ← Volver al buscador
      </Link>

      <h1 className="text-2xl font-bold mb-6">❤️ Tus Películas Favoritas</h1>

      {/* Estado de carga */}
      {loading && <p role="status">Cargando favoritos…</p>}

      {/* Estado de error */}
      {!loading && err && (
        <p className="text-red-500 mb-4">{err}</p>
      )}

      {/* Estado vacío */}
      {!loading && !err && movies.length === 0 && (
        <p className="opacity-70">Aún no tienes películas favoritas.</p>
      )}

      {/* Grid de películas */}
      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))" }}
      >
        {!loading && !err && movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} to />
        ))}
      </div>
    </main>
  );
}

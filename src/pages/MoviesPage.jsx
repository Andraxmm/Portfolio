import { useState } from "react";
import api from "../Projects/BuscadorPeliculas/api.js";
import MovieCard from "../Projects/BuscadorPeliculas/MovieCard.jsx";

export default function MoviesPage() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  async function searchMovies(e) {
    e.preventDefault();
    const q = query.trim();
    if (!q) { setMovies([]); setErr(""); return; }

    setLoading(true);
    setErr("");
    try {
      const data = await api(`/search/movie?query=${encodeURIComponent(q)}`);
      setMovies(data?.results || []);
    } catch (error) {
      console.error(error);
      setErr("No se pudo cargar. Revisa conexión o la clave de TMDB.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container-p py-8">
      <h1 className="text-2xl font-bold mb-4">🎬 Buscador de Películas</h1>

      <form onSubmit={searchMovies} className="flex gap-2 mb-6" role="search">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar película…"
          className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-slate-300/40
                     outline-none focus:border-indigo-400 dark:bg-slate-800 dark:border-slate-700"
        />
        <button type="submit" className="btn">Buscar</button>
      </form>

      {loading && <p className="opacity-70 mb-4">Buscando…</p>}
      {err && <p className="text-red-400 mb-4">{err}</p>}
      {!loading && !err && movies.length === 0 && query.trim() && (
        <p className="opacity-70 mb-4">Sin resultados para “{query.trim()}”.</p>
      )}

      {movies.length > 0 && (
        <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))" }}>
          {movies.map((m) => (
            <MovieCard key={m.id} movie={m} />
          ))}
        </div>
      )}
    </main>
  );
}

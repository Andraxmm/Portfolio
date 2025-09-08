import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../Projects/BuscadorPeliculas/api.js";
import MovieCard from "../Projects/BuscadorPeliculas/MovieCard.jsx";

function SkeletonCard() {
  return (
    <div className="rounded-xl overflow-hidden bg-white/5 border border-white/10 animate-pulse">
      <div className="w-full aspect-[2/3] bg-white/10" />
      <div className="p-3 space-y-2">
        <div className="h-4 bg-white/10 rounded" />
        <div className="h-3 w-1/2 bg-white/10 rounded" />
        <div className="h-3 w-4/5 bg-white/10 rounded" />
      </div>
    </div>
  );
}

export default function MoviesPage() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  // Al montar: si hay ?q= usa búsqueda; si no, carga tendencias
  useEffect(() => {
    const q = searchParams.get("q")?.trim() || "";
    if (q) {
      setQuery(q);
      doSearch(q);
    } else {
      loadTrending();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadTrending() {
    try {
      setLoading(true);
      setErr("");
      const data = await api(`/trending/movie/week`);
      setMovies(data?.results || []);
    } catch (e) {
      console.error(e);
      setErr("No se pudieron cargar las tendencias.");
    } finally {
      setLoading(false);
    }
  }

  async function doSearch(q) {
    try {
      setLoading(true);
      setErr("");
      const data = await api(`/search/movie?query=${encodeURIComponent(q)}`);
      setMovies(data?.results || []);
    } catch (e) {
      console.error(e);
      setErr("No se pudo buscar. Revisa tu conexión o la clave de TMDB.");
    } finally {
      setLoading(false);
    }
  }

  async function onSubmit(e) {
    e.preventDefault();
    const q = query.trim();
    setSearchParams(q ? { q } : {}); // la query vive en la URL
    if (!q) return loadTrending();
    doSearch(q);
  }

  return (
    <main className="container-p py-8">
      <h1 className="text-2xl font-bold mb-4">🎬 Buscador de Películas</h1>

      <form onSubmit={onSubmit} className="flex gap-2 mb-6" role="search">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar película…"
          className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-slate-300/40
                     outline-none focus:border-indigo-400 dark:bg-slate-800 dark:border-slate-700"
          aria-label="Buscar película"
        />
        <button type="submit" className="btn">Buscar</button>
      </form>

      {/* Estados */}
      {err && <p className="text-red-400 mb-4">{err}</p>}

      {/* Grid */}
      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))" }}
      >
        {loading
          ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
          : movies.map((m) => <MovieCard key={m.id} movie={m} to />)}
      </div>

      {/* Vacío (cuando no hay error ni loading) */}
      {!loading && !err && movies.length === 0 && (
        <p className="opacity-70 mt-4">Sin resultados.</p>
      )}
    </main>
  );
}

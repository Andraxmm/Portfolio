import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../MiniApps/BuscadorPeliculas/Api.js";
import MovieCard from "../MiniApps/BuscadorPeliculas/MovieCard.jsx";
import { Link } from "react-router-dom";


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
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

   // 👇 EFECTO: scroll al top cuando se monta el componente
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Al montar: si hay ?q= usa búsqueda; si no, carga tendencias
  useEffect(() => {
    const q = searchParams.get("q")?.trim() || "";
    if (q) {
      setQuery(q);
      doSearch(q);
    } else {
      loadTrending();
    }

    loadGenres();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadGenres() {
    try {
      const data = await api("/genre/movie/list");
      setGenres(data.genres || []);
    } catch (e) {
      console.error("Error al cargar géneros", e);
    }
  }

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
 setSearchParams(q ? { q } : {});
  if (!q) return loadTrending();
  doSearch(q);
}


  // Filtrado por género (si hay uno seleccionado)
  const filteredMovies = selectedGenre
    ? movies.filter((m) => m.genre_ids?.includes(Number(selectedGenre)))
    : movies;

  return (
    
    <main className="container-p py-8">
      <h1 className="text-2xl font-bold mb-4">🎬 Buscador de Películas</h1>
       <Link to="/favoritos" className="btn-outline mb-4 inline-block">
        ❤️ Ver Favoritos
      </Link>

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

      {/* Filtro de género (solo si hay pelis) */}
      {movies.length > 0 && (
        <div className="mb-6">
          <label className="font-medium mr-2">Filtrar por género:</label>
          <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="p-2 rounded border border-white/20 bg-white/10
                    text-black dark:text-white bg-white dark:bg-slate-800"
        >

            <option value="">Todos</option>
            {genres.map((g) => (
              <option key={g.id} value={g.id}>{g.name}</option>
            ))}
          </select>
        </div>
      )}

      {/* Estados */}
      {err && <p className="text-red-400 mb-4">{err}</p>}

      {/* Grid */}
      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))" }}
      >
        {loading
          ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
          : filteredMovies.map((m) => <MovieCard key={m.id} movie={m} to />)}
      </div>

      {/* Vacío (cuando no hay error ni loading) */}
      {!loading && !err && filteredMovies.length === 0 && (
        <p className="opacity-70 mt-4">Sin resultados.</p>
      )}
    </main>
  );
}

import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import api from "../Api.js"; 
import MovieCard from "../MovieCard.jsx"; 

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
  // --- estado/lógica original ---
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  // EFECTO 1: Scroll (se ejecuta solo al montar, sin condiciones)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); 

  // EFECTO 2: Carga de datos inicial (se ejecuta solo al montar, sin condiciones)
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
      const data = await api("genre/movie/list");
      setGenres(data.genres || []);
    } catch (e) {
      console.error("Error al cargar géneros", e);
    }
  }

  async function loadTrending() {
    try {
      setLoading(true);
      setErr("");
      const data = await api("trending/movie/week");
      setMovies(data?.results || []);
    } catch (e) {
      console.error(e);
      setErr("No se pudieron cargar las tendencias. " + (e?.message || e));
    } finally {
      setLoading(false);
    }
  }

  async function doSearch(q) {
    try {
      setLoading(true);
      setErr("");
      const data = await api(`search/movie?query=${encodeURIComponent(q)}`);
      setMovies(data?.results || []);
    } catch (e) {
      console.error(e);
      setErr("No se pudo buscar. " + (e?.message || e));
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

  const filteredMovies = selectedGenre
    ? movies.filter((m) => m.genre_ids?.includes(Number(selectedGenre)))
    : movies;

  // 4) Render normal para todas las pantallas
  return (
    <>
      <Link
        to="/"
        className="btn-outline fixed top-4 left-4 z-50 px-3 py-1.5 text-sm"
        aria-label="Volver al portfolio"
      >
        ← Volver al portfolio
      </Link>

      <main className="container-p pt-20 sm:pt-8 pb-8"> {/* pt-20 evita superposición en móvil */}
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
          <button type="submit" className="btn">
            Buscar
          </button>
        </form>

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
                <option key={g.id} value={g.id}>
                  {g.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {err && <p className="text-red-400 mb-4">{err}</p>}

        {/* USO DE GRID con tamaño ajustado para móvil y escritorio */}
        <div
          className="grid gap-4"
          // Usamos una variable CSS para el tamaño mínimo del grid y la redefinimos en móvil (max 640px)
          // Desktop/Tablet: minmax(220px, 1fr)
          // Mobile (hasta 640px): minmax(180px, 1fr)
          style={{ 
            gridTemplateColumns: "repeat(auto-fill, minmax(var(--card-min-size, 280px), 1fr))" 
          }}
        >
          {/* Estilo CSS simple para forzar el tamaño de tarjeta en móvil */}
          <style jsx="true">{`
            @media (max-width: 639px) {
              .grid {
                --card-min-size: 160px; /* Tamaño un poco más pequeño para móvil */
              }
            }
          `}</style>

          {loading
            ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
            : filteredMovies.map((m) => <MovieCard key={m.id} movie={m} to />)}
        </div>

        {!loading && !err && filteredMovies.length === 0 && (
          <p className="opacity-70 mt-4">Sin resultados.</p>
        )}
      </main>
    </>
  );
}

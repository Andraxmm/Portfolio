// src/BuscadorPeliculas/pages/MoviesPage.jsx
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
  // 1) Detectar móvil (sm < 640px)
  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 639px)").matches;

  /*** BLOQUE MÓVIL: aviso de mantenimiento ***/
  const MobileMaintenance = () => (
    <>
      <Link to="/" className="btn-outline fixed top-4 left-4 z-50 px-3 py-1.5 text-sm">
        ← Volver al portfolio
      </Link>

      <main className="container-p py-16 text-center">
        <h1 className="text-2xl font-extrabold mb-3">🎬 Buscador de Películas</h1>
        <p className="text-slate-600 dark:text-slate-300">
          Estamos <b>mejorando la versión móvil</b> de este buscador.
          <br /> Prueba desde un ordenador o vuelve más tarde. 💫
        </p>
        <Link to="/" className="btn mt-6">Volver</Link>
      </main>
    </>
  );

  // --- estado/lógica original ---
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  // 2) Evitar efectos/red en móvil
  useEffect(() => {
    if (isMobile) return;
    window.scrollTo(0, 0);
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) return;
    const q = searchParams.get("q")?.trim() || "";
    if (q) { setQuery(q); doSearch(q); } else { loadTrending(); }
    loadGenres();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

async function loadGenres() {
  try {
    const data = await api("genre/movie/list"); // sin params extra
    setGenres(data.genres || []);
  } catch (e) {
    console.error("Error al cargar géneros", e);
  }
}

async function loadTrending() {
  try {
    setLoading(true);
    setErr("");
    const data = await api("trending/movie/week"); // sin params extra
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
    const data = await api("search/movie", null, { query: q }); // ✅ pasa query en params
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

  // 3) En móvil: devolver solo el aviso (sin montar la UI de PC)
  if (isMobile) return <MobileMaintenance />;

  // 4) En tablet/PC: render normal
  return (
    <>
      <Link
        to="/"
        className="btn-outline fixed top-4 left-4 z-50 px-3 py-1.5 text-sm"
        aria-label="Volver al portfolio"
      >
        ← Volver al portfolio
      </Link>

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

        {err && <p className="text-red-400 mb-4">{err}</p>}

        <div
          className="grid gap-4"
          style={{ gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))" }}
        >
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

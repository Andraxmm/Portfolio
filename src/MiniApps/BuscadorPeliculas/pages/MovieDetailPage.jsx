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
  /*** 1) Detección REACTIVA de móvil (≤639px) ***/
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" && window.matchMedia("(max-width: 639px)").matches
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 639px)");
    const handler = () => setIsMobile(mq.matches);
    mq.addEventListener
      ? mq.addEventListener("change", handler)
      : mq.addListener(handler);
    return () => {
      mq.removeEventListener
        ? mq.removeEventListener("change", handler)
        : mq.removeListener(handler);
    };
  }, []);

  /*** 2) BLOQUE MÓVIL: aviso de mantenimiento ***/
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

  /*** 3) Estado y lógica original (solo si no es móvil) ***/
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (isMobile) return;
    window.scrollTo(0, 0);
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) return;
    const q = searchParams.get("q")?.trim() || "";
    if (q) {
      setQuery(q);
      doSearch(q);
    } else {
      loadTrending();
    }
    loadGenres();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

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

  /*** 4) Si es móvil → solo aviso ***/
  if (isMobile) return <MobileMaintenance />;

  /*** 5) En tablet/PC → render completo ***/
  return (
    <>
      <Link
        to="/"
        className="btn-outline fixed top-4 left-4 z-50 px-3 py-1.5 text-sm"
        aria-label="Volver al portfolio"
      >
        ← Volver al portfolio
      </Link>

      <main className="container-p py-6 sm:py-8">
  <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
    🎬 Buscador de Películas
  </h1>

  <Link
    to="/favoritos"
    className="btn-outline mb-4 inline-block text-sm sm:text-base px-3 sm:px-4 py-1.5 sm:py-2"
  >
    ❤️ Ver Favoritos
  </Link>

  <form
    onSubmit={onSubmit}
    className="flex flex-col sm:flex-row gap-2 mb-5 sm:mb-6"
    role="search"
  >
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Buscar película..."
      className="flex-1 px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl bg-white/5 border border-slate-300/40 outline-none focus:border-indigo-400 dark:bg-slate-800 dark:border-slate-700 text-sm sm:text-base"
      aria-label="Buscar película"
    />
    <button
      type="submit"
      className="btn px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base"
    >
      Buscar
    </button>
  </form>

  {movies.length > 0 && (
    <div className="mb-4 sm:mb-6">
      <label className="font-medium mr-2 text-sm sm:text-base">
        Filtrar por género:
      </label>
      <select
        value={selectedGenre}
        onChange={(e) => setSelectedGenre(e.target.value)}
        className="p-2 rounded border border-white/20 bg-white/10 text-sm sm:text-base text-black dark:text-white bg-white dark:bg-slate-800"
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

  <div
    className="grid gap-3 sm:gap-4"
    style={{
      gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
    }}
  >
    {loading
      ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
      : filteredMovies.map((m) => <MovieCard key={m.id} movie={m} to />)}
  </div>

  {!loading && !err && filteredMovies.length === 0 && (
    <p className="opacity-70 mt-4 text-sm sm:text-base">Sin resultados.</p>
  )}
</main>

    </>
  );
}

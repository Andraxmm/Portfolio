import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../Projects/BuscadorPeliculas/api.js";

const IMG = "https://image.tmdb.org/t/p/w500";

export default function MovieDetailPage() {
  const { id } = useParams(); // 👈 saca el id de la URL
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setErr("");
        const data = await api(`/movie/${id}`);
        setMovie(data);
      } catch (error) {
        console.error(error);
        setErr("Error al cargar la película.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) return <p className="p-4">Cargando…</p>;
  if (err) return <p className="p-4 text-red-500">{err}</p>;
  if (!movie) return null;

  return (
    <main className="container-p py-8">
      <Link to="/peliculas" className="btn-outline mb-4 inline-block">← Volver</Link>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Imagen */}
        {movie.poster_path && (
          <img
            src={IMG + movie.poster_path}
            alt={`Póster de ${movie.title}`}
            className="rounded-lg shadow-lg"
          />
        )}

        {/* Info */}
        <div>
          <h1 className="text-3xl font-bold">{movie.title}</h1>
          <p className="opacity-70 mb-2">{movie.release_date} · {movie.runtime} min</p>

          {movie.genres && (
            <p className="mb-4">
              {movie.genres.map((g) => g.name).join(", ")}
            </p>
          )}

          <p>{movie.overview}</p>
        </div>
      </div>
    </main>
  );
}

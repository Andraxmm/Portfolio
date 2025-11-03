import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../Api.js';

const IMG = 'https://image.tmdb.org/t/p/w500';

export default function MovieDetailPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setErr('');

        const [movieData, videoData] = await Promise.all([
          api(`/movie/${id}`),
          api(`/movie/${id}/videos`),
        ]);

        setMovie(movieData);

        const trailer = videoData.results.find(
          (v) => v.type === 'Trailer' && v.site === 'YouTube'
        );
        setVideo(trailer);
      } catch (error) {
        console.error(error);
        setErr('Error al cargar la película.');
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
      <Link to="/peliculas" replace className="btn-outline mb-4 inline-block">
        ← Volver
      </Link>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Imagen */}
        {movie.poster_path && (
          <img
            src={IMG + movie.poster_path}
            alt={`Póster de ${movie.title}`}
            className="rounded-lg shadow-lg w-full max-w-[280px] sm:max-w-[320px] md:max-w-full h-auto object-cover mx-auto"
          />
        )}

        {/* Info */}
        <div className="flex flex-col justify-start">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">{movie.title}</h1>
          <p className="opacity-70 mb-2 text-sm sm:text-base">
            {movie.release_date} · {movie.runtime} min
          </p>

          {movie.vote_average > 0 && (
            <p className="mb-2 text-sm sm:text-base">
              <strong>Rating:</strong> ⭐ {movie.vote_average.toFixed(1)} / 10
            </p>
          )}

          {movie.genres?.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {movie.genres.map((g) => (
                <span
                  key={g.id}
                  className="px-2 py-1 text-xs sm:text-sm bg-indigo-100 text-indigo-800 dark:bg-indigo-800 dark:text-white rounded"
                >
                  {g.name}
                </span>
              ))}
            </div>
          )}

          {movie.overview && (
            <p className="mb-4 opacity-90 text-sm sm:text-base">
              {movie.overview}
            </p>
          )}

          {video && (
            <a
              href={`https://www.youtube.com/watch?v=${video.key}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn self-start"
            >
              Ver tráiler en YouTube
            </a>
          )}
        </div>
      </div>
    </main>
  );
}

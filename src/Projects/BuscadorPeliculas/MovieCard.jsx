import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const IMG = "https://image.tmdb.org/t/p/w342";
const LS_KEY = "favMovies";

export default function MovieCard({ movie, to }) {
  const { id, title, release_date, poster_path, overview } = movie;
  const year = release_date?.slice(0, 4) ?? "—";
  const img = poster_path ? IMG + poster_path : null;

  const [isFav, setIsFav] = useState(false);

  // Leer favoritos al cargar
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(LS_KEY)) || [];
    setIsFav(stored.includes(id));
  }, [id]);

  // Alternar favorito
  function toggleFavorite(e) {
    e.preventDefault(); // para que no se active el <Link>

    const stored = JSON.parse(localStorage.getItem(LS_KEY)) || [];
    let updated;

    if (stored.includes(id)) {
      updated = stored.filter((favId) => favId !== id);
    } else {
      updated = [...stored, id];
    }

    localStorage.setItem(LS_KEY, JSON.stringify(updated));
    setIsFav(updated.includes(id));
  }

  const card = (
    <article
      className="relative flex flex-col rounded-xl overflow-hidden bg-white/5
                 border border-slate-300 dark:border-white/10
                 hover:border-indigo-400/50 hover:shadow-lg transition h-full"
    >
      {/* Botón de favorito */}
      <button
        onClick={toggleFavorite}
        className="absolute top-2 right-2 text-2xl drop-shadow-md"
        title={isFav ? "Quitar de favoritos" : "Añadir a favoritos"}
        aria-label={isFav ? "Quitar de favoritos" : "Añadir a favoritos"}
      >
        {isFav ? "❤️" : "🤍"}
      </button>

      {/* Imagen */}
      {img ? (
        <img
          src={img}
          alt={`Póster de ${title}`}
          className="w-full aspect-[2/3] object-cover"
          loading="lazy"
        />
      ) : (
        <div className="w-full aspect-[2/3] grid place-items-center text-sm opacity-70">
          Sin póster
        </div>
      )}

      {/* Texto */}
      <div className="p-3 flex flex-col flex-grow">
        <h3 className="font-semibold leading-tight line-clamp-2">{title}</h3>
        <p className="text-xs opacity-70">{year}</p>
        {overview && (
          <p className="text-sm mt-2 opacity-80 line-clamp-3">
            {overview}
          </p>
        )}
      </div>
    </article>
  );

  return to ? (
    <Link to={typeof to === "string" ? to : `/peliculas/${id}`}>{card}</Link>
  ) : (
    card
  );
}

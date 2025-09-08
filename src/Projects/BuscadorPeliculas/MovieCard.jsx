import { Link } from "react-router-dom";

const IMG = "https://image.tmdb.org/t/p/w342";

export default function MovieCard({ movie, to }) {
  const { id, title, release_date, poster_path, overview } = movie;
  const year = release_date?.slice(0, 4) ?? "—";
  const img = poster_path ? IMG + poster_path : null;

  const card = (
    <article className="rounded-xl overflow-hidden bg-white/5 border border-white/10
                        hover:border-indigo-400/50 hover:shadow-lg transition">
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
      <div className="p-3">
        <h3 className="font-semibold leading-tight">{title}</h3>
        <p className="text-xs opacity-70">{year}</p>
        {overview && (
          <p className="text-sm mt-2 opacity-80">
            {overview.length > 140 ? overview.slice(0, 140) + "…" : overview}
          </p>
        )}
      </div>
    </article>
  );

  // Si pasas "to", convierte la card en enlace (útil para detalle más adelante)
  return to ? (
  <Link to={typeof to === "string" ? to : `/peliculas/${id}`} replace>
    {card}
  </Link>
) : card;

}

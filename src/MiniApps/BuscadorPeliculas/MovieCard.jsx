import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const IMG = 'https://image.tmdb.org/t/p/w342'; //base URL de posters de TMDB
const LS_KEY = 'favMovies'; //clave única en localStorage donde se guardan IDs favoritos

export default function MovieCard({ movie, to }) {
  const { id, title, release_date, poster_path, overview } = movie;
  const year = release_date?.slice(0, 4) ?? '—';
  const img = poster_path ? IMG + poster_path : null; //arma la URL del póster si existe; si no, null para mostrar un placeholder.

  const [isFav, setIsFav] = useState(false); //hook para favorito

  // Leer favoritos al cargar
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(LS_KEY)) || []; //Lee los favoritos guardados en localStorage (clave favMovies). (si no hay, usa [])
    setIsFav(stored.includes(id)); //Marca la card como favorita si el id está en ese array.
  }, [id]); //Se ejecuta al montar y cuando cambie el id

  // Alternar favorito
  function toggleFavorite(e) {
    e.preventDefault(); // para que no se active el <Link>
    e.stopPropagation(); // detiene propagación click

    const stored = JSON.parse(localStorage.getItem(LS_KEY)) || [];
    let updated;

    if (stored.includes(id)) {
      //comprueba si esta peli ya es favorita.
      updated = stored.filter((favId) => favId !== id); //Si ya está → creamos un nuevo array sin ese id (inmutabilidad con filter).
    } else {
      updated = [...stored, id]; //Si no está → creamos un nuevo array añadiendo el id (inmutabilidad con spread)
    }

    localStorage.setItem(LS_KEY, JSON.stringify(updated));
    setIsFav(updated.includes(id)); //Actualizamos el estado local isFav inmediatamente según el array final
  }

  const card = (
    <article
      className="relative flex flex-col rounded-xl overflow-hidden bg-white/5
                 border border-slate-300 dark:border-white/10
                 hover:border-indigo-400/50 hover:shadow-lg transition h-full
                 max-w-[280px] sm:max-w-[320px] md:max-w-full mx-auto"
      /* Limita ancho en móvil, mantiene full width en desktop */
    >
      {/* Botón de favorito */}
      <button
        onClick={toggleFavorite}
        className="absolute top-2 right-2 text-xl sm:text-2xl drop-shadow-md"
        title={isFav ? 'Quitar de favoritos' : 'Añadir a favoritos'}
        aria-pressed={isFav} //mejora accesibilidad
      >
        {isFav ? '❤️' : '🤍'}
      </button>

      {/* Imagen */}
      {img ? (
        <img
          src={img}
          alt={`Póster de ${title}`}
          className="w-full aspect-[2/3] object-cover" //aspect-[2/3] mantiene proporción uniforme aunque la imagen tarde en cargar
          loading="lazy" //ahorra red y acelera.
        />
      ) : (
        <div className="w-full aspect-[2/3] grid place-items-center text-xs sm:text-sm opacity-70">
          Sin póster
        </div>
      )}

      {/* Texto */}
      <div className="p-3 flex flex-col flex-grow">
        <h3 className="font-semibold leading-tight text-sm sm:text-base line-clamp-2">
          {title}
        </h3>{' '}
        {/*line-clamp-2 recorta el título para que todas las cards tengan alturas parejas*/}
        <p className="text-xs opacity-70">{year}</p>
        {overview && (
          <p className="text-xs sm:text-sm mt-2 opacity-80 line-clamp-3">
            {overview}{' '}
            {/*line-clamp-3 recorta la descripción para uniformidad*/}
          </p>
        )}
      </div>
    </article>
  );

  return to ? (
    <Link to={typeof to === 'string' ? to : `/peliculas/${id}`}>{card}</Link>
  ) : (
    card
  );
}

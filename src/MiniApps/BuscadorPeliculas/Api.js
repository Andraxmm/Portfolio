// src/MiniApps/BuscadorPeliculas/Api.js

const BASE = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

/**
 * Hace fetch a TMDB usando API key v3 (seguro para frontend)
 *
 * @param {string} path - ruta dentro de TMDB, por ejemplo "trending/movie/week"
 * @param {AbortSignal} signal - opcional, para cancelar fetch
 * @param {object} params - opcional, parámetros extra para la query
 * @returns {Promise<any>} datos de TMDB
 */
export default async function api(path, signal, params = {}) {
  const url = new URL(`${BASE}/${path}`);

  // Agregar API key
  url.searchParams.set("api_key", API_KEY);

  // Forzar idioma español si no se envía
  if (!url.searchParams.has("language")) url.searchParams.set("es-ES");

  // Agregar parámetros extra
  Object.keys(params).forEach((key) => url.searchParams.set(key, params[key]));

  const res = await fetch(url.toString(), { signal });

  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`TMDB ${res.status}: ${url.toString()} — ${txt || res.statusText}`);
  }

  return res.json();
}

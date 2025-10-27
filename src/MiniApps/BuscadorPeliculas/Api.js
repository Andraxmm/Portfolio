// src/BuscadorPeliculas/Api.js

const BASE = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

/**
 * Construye la URL completa de TMDB
 * @param {string} path - ruta dentro de TMDB
 * @param {object} params - parámetros extra de query
 * @returns {URL} url completa
 */
function buildUrl(path, params = {}) {
  const clean = String(path || '').replace(/^\/+/, '');
  const url = new URL(`${BASE}/${clean}`);

  // Forzar idioma español si no se especifica
  if (!url.searchParams.has('language'))
    url.searchParams.set('language', 'es-ES');

  // Agregar API key
  url.searchParams.set('api_key', API_KEY);

  // Agregar parámetros extra correctamente
  Object.keys(params).forEach((key) => {
    url.searchParams.set(key, params[key]);
  });

  return url;
}

/**
 * Fetch a TMDB usando API key v3
 * @param {string} path - ruta de TMDB
 * @param {AbortSignal} signal - opcional para cancelar fetch
 * @param {object} params - opcional, parámetros extra
 * @returns {Promise<any>} datos de TMDB
 */
export default async function api(path, signal, params = {}) {
  if (!API_KEY)
    throw new Error('NO_API_KEY: Revisa tu .env o Vercel env variables');

  const url = buildUrl(path, params);

  // Logs de dev opcionales
  if (import.meta.env.DEV) {
    console.log('[TMDB] URL:', url.toString());
    console.log('[TMDB] API_KEY disponible:', !!API_KEY);
  }

  const res = await fetch(url.toString(), {
    method: 'GET',
    headers: { accept: 'application/json' },

    signal,
  });

  if (!res.ok) {
    const txt = await res.text().catch(() => '');
    throw new Error(
      `TMDB ${res.status}: ${url.toString()} :: ${txt || res.statusText}`
    );
  }

  return res.json();
}

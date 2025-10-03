// src/BuscadorPeliculas/Api.js
const BASE = "https://api.themoviedb.org/3";

// ⚠️ Usa el READ ACCESS TOKEN v4 (no la api_key v3). Ponlo en .env y reinicia Vite.
// VITE_TMDB_READ_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
const READ_TOKEN = import.meta.env.VITE_TMDB_READ_TOKEN;

export default async function api(path, signal) {
  const url = new URL(BASE + path);

  // Si quieres seguir forzando idioma por defecto:
  if (!url.searchParams.has("language")) url.searchParams.set("language", "es-ES");

  const res = await fetch(url.toString(), {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${READ_TOKEN}`,
    },
    signal,
  });

  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`TMDB ${res.status}: ${txt || res.statusText}`);
  }
  return res.json();
}

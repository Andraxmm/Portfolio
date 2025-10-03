// src/BuscadorPeliculas/Api.js
const BASE = "https://api.themoviedb.org/3";
const READ_TOKEN = import.meta.env.VITE_TMDB_READ_TOKEN;

export default async function api(path, signal) {
  // Une bien BASE + path aunque falte la barra
  const url = new URL(path, BASE);

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
    throw new Error(`TMDB ${res.status}: ${txt || res.statusText} — ${url.toString()}`);
  }
  return res.json();
}

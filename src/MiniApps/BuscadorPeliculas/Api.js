// src/BuscadorPeliculas/Api.js
const BASE = "https://api.themoviedb.org/3";
const READ_TOKEN = import.meta.env.VITE_TMDB_READ_TOKEN;

export default async function api(path, signal) {
  // 1) Quita barras iniciales del path
  const clean = String(path || "").replace(/^\/+/, "");
  // 2) Une siempre con /3/ para no perderlo
  const url = `${BASE}/${clean}`;

  // (opcional) fuerza idioma si no lo trae
  const u = new URL(url);
  if (!u.searchParams.has("language")) u.searchParams.set("language", "es-ES");

  // (debug opcional)
  // console.log("TMDB →", u.toString());

  const res = await fetch(u.toString(), {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${READ_TOKEN}`,
    },
    signal,
  });

  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`TMDB ${res.status}: ${u.toString()} — ${txt || res.statusText}`);
  }
  return res.json();
}

const BASE = "https://api.themoviedb.org/3";
const KEY = import.meta.env.VITE_TMDB_API_KEY;

export default async function api(path, signal) {
    const url = new URL(BASE + path);
  url.searchParams.set("api_key", KEY);
  url.searchParams.set("language", "es-ES");

  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`TMDB ${res.status}`);
  return res.json();
}  

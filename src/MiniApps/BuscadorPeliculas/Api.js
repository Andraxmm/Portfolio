// src/BuscadorPeliculas/Api.js
const BASE = "https://api.themoviedb.org/3";
const READ_TOKEN = import.meta.env.VITE_TMDB_READ_TOKEN;  // v4
const API_KEY    = import.meta.env.VITE_TMDB_API_KEY;     // v3 (opcional)

function buildUrl(path) {
  const clean = String(path || "").replace(/^\/+/, "");  // quita / iniciales
  const url = new URL(`${BASE}/${clean}`);
  if (!url.searchParams.has("language")) url.searchParams.set("language", "es-ES");
  return url;
}

async function fetchWithBearer(url, signal) {
  if (!READ_TOKEN) throw new Error("NO_BEARER_TOKEN");
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
    throw new Error(`BEARER_FAIL ${res.status} ${url.toString()} :: ${txt || res.statusText}`);
  }
  return res.json();
}

async function fetchWithApiKey(url, signal) {
  if (!API_KEY) throw new Error("NO_API_KEY");
  url.searchParams.set("api_key", API_KEY); // sin Authorization → sin preflight CORS
  const res = await fetch(url.toString(), {
    method: "GET",
    headers: { accept: "application/json" },
    signal,
  });
  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`APIKEY_FAIL ${res.status} ${url.toString()} :: ${txt || res.statusText}`);
  }
  return res.json();
}

export default async function api(path, signal) {
  const url = buildUrl(path);

  // Logs de diagnóstico (útiles en el móvil con inspección remota)
  if (import.meta.env.DEV) {
    console.log("[TMDB] URL:", url.toString());
    console.log("[TMDB] Tokens → Bearer:", !!READ_TOKEN, " API_KEY:", !!API_KEY);
  }

  try {
    return await fetchWithBearer(url, signal);
  } catch (e) {
    // Si falla por CORS/red o token, intenta con api_key (si existe)
    const msg = String(e);
    const canFallback =
      msg.includes("BEARER_FAIL") ||
      msg.includes("TypeError") ||
      msg.includes("NetworkError") ||
      msg.includes("Failed to fetch");
    if (canFallback && API_KEY) {
      if (import.meta.env.DEV) console.warn("[TMDB] Bearer falló, probando con api_key…");
      return await fetchWithApiKey(url, signal);
    }
    throw e;
  }
}

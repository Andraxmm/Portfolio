//Define la URL base para todas las peticiones a la API de TMDB
const BASE = "https://api.themoviedb.org/3";

//Toma la clave secreta (API Key) desde el archivo .env 
const KEY = import.meta.env.VITE_TMDB_API_KEY;

//path: es el fragmento final del endpoint que quieres consultar. Ejemplo: `/search/movie?query=batman`
//signal: es una señal para cancelar la petición si es necesario
export default async function api(path, signal) {
    const url = new URL(BASE + path);
  url.searchParams.set("api_key", KEY);     //api_key: sin esto, TMDB rechaza la petición.
  url.searchParams.set("language", "es-ES"); 

  const res = await fetch(url, { signal }); //hacemos la petición a la URL completa. El lsignal sirve para poder cancelar la petición con un AbortController
  if (!res.ok) throw new Error(`TMDB ${res.status}`); //Si la respuesta no es OK (por ejemplo 404, 401...), lanza un error personalizado
  return res.json(); //Convierte la respuesta a JSON (objeto JS) y la devuelve.
}  

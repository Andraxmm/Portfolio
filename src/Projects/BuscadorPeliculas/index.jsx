import { useState } from "react";
import api from "./api";


export default function BuscadorPeliculas() {
  // 1️⃣ Hooks de estado y efectos
const [query, setQuery] = useState('');
const[movies, setMovies] = useState([]);



// 2️⃣ Funciones internas que usarán esos estados
async function handleSearch(e) {
    e.preventDefault();
    if(!query.trim()) return;
    try {
        const data = await api(`/search/movie?query=${encodeURIComponent(query)}`);
        setMovies(data.results || []);
    } catch (error) {
        console.error(error);
    }
}

 // 3️⃣ Return (lo que se renderiza en pantalla)
 return (
    <section>
        <h2>Buscador de Películas</h2>
        <form onSubmit={handleSearch}>
            <input value={query}
            onChange={(e) => setQuery(e.target.value)} 
            placeholder='Escribe un título...'/>
            <button type="submit">Buscar</button>
        </form>
        
         <ul>
        {movies.map((m) => (
          <li key={m.id}>{m.title}</li>
        ))}
      </ul>
    </section>
  );
}
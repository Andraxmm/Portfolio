import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import MoviesPage from './pages/MoviesPage.jsx'   // 👈 la crearás ahora
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Ruta principal: tu portfolio */}
        <Route path="/" element={<App />} />

        {/* Ruta extra: página de películas */}
        <Route path="/peliculas" element={<MoviesPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)

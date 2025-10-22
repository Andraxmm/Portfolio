import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import MoviesPage from './MiniApps/BuscadorPeliculas/pages/MoviesPage.jsx';
import './index.css';
import MovieDetailPage from './MiniApps/BuscadorPeliculas/pages/MovieDetailPage.jsx';
import FavoritesPage from './MiniApps/BuscadorPeliculas/pages/FavoritesPage.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/peliculas" element={<MoviesPage />} />
        <Route path="/peliculas/:id" element={<MovieDetailPage />} />
        <Route path="/favoritos" element={<FavoritesPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

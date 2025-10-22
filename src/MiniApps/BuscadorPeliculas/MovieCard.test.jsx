import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import MovieCard from './MovieCard';

const mockMovie = {
  id: 1,
  title: 'Mi Película',
  release_date: '2023-10-01',
  poster_path: '/rutaDelPoster.jpg',
  overview: 'Una película de prueba.',
};

describe('MovieCard', () => {
  it('renderiza título y año de la película', () => {
    render(<MovieCard movie={mockMovie} />);
    // 🔍 Esto comprueba el título
    expect(screen.getByText('Mi Película')).toBeInTheDocument();
    // 🗓️ Esto comprueba solo el año
    expect(screen.getByText('2023')).toBeInTheDocument();
  });
});

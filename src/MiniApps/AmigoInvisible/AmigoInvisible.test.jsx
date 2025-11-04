/* eslint-disable */
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AmigoInvisible from './AmigoInvisible';
import { expect } from "vitest";

describe('AmigoInvisible Component', () => {

  // 1. Test: Render inicial
  it('renderiza el título y los botones principales al cargar', () => {
    // Arrange — Renderizamos el componente
    render(<AmigoInvisible />);

    // Assert — Verificamos elementos base
    expect(screen.getByRole('heading', { name: /amigo invisible/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /ir a vista organizador/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /ir a vista reveal/i })).toBeInTheDocument();
  });

 // 2. Test: Agregar participante
  it("permite agregar un participante y mostrarlo en la lista", async () => {
    // Arrange
    render(<AmigoInvisible />);

    const organizadorBtn = await screen.findByRole('button', { name: /ir a vista organizador/i });
    fireEvent.click(organizadorBtn);

    const input = screen.getByLabelText(/nombre del participante/i);
    const agregarBtn = screen.getByRole('button', { name: /agregar participante/i });

    // Act — Simulamos acción del usuario
    fireEvent.change(input, { target: { value: "Adrián" } });
    fireEvent.click(agregarBtn);

    // Assert — Verificamos que se muestre el nuevo participante
    expect(screen.getByText('Adrián')).toBeInTheDocument();
  });


  // 3. Test: No permite nombres duplicados
  it("no permite agregar un participante duplicado", async () => {
    // Arrange
    render(<AmigoInvisible />);

    const organizadorBtn = await screen.findByRole('button', { name: /ir a vista organizador/i });
    fireEvent.click(organizadorBtn);

    const input = screen.getByLabelText(/nombre del participante/i);
    const agregarBtn = screen.getByRole('button', { name: /agregar participante/i });

    // Act — Intentamos agregar el mismo nombre dos veces
    fireEvent.change(input, { target: { value: "Lucía" } });
    fireEvent.click(agregarBtn);

    fireEvent.change(input, { target: { value: "Lucía" } });
    fireEvent.click(agregarBtn);

    // Assert — Debe aparecer solo una vez
    const participantes = screen.getAllByText('Lucía');
    expect(participantes).toHaveLength(1);
  });


  // 4. Cambiar a vista organizador
  it("cambia a la vista de organizador al hacer clic en el botón correspondiente", async () => {
    // Arrange
    render(<AmigoInvisible />);

    // Act
    const organizadorBtn = await screen.findByRole("button", { name: /ir a vista organizador/i });
    fireEvent.click(organizadorBtn);

    // Assert
    expect(screen.getByText(/agregar/i)).toBeInTheDocument(); // muestra vista organizador
    expect(screen.queryByRole("button", { name: /ir a vista organizador/i })).not.toBeInTheDocument(); // ya no muestra el botón
  });

});
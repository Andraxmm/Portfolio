/* eslint-disable */
import { render, screen, fireEvent } from "@testing-library/react";
import AmigoInvisible from './AmigoInvisible';
import { expect } from "vitest";

describe('AmigoInvisible Component,', () => { 
    it("permite agregar un participante y mostrarlo en la lista", async() => {
        render(<AmigoInvisible />);

        const organizadorBtn = await screen.findByRole('button', {name: /ir a vista organizador/i });
        fireEvent.click(organizadorBtn);

        const input = screen.getByLabelText(/nombre del participante/i);
        const agregarBtn = screen.getByRole('button', { name: /agregar participante/i});

        fireEvent.change(input, { target: { value: "Adrián" } });
        fireEvent.click(agregarBtn);

        expect(screen. getByText('Adrián')).toBeInTheDocument();
    });
});



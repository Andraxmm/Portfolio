import { useState } from 'react';

export default function AmigoInvisible() {
  const [participantes, setParticipantes] = useState([]);
  const [asignaciones, setAsignaciones] = useState([]);
  const [nombre, setNombre] = useState('');
  const [Amigo, setAmigo] = useState('');

  return (
    <>
      <input
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Nombre del participante"
      />
      <button
        onClick={() => {
          if (nombre && !participantes.includes(nombre)) {
            setParticipantes([...participantes, nombre]);
            setNombre('');
          }
        }}
      >
        Agregar
      </button>
      <ul>
        {participantes.map((p, i) => (
          <li key={i}>{p}</li>
        ))}
      </ul>
    </>
  );
}

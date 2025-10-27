import { useState } from 'react';

export default function AmigoInvisible() {
  const [participantes, setParticipantes] = useState([]);
  const [asignaciones, setAsignaciones] = useState([]);

  return (
    <div className="p-3 bg-indigo-50 rounded-lg text-center">
      Mini App Amigo Invisible
    </div>
  );
}

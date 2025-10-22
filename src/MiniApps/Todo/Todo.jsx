import { useState, useMemo, useCallback } from 'react';
import TodoItem from './TodoItem.jsx';

// Identificador único (ID) para cada nueva tarea.
function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

export default function Todo() {
  const [filtro, setFiltro] = useState('all');
  const [text, setText] = useState('');
  const [lista, setLista] = useState([
    { id: uid(), text: 'Hacer la compra', done: false },
    { id: uid(), text: 'Hacer ejercicio', done: false },
    { id: uid(), text: 'Pasear al perro', done: false },
  ]);

  // Contadores memorizados
  const contadores = useMemo(() => {
    const total = lista.length;
    const hechas = lista.filter((item) => item.done).length;
    const pendientes = total - hechas;
    return { total, hechas, pendientes };
  }, [lista]);

  const handleChange = (e) => setText(e.target.value);

  const handleAdd = (e) => {
    e.preventDefault();
    if (text.trim() === '') return;
    const newItem = { id: uid(), text, done: false };
    setLista((currentList) => [...currentList, newItem]);
    setText('');
  };

  const Eliminar = useCallback((id) => {
    setLista((currentList) => currentList.filter((l) => l.id !== id));
  }, []);

  const handleDone = useCallback((id) => {
    setLista((currentList) =>
      currentList.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    );
  }, []);

  const EliminarCompletadas = useCallback(() => {
    setLista((currentList) => currentList.filter((item) => !item.done));
  }, []);

  // Lista filtrada memorizada
  const listaFiltrada = useMemo(() => {
    return lista.filter((item) => {
      if (filtro === 'done') return item.done;
      if (filtro === 'active') return !item.done;
      return true;
    });
  }, [lista, filtro]);

  return (
    <div
      className="
        w-full max-w-[360px] sm:max-w-xl mx-auto
        p-3 sm:p-4 border rounded-xl shadow-sm
        bg-white dark:bg-slate-800
      "
    >
      {/* Resumen */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 flex gap-3">
          <span>
            Total: <b>{contadores.total}</b>
          </span>
          <span>
            Hechas: <b>{contadores.hechas}</b>
          </span>
          <span>
            Pendientes: <b>{contadores.pendientes}</b>
          </span>
        </div>
      </div>

      {/* Formulario: columna en móvil, fila en sm+ */}
      <form
        onSubmit={handleAdd}
        className="mt-4 flex flex-col sm:flex-row gap-2 sm:gap-3"
      >
        <input
          type="text"
          placeholder="hacer las tareas..."
          value={text}
          onChange={handleChange}
          className="
            flex-1 min-w-0
            px-3 py-2
            text-sm sm:text-base
            border rounded-lg
            bg-white dark:bg-slate-900
            dark:border-slate-700
            text-slate-800 dark:text-slate-100
            placeholder:text-slate-400
            focus:outline-none focus:ring-2 focus:ring-brand/50
          "
        />
        <button
          type="submit"
          disabled={text.trim() === ''}
          className="
            self-end sm:self-auto                /* en móvil se alinea al final de la columna */
            inline-flex items-center justify-center
            gap-1 rounded-lg bg-brand text-white
            px-3 py-2 text-sm sm:px-4 sm:text-base
            w-auto min-w-0 whitespace-nowrap     /* 🔹 no se alarga en móvil */
            hover:opacity-90 transition
            disabled:opacity-40 disabled:cursor-not-allowed
          "
        >
          Añadir
        </button>
      </form>

      {/* Filtros */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        {[
          { id: 'all', label: 'Todas' },
          { id: 'active', label: 'Pendientes' },
          { id: 'done', label: 'Hechas' },
        ].map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setFiltro(id)}
            className={`
              text-xs sm:text-sm px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg border
              ${
                filtro === id
                  ? 'bg-brand text-white border-brand'
                  : 'border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200'
              }
            `}
          >
            {label}
          </button>
        ))}

        <div className="ml-0 sm:ml-auto">
          <button
            onClick={EliminarCompletadas}
            disabled={contadores.hechas === 0}
            className="
              text-xs sm:text-sm px-2.5 sm:px-3 py-1.5 sm:py-2
              rounded-lg border border-slate-300 dark:border-slate-600
              hover:bg-slate-50 dark:hover:bg-slate-700
              disabled:opacity-40
            "
          >
            Borrar Completadas
          </button>
        </div>
      </div>

      {/* Lista */}
      <ul className="mt-4 space-y-2">
        {listaFiltrada.map((item) => (
          <TodoItem
            key={item.id}
            item={item}
            onEliminar={Eliminar}
            onDone={handleDone}
          />
        ))}
      </ul>
    </div>
  );
}

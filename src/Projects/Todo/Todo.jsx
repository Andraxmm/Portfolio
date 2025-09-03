import { useState, useMemo, useCallback } from "react";
import TodoItem from "./TodoItem.jsx";

//Identificador único (ID) para cada nueva tarea.
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

  // Usamos useMemo para optimizar los cálculos. solo vuelve a contar las tareas si la lista cambia
  const contadores = useMemo(() => {
    const total = lista.length;
    const hechas = lista.filter(item => item.done).length;
    const pendientes = total - hechas;
    return { total, hechas, pendientes };
  }, [lista]); // Se recalcula solo si 'lista' cambia.


  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (text.trim() === '') return;
    const newItem = { id: uid(), text, done: false };
    setLista(currentList => [...currentList, newItem]);
    setText('');
  };

  // Usamos useCallback para "memorizar" las funciones y que no se recreen cada vez que el componente se renderiza
  const Eliminar = useCallback((id) => {
    setLista(currentList => currentList.filter(l => l.id !== id));
  }, []); // indica que la función no depende de ninguna variable de estado del componente.

  const handleDone = useCallback((id) => {
    setLista(currentList =>
      currentList.map(item =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    );
  }, []); // Dependencia vacía por la misma razón.

  const EliminarCompletadas = useCallback(() => {
    setLista(currentList => currentList.filter(item => !item.done));
  }, []); // Dependencia vacía.
  

  // solo se ejecuta si la lista o el filtro cambian
  const listaFiltrada = useMemo(() => {
    return lista.filter(item => {
      if (filtro === 'done') return item.done;
      if (filtro === 'active') return !item.done;
      return true;
    });
  }, [lista, filtro]); // Se recalcula solo si 'lista' o 'filtro' cambian.

  return (
    <div className="p-4 border rounded-xl shadow-sm bg-white dark:bg-slate-800 min-w-[280px] w-full max-w-xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 flex gap-3">
          <span>Total: <b>{contadores.total}</b></span>
          <span>Hechas: <b>{contadores.hechas}</b></span>
          <span>Pendientes: <b>{contadores.pendientes}</b></span>
        </div>
      </div>

      <form onSubmit={handleAdd} className="mt-4 flex gap-2">
        <input
          type="text"
          placeholder="hacer las tareas..."
          value={text}
          onChange={handleChange}
          className="flex-1 px-3 py-2 border rounded-lg bg-white dark:bg-slate-900 dark:border-slate-700 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand/50"
        />
        <button
          type='submit'
          disabled={text.trim() === ''}
          className="px-4 py-2 rounded-lg bg-brand text-white hover:opacity-90 transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Añadir
        </button>
      </form>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button
          onClick={() => setFiltro('all')}
          className={`text-sm px-3 py-2 rounded-lg border ${filtro === 'all' ? 'bg-brand text-white border-brand' : 'border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200'}`}
        >
          Todas
        </button>
        <button
          onClick={() => setFiltro('active')}
          className={`text-sm px-3 py-2 rounded-lg border ${filtro === 'active' ? 'bg-brand text-white border-brand' : 'border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200'}`}
        >
          Pendientes
        </button>
        <button
          onClick={() => setFiltro('done')}
          className={`text-sm px-3 py-2 rounded-lg border ${filtro === 'done' ? 'bg-brand text-white border-brand' : 'border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200'}`}
        >
          Hechas
        </button>

        <div className="ml-auto">
          <button
            onClick={EliminarCompletadas}
            disabled={contadores.hechas === 0}
            className="text-sm px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-40"
          >
            Borrar Completadas
          </button>
        </div>
      </div>

      <ul className="mt-4 space-y-2">
        {listaFiltrada.map(item => (
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
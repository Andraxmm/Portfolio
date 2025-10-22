import React from 'react';

// React.memo evita que este componente se vuelva a renderizar si las props que le llegan no han cambiado.
const TodoItem = React.memo(({ item, onEliminar, onDone }) => {
  return (
    <li
      key={item.id}
      className="flex items-center gap-3 justify-between p-2 border rounded-lg bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700"
    >
      <div className="flex items-center gap-3 flex-1">
        <input
          type="checkbox"
          checked={item.done}
          onChange={() => onDone(item.id)}
          className="size-4 accent-brand"
        />
        <span
          className={
            item.done
              ? 'line-through text-slate-400 dark:text-slate-500'
              : 'text-slate-800 dark:text-slate-100'
          }
        >
          {item.text}
        </span>
      </div>
      <button
        onClick={() => onEliminar(item.id)}
        className="text-xs px-2 py-1 rounded bg-red-500 text-white hover:bg-red-600"
      >
        Eliminar
      </button>
    </li>
  );
});
TodoItem.displayName = 'TodoItem';

export default TodoItem;

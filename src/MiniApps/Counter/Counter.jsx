import { useState } from 'react';

export default function Contador() {
  const [count, setCount] = useState(0);

  function Increment() {
    setCount((prev) => prev + 1);
  }

  function Restar() {
    setCount((prev) => (prev > 0 ? prev - 1 : 0));
  }

  function Reset() {
    setCount(0);
  }

  return (
    <div className="p-4 border rounded-xl shadow-sm bg-white dark:bg-slate-800 flex flex-col items-center gap-4">
      <p className="text-3xl font-bold text-slate-800 dark:text-slate-100">
        {count}
      </p>

      <div className="flex gap-3">
        <button
          onClick={Restar}
          disabled={count === 0}
          className="px-4 py-2 bg-red-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-600 transition"
        >
          −
        </button>

        <button
          onClick={Reset}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
        >
          Reinicio
        </button>

        <button
          onClick={Increment}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        >
          +
        </button>
      </div>
    </div>
  );
}

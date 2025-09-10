export default function TodoPreview() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-[90%] max-w-sm rounded-lg border border-slate-200 bg-white p-3 text-sm
                      shadow-sm dark:bg-slate-900 dark:border-slate-700">
        <div className="mb-2 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>Total: 3</span>
          <span>Hechas: 0</span>
          <span>Pendientes: 3</span>
        </div>

        <ul className="space-y-2">
          <li className="flex items-center gap-2">
            <input type="checkbox" disabled className="size-4 accent-brand" />
            <span className="text-slate-700 dark:text-slate-200">Hacer la compra</span>
          </li>
          <li className="flex items-center gap-2">
            <input type="checkbox" disabled className="size-4 accent-brand" />
            <span className="text-slate-700 dark:text-slate-200">Hacer ejercicio</span>
          </li>
          <li className="flex items-center gap-2">
            <input type="checkbox" disabled className="size-4 accent-brand" />
            <span className="text-slate-700 dark:text-slate-200">Pasear al perro</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

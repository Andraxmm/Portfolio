export default function Modal({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-[61] w-full max-w-2xl rounded-2xl bg-white p-5 shadow-xl dark:bg-slate-900">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-lg font-bold">{title}</h3>
          <button className="btn-outline" onClick={onClose} aria-label="Cerrar">✕</button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}
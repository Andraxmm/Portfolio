export default function PreviewFrame({ children, className = "" }) {
  return (
    <div
      className={
        "h-40 bg-slate-200 flex items-center justify-center overflow-hidden rounded-t-xl " +
        className
      }
    >
      {/* deshabilitamos interacción en el preview */}
      <div className="pointer-events-none select-none opacity-95 scale-95">
        {children}
      </div>
    </div>
  );
}


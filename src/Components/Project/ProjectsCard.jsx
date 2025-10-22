import { Link } from 'react-router-dom';

export default function ProjectCard({
  title,
  desc,
  tags = [],
  preview,
  code, // <-- sin valor por defecto
  children,
  onDemo,
  demoHref,
}) {
  return (
    <div className="card overflow-hidden">
      {preview ? (
        /* 👇 CAMBIO: quita h-40 y usa aspect ratio responsivo */
        <div
          className="bg-slate-200 flex items-center justify-center overflow-hidden rounded-t-xl
                        aspect-[16/9] sm:aspect-[3/1]"
        >
          <div className="pointer-events-none select-none opacity-95 scale-95">
            {preview}
          </div>
        </div>
      ) : (
        /* 👇 Igual aquí: sin h-40, misma relación de aspecto */
        <div className="bg-slate-200 rounded-t-xl aspect-[16/9] sm:aspect-[3/1]" />
      )}

      {/* 👇 Pequeño ajuste de padding responsivo (opcional) */}
      <div className="p-4 sm:p-5">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="mt-2 text-sm text-slate-600">{desc}</p>

        <div className="mt-3 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="chip">
              {tag}
            </span>
          ))}
        </div>

        {/* 👇 permite que los botones bajen de línea en pantallas estrechas */}
        <div className="mt-4 flex flex-wrap gap-3">
          {demoHref ? (
            <Link to={demoHref} className="btn">
              Demo
            </Link>
          ) : (
            children && (
              <button className="btn" onClick={() => onDemo?.(title, children)}>
                Demo
              </button>
            )
          )}

          {code && (
            <a
              className="btn-outline"
              href={code}
              target="_blank"
              rel="noopener noreferrer"
            >
              Código
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

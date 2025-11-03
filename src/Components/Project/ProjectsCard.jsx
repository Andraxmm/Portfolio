import { Link } from 'react-router-dom';

export default function ProjectCard({
  title,
  desc,
  tags = [],
  preview,
  code,
  children,
  onDemo,
  demoHref,
}) {
  return (
    <div className="card overflow-hidden">
      {preview ? (
        <div className="bg-slate-200 flex items-center justify-center overflow-hidden rounded-t-xl h-[150px] sm:h-[170px]">
          <div className="pointer-events-none select-none opacity-95 scale-95">
            {preview}
          </div>
        </div>
      ) : (
        <div className="bg-slate-200 rounded-t-xl h-[150px] sm:h-[170px]" />
      )}

      {/* Pequeño ajuste de padding responsivo (opcional) */}
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

        {/* permite que los botones bajen de línea en pantallas estrechas */}
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

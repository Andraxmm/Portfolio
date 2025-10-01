import { Link } from "react-router-dom";

export default function ProjectCard({ title, desc, tags = [], preview, code = '#', children, onDemo, demoHref }) {
  return (
    <div className="card overflow-hidden">
      {preview ? (
        <div className="h-40 bg-slate-200 flex items-center justify-center overflow-hidden rounded-t-xl">
          <div className="pointer-events-none select-none opacity-95 scale-95">
            {preview}
          </div>
        </div>
      ) : (
        <div className="h-40 bg-slate-200" />
      )}

      <div className="p-4">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="mt-2 text-sm text-slate-600">{desc}</p>

        <div className="mt-3 flex flex-wrap gap-2">
          {tags.map(tag => (
            <span key={tag} className="chip">{tag}</span>
          ))}
        </div>

        <div className="mt-4 flex gap-3">
          {demoHref ? (
            <Link to={demoHref} className="btn">Demo</Link>
          ) : (
            children && (
              <button className="btn" onClick={() => onDemo?.(title, children)}>
                Demo
              </button>
            )
          )}
          <a className="btn-outline" href={code} target="_blank" rel="noreferrer">
            Código
          </a>
        </div>
      </div>
    </div>
  );
}

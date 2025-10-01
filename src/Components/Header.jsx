import { useEffect, useState } from 'react';

function useTheme() {
  const getInitial = () => {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  };

  const [theme, setTheme] = useState(getInitial);
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
    localStorage.setItem('theme', theme);
  }, [theme]);
  const toggle = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'));
  return { theme, toggle };
}

function NavLink({ href, children }) {
  return (
    <a
      href={href}
      className="text-sm font-semibold text-slate-700 hover:text-slate-900 transition
                 dark:text-slate-200 dark:hover:text-white"
    >
      {children}
    </a>
  );
}

export default function Header() {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-slate-200 dark:bg-slate-900/70 dark:border-slate-800">
      <div className="container-p h-16 flex items-center justify-between">
        <a href="#home" className="font-extrabold text-lg">
          Andrea Maña Moreno<span className="text-brand">.</span>
        </a>

        <nav className="hidden md:flex items-center gap-4">
          <NavLink href="#home">Inicio</NavLink>
          <NavLink href="#about">Sobre mí</NavLink>
          <NavLink href="#stack">Stack</NavLink>
          <NavLink href="#projects">Proyectos</NavLink>
          <NavLink href="#contact">Contacto</NavLink>

          <button
            onClick={toggle}
            className="btn-outline"
            aria-label="Cambiar tema"
            title={`Cambiar a ${theme === 'dark' ? 'claro' : 'oscuro'}`}
          >
            {theme === 'dark' ? '☀️ Claro' : '🌙 Oscuro'}
          </button>

          <a className="btn" href="#" target="_blank" rel="noreferrer">Descargar CV</a>
        </nav>

        <button
          className="md:hidden p-2 rounded-lg border border-slate-300 dark:border-slate-700"
          onClick={() => setOpen(o => !o)}
          aria-label="Abrir menú"
        >
          ☰
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
          <div className="container-p py-3 flex flex-col gap-3">
            <NavLink href="#home">Inicio</NavLink>
            <NavLink href="#about">Sobre mí</NavLink>
            <NavLink href="#stack">Stack</NavLink>
            <NavLink href="#projects">Proyectos</NavLink>
            <NavLink href="#contact">Contacto</NavLink>
            <button onClick={toggle} className="btn-outline" aria-label="Cambiar tema móvil">
              {theme === 'dark' ? '☀️ Claro' : '🌙 Oscuro'}
            </button>
            <a className="btn" href="#" target="_blank" rel="noreferrer">Descargar CV</a>
          </div>
        </div>
      )}
    </header>
  );
}

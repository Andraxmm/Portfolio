import { useEffect, useState } from "react";

function useTheme() {
  const getInitial = () => {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;
    return "dark"; // 👈 por defecto oscuro
  };

  const [theme, setTheme] = useState(getInitial);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));
  return { theme, toggle };
}

function NavLink({ href, children, onClick }) {
  return (
    <a
      href={href}
      onClick={onClick}
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

  // ⛔️ Bloquear el scroll del body cuando el menú móvil está abierto
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className="
        site-header
        bg-white/95 md:bg-white/80 backdrop-blur
        border-b border-slate-200
        dark:bg-slate-900/95 md:dark:bg-slate-900/70 dark:border-slate-800
        transition-colors
      "
    >
      <div className="container-p h-16 flex items-center justify-between">
        <a
          href="#home"
          className="font-extrabold text-base sm:text-lg truncate max-w-[70%]"
          title="Volver al inicio"
        >
          Andrea Maña Moreno<span className="text-brand">.</span>
        </a>

        {/* Nav escritorio */}
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
            title={`Cambiar a ${theme === "dark" ? "claro" : "oscuro"}`}
          >
            {theme === "dark" ? "☀️ Claro" : "🌙 Oscuro"}
          </button>

          <a className="btn" href="#" target="_blank" rel="noreferrer">
            Descargar CV
          </a>
        </nav>

        {/* Burger */}
        <button
          className="md:hidden h-10 w-10 flex items-center justify-center rounded-lg
                     border border-slate-300 dark:border-slate-700"
          onClick={() => setOpen((o) => !o)}
          aria-label="Abrir menú"
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          ☰
        </button>
      </div>

      {/* Menú móvil */}
      {open && (
        <div
          id="mobile-menu"
          className="md:hidden border-t border-slate-200 bg-white
                     dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="container-p py-3 flex flex-col gap-3">
            <NavLink href="#home" onClick={() => setOpen(false)}>
              Inicio
            </NavLink>
            <NavLink href="#about" onClick={() => setOpen(false)}>
              Sobre mí
            </NavLink>
            <NavLink href="#stack" onClick={() => setOpen(false)}>
              Stack
            </NavLink>
            <NavLink href="#projects" onClick={() => setOpen(false)}>
              Proyectos
            </NavLink>
            <NavLink href="#contact" onClick={() => setOpen(false)}>
              Contacto
            </NavLink>

            {/* Botón tema */}
            <button
              onClick={() => {
                toggle();
                setOpen(false);
              }}
              className="btn-outline justify-center px-3 py-2 self-center"
              aria-label="Cambiar tema móvil"
              title={`Cambiar a ${theme === "dark" ? "claro" : "oscuro"}`}
            >
              {theme === "dark" ? "☀️ Claro" : "🌙 Oscuro"}
            </button>

            {/* Botón CV */}
            <a
              className="btn px-3 py-2 self-center"
              href="#"
              target="_blank"
              rel="noreferrer"
            >
              Descargar CV
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

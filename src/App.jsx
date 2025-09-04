import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaGitAlt } from "react-icons/fa";
import { SiVite } from "react-icons/si";
import Counter from './projects/Counter/Counter.jsx'
import Todo from "./Projects/Todo/Todo.jsx";
import ControlledForm from './Projects/Controlled/ControlledForm.jsx';
import CustomUI from './Projects/CustomUI/CustomUI.jsx';
import BuscadorPeliculas from "./Projects/BuscadorPeliculas";




import { useEffect, useState } from 'react';

/* ---------------------------- Theme (sin cambios) --------------------------- */
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

/* ------------------------------- UI helpers -------------------------------- */
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

function TodoPreview() {
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



/* --------------------------------- Header ---------------------------------- */
function Header() {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-slate-200 dark:bg-slate-900/70 dark:border-slate-800">
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

/* --------------------------------- Secciones -------------------------------- */
function Hero() {
  return (
    <section id="home" className="relative overflow-visible">
      {/* Banda de degradado full-width detrás del Hero */}
      <div
        aria-hidden="true"
        className="
          absolute left-1/2 -translate-x-1/2 top-0
          w-screen max-w-none
          h-[420px] md:h-[520px]
          pointer-events-none -z-10
          bg-gradient-to-b
          from-indigo-400/20 via-indigo-400/10 to-transparent
          dark:from-indigo-500/25 dark:via-indigo-500/10 dark:to-transparent
        "
      />

      <div className="container-p py-16 md:py-24">
        <div className="grid md:grid-cols-2 items-center gap-10">
          <div className="order-2 md:order-1">
            <span className="chip mb-3">Frontend · React</span>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Construyo interfaces claras, rápidas y accesibles con <span className="text-brand">React</span>.
            </h1>
            <p className="mt-4 text-slate-600 dark:text-slate-300">
              Desarrolladora frontend junior enfocada en buenas prácticas y UX simple.
              Busco mi primera oportunidad en un equipo donde seguir creciendo.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a className="btn" href="https://github.com/" target="_blank" rel="noreferrer">GitHub</a>
              <a className="btn-outline" href="https://www.linkedin.com/" target="_blank" rel="noreferrer">LinkedIn</a>
              <a className="btn-outline" href="#projects">Ver proyectos</a>
            </div>
          </div>

          <div className="order-1 md:order-2 flex justify-center">
            <div className="size-40 md:size-56 rounded-3xl bg-gradient-to-br from-brand to-indigo-300 shadow-lg" />
          </div>
        </div>
      </div>
    </section>
  );
}


function About() {
  return (
    <section id="about" className="container-p py-16 md:py-24">
      <h2 className="text-3xl font-bold">Sobre mí</h2>
      <p className="mt-4 max-w-3xl text-slate-600">
        Soy una desarrolladora frontend junior con foco en React, JavaScript y accesibilidad.
        Disfruto convertir diseños en experiencias usables y mantener el código claro.
        Actualmente construyo mini-apps para consolidar fundamentos (estado, efectos, formularios, fetch).
      </p>
      <ul className="mt-6 grid md:grid-cols-3 gap-3 text-slate-700">
        <li className="card p-4">✔️ Bases sólidas de React (hooks, props, listas, condicionales)</li>
        <li className="card p-4">✔️ Llamadas a API y manejo de loading/error</li>
        <li className="card p-4">✔️ Git/GitHub y deploy en Netlify/Vercel</li>
      </ul>
    </section>
  )
}

function Stack() {
  const tech = [
    { name: "HTML", icon: <FaHtml5 className="text-orange-500 text-4xl" /> },
    { name: "CSS", icon: <FaCss3Alt className="text-blue-500 text-4xl" /> },
    { name: "JavaScript", icon: <FaJs className="text-yellow-400 text-4xl" /> },
    { name: "React", icon: <FaReact className="text-cyan-400 text-4xl" /> },
    { name: "Vite", icon: <SiVite className="text-purple-500 text-4xl" /> },
    { name: "Git", icon: <FaGitAlt className="text-red-500 text-4xl" /> },
  ];

  return (
    <section id="stack" className="container-p py-16 md:py-24">
      <h2 className="text-3xl font-bold">Stack</h2>
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
        {tech.map((t) => (
          <div
            key={t.name}
            className="card p-6 flex flex-col items-center justify-center gap-2
                       hover:-translate-y-2 hover:shadow-lg transition-all duration-300
                       group"
          >
            <div className="opacity-80 group-hover:opacity-100 transition">
              {t.icon}
            </div>
            <span className="font-semibold">{t.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}


/* ------------------------------ Modal reutilizable -------------------------- */
function Modal({ open, onClose, title, children }) {
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

/* -------------------------- Preview no interactivo -------------------------- */
function PreviewFrame({ children, className = "" }) {
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

/* --------------------------- Card (preview + modal) ------------------------- */
function ProjectCard({ title, desc, tags = [], preview, code = '#', children, onDemo }) {
  return (
    <div className="card overflow-hidden">
      {/* header: preview o placeholder */}
      {preview ? (
        <PreviewFrame>{preview}</PreviewFrame>
      ) : (
        <div className="h-40 bg-slate-200" />
      )}

      <div className="p-4">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="mt-2 text-sm text-slate-600">{desc}</p>

        <div className="mt-3 flex flex-wrap gap-2">
          {tags.map(tag => <span key={tag} className="chip">{tag}</span>)}
        </div>

        <div className="mt-4 flex gap-3">
          {children && (
            <button className="btn" onClick={() => onDemo?.(title, children)}>
              Demo
            </button>
          )}
          <a className="btn-outline" href={code} target="_blank" rel="noreferrer">
            Código
          </a>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------- Projects ---------------------------------- */
function Projects() {
  const [modal, setModal] = useState({ open: false, title: '', content: null });
  const openModal = (title, content) => setModal({ open: true, title, content });
  const closeModal = () => setModal(m => ({ ...m, open: false }));

  return (
    <section id="projects" className="container-p py-16 md:py-24">
      <h2 className="text-3xl font-bold">Proyectos</h2>

      <div className="mt-6 grid md:grid-cols-2 gap-6">
    <ProjectCard
      title="Buscador de Películas"
      desc="Busca películas en tiempo real con TMDB."
      tags={['React', 'API', 'fetch']}
      code="#"
      onDemo={openModal}
      preview={<div className="text-sm text-slate-600">Preview del proyecto</div>}
  >
    <BuscadorPeliculas />
</ProjectCard>
      </div>

      <h3 className="mt-10 text-xl font-bold">Mini-Proyectos React</h3>
      <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Counter: preview sin interacción + demo en modal */}
        <ProjectCard
          title="Counter"
          desc="Contador +/− con reset."
          tags={['useState']}
          code="#"
          onDemo={openModal}
          preview={<Counter />}     
        >
          <Counter />               
        </ProjectCard>

        {/* Placeholders hasta que construyas las mini-apps */}
        {/* Todo: preview estático + estado limpio al abrir la demo */}
        <ProjectCard
          title="Todo List"
          desc="Añadir, marcar, eliminar tareas."
          tags={['listas','keys']}
          code="#"
          onDemo={openModal}
          preview={<TodoPreview />}   // 👈 antes era <Todo />
        >
          <Todo key={`todo-${Date.now()}`} />  {/* 👈 remount para limpiar estado */}
        </ProjectCard>


        
        <ProjectCard
          title="Controlled Inputs"
          desc="Formulario controlado + validación."
          tags={['formularios']}
          code="#"
          onDemo={openModal}
          preview={<ControlledForm />}
        >
          <ControlledForm />
        </ProjectCard>

        <ProjectCard
        title="Customizador de UI"
        desc="Persistencia de datos + manejo de estado para personalizar la UI."
        tags={['localStorage', 'Tailwind CSS']}
        code="#"
        onDemo={openModal}
        preview={<CustomUI />}
      >
        <CustomUI />
      </ProjectCard> 

      </div>

      {/* Modal común para todas las demos */}
      <Modal open={modal.open} onClose={closeModal} title={modal.title}>
        {modal.content}
      </Modal>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="container-p py-16 md:py-24">
      <h2 className="text-3xl font-bold">Contacto</h2>
      <p className="mt-2 text-slate-600">¿Hablamos? Escríbeme en LinkedIn o por email.</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <a className="btn" href="mailto:tucorreo@ejemplo.com">Email</a>
        <a className="btn-outline" href="https://www.linkedin.com/" target="_blank" rel="noreferrer">LinkedIn</a>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-slate-200">
      <div className="container-p py-6 text-sm text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
        <span>© {new Date().getFullYear()} Andrea Maña Moreno</span>
        <span>Hecho con React + Tailwind</span>
      </div>
    </footer>
  )
}

/* ---------------------------------- App ------------------------------------- */
export default function App() {
  return (
    <div>
      <Header />
      <main>
        <Hero />
        <About />
        <Stack />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

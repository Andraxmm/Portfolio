import { motion } from "framer-motion";
import profile from "../assets/profile.jpg";

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      {/* Fondo: gradiente + estrellas */}
      <div className="hero-sky-bg absolute inset-0 -z-20 pointer-events-none" />
      <div className="hero-sky-stars absolute inset-0 -z-10 pointer-events-none" />

      {/* Contenido a pantalla completa */}
      <div className="container-p min-h-screen md:min-h-[100svh] py-24 md:py-32 flex items-center">
        {/* 2 columnas en desktop (más ancho para texto), 1 en móvil */}
        <div className="grid items-center gap-10 md:grid-cols-[1.6fr_1fr] w-full">
          {/* Columna izquierda: texto */}
          <div className="max-w-3xl">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold
                         bg-white/10 text-white/90 ring-1 ring-white/20 backdrop-blur
                         dark:bg-white/10 dark:text-white/90"
            >
              Frontend · React
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              viewport={{ once: true }}
              className="mt-4 text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight
                         text-slate-900 dark:text-white"
            >
              Construyo interfaces claras, rápidas y accesibles con{" "}
              <span className="react-gradient-text">React</span>.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              viewport={{ once: true }}
              className="mt-4 max-w-2xl text-slate-700 md:text-lg dark:text-white/90"
            >
              Desarrolladora frontend junior enfocada en UX simple, buenas prácticas y rendimiento.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              viewport={{ once: true }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <a className="btn" href="https://github.com/Andraxmm" target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a
                className="btn-outline"
                href="https://www.linkedin.com/in/andrea-ma%C3%B1a-moreno-204a2a1b5/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
              <a className="btn-outline" href="#projects">
                Ver proyectos
              </a>
            </motion.div>
          </div>

          {/* Columna derecha: foto (md+) */}
          <div className="hidden md:flex md:justify-self-end md:pr-2 lg:pr-4 xl:pr-6 xl:translate-x-2">
            <div className="relative">
              {/* Borde degradado alrededor de la foto */}
              <div
                className="
                  p-[3px] rounded-full
                  bg-gradient-to-tr from-indigo-400 via-sky-400 to-purple-500
                  dark:bg-[linear-gradient(135deg,#facc15_0%,#4ade80_35%,#38bdf8_70%,#a855f7_100%)]
                "
              >
                <img
                  src={profile}
                  alt="Andrea Maña Moreno"
                  width={320}
                  height={320}
                  className="block h-72 w-72 lg:h-80 lg:w-80 rounded-full object-cover
                             ring-1 ring-black/5 dark:ring-white/10 shadow-2xl
                             bg-white/60 dark:bg-slate-900/40"
                />
              </div>

              {/* Brillo suave */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-full
                           shadow-[0_0_60px_12px_rgba(56,189,248,0.25)]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Indicador: “Sobre mí” + flecha */}
      <div className="absolute inset-x-0 bottom-6 md:bottom-8 flex flex-col items-center gap-2">
        <span className="text-[11px] tracking-wide uppercase text-slate-700 dark:text-white/85">
          Sobre mí
        </span>
        <a
          href="#about"
          aria-label="Bajar a Sobre mí"
          className="group inline-flex h-10 w-10 items-center justify-center rounded-full
                     ring-1 ring-slate-300/60 bg-white/70 hover:bg-white
                     dark:ring-white/40 dark:bg-white/10 hover:dark:bg-white/15
                     transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/70"
        >
          <svg
            className="h-4 w-4 text-slate-700 dark:text-white transition-transform group-hover:translate-y-0.5"
            viewBox="0 0 20 20" fill="currentColor"
          >
            <path d="M10 14a1 1 0 0 1-.7-.29l-5-5a1 1 0 1 1 1.4-1.42L10 11.59l4.3-4.3a1 1 0 0 1 1.4 1.42l-5 5a1 1 0 0 1-.7.29z" />
          </svg>
        </a>
      </div>
    </section>
  );
}

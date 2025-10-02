import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      {/* Fondo: gradiente + estrellas */}
      <div className="hero-sky-bg absolute inset-0 -z-20 pointer-events-none" />
      <div className="hero-sky-stars absolute inset-0 -z-10 pointer-events-none" />

      {/* Contenido a pantalla completa */}
      <div className="container-p min-h-screen md:min-h-[100svh] py-24 md:py-32 flex items-center">
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
            className="mt-4 text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-white"
          >
            Construyo interfaces claras, rápidas y accesibles con{" "}
            <span className="react-gradient-text">React</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            viewport={{ once: true }}
            className="mt-4 max-w-2xl text-white/90 md:text-lg"
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
            <a
              className="btn"
              href="https://github.com/Andraxmm"
              target="_blank"
              rel="noreferrer"
            >
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
      </div>

      {/* Indicador: “Sobre mí” + flecha */}
      <div className="absolute inset-x-0 bottom-6 md:bottom-8 flex flex-col items-center gap-2">
        <span className="text-[11px] tracking-wide uppercase text-white/85">
          Sobre mí
        </span>
        <a
          href="#about"
          aria-label="Bajar a Sobre mí"
          className="group inline-flex h-10 w-10 items-center justify-center rounded-full
                     ring-1 ring-white/40 hover:ring-white/80 bg-white/10 hover:bg-white/15
                     transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/90"
        >
          <svg
            className="h-4 w-4 text-white transition-transform group-hover:translate-y-0.5 animate-bounce-slow"
            viewBox="0 0 20 20" fill="currentColor"
          >
            <path d="M10 14a1 1 0 0 1-.7-.29l-5-5a1 1 0 1 1 1.4-1.42L10 11.59l4.3-4.3a1 1 0 0 1 1.4 1.42l-5 5a1 1 0 0 1-.7.29z" />
          </svg>
        </a>
      </div>
    </section>
  );
}


export default function Hero() {
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
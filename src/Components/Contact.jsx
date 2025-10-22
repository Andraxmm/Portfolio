import { FaRegPaperPlane, FaEnvelope, FaLinkedin, FaGithub } from "react-icons/fa";

export default function Contact() {
  const email = "manamorenoandrea@gmail.com";
  const linkedin =
    "https://www.linkedin.com/in/andrea-ma%C3%B1a-moreno-204a2a1b5/";
  const github = "https://github.com/Andraxmm/Portfolio";

  return (
    // Igual que Proyectos/Stack: container en el SECTION
    <section
      id="contact"
      className="container-p py-16 md:py-24 scroll-mt-24 md:scroll-mt-28"
    >
      {/* Título (mismo estilo y barra) */}
      <div className="mb-10 px-5 sm:px-0">
        <div className="flex items-center gap-3">
          <FaRegPaperPlane className="text-2xl md:text-3xl text-slate-900 dark:text-white" />
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">
            Contacto
          </h2>
        </div>
        <div className="mt-3 h-0.5 w-full bg-gradient-to-r from-yellow-400 via-sky-400 to-purple-500" />
      </div>

      {/* Texto de intro: compacto en móvil */}
      <p className="px-5 sm:px-0 text-sm sm:text-base md:text-lg text-slate-900 dark:text-slate-300 mb-6 sm:mb-8 text-center max-w-prose mx-auto">
        ¿Hablamos? Escríbeme directamente por email o en mis redes.
      </p>

      {/* Email: tamaños compactos en móvil */}
      <div className="px-5 sm:px-0 flex items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
        <FaEnvelope className="text-lg sm:text-xl text-indigo-600 dark:text-indigo-400" />
        <a
          href={`mailto:${email}`}
          className="font-semibold text-sm sm:text-base md:text-xl
                    text-slate-900 dark:text-white
                    hover:text-indigo-500 dark:hover:text-indigo-400
                    transition break-all sm:break-normal"
        >
          {email}
        </a>
      </div>

      {/* Redes: iconos más pequeños en móvil y con aire lateral */}
      <div className="px-5 sm:px-0 flex justify-center gap-6 sm:gap-8 text-2xl sm:text-3xl">
        <a
          href={github}
          target="_blank"
          rel="noreferrer"
          className="text-slate-600 dark:text-slate-300
                    hover:text-indigo-500 dark:hover:text-indigo-400 transition"
          aria-label="GitHub"
        >
          <FaGithub />
        </a>
        <a
          href={linkedin}
          target="_blank"
          rel="noreferrer"
          className="text-slate-600 dark:text-slate-300
                    hover:text-sky-500 dark:hover:text-sky-400 transition"
          aria-label="LinkedIn"
        >
          <FaLinkedin />
        </a>
      </div>
    </section>
  );
}
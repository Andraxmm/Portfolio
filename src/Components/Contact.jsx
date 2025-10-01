import { FaRegPaperPlane, FaEnvelope, FaLinkedin, FaGithub } from "react-icons/fa";


export default function Contact() {
  const email = "manamorenoandrea@gmail.com";
  const linkedin =
    "https://www.linkedin.com/in/andrea-ma%C3%B1a-moreno-204a2a1b5/";
  const github = "https://github.com/Andraxmm"; 

  return (
    <section id="contact" className="container-p py-20 md:py-28">
      {/* 🔹 Título con icono y línea */}
      <div className="mb-10">
        <div className="flex items-center gap-3">
          <FaRegPaperPlane className="text-2xl text-slate-900 dark:text-white" />
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">
            Contacto
          </h2>
        </div>
        <div className="mt-3 h-0.5 w-full bg-gradient-to-r from-yellow-400 via-sky-400 to-purple-500"></div>
      </div>
 
      {/* Texto de intro */}
      <p className="text-lg md:text-xl text-slate-900 dark:text-slate-300 mb-8 text-center">
        ¿Hablamos? Escríbeme directamente por email o en mis redes.
      </p>

      {/* Email */}
    <div className="flex items-center justify-center gap-3 mb-8">
      <FaEnvelope className="text-2xl text-indigo-600 dark:text-indigo-400" />
      <a
        href={`mailto:${email}`}
        className="font-semibold text-lg md:text-xl 
                  text-slate-900 dark:text-white 
                  hover:text-indigo-500 dark:hover:text-indigo-400 
                  transition"
      >
        {email}
      </a>
    </div>

    {/* Redes sociales */}
    <div className="flex justify-center gap-8 text-3xl">
      <a
        href={github}
        target="_blank"
        rel="noreferrer"
        className="text-slate-600 dark:text-slate-300 
                  hover:text-indigo-500 dark:hover:text-indigo-400 
                  transition"
      >
        <FaGithub />
      </a>
      <a
        href={linkedin}
        target="_blank"
        rel="noreferrer"
        className="text-slate-600 dark:text-slate-300 
                  hover:text-sky-500 dark:hover:text-sky-400 
                  transition"
      >
        <FaLinkedin />
      </a>
    </div>

    </section>
  );
}

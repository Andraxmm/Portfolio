import { motion } from "framer-motion";
import profileImage from "../assets/profile.jpg";

export default function Hero() {
  const linkedin =
    "https://www.linkedin.com/in/andrea-ma%C3%B1a-moreno-204a2a1b5/";
    const github = "https://github.com/Andraxmm/Portfolio"; 
  return (
    <section id="home" className="relative overflow-visible">
      <div className="container-p py-16 md:py-24">
        <div className="grid md:grid-cols-2 items-center gap-10">
          
          {/* TEXTO */}
          <motion.div
            className="order-2 md:order-1"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
          >
            <motion.span
              className="chip mb-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Frontend · React
            </motion.span>

            <motion.h1
              className="text-4xl md:text-5xl font-extrabold leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Construyo interfaces claras, rápidas y accesibles con{" "}
              <span className="react-gradient-text">
                React
              </span>.
            </motion.h1>

            <motion.p
              className="mt-4 text-slate-600 dark:text-slate-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Desarrolladora frontend enfocada en buenas prácticas y UX simple.
              Busco mi primera oportunidad en un equipo donde seguir creciendo.
            </motion.p>

            <motion.div
              className="mt-6 flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <a
                className="btn hover:scale-105 transition-transform"
                href={github}
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
              <a
              className="btn-outline hover:scale-105 transition-transform"
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              >
              LinkedIn
             </a>
              <a
                className="btn-outline hover:scale-105 transition-transform"
                href="#projects"
              >
                Ver proyectos
              </a>
            </motion.div>
          </motion.div>

          {/* FOTO ANIMADA */}
          <motion.div
            className="order-1 md:order-2 flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.div
              className="relative w-56 h-56 md:w-72 md:h-72 rounded-full 
                         p-[3px] shadow-xl bg-gradient-to-r 
                         from-sky-400 via-purple-500 to-yellow-400"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
              <img
                src={profileImage}
                alt="Mi foto"
                className="w-full h-full object-cover rounded-full"
              />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

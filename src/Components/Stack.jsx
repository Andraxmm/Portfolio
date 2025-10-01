import { motion } from "framer-motion";
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaGitAlt } from "react-icons/fa";
import { SiVite } from "react-icons/si";

export default function Stack() {
  const tech = [
    { name: "HTML", icon: <FaHtml5 className="text-orange-500 text-5xl" /> },
    { name: "CSS", icon: <FaCss3Alt className="text-blue-500 text-5xl" /> },
    { name: "JavaScript", icon: <FaJs className="text-yellow-400 text-5xl" /> },
    { name: "React", icon: <FaReact className="text-cyan-400 text-5xl" /> },
    { name: "Vite", icon: <SiVite className="text-purple-500 text-5xl" /> },
    { name: "Git", icon: <FaGitAlt className="text-red-500 text-5xl" /> },
  ];

  return (
    <section id="stack" className="w-full py-16 md:py-24 bg-transparent">
      {/* Contenedor del título */}
      <div className="container-p">
        <motion.h2
          className="text-3xl font-extrabold text-slate-900 dark:text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Stack
        </motion.h2>
      </div>

      {/* Grid ancho, centrado */}
      <motion.div
        className="mt-10 max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: { transition: { staggerChildren: 0.15 } },
          hidden: {},
        }}
      >
        {tech.map((t, index) => (
          <motion.div
            key={t.name}
            className="card p-6 flex flex-col items-center justify-center gap-3
                       hover:-translate-y-2 hover:shadow-xl transition-all duration-300
                       group dark:hover:bg-slate-700"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5 }}
          >
            <div className="opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-transform duration-300">
              {t.icon}
            </div>
            <span className="font-semibold">{t.name}</span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

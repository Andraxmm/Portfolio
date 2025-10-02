import { motion } from "framer-motion";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaGitAlt,
  FaPhp,
  FaDatabase,
  FaLayerGroup,
} from "react-icons/fa";
import { SiVite, SiTailwindcss, SiBootstrap } from "react-icons/si";

export default function Stack() {
  // Tamaño de iconos responsivo
  const iconSize = "text-3xl sm:text-4xl lg:text-5xl";

  const categories = [
    {
      title: "Frontend",
      items: [
        { name: "HTML",       icon: <FaHtml5       className={`${iconSize} text-orange-500`} /> },
        { name: "CSS",        icon: <FaCss3Alt     className={`${iconSize} text-blue-500`}   /> },
        { name: "JavaScript", icon: <FaJs          className={`${iconSize} text-yellow-400`} /> },
        { name: "React",      icon: <FaReact       className={`${iconSize} text-cyan-400`}   /> },
        { name: "Tailwind",   icon: <SiTailwindcss className={`${iconSize} text-sky-400`}    /> },
        { name: "Bootstrap",  icon: <SiBootstrap   className={`${iconSize} text-purple-600`} /> },
      ],
    },
    {
      title: "Herramientas",
      items: [
        { name: "Vite", icon: <SiVite   className={`${iconSize} text-purple-500`} /> },
        { name: "Git",  icon: <FaGitAlt className={`${iconSize} text-red-500`}    /> },
      ],
    },
    {
      title: "Extras",
      items: [
        { name: "PHP",   icon: <FaPhp      className={`${iconSize} text-indigo-600`}  /> },
        { name: "MySQL", icon: <FaDatabase className={`${iconSize} text-emerald-600`} /> },
      ],
    },
  ];

  return (
    <section id="stack" className="w-full py-16 md:py-24 bg-transparent">
      {/* 🔹 Título con icono y línea */}
      <div className="container-p mb-10">
        <div className="flex items-center gap-3">
          <FaLayerGroup className="text-2xl text-slate-900 dark:text-white" />
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">
            Stack
          </h2>
        </div>
        <div className="mt-3 h-0.5 w-full bg-gradient-to-r from-yellow-400 via-sky-400 to-purple-500" />
      </div>

      {/* 🔹 Grid de categorías */}
      <div className="container-p space-y-12">
        {/* Frontend en su fila */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">
            Frontend
          </h3>

          {/* Responsive: 2 cols (xs), 3 cols (sm), 6 cols (lg) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {categories[0].items.map((t) => (
              <div
                key={t.name}
                className="card p-4 sm:p-6 flex flex-col items-center justify-center gap-2 sm:gap-3
                           hover:-translate-y-2 hover:shadow-xl transition-all duration-300
                           group dark:hover:bg-slate-700"
              >
                <div className="opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-transform duration-300">
                  {t.icon}
                </div>
                <span className="font-semibold text-center text-sm sm:text-base">
                  {t.name}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Herramientas y Extras juntos en 2 columnas en md+ */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {categories.slice(1).map((cat) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">
                {cat.title}
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
                {cat.items.map((t) => (
                  <div
                    key={t.name}
                    className="card p-4 sm:p-6 flex flex-col items-center justify-center gap-2 sm:gap-3
                               hover:-translate-y-2 hover:shadow-xl transition-all duration-300
                               group dark:hover:bg-slate-700"
                  >
                    <div className="opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-transform duration-300">
                      {t.icon}
                    </div>
                    <span className="font-semibold text-center text-sm sm:text-base">
                      {t.name}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

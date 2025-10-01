import { motion } from "framer-motion";
import { 
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaGitAlt, 
  FaPhp, FaDatabase, FaLayerGroup 
} from "react-icons/fa";
import { SiVite, SiTailwindcss, SiBootstrap } from "react-icons/si";

export default function Stack() {
  const categories = [
    {
      title: "Frontend",
      items: [
        { name: "HTML", icon: <FaHtml5 className="text-orange-500 text-4xl" /> },
        { name: "CSS", icon: <FaCss3Alt className="text-blue-500 text-4xl" /> },
        { name: "JavaScript", icon: <FaJs className="text-yellow-400 text-4xl" /> },
        { name: "React", icon: <FaReact className="text-cyan-400 text-4xl" /> },
        { name: "Tailwind", icon: <SiTailwindcss className="text-sky-400 text-4xl" /> },
        { name: "Bootstrap", icon: <SiBootstrap className="text-purple-600 text-4xl" /> },
      ],
    },
    {
      title: "Herramientas",
      items: [
        { name: "Vite", icon: <SiVite className="text-purple-500 text-4xl" /> },
        { name: "Git", icon: <FaGitAlt className="text-red-500 text-4xl" /> },
      ],
    },
    {
      title: "Extras",
      items: [
        { name: "PHP", icon: <FaPhp className="text-indigo-600 text-4xl" /> },
        { name: "MySQL", icon: <FaDatabase className="text-emerald-600 text-4xl" /> },
      ],
    },
  ];

  return (
    <section id="stack" className="w-full py-16 md:py-24 bg-transparent">
      {/* 🔹 Título con icono y línea */}
      <div className="container-p mb-10">
        <div className="flex items-center gap-3">
          <FaLayerGroup className="text-2xl text-slate-900 dark:text-white" />
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
            Stack
          </h2>
        </div>
        <div className="mt-3 h-0.5 w-full bg-gradient-to-r from-yellow-400 via-sky-400 to-purple-500"></div>
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
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
            {categories[0].items.map((t) => (
              <div
                key={t.name}
                className="card p-6 flex flex-col items-center justify-center gap-3
                           hover:-translate-y-2 hover:shadow-xl transition-all duration-300
                           group dark:hover:bg-slate-700"
              >
                <div className="opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-transform duration-300">
                  {t.icon}
                </div>
                <span className="font-semibold text-center">{t.name}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Herramientas y Extras juntos en 2 columnas */}
        <div className="grid md:grid-cols-2 gap-12">
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
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                {cat.items.map((t) => (
                  <div
                    key={t.name}
                    className="card p-6 flex flex-col items-center justify-center gap-3
                               hover:-translate-y-2 hover:shadow-xl transition-all duration-300
                               group dark:hover:bg-slate-700"
                  >
                    <div className="opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-transform duration-300">
                      {t.icon}
                    </div>
                    <span className="font-semibold text-center">{t.name}</span>
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

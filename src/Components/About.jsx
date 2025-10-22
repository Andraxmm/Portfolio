import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';

export default function About() {
  return (
    <section
      id="about"
      className="relative w-full py-16 md:py-24 bg-transparent scroll-mt-24 md:scroll-mt-28"
    >
      <div className="container-p">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-4 md:p-12 mx-4 md:mx-0">
          {/* 🔹 Título con icono y línea */}
          <div className="mb-6 md:mb-8">
            <div className="flex items-center gap-3">
              <FaStar className="text-xl md:text-2xl text-slate-900 dark:text-white" />
              <motion.h2
                className="text-xl md:text-3xl font-extrabold text-slate-900 dark:text-white"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                Sobre mí
              </motion.h2>
            </div>
            <div className="mt-3 h-0.5 w-full bg-gradient-to-r from-yellow-400 via-sky-400 to-purple-500"></div>
          </div>

          {/* Párrafo */}
          <motion.p
            className="mt-4 max-w-3xl text-sm md:text-base text-slate-600 dark:text-slate-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Soy una desarrolladora frontend con foco en React, JavaScript y
            accesibilidad. Disfruto convertir diseños en experiencias usables y
            mantener el código claro. Actualmente construyo mini-apps para
            consolidar fundamentos (estado, efectos, formularios, fetch).
          </motion.p>

          {/* Lista de habilidades */}
          <motion.ul
            className="mt-6 md:mt-8 grid md:grid-cols-3 gap-4 md:gap-6 text-slate-700 dark:text-slate-200"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { transition: { staggerChildren: 0.2 } },
              hidden: {},
            }}
          >
            {[
              {
                icon: '⚛️',
                text: 'Bases sólidas de React (hooks, props, listas, condicionales)',
              },
              { icon: '🌐', text: 'Llamadas a API y manejo de loading/error' },
              { icon: '🚀', text: 'Git/GitHub y deploy en Netlify/Vercel' },
            ].map((item, index) => (
              <motion.li
                key={index}
                className="card p-4 md:p-6 flex items-start gap-3 hover:scale-105 hover:shadow-lg transition-transform duration-300 dark:hover:bg-slate-700"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-lg md:text-2xl">{item.icon}</span>
                <span className="text-sm md:text-base">{item.text}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}

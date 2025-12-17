import { motion } from 'framer-motion';
import { SiTypescript } from 'react-icons/si';
import { SiVercel } from 'react-icons/si';

import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaGitAlt,
  FaPhp,
  FaDatabase,
  FaLayerGroup,
} from 'react-icons/fa';
import { SiVite, SiTailwindcss, SiBootstrap } from 'react-icons/si';

export default function Stack() {
  const iconSize = 'text-3xl sm:text-4xl lg:text-5xl';
  const iconBase =
    'inline-block leading-none shrink-0 [&>svg]:block [&>svg]:h-auto [&>svg]:w-auto [&>svg]:aspect-square';

  const categories = [
    {
      title: 'Frontend',
      items: [
        {
          name: 'HTML',
          icon: (
            <FaHtml5 className={`${iconBase} ${iconSize} text-orange-500`} />
          ),
        },
        {
          name: 'CSS',
          icon: (
            <FaCss3Alt className={`${iconBase} ${iconSize} text-blue-500`} />
          ),
        },
        {
          name: 'JavaScript',
          icon: <FaJs className={`${iconBase} ${iconSize} text-yellow-400`} />,
        },
        {
          name: 'TypeScript',
          icon: (
            <SiTypescript
              className={`${iconBase} ${iconSize} text-[#3178C6]`}
            />
          ),
        },

        {
          name: 'React',
          icon: <FaReact className={`${iconBase} ${iconSize} text-cyan-400`} />,
        },
        {
          name: 'Zustand',
          icon: (
            <img
              src="zustand.png"
              alt="Zustand"
              className={`${iconBase} ${iconSize} object-contain`} // object-contain para que escale bien
            />
          ),
        },

        {
          name: 'Tailwind',
          icon: (
            <SiTailwindcss className={`${iconBase} ${iconSize} text-sky-400`} />
          ),
        },
        {
          name: 'Bootstrap',
          icon: (
            <SiBootstrap
              className={`${iconBase} ${iconSize} text-purple-600`}
            />
          ),
        },
      ],
    },
    {
      title: 'Herramientas',
      items: [
        {
          name: 'Vite',
          icon: (
            <SiVite className={`${iconBase} ${iconSize} text-purple-500`} />
          ),
        },
        {
          name: 'Git',
          icon: <FaGitAlt className={`${iconBase} ${iconSize} text-red-500`} />,
        },
        {
          name: 'Vercel',
          icon: <SiVercel className={`${iconBase} ${iconSize}`} />,
        },
      ],
    },
    {
      title: 'Extras',
      items: [
        {
          name: 'PHP',
          icon: <FaPhp className={`${iconBase} ${iconSize} text-indigo-600`} />,
        },
        {
          name: 'MySQL',
          icon: (
            <FaDatabase
              className={`${iconBase} ${iconSize} text-emerald-600`}
            />
          ),
        },
      ],
    },
  ];

  return (
    // 1) IGUAL QUE PROJECTS: container-p en el SECTION
    <section
      id="stack"
      className="container-p py-16 md:py-24 bg-transparent scroll-mt-24 md:scroll-mt-28"
    >
      {/* 2) Título: SOLO padding lateral, sin container-p */}
      <div className="mb-10 px-5 sm:px-0">
        <div className="flex items-center gap-3">
          <FaLayerGroup className="text-2xl md:text-3xl text-slate-900 dark:text-white" />
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">
            Stack
          </h2>
        </div>
        {/* barrita igual que Projects */}
        <div className="mt-3 h-0.5 w-full bg-gradient-to-r from-yellow-400 via-sky-400 to-purple-500" />
      </div>

      {/* 3) Contenido: SOLO padding lateral, sin container-p */}
      <div className="px-5 sm:px-0 space-y-12">
        {/* FRONTEND */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-6 text-slate-900 dark:text-white">
            Frontend
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5 sm:gap-6 justify-items-center sm:justify-items-stretch">
            {categories[0].items.map((t) => (
              <div
                key={t.name}
                className="card px-4 py-5 sm:px-6 sm:py-6 gap-2 sm:gap-3
                           flex flex-col items-center justify-center
                           w-full max-w-[160px] mx-auto
                           sm:max-w-none sm:w-auto sm:mx-0
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

        {/* HERRAMIENTAS + EXTRAS */}
        <div className="flex flex-col md:flex-row md:gap-12 gap-12">
          {categories.slice(1).map((cat, index) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className={`flex-1 ${cat.title === 'Extras' ? 'md:ml-6 lg:ml-12' : ''}`}
            >
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-6 text-slate-900 dark:text-white">
                {cat.title}
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 sm:gap-6 justify-items-center sm:justify-items-stretch">
                {cat.items.map((t) => (
                  <div
                    key={t.name}
                    className="card px-4 py-5 sm:px-6 sm:py-6 gap-2 sm:gap-3
                       flex flex-col items-center justify-center
                       w-full max-w-[160px] mx-auto
                       sm:max-w-none sm:w-auto sm:mx-0
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

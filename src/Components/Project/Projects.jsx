import { useState } from 'react';
import { FaCode, FaReact } from 'react-icons/fa';

import Counter from '../../MiniApps/Counter/Counter.jsx';
import Todo from '../../MiniApps/Todo/Todo.jsx';
import ControlledForm from '../../MiniApps/Controlled/Controlled.jsx';
import CustomUI from '../../MiniApps/CustomUI/CustomUI.jsx';

import ProjectCard from './ProjectsCard.jsx';
import Modal from '../Modal.jsx';
import TodoPreview from './TodoPreview.jsx';
import AmigoInvisible from '../../MiniApps/AmigoInvisible/AmigoInvisible.jsx';

/* ========= Enlaces a GitHub ========= */
const GH_USER = 'Andraxmm';
const GH_REPO = 'portfolio';
const GH_BRANCH = 'main';

const gh = (path) =>
  `https://github.com/${GH_USER}/${GH_REPO}/tree/${GH_BRANCH}/${path}`;

const CODE_LINKS = {
  peliculas: gh('src/MiniApps/BuscadorPeliculas'),
  counter: gh('src/MiniApps/Counter'),
  todo: gh('src/MiniApps/Todo'),
  controlled: gh('src/MiniApps/Controlled'),
  customUI: gh('src/MiniApps/CustomUI'),
  AmigoInvisible: gh('src/MiniApps/AmigoInvisible'),
};
/* ==================================== */

export default function Projects() {
  const [modal, setModal] = useState({ open: false, title: '', content: null });
  const openModal = (title, content) =>
    setModal({ open: true, title, content });
  const closeModal = () => setModal((m) => ({ ...m, open: false }));

  return (
    <section
      id="projects"
      className="container-p py-16 md:py-24 scroll-mt-24 md:scroll-mt-28"
    >
      {/* Título (aire lateral solo móvil) */}
      <div className="mb-10 px-5 sm:px-0">
        <div className="flex items-center gap-3">
          <FaCode className="text-2xl md:text-3xl text-slate-900 dark:text-white" />
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">
            Proyectos
          </h2>
        </div>
        <div className="mt-3 h-0.5 w-full bg-gradient-to-r from-yellow-400 via-sky-400 to-purple-500" />
      </div>

      {/* Proyectos destacados */}
      <div className="mt-6 grid md:grid-cols-2 gap-4 sm:gap-6 gap-y-8 px-5 sm:px-0">
        {/* Buscador de Películas */}
        <div className="w-full max-w-[340px] sm:max-w-none mx-auto mb-8 sm:mb-0">
          <ProjectCard
            title="Buscador de Películas"
            desc="Busca películas en tiempo real con TMDB."
            tags={['React', 'API', 'fetch']}
            code={CODE_LINKS.peliculas}
            preview={
              <div
                className="p-3 sm:p-6 flex flex-col gap-3 sm:gap-4 rounded-lg h-full transition-all duration-300
                bg-gradient-to-br from-indigo-50 via-purple-50 to-white
                hover:shadow-xl hover:-translate-y-1 hover:from-indigo-100 hover:via-purple-100"
              >
                <div className="flex items-center gap-2">
                  <span className="text-indigo-500">🔍</span>
                  <input
                    type="text"
                    placeholder="Busca una película..."
                    disabled
                    className="flex-1 rounded-lg border px-3 py-2 text-[13px] sm:text-base bg-white text-slate-600 shadow-md"
                  />
                </div>
                <div className="space-y-2 text-xs sm:text-sm">
                  <div className="h-2.5 w-3/4 bg-indigo-200 rounded animate-pulse"></div>
                  <div className="h-2.5 w-2/3 bg-purple-200 rounded animate-pulse"></div>
                  <div className="h-2.5 w-1/2 bg-pink-200 rounded animate-pulse"></div>
                </div>
              </div>
            }
            demoHref="/peliculas"
          />

          {/* Aviso de cambios en curso — visible en móvil y PC */}
          <span
            className="mt-2 inline-block text-xs px-2 py-0.5 rounded-full
                bg-yellow-100 text-yellow-800 font-medium
                dark:bg-yellow-700 dark:text-yellow-100
                ring-1 ring-yellow-200 dark:ring-yellow-400/50"
          >
            ⚠️ Sección en desarrollo
          </span>

          {/* separador solo móvil */}
          <div className="sm:hidden mt-4 h-1 w-11/12 mx-auto rounded-full bg-gradient-to-r from-transparent via-slate-400/25 to-transparent" />
        </div>

        {/* Biblioteca Personal */}
        <div className="w-full max-w-[340px] sm:max-w-none mx-auto mb-8 sm:mb-0">
          <ProjectCard
            title="Biblioteca Personal"
            desc="Proyecto Fin de Grado desarrollado en PHP con MySQL. Permite gestionar libros, usuarios y panel de administración."
            tags={['Extra', 'PHP', 'MySQL']}
            code="https://github.com/Andraxmm/biblioteca-php"
            preview={
              <div
                className="p-3 sm:p-6 flex flex-col items-center justify-center gap-3 sm:gap-4 rounded-lg h-full transition-all duration-300
                bg-gradient-to-br from-yellow-50 via-rose-50 to-white
                hover:shadow-xl hover:-translate-y-1 hover:from-yellow-100 hover:via-rose-100"
              >
                <span className="text-3xl sm:text-5xl">📚</span>
                <p className="text-[13px] sm:text-base text-center text-slate-600">
                  Login de usuarios, panel de administración y gestión de
                  libros.
                </p>
              </div>
            }
          />
          {/* separador solo móvil */}
          <div className="sm:hidden mt-4 h-1 w-11/12 mx-auto rounded-full bg-gradient-to-r from-transparent via-slate-400/25 to-transparent" />
        </div>
      </div>

      {/* Mini proyectos */}
      <h3 className="mt-10 text-lg sm:text-xl font-bold flex items-center gap-2 px-5 sm:px-0 text-slate-900 dark:text-white">
        <FaReact className="text-cyan-500 text-lg sm:text-2xl" />
        Mini-Proyectos React
      </h3>

      <div className="mt-4 grid gap-4 sm:gap-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 px-5 sm:px-0">
        {[
          {
            Comp: Counter,
            title: 'Counter',
            desc: 'Contador +/− con reset.',
            tags: ['useState'],
            code: CODE_LINKS.counter,
            preview: <Counter />,
          },
          {
            Comp: Todo,
            title: 'To do List',
            desc: 'Añadir, marcar, eliminar tareas.',
            tags: ['listas', 'keys'],
            code: CODE_LINKS.todo,
            preview: <TodoPreview />,
          },
          {
            Comp: ControlledForm,
            title: 'Controlled Inputs',
            desc: 'Formulario controlado + validación.',
            tags: ['formularios'],
            code: CODE_LINKS.controlled,
            preview: <ControlledForm />,
          },
          {
            title: 'Amigo Invisible',
            desc: 'Asignación por sorteo.',
            tags: ['formularios'],
            code: CODE_LINKS.AmigoInvisible,
            demoHref: '/amigo-invisible',
            preview: <AmigoInvisible />,
          },
          {
            Comp: CustomUI,
            title: 'Customizador de UI',
            desc: 'Persistencia de datos + manejo de estado para personalizar la UI.',
            tags: ['localStorage', 'Tailwind CSS'],
            code: CODE_LINKS.customUI,
            preview: <CustomUI persist={false} />,
          },
        ].map(({ Comp, title, desc, tags, code, preview }, i) => (
          <div
            key={i}
            className="w-full max-w-[300px] sm:max-w-none mx-auto mb-8 sm:mb-0"
          >
            <ProjectCard
              title={title}
              desc={desc}
              tags={tags}
              code={code}
              onDemo={openModal}
              preview={preview}
            >
              <Comp />
            </ProjectCard>
            {/* separador solo móvil */}
            <div className="sm:hidden mt-4 h-1 w-11/12 mx-auto rounded-full bg-gradient-to-r from-transparent via-slate-400/25 to-transparent" />
          </div>
        ))}
      </div>

      {/* Modal común */}
      <Modal open={modal.open} onClose={closeModal} title={modal.title}>
        {modal.content}
      </Modal>
    </section>
  );
}

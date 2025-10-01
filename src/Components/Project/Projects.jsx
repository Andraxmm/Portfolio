import { useState } from "react";
import { FaCode, FaReact } from "react-icons/fa";

import Counter from "../../MiniApps/Counter/Counter.jsx";
import Todo from "../../MiniApps/Todo/Todo.jsx";
import ControlledForm from "../../MiniApps/Controlled/Controlled.jsx";
import CustomUI from "../../MiniApps/CustomUI/CustomUI.jsx";

import ProjectCard from "./ProjectsCard.jsx";
import Modal from "../Modal.jsx";
import TodoPreview from "./TodoPreview.jsx";

/* ========= Enlaces a GitHub ========= */
// ⚙️ Ajusta estos valores a tu cuenta/repositorio
const GH_USER   = "Andraxmm";
const GH_REPO   = "portfolio";   // nombre del repo en GitHub
const GH_BRANCH = "main";        // "main" o "master"

// Helper para construir URLs a carpetas del repo
const gh = (path) =>
  `https://github.com/${GH_USER}/${GH_REPO}/tree/${GH_BRANCH}/${path}`;

// Mapa de rutas por mini-app (según tu estructura)
const CODE_LINKS = {
  peliculas: gh("src/MiniApps/BuscadorPeliculas"),
  counter: gh("src/MiniApps/Counter"),
  todo: gh("src/MiniApps/Todo"),
  controlled: gh("src/MiniApps/Controlled"),
  customUI: gh("src/MiniApps/CustomUI"),
};
/* ==================================== */

export default function Projects() {
  const [modal, setModal] = useState({ open: false, title: "", content: null });
  const openModal = (title, content) =>
    setModal({ open: true, title, content });
  const closeModal = () => setModal((m) => ({ ...m, open: false }));

  return (
    <section id="projects" className="container-p py-16 md:py-24">
      {/* Título con icono y línea */}
      <div className="mb-10">
        <div className="flex items-center gap-3">
          {/* Icono simple, sin fondo */}
          <FaCode className="text-2xl md:text-3xl text-slate-900 dark:text-white" />
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">
            Proyectos
          </h2>
        </div>
        <div className="mt-3 h-0.5 w-full bg-gradient-to-r from-yellow-400 via-sky-400 to-purple-500" />
      </div>

      {/* Proyecto destacado */}
      <div className="mt-6 grid md:grid-cols-2 gap-6">
        <ProjectCard
          title="Buscador de Películas"
          desc="Busca películas en tiempo real con TMDB."
          tags={["React", "API", "fetch"]}
          code={CODE_LINKS.peliculas}
          preview={
            <div
              className="p-6 flex flex-col gap-4 rounded-lg h-full transition-all duration-300
                 bg-gradient-to-br from-indigo-50 via-purple-50 to-white
                 hover:shadow-xl hover:-translate-y-1 hover:from-indigo-100 hover:via-purple-100"
            >
              {/* Input con icono */}
              <div className="flex items-center gap-2">
                <span className="text-indigo-500">🔍</span>
                <input
                  type="text"
                  placeholder="Busca una película..."
                  disabled
                  className="flex-1 rounded-lg border px-3 py-2 text-sm 
                             bg-white text-slate-600 shadow-md"
                />
              </div>

              {/* Resultados simulados */}
              <div className="space-y-2 text-sm">
                <div className="h-4 w-3/4 bg-indigo-200 rounded animate-pulse"></div>
                <div className="h-4 w-2/3 bg-purple-200 rounded animate-pulse"></div>
                <div className="h-4 w-1/2 bg-pink-200 rounded animate-pulse"></div>
              </div>
            </div>
          }
          demoHref="/peliculas"
        />
      </div>

      {/* Mini proyectos */}
      <h3 className="mt-10 text-xl font-bold flex items-center gap-2 text-slate-900 dark:text-white">
        <FaReact className="text-cyan-500 text-2xl" />
        Mini-Proyectos React
      </h3>

      <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Counter */}
        <ProjectCard
          title="Counter"
          desc="Contador +/− con reset."
          tags={["useState"]}
          code={CODE_LINKS.counter}
          onDemo={openModal}
          preview={<Counter />}
        >
          <Counter />
        </ProjectCard>

        {/* Todo */}
        <ProjectCard
          title="Todo List"
          desc="Añadir, marcar, eliminar tareas."
          tags={["listas", "keys"]}
          code={CODE_LINKS.todo}
          onDemo={openModal}
          preview={<TodoPreview />} // preview estático
        >
          <Todo key={`todo-${Date.now()}`} /> {/* remount para limpiar estado */}
        </ProjectCard>

        {/* Controlled Inputs */}
        <ProjectCard
          title="Controlled Inputs"
          desc="Formulario controlado + validación."
          tags={["formularios"]}
          code={CODE_LINKS.controlled}
          onDemo={openModal}
          preview={<ControlledForm />}
        >
          <ControlledForm />
        </ProjectCard>

        {/* Customizador UI */}
        <ProjectCard
          title="Customizador de UI"
          desc="Persistencia de datos + manejo de estado para personalizar la UI."
          tags={["localStorage", "Tailwind CSS"]}
          code={CODE_LINKS.customUI}
          onDemo={openModal}
          preview={<CustomUI persist={false} />}
        >
          <CustomUI persist={false} />
        </ProjectCard>
      </div>

      {/* Modal común */}
      <Modal open={modal.open} onClose={closeModal} title={modal.title}>
        {modal.content}
      </Modal>
    </section>
  );
}

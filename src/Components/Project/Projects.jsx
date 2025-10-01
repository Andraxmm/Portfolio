import { useState } from "react";

import Counter from "../../MiniApps/Counter/Counter.jsx";
import Todo from "../../MiniApps/Todo/Todo.jsx";
import ControlledForm from "../../MiniApps/Controlled/Controlled.jsx";
import CustomUI from "../../MiniApps/CustomUI/CustomUI.jsx";

import ProjectCard from "./ProjectsCard.jsx";
import Modal from "../Modal.jsx";
import TodoPreview from "./TodoPreview.jsx";


export default function Projects() {
  const [modal, setModal] = useState({ open: false, title: '', content: null });
  const openModal = (title, content) => setModal({ open: true, title, content });
  const closeModal = () => setModal(m => ({ ...m, open: false }));

  return (
    <section id="projects" className="container-p py-16 md:py-24">
      <h2 className="text-3xl font-bold">Proyectos</h2>

      <div className="mt-6 grid md:grid-cols-2 gap-6">
   <ProjectCard
  title="Buscador de Películas"
  desc="Busca películas en tiempo real con TMDB."
  tags={['React', 'API', 'fetch']}
  code="#"
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

      <h3 className="mt-10 text-xl font-bold">Mini-Proyectos React</h3>
      <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Counter: preview sin interacción + demo en modal */}
        <ProjectCard
          title="Counter"
          desc="Contador +/− con reset."
          tags={['useState']}
          code="#"
          onDemo={openModal}
          preview={<Counter />}     
        >
          <Counter />               
        </ProjectCard>

        {/* Placeholders hasta que construyas las mini-apps */}
        {/* Todo: preview estático + estado limpio al abrir la demo */}
        <ProjectCard
          title="Todo List"
          desc="Añadir, marcar, eliminar tareas."
          tags={['listas','keys']}
          code="#"
          onDemo={openModal}
          preview={<TodoPreview />}   // 👈 antes era <Todo />
        >
          <Todo key={`todo-${Date.now()}`} />  {/* 👈 remount para limpiar estado */}
        </ProjectCard>


        
        <ProjectCard
          title="Controlled Inputs"
          desc="Formulario controlado + validación."
          tags={['formularios']}
          code="#"
          onDemo={openModal}
          preview={<ControlledForm />}
        >
          <ControlledForm />
        </ProjectCard>

        <ProjectCard
        title="Customizador de UI"
        desc="Persistencia de datos + manejo de estado para personalizar la UI."
        tags={['localStorage', 'Tailwind CSS']}
        code="#"
        onDemo={openModal}
        preview={<CustomUI persist={false} />}
      >
        <CustomUI persist={false} />
      </ProjectCard> 

      </div>

      {/* Modal común para todas las demos */}
      <Modal open={modal.open} onClose={closeModal} title={modal.title}>
        {modal.content}
      </Modal>
    </section>
  );
}
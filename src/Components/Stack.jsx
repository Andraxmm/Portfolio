import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaGitAlt } from "react-icons/fa";
import { SiVite } from "react-icons/si";


export default function Stack() {
  const tech = [
    { name: "HTML", icon: <FaHtml5 className="text-orange-500 text-4xl" /> },
    { name: "CSS", icon: <FaCss3Alt className="text-blue-500 text-4xl" /> },
    { name: "JavaScript", icon: <FaJs className="text-yellow-400 text-4xl" /> },
    { name: "React", icon: <FaReact className="text-cyan-400 text-4xl" /> },
    { name: "Vite", icon: <SiVite className="text-purple-500 text-4xl" /> },
    { name: "Git", icon: <FaGitAlt className="text-red-500 text-4xl" /> },
  ];

  return (
    <section id="stack" className="container-p py-16 md:py-24">
      <h2 className="text-3xl font-bold">Stack</h2>
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
        {tech.map((t) => (
          <div
            key={t.name}
            className="card p-6 flex flex-col items-center justify-center gap-2
                       hover:-translate-y-2 hover:shadow-lg transition-all duration-300
                       group"
          >
            <div className="opacity-80 group-hover:opacity-100 transition">
              {t.icon}
            </div>
            <span className="font-semibold">{t.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

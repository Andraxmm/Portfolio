export default function About() {
  return (
    <section id="about" className="container-p py-16 md:py-24">
      <h2 className="text-3xl font-bold">Sobre mí</h2>
      <p className="mt-4 max-w-3xl text-slate-600">
        Soy una desarrolladora frontend junior con foco en React, JavaScript y accesibilidad.
        Disfruto convertir diseños en experiencias usables y mantener el código claro.
        Actualmente construyo mini-apps para consolidar fundamentos (estado, efectos, formularios, fetch).
      </p>
      <ul className="mt-6 grid md:grid-cols-3 gap-3 text-slate-700">
        <li className="card p-4">✔️ Bases sólidas de React (hooks, props, listas, condicionales)</li>
        <li className="card p-4">✔️ Llamadas a API y manejo de loading/error</li>
        <li className="card p-4">✔️ Git/GitHub y deploy en Netlify/Vercel</li>
      </ul>
    </section>
  )
}
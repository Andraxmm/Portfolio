export default function Contact() {
  return (
    <section id="contact" className="container-p py-16 md:py-24">
      <h2 className="text-3xl font-bold">Contacto</h2>
      <p className="mt-2 text-slate-600">¿Hablamos? Escríbeme en LinkedIn o por email.</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <a className="btn" href="mailto:tucorreo@ejemplo.com">Email</a>
        <a className="btn-outline" href="https://www.linkedin.com/" target="_blank" rel="noreferrer">LinkedIn</a>
      </div>
    </section>
  )
}
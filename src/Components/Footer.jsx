export default function Footer() {
  return (
    <footer className="border-t border-slate-200">
      <div className="container-p py-6 text-sm text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
        <span>© {new Date().getFullYear()} Andrea Maña Moreno</span>
        <span>Hecho con React + Tailwind</span>
      </div>
    </footer>
  )
}
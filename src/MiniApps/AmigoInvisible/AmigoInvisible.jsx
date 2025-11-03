/* eslint-disable */
import { useState, useRef, useEffect } from "react";

export default function AmigoInvisible() {
  const [vista, setVista] = useState("inicio"); // Inicio / organizador / reveal
  const [nombre, setNombre] = useState("");
  const [participantes, setParticipantes] = useState([]);
  const [asignaciones, setAsignaciones] = useState(null);
  const [participantesLink, setParticiantesLink] = useState([]); // { name, token, revealLink, used }
  const [revealName, setRevealName] = useState(null);
  const [revealLoading, setRevealLoading] = useState(false);
  const [revealError, setRevealError] = useState(null);
  const [confirmReset, setConfirmReset] = useState(false);

  // UX extras
  const [toast, setToast] = useState(null);
  const toastTimeoutRef = useRef(null);
  const confirmTimeoutRef = useRef(null);
  const revealRef = useRef(null);
  const [confettiCount, setConfettiCount] = useState(50);

  // --- Lifecycle: cargar sesión guardada (si existe) ---
  useEffect(() => {
    try {
      const raw = localStorage.getItem("sorteo-amigo");
      if (raw) {
        const data = JSON.parse(raw);
        if (Array.isArray(data.participants)) setParticipantes(data.participants);
        if (data.assignments) setAsignaciones(data.assignments);
        if (Array.isArray(data.participantsWithLinks)) setParticiantesLink(data.participantsWithLinks);
      }
    } catch (err) {
      console.warn("No se pudo recuperar sesión:", err);
    }
  }, []);

  // mover foco al nombre revelado y anunciarlo a lectores de pantalla
  useEffect(() => {
    if (revealName && revealRef.current) {
      revealRef.current.focus();
    }
  }, [revealName]);

  // confetti responsive (menos piezas en móvil)
  useEffect(() => {
    function update() {
      try {
        const w = window.innerWidth;
        setConfettiCount(w < 640 ? 20 : 50);
      } catch {
        setConfettiCount(50);
      }
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // limpiar timeouts al desmontar (toast / confirm)
  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
      if (confirmTimeoutRef.current) clearTimeout(confirmTimeoutRef.current);
    };
  }, []);

  function showToast(msg, ms = 2500) {
    // limpia timeout anterior si existe
    setToast(msg);
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => {
      setToast(null);
      toastTimeoutRef.current = null;
    }, ms);
  }

  // Guardar sesión en localStorage: llamada centralizada
  function persistSession(state = {}) {
    // construimos el objeto a persistir (manteniendo compatibilidad con el formato previo)
    const payload = {
      participants: state.participants ?? participantes,
      assignments: state.assignments ?? asignaciones,
      participantsWithLinks: state.participantsWithLinks ?? participantesLink,
      createdAt: new Date().toISOString(),
    };
    try {
      localStorage.setItem("sorteo-amigo", JSON.stringify(payload));
    } catch (err) {
      console.warn("No se pudo guardar la sesión:", err);
    }
  }

  function asignarAmigos(participantes) {
    let amigosAsignados = [...participantes];

    function barajar(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

    let intento = 0;

    do {
      barajar(amigosAsignados);
      intento++;
      if (intento > 1000) break;
    } while (amigosAsignados.some((amigo, i) => amigo === participantes[i]));

    const asignacionesFinales = {};
    participantes.forEach((nombre, i) => {
      asignacionesFinales[nombre] = amigosAsignados[i];
    });
    return asignacionesFinales;
  }

  function generarSorteo() {
    if (participantes.length < 2) {
      showToast("Añade al menos 2 participantes...");
      return;
    }

    const resultado = asignarAmigos(participantes);
    setAsignaciones(resultado);

    const linksList = generateLinks(resultado, participantes);
    setParticiantesLink(linksList);

    // persistimos toda la sesión
    persistSession({
      participants: participantes,
      assignments: resultado,
      participantsWithLinks: linksList,
    });

    console.log("Sorteo generado", resultado);
    console.log("Links generados:", linksList);
    showToast("Sorteo generado ✅");
  }

  function resetSession() {
    if (!confirmReset) {
      setConfirmReset(true);
      showToast("Pulsa de nuevo para confirmar el reinicio");
      // reset automático del estado de confirmación pasado X segundos
      if (confirmTimeoutRef.current) clearTimeout(confirmTimeoutRef.current);
      confirmTimeoutRef.current = setTimeout(() => {
        setConfirmReset(false);
        confirmTimeoutRef.current = null;
      }, 3000);
      return;
    }

    // Reseteo completo
    setAsignaciones(null);
    setParticipantes([]);
    setNombre("");
    setParticiantesLink([]);
    setRevealName(null);
    setRevealError(null);
    setRevealLoading(false);

    // Limpiar almacenamiento local y url
    try {
      localStorage.removeItem("sorteo-amigo");
    } catch (err) {
      console.warn("No se pudo limpiar localStorage:", err);
    }
    window.history.replaceState({}, document.title, window.location.pathname);

    // Mostrar mensaje temporal
    showToast("Sesión reiniciada 🤗");

    // Mantener en la vista organizador (según tu preferencia)
    setVista("organizador");

    // limpiar confirm flag
    setConfirmReset(false);
    if (confirmTimeoutRef.current) {
      clearTimeout(confirmTimeoutRef.current);
      confirmTimeoutRef.current = null;
    }
  }

  function generarToken(tokenExistente = new Set()) {
    // Evitamos caracteres ambiguos O/0, I/1 si quieres
    const CHARS = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
    function oneBlock(len) {
      let s = "";
      for (let i = 0; i < len; i++) {
        s += CHARS[Math.floor(Math.random() * CHARS.length)];
      }
      return s;
    }

    let token;
    let intentos = 0;
    do {
      token = `${oneBlock(3)}-${oneBlock(3)}`;
      intentos++;
      if (intentos > 1000) throw new Error("No se pudo generar un token único");
    } while (tokenExistente.has(token));
    return token;
  }

  function encodeBase64Url(str) {
    const bytes = new TextEncoder().encode(str);
    let binary = "";
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    const b64 = btoa(binary);
    return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  }

  function decodeBase64Url(b64) {
    let s = b64.replace(/-/g, "+").replace(/_/g, "/");
    while (s.length % 4) s += "=";
    const binary = atob(s);
    const bytes = new Uint8Array([...binary].map((ch) => ch.charCodeAt(0)));
    const decoded = new TextDecoder().decode(bytes);
    return JSON.parse(decoded);
  }

  function buildRevealLink(encodedPayload) {
    return `${window.location.origin}${window.location.pathname}?data=${encodedPayload}`;
  }

  function generateLinks(assignments, participantes) {
    const existing = new Set();
    const list = [];

    for (const name of participantes) {
      const receiver = assignments[name];
      if (!receiver) {
        console.error(`No se encontró receptor para ${name}`);
        continue;
      }

      try {
        const token = generarToken(existing);
        existing.add(token);

        const payload = { t: token, r: receiver };
        const payloadStr = JSON.stringify(payload);
        const encoded = encodeBase64Url(payloadStr);
        const link = buildRevealLink(encoded);

        list.push({ name, token, revealLink: link, used: false });
      } catch (err) {
        console.error(`Error generando enlace para ${name}:`, err);
      }
    }
    return list;
  }

  function revealUrl() {
    setRevealError(null);
    setRevealName(null);
    setRevealLoading(true);

    const params = new URLSearchParams(window.location.search);
    const data = params.get("data");

    if (!data) {
      setRevealLoading(false);
      setRevealError("No se encontró información en el enlace.");
      return;
    }

    try {
      const payload = decodeBase64Url(data);

      if (!payload || typeof payload !== "object" || !payload.r || !payload.t) {
        throw new Error("Payload inválido");
      }

      setRevealName(payload.r);

      // Marcamos el token como usado en participantesLink (si existe)
      setParticiantesLink((prev) => {
        if (!Array.isArray(prev) || prev.length === 0) return prev;
        const updated = prev.map((item) =>
          item.token === payload.t ? { ...item, used: true } : item
        );
        // Persistimos la marca "used" en localStorage
        try {
          const raw = localStorage.getItem("sorteo-amigo");
          if (raw) {
            const session = JSON.parse(raw);
            session.participantsWithLinks = updated;
            localStorage.setItem("sorteo-amigo", JSON.stringify(session));
          }
        } catch (err) {
          console.warn("No se pudo actualizar localStorage al marcar usado:", err);
        }
        return updated;
      });

      setRevealLoading(false);
    } catch (err) {
      console.error("Error al decodificar el enlace:", err);
      setRevealLoading(false);
      setRevealError("Enlace no válido o corrupto 😕");
    }
  }

  // --- helpers UX / validación del input ---
  function handleAddParticipant(rawName) {
    const trimmed = rawName.trim();
    if (!trimmed) {
      showToast("Introduce un nombre válido");
      return;
    }
    // evitar duplicados case-insensitive
    const exists = participantes.some((p) => p.toLowerCase() === trimmed.toLowerCase());
    if (exists) {
      showToast("Ese nombre ya está añadido");
      return;
    }
    const next = [...participantes, trimmed];
    setParticipantes(next);
    setNombre("");
    // persistimos participants al añadir
    persistSession({ participants: next, assignments: asignaciones, participantsWithLinks: participantesLink });
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden"
      style={{
        background:
          "radial-gradient(1200px 600px at 10% 5%, rgba(99,102,241,0.12) 0%, transparent 18%)," +
          "radial-gradient(800px 400px at 90% 85%, rgba(99,102,241,0.08) 0%, transparent 20%)," +
          "linear-gradient(180deg, #0f172a 0%, #0b2540 35%, #3b1f2b 100%)",
      }}
    >
      {/* Botón para volver al portfolio */}
      <a
        href="http://localhost:5173/#home"
        className="absolute top-4 left-4 z-50 flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-full backdrop-blur-md shadow-md transition-all duration-300"
      >
        <span>🏠</span>
        <span>Volver al portfolio</span>
      </a>

      {/* Ambiente navideño SVGs  */}
      <svg className="pointer-events-none absolute left-6 top-8 w-56 opacity-20 blur-sm" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <circle cx="40" cy="40" r="40" fill="#60a5fa" />
        <circle cx="150" cy="80" r="30" fill="#34d399" />
      </svg>

      <svg className="pointer-events-none absolute inset-0 w-full h-full" aria-hidden>
        <g className="stars">
          <circle cx="18%" cy="12%" r="1.6" fill="#fff9" />
          <circle cx="36%" cy="18%" r="1.2" fill="#fff7" />
          <circle cx="72%" cy="8%" r="1.4" fill="#fff8" />
          <circle cx="82%" cy="28%" r="1.0" fill="#fff7" />
          <circle cx="28%" cy="36%" r="1.1" fill="#fff6" />
          <circle cx="60%" cy="44%" r="1.3" fill="#fff9" />
        </g>
      </svg>

      {/* Guirnalda superior (sin cambios) */}
      <svg className="pointer-events-none absolute top-0 left-0 right-0 mx-auto w-full max-w-4xl h-14" viewBox="0 0 1200 60" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <defs>
          <linearGradient id="gRope" x1="0" x2="1">
            <stop offset="0" stopColor="#fde68a" stopOpacity="0.06" />
            <stop offset="1" stopColor="#fb7185" stopOpacity="0.04" />
          </linearGradient>
        </defs>
        <path d="M0 48 C150 5, 350 5, 500 48 S 850 90, 1200 48" stroke="url(#gRope)" strokeWidth="4" fill="none" />
        <circle cx="160" cy="48" r="6" fill="#f87171" />
        <circle cx="320" cy="48" r="5" fill="#fbbf24" />
        <circle cx="480" cy="48" r="7" fill="#34d399" />
        <circle cx="640" cy="48" r="5" fill="#60a5fa" />
        <circle cx="800" cy="48" r="6" fill="#a78bfa" />
        <circle cx="960" cy="48" r="5" fill="#fb7185" />
      </svg>

      {/* Card central */}
      <main className="w-full max-w-3xl mx-auto relative z-30">
        <div
          className="mx-auto p-6 rounded-3xl shadow-2xl backdrop-blur-md"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.06)",
            boxShadow: "0 14px 40px rgba(2,6,23,0.55), inset 0 1px 0 rgba(255,255,255,0.02)",
          }}
        >
          <header className="flex items-center justify-center gap-4 py-2">
            <span className="text-5xl sm:text-4xl leading-none">✨</span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white drop-shadow text-center">
              Amigo Invisible
            </h1>
          </header>

          {/* --- VISTA INICIO --- */}
          {vista === "inicio" && (
            <section className="mt-6 text-center">
              <p className="text-sm text-white/80">Organiza tu sorteo navideño en segundos.</p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => setVista("organizador")}
                  className="px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold shadow-md transform transition duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-emerald-300/30"
                  aria-label="Ir a vista organizador"
                >
                  Soy el organizador
                </button>

                <button
                  onClick={() => setVista("reveal")}
                  className="px-6 py-3 rounded-full bg-red-500 hover:bg-red-600 text-white font-semibold shadow-md transform transition duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-300/30"
                  aria-label="Ir a vista reveal"
                >
                  Revelar enlace
                </button>
              </div>
            </section>
          )}

          {/* --- VISTA ORGANIZADOR --- */}
          {vista === "organizador" && (
            <section className="mt-6 text-left">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Vista organizador</h2>
                <span className="ml-2 text-sm bg-white/10 px-2 py-1 rounded-full text-white">
                  {participantes.length} participantes
                </span>
              </div>

              <div className="mt-4 flex flex-col sm:flex-row gap-3 items-center">
                <div className="relative w-full">
                  <input
                    value={nombre}
                    type="text"
                    placeholder="Nombre del participante"
                    onChange={(e) => setNombre(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleAddParticipant(nombre);
                    }}
                    className="w-full pr-12 px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-emerald-300/20"
                    aria-label="Nombre del participante"
                  />
                  <button
                    onClick={() => setNombre("")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-sm bg-white/6 px-2 py-1 rounded"
                    aria-label="Limpiar nombre"
                    title="Limpiar"
                  >
                    ✖
                  </button>
                </div>

                <button
                  onClick={() => handleAddParticipant(nombre)}
                  className="px-5 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-semibold shadow-md transform transition duration-200 hover:scale-105"
                  aria-label="Agregar participante"
                >
                  Agregar
                </button>
              </div>

              <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {participantes.map((p, i) => (
                  <li
                    key={i}
                    className="bg-white/6 border border-white/8 rounded-lg px-4 py-3 shadow-inner text-white flex items-center justify-between"
                  >
                    <span className="truncate">{p}</span>
                    <button
                      onClick={() => {
                        const next = participantes.filter((_, idx) => idx !== i);
                        setParticipantes(next);
                        persistSession({ participants: next, assignments: asignaciones, participantsWithLinks: participantesLink });
                      }}
                      className="ml-3 text-xs px-2 py-1 rounded bg-red-600/90 hover:bg-red-700/90 text-white"
                      aria-label={`Eliminar ${p}`}
                    >
                      ✖
                    </button>
                  </li>
                ))}
              </ul>

              {participantesLink && participantesLink.length > 0 && (
                <div className="mt-6 bg-white/5 p-4 rounded-lg border border-white/8">
                  <h3 className="font-semibold text-white">Enlaces generados</h3>
                  <ul className="mt-3 space-y-2">
                    {participantesLink.map((item) => (
                      <li key={item.token} className="flex items-center gap-3 text-white">
                        <div className="flex-1 text-sm">
                          <div className="font-medium">
                            {item.name} <span className="text-xs text-white/60 ml-2">{item.token}</span>
                          </div>
                          <a href={item.revealLink} target="_blank" rel="noreferrer" className="text-xs underline text-amber-200">
                            abrir enlace
                          </a>
                        </div>
                        <div>
                          <button
                            onClick={async () => {
                              try {
                                await navigator.clipboard.writeText(item.revealLink);
                                showToast("Enlace copiado al portapapeles");
                              } catch (err) {
                                console.error("No se pudo copiar:", err);
                                showToast("No se pudo copiar (¡usa copiar manualmente!)");
                              }
                            }}
                            className="bg-cyan-500 hover:bg-cyan-600 text-white rounded-md px-3 py-1 transition"
                            aria-label={`Copiar enlace para ${item.name}`}
                          >
                            Copiar enlace
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-4 flex items-center gap-3">
                <button onClick={generarSorteo} className="bg-cyan-500 hover:bg-cyan-600 text-white rounded-md px-3 py-1 transition">
                  🎲 Generar sorteo
                </button>

                <button
                  onClick={resetSession}
                  className="ml-auto px-3 py-1 bg-white/6 hover:bg-white/10 text-red-300 hover:text-red-400 border border-white/6 rounded-full flex items-center gap-2 transition transform hover:-translate-y-0.5 duration-150"
                  aria-label="Resetear sesión"
                  title="Resetear sesión"
                >
                  <span className="text-lg">🧹</span>
                  <span className="text-sm">{confirmReset ? "Pulsa para confirmar" : "Resetear sesión"}</span>
                </button>
              </div>

              <div className="mt-4">
                <button onClick={() => setVista("inicio")} className="px-3 py-1 bg-white/6 rounded text-white">
                  Volver al inicio
                </button>
              </div>
            </section>
          )}

          {/* --- VISTA PARTICIPANTE (REVEAL) --- */}
          {vista === "reveal" && (
            <section className="mt-6 text-center relative">
              {!revealName && (
                <>
                  <h2 className="text-2xl font-semibold text-amber-200">¿Listo para saberlo?</h2>
                  <p className="mt-2 text-white/80">Haz clic y descubre quién recibirá tu regalo este año 🎁</p>

                  <div className="mt-6 flex justify-center gap-3">
                    <button
                      onClick={revealUrl}
                      disabled={revealLoading}
                      className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-semibold shadow disabled:opacity-60"
                      aria-label="Revelar mi amigo invisible"
                    >
                      {revealLoading ? "Revelando..." : "Revelar mi amigo invisible"}
                    </button>

                    <button onClick={() => setVista("inicio")} className="px-6 py-3 bg-red-100 hover:bg-red-200 text-red-700 rounded-full" aria-label="Volver al inicio">
                      Volver al inicio
                    </button>
                  </div>
                </>
              )}

              {revealError && <p className="mt-4 text-red-300 font-semibold">{revealError}</p>}

              {revealName && (
                <>
                  {/* CONFETTI: aparece solo con revealName */}
                  <div className="pointer-events-none absolute inset-0 z-30">
                    {[...Array(confettiCount)].map((_, i) => {
                      const colors = ["#F87171", "#FB923C", "#FBBF24", "#34D399", "#60A5FA", "#A78BFA"];
                      const left = Math.random() * 100;
                      const size = 6 + Math.random() * 14;
                      const delay = Math.random() * 0.6;
                      const duration = 1.2 + Math.random() * 1.8;
                      const rotate = Math.random() * 360;
                      return (
                        <div
                          key={`conf-${i}`}
                          className="confetti-piece"
                          style={{
                            left: `${left}%`,
                            width: `${size}px`,
                            height: `${size * 0.6}px`,
                            background: colors[i % colors.length],
                            transform: `rotate(${rotate}deg)`,
                            animationDelay: `${delay}s`,
                            animationDuration: `${duration}s`,
                          }}
                          aria-hidden
                        />
                      );
                    })}
                  </div>

                  <div className="mt-8 p-8 bg-gradient-to-br from-green-50 via-red-50 to-white rounded-2xl shadow-inner relative z-40">
                    <h3 className="text-2xl font-bold text-green-800">🎉 ¡Tu amigo invisible es... 🎉</h3>

                    <p
                      ref={revealRef}
                      tabIndex={-1}
                      aria-live="polite"
                      className="mt-4 text-5xl font-extrabold text-red-600 reveal-name"
                    >
                      {revealName}
                    </p>

                    <p className="mt-3 text-gray-600">¡Guarda bien este nombre y prepara un bonito regalo! 🎁</p>

                    <div className="mt-6">
                      <button
                        onClick={() => {
                          setRevealName(null);
                          setRevealError(null);
                          setVista("inicio");
                        }}
                        className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-semibold"
                      >
                        Volver al inicio
                      </button>
                    </div>
                  </div>
                </>
              )}
            </section>
          )}
        </div>

        <footer className="mt-6 text-xs text-white/60 text-center">Hecho con ❤️ — ¡Felices fiestas! 🎄</footer>
      </main>

      {/* Toast */}
      {toast && (
        <div role="status" aria-live="polite" className="fixed left-1/2 transform -translate-x-1/2 bottom-8 z-50">
          <div className="bg-slate-900 text-white px-4 py-2 rounded-lg shadow">{toast}</div>
        </div>
      )}

      {/* Animaciones locales */}
      <style>{`
        .confetti-piece {
          position: absolute;
          top: -6%;
          border-radius: 2px;
          opacity: 0.95;
          z-index: 60;
          transform-origin: center;
          animation-name: confettiFall;
          animation-timing-function: cubic-bezier(.2,.8,.2,1);
          animation-iteration-count: 1;
          will-change: transform, opacity;
        }
        @keyframes confettiFall {
          0% { transform: translateY(-10vh) rotate(0deg) scaleY(1); opacity: 0; }
          20% { opacity: 1; }
          60% { transform: translateY(55vh) rotate(720deg) scaleY(1); }
          80% { transform: translateY(65vh) rotate(900deg) scaleY(0.9); }
          100% { transform: translateY(85vh) rotate(1080deg) scaleY(0.8); opacity: 1; }
        }
        .reveal-name {
          animation: popIn 520ms cubic-bezier(.2,.9,.3,1) both;
          text-shadow: 0 6px 18px rgba(199,46,46,0.15);
        }
        @keyframes popIn {
          0% { transform: scale(.6); opacity: 0; filter: blur(4px); }
          60% { transform: scale(1.06); opacity: 1; filter: blur(0); }
          100% { transform: scale(1); opacity: 1; }
        }
        .stars circle { animation: starTwinkle 3.6s ease-in-out infinite; transform-origin: center; }
        .stars circle:nth-child(1) { animation-delay: 0s; }
        .stars circle:nth-child(2) { animation-delay: 0.8s; }
        .stars circle:nth-child(3) { animation-delay: 1.3s; }
        .stars circle:nth-child(4) { animation-delay: 2s; }
        .stars circle:nth-child(5) { animation-delay: 2.6s; }
        .stars circle:nth-child(6) { animation-delay: 3.2s; }
        @keyframes starTwinkle {
          0%,100% { opacity: 0.45; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @media (prefers-reduced-motion: reduce) {
          .confetti-piece { animation: none !important; opacity: 0; }
          .reveal-name { animation: none !important; transform: none !important; }
          .stars circle { animation: none !important; }
        }
      `}</style>
    </div>
  );
}

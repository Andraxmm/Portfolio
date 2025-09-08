import { useEffect, useRef, useState } from "react";

export default function CustomUI({ persist = true }) {
  // 1) Paletas tal cual
  const paletasDeColores = {
    claro: {
      nombre: 'Claro',
      fondo: 'bg-white',
      texto: 'text-gray-800',
      claseFondo: 'bg-gray-200',
      altoContraste: { fondo: 'bg-black', texto: 'text-yellow-400' }
    },
    oscuro: {
      nombre: 'Oscuro',
      fondo: 'bg-gray-800',
      texto: 'text-white',
      claseFondo: 'bg-gray-700',
      altoContraste: { fondo: 'bg-black', texto: 'text-yellow-400' }
    },
    azul: {
      nombre: 'Azul',
      fondo: 'bg-blue-100',
      texto: 'text-blue-900',
      claseFondo: 'bg-blue-200',
      altoContraste: { fondo: 'bg-black', texto: 'text-yellow-400' }
    },
    verde: {
      nombre: 'Verde',
      fondo: 'bg-green-100',
      texto: 'text-green-900',
      claseFondo: 'bg-green-200',
      altoContraste: { fondo: 'bg-black', texto: 'text-yellow-400' }
    }
  };

  // 2) Guardamos lo que había en localStorage (para restaurar si fuese necesario)
  const originalRef = useRef({
    tema: localStorage.getItem('tema'),
    tamanoFuente: localStorage.getItem('tamanoFuente'),
    tipoFuente: localStorage.getItem('tipoFuente'),
    altoContraste: localStorage.getItem('altoContraste'),
  });

  // 3) Tema inicial para las demos (sin persistencia)
  const temaInicialDemo = (() => {
    const saved = localStorage.getItem('theme'); // guardado por App
    const isDark = saved ? saved === 'dark' : document.documentElement.classList.contains('dark');
    return isDark ? 'oscuro' : 'claro';
  })();

  // 4) Estados
  const [tema, setTema] = useState(() => {
    return persist
      ? (localStorage.getItem('tema') || 'claro')
      : temaInicialDemo;
  });
  const [tamanoFuente, setTamanoFuente] = useState(() =>
    persist ? (localStorage.getItem('tamanoFuente') || 'mediano') : 'mediano'
  );
  const [tipoFuente, setTipoFuente] = useState(() =>
    persist ? (localStorage.getItem('tipoFuente') || 'sans') : 'sans'
  );
  const [altoContraste, setAltoContraste] = useState(() =>
    persist ? (localStorage.getItem('altoContraste') === 'true') : false
  );

  // 5) Efectos de guardado (solo si persist=true)
  useEffect(() => {
    if (persist) localStorage.setItem('tema', tema);
  }, [tema, persist]);

  useEffect(() => {
    if (persist) localStorage.setItem('tamanoFuente', tamanoFuente);
  }, [tamanoFuente, persist]);

  useEffect(() => {
    if (persist) localStorage.setItem('tipoFuente', tipoFuente);
  }, [tipoFuente, persist]);

  useEffect(() => {
    if (persist) localStorage.setItem('altoContraste', altoContraste.toString());
  }, [altoContraste, persist]);

  // Nuevo efecto para sincronizar con el tema claro/oscuro del portafolio.
  useEffect(() => {
    if (!persist) {
      // Usamos MutationObserver para detectar cambios en los atributos del <html>
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.attributeName === 'class') {
            const isDarkNow = document.documentElement.classList.contains('dark');
            // Si el portafolio está en oscuro, ponemos el tema 'oscuro' en la app.
            if (isDarkNow) {
              setTema('oscuro');
            } else if (tema === 'oscuro') {
              // Si el portafolio se va a claro, y la app estaba en oscuro,
              // la app también se va a claro.
              setTema('claro');
            }
          }
        });
      });

      // Observamos cambios en los atributos del elemento <html> (donde está la clase 'dark').
      observer.observe(document.documentElement, { attributes: true });

      // Limpieza: desconectamos el observador al desmontar el componente.
      return () => observer.disconnect();
    }
  }, [persist, tema]);

  // 7) Handlers
  const handleThemeChange = (nuevoTema) => {
    if (persist) {
      // Si el usuario elige 'claro' o 'oscuro', también actualizamos la clase del portafolio.
      if (nuevoTema === 'oscuro') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
    setTema(nuevoTema);
  };
  const handleFontSizeChange = (nuevoTamano) => setTamanoFuente(nuevoTamano);
  const handleFontTypeChange = (nuevoTipo) => setTipoFuente(nuevoTipo);
  const handleContrastToggle = () => setAltoContraste(prev => !prev);

  // 8) Clases
  const temaSeleccionado = altoContraste
    ? paletasDeColores[tema].altoContraste
    : paletasDeColores[tema];

  const contenedorClases = `
    p-6 rounded-lg shadow-lg transition-colors duration-300
    ${temaSeleccionado.fondo} ${temaSeleccionado.texto}
    ${altoContraste ? 'border-2 border-yellow-400' : ''}
  `;

  const textoClases = `font-medium ${
    tamanoFuente === 'pequeño'
      ? 'text-sm'
      : tamanoFuente === 'grande'
      ? 'text-lg'
      : 'text-base'
  } ${
    tipoFuente === 'serif'
      ? 'font-serif'
      : tipoFuente === 'mono'
      ? 'font-mono'
      : 'font-sans'
  }`;

  const claseBotonNoSeleccionado = 'bg-gray-300 text-gray-800';

  // 9) Render
  return (
    <div className={contenedorClases}>
      <div className="space-y-4 mb-6">
        {/* 1. Selector de Tema */}
        <div>
          <span className="font-semibold mr-2">Tema:</span>
          {Object.keys(paletasDeColores).map((key) => (
            <button
              key={key}
              onClick={() => handleThemeChange(key)}
              className={`
                px-3 py-1 rounded-full ml-2
                ${tema === key ? 'bg-blue-500 text-white' : claseBotonNoSeleccionado}
              `}
            >
              {paletasDeColores[key].nombre}
            </button>
          ))}
        </div>

        {/* 2. Selector de Tamaño de Fuente */}
        <div>
          <span className="font-semibold mr-2">Tamaño de fuente:</span>
          {['pequeño', 'mediano', 'grande'].map((size) => (
            <button
              key={size}
              onClick={() => handleFontSizeChange(size)}
              className={`
                px-3 py-1 rounded-full ml-2
                ${tamanoFuente === size ? 'bg-blue-500 text-white' : claseBotonNoSeleccionado}
              `}
            >
              {size.charAt(0).toUpperCase() + size.slice(1)}
            </button>
          ))}
        </div>

        {/* 3. Selector de Tipo de Fuente */}
        <div>
          <span className="font-semibold mr-2">Tipo de fuente:</span>
          {['sans', 'serif', 'mono'].map((font) => (
            <button
              key={font}
              onClick={() => handleFontTypeChange(font)}
              className={`
                px-3 py-1 rounded-full ml-2
                ${tipoFuente === font ? 'bg-blue-500 text-white' : claseBotonNoSeleccionado}
              `}
            >
              {font.charAt(0).toUpperCase() + font.slice(1)}
            </button>
          ))}
        </div>

        {/* 4. Toggle de Alto Contraste */}
        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={altoContraste}
              onChange={handleContrastToggle}
              className="mr-2 accent-blue-500"
            />
            <span className="font-semibold">Alto contraste</span>
          </label>
        </div>
      </div>

      {/* Área de Vista Previa */}
      <div
        className={`p-4 rounded-md mt-4 ${
          altoContraste ? temaSeleccionado.fondo : paletasDeColores[tema].claseFondo
        }`}
      >
        <p className={`${textoClases} ${temaSeleccionado.texto}`}>
          ¡Hola! Este texto cambia su apariencia según tus selecciones.
        </p>
      </div>
    </div>
  );
}

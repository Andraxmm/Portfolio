import { useEffect, useState } from "react";

export default function CustomUI() {
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

    const [tema, setTema] = useState(() => {
        return localStorage.getItem('tema') || 'claro';
    });


    const [tamanoFuente, setTamanoFuente] = useState(() => {
        return localStorage.getItem('tamanoFuente') || 'mediano';
    });

    const [tipoFuente, setTipoFuente] = useState(() => {
        return localStorage.getItem('tipoFuente') || 'sans';
    }); 

    const [altoContraste, setAltoContraste] = useState(() => {
        return localStorage.getItem('altoContraste') === 'true';
    })


    useEffect(() => {
        localStorage.setItem('tema', tema);
    }, [tema]);

    useEffect(() => {
        localStorage.setItem('tamanoFuente', tamanoFuente);
    }, [tamanoFuente]);

    useEffect(() => {
        localStorage.setItem('tipoFuente', tipoFuente);
    }, [tipoFuente]);

    useEffect(() => {
    localStorage.setItem('altoContraste', altoContraste.toString());
    }, [altoContraste]);

    
  // 2. Funciones para manejar los cambios de estado..
  const handleThemeChange = (nuevoTema) => setTema(nuevoTema);
  const handleFontSizeChange = (nuevoTamano) => setTamanoFuente(nuevoTamano);
  const handleFontTypeChange = (nuevoTipo) => setTipoFuente(nuevoTipo);
  const handleContrastToggle = () => setAltoContraste(prev => !prev);

  // 3. 
  const temaSeleccionado = altoContraste
   ? paletasDeColores[tema].altoContraste 
   : paletasDeColores[tema];

  const contenedorClases = `
    p-6 rounded-lg shadow-lg transition-colors duration-300
    ${temaSeleccionado.fondo} ${temaSeleccionado.texto}
    ${altoContraste ? 'border-2 border-yellow-400' : ''}
  `;

  const textoClases = `font-medium ${
    tamanoFuente === 'pequeño' ? 'text-sm'
    : tamanoFuente === 'grande' ? 'text-lg' 
    : 'text-base'
  } ${tipoFuente === 'serif' ? 'font-serif' 
    : tipoFuente === 'mono' ? 'font-mono' 
    : 'font-sans'}`;

  const claseBotonNoSeleccionado = 'bg-gray-300 text-gray-800'; 


  return (
    <div className={contenedorClases}>
      <div className="space-y-4 mb-6">
        <div>
       {/* 1. Selector de Tema */}
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

        {/* Selector de Tipo de Fuente */}
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

        {/* Toggle de Alto Contraste */}
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
      <div className={`p-4 rounded-md mt-4 ${altoContraste ? temaSeleccionado.fondo : paletasDeColores[tema].claseFondo}`}>
        <p className={`${textoClases} ${temaSeleccionado.texto}`}>
          ¡Hola! Este texto cambia su apariencia según tus selecciones.
        </p>
      </div>
    </div>
  );
}

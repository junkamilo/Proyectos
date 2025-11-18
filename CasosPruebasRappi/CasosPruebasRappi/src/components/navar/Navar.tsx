import { Link } from "react-router-dom"

export const Navar = () => {
  return (
    <div className="max-w-full h-[7rem] mx-auto overflow-x-auto scrollbar-hide flex justify-center items-center">
      <ul className="flex justify-center items-center space-x-8 w-full h-full pb-2">

        {/* 1. Objetivo-Estandarizacion -> Ícono de Diana/Objetivo (Target) */}
        <li className="group flex flex-col items-center cursor-pointer w-40">
          <Link to="/" className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#3bc967] to-[#6feba5] flex items-center justify-center text-white shadow-md shadow-green-500/20 group-hover:scale-110 transition-transform duration-300">
              {/* Icono Target */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>

            <span className="mt-2 text-[11px] font-bold text-gray-600 text-center leading-tight group-hover:text-[#3bc967] transition-colors w-full">
              1) Objetivo-Estandarizacion
            </span>
          </Link>
        </li>

        {/* 2. Redaccion -> Ícono de Pluma/Edición */}
        <li className="group flex flex-col items-center cursor-pointer w-40">
          <Link to="/redaccion" className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-blue-400 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300">
              {/* Icono Pluma/Edit */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
            </div>

            <span className="mt-2 text-[11px] font-bold text-gray-600 text-center leading-tight group-hover:text-blue-500 transition-colors w-full">
              2)Redaccion
            </span>
          </Link>
        </li>

        {/* 3. Botones entre corchetes -> Ícono de Cursor/Click */}
        <li className="group flex flex-col items-center cursor-pointer w-40">
          <Link to="/botones" className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#ffba00] to-[#ffd560] flex items-center justify-center text-white shadow-md shadow-yellow-500/20 group-hover:scale-110 transition-transform duration-300">
              {/* Icono Cursor Click */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" /></svg>
            </div>

            <span className="mt-2 text-[11px] font-bold text-gray-600 text-center leading-tight group-hover:text-[#ffba00] transition-colors w-full">
              3)Botones entre corchetes [ ]
            </span>
          </Link>
        </li>

        {/* 4. Textos fijos entre comillas -> Ícono de Comillas/Texto */}
        <li className="group flex flex-col items-center cursor-pointer w-40">
          <Link to="/texto" className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 to-purple-400 flex items-center justify-center text-white shadow-md shadow-purple-500/20 group-hover:scale-110 transition-transform duration-300">
              {/* Icono Comillas */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
            </div>

            <span className="mt-2 text-[11px] font-bold text-gray-600 text-center leading-tight group-hover:text-purple-600 transition-colors w-full">
              4) Textos fijos entre comillas “ ”
            </span>
          </Link>
        </li>

        {/* 5. Variables entre... -> Ícono de Código/Llaves */}
        <li className="group flex flex-col items-center cursor-pointer w-40">
          <Link to="/variables" className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-teal-500 to-teal-300 flex items-center justify-center text-white shadow-md shadow-teal-500/20 group-hover:scale-110 transition-transform duration-300">
              {/* Icono Código { } */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
            </div>

            <span className="mt-2 text-[11px] font-bold text-gray-600 text-center leading-tight group-hover:text-teal-500 transition-colors w-full">
              5) Variables entre...
            </span>
          </Link>
        </li>

        {/* 6. Todo objetivo debe iniciar... -> Ícono de Play/Inicio */}
        <li className="group flex flex-col items-center cursor-pointer w-40">
          <Link to="/nombresCasosPrubas" className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-500 to-pink-300 flex items-center justify-center text-white shadow-md shadow-pink-500/20 group-hover:scale-110 transition-transform duration-300">
              {/* Icono Play */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>

            <span className="mt-2 text-[11px] font-bold text-gray-600 text-center leading-tight group-hover:text-pink-500 transition-colors w-full">
              6) Todo objetivo debe iniciar con: "El caso de prueba que..."
            </span>
          </Link>
        </li>

        {/* 7. Titulos con estructura -> Ícono de Lista/Estructura */}
        <li className="group flex flex-col items-center cursor-pointer w-40">
          <Link to="/titulos" className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gray-600 to-gray-400 flex items-center justify-center text-white shadow-md shadow-gray-500/20 group-hover:scale-110 transition-transform duration-300">
              {/* Icono Estructura/Lista */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
            </div>

            <span className="mt-2 text-[11px] font-bold text-gray-600 text-center leading-tight group-hover:text-gray-600 transition-colors w-full">
              7) Titulos con estructura estandarizada
            </span>
          </Link>
        </li>

      </ul>
    </div>
  )
}

export const Texto = () => {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 w-full mb-12">
      <div className="max-w-5xl mx-auto">

        {/* 1. Encabezado (Púrpura para conectar con el Navar Item #4) */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-purple-50 rounded-2xl mb-4 shadow-sm">
             {/* Icono de Comillas/Texto */}
             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
          </div>
          <h2 className="text-sm font-bold tracking-widest text-purple-600 uppercase mb-2">
            Regla #4
          </h2>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-800 tracking-tight">
            Textos fijos entre <span className="text-purple-600 relative inline-block">
              “comillas”
              {/* Decoración sutil tipo comillas flotantes */}
              <span className="absolute -top-2 -left-3 text-2xl text-purple-200 pointer-events-none font-serif">“</span>
              <span className="absolute -top-2 -right-3 text-2xl text-purple-200 pointer-events-none font-serif">”</span>
            </span>
          </h1>
          <p className="mt-6 text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Diferencia lo que el usuario <strong>lee</strong> en la pantalla de lo que el sistema <strong>hace</strong> internamente.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* 2. Columna Izquierda: Definición y Ventajas */}
            <div className="lg:col-span-1 space-y-6">
                
                {/* Tarjeta Informativa */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 h-full relative overflow-hidden group">
                    {/* Fondo decorativo animado */}
                    <div className="absolute -right-10 -top-10 w-40 h-40 bg-purple-50 rounded-full opacity-50 transition-transform duration-500 group-hover:scale-110"></div>
                    
                    <div className="relative z-10">
                        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-100 text-purple-600 font-serif font-black text-xl">“</span>
                            ¿Qué citamos?
                        </h3>
                        <p className="text-gray-600 mb-6 leading-relaxed text-sm">
                            Se colocan entre comillas todos los nombres <strong>estáticos</strong> del sistema: secciones, títulos, etiquetas, menús o mensajes de feedback.
                        </p>

                        <div className="h-px bg-gray-100 w-full mb-6"></div>

                        <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Ventajas</h4>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center shrink-0 mt-0.5">
                                    <svg className="w-3 h-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                                </div>
                                <p className="text-sm text-gray-600">Evita confundir el nombre de un botón con una acción.</p>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center shrink-0 mt-0.5">
                                    <svg className="w-3 h-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                                </div>
                                <p className="text-sm text-gray-600">Identifica textos exactos para aserciones automatizadas.</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* 3. Columna Derecha: Simulador de UI (Ejemplos Visuales) */}
            <div className="lg:col-span-2 space-y-4">
                
                {/* Caso 1: Navegación / Menú */}
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center gap-6 hover:shadow-md transition-shadow duration-300">
                    {/* UI Mockup: Sidebar Item */}
                    <div className="w-full sm:w-1/3 bg-gray-50 rounded-xl p-3 border border-gray-200 select-none">
                        <div className="flex items-center gap-3 p-2 bg-white rounded-lg border border-purple-100 shadow-sm">
                            <div className="w-4 h-4 bg-purple-200 rounded"></div>
                            <div className="h-2 w-12 bg-purple-600 rounded-full"></div>
                        </div>
                    </div>
                    {/* Explicación */}
                    <div className="flex-grow text-center sm:text-left">
                        <p className="text-xs font-bold text-purple-400 uppercase mb-1">Navegación</p>
                        <p className="text-gray-700 font-medium">
                            Seleccionar la sección <span className="text-purple-600 font-bold bg-purple-50 px-1.5 py-0.5 rounded text-lg font-serif">“Reportes”</span>.
                        </p>
                    </div>
                    <div className="hidden sm:block text-2xl">✅</div>
                </div>

                {/* Caso 2: Breadcrumb / Ruta */}
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center gap-6 hover:shadow-md transition-shadow duration-300">
                    {/* UI Mockup: Breadcrumb */}
                    <div className="w-full sm:w-1/3 bg-gray-50 rounded-xl p-3 border border-gray-200 flex items-center justify-center gap-1 select-none">
                        <span className="text-[10px] text-gray-400">Orden</span>
                        <span className="text-[8px] text-gray-300">▶</span>
                        <span className="text-[10px] font-bold text-purple-600 bg-purple-100 px-1 rounded">Express</span>
                    </div>
                    {/* Explicación */}
                    <div className="flex-grow text-center sm:text-left">
                        <p className="text-xs font-bold text-purple-400 uppercase mb-1">Opción / Filtro</p>
                        <p className="text-gray-700 font-medium">
                            Seleccionar <span className="text-purple-600 font-bold bg-purple-50 px-1.5 py-0.5 rounded text-lg font-serif">“Tipo de orden → Express”</span>.
                        </p>
                    </div>
                    <div className="hidden sm:block text-2xl">✅</div>
                </div>

                {/* Caso 3: Mensaje de Sistema (Toast) */}
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center gap-6 hover:shadow-md transition-shadow duration-300">
                    {/* UI Mockup: Toast Notification */}
                    <div className="w-full sm:w-1/3 bg-gray-50 rounded-xl p-3 border border-gray-200 flex justify-center select-none">
                        <div className="bg-gray-800 text-white text-[10px] py-1.5 px-3 rounded-full shadow-lg flex items-center gap-2">
                            <span className="text-green-400">✓</span>
                            Producto agregado...
                        </div>
                    </div>
                    {/* Explicación */}
                    <div className="flex-grow text-center sm:text-left">
                        <p className="text-xs font-bold text-purple-400 uppercase mb-1">Mensaje del Sistema</p>
                        <p className="text-gray-700 font-medium">
                            El sistema muestra: <span className="text-purple-600 font-bold bg-purple-50 px-1.5 py-0.5 rounded text-lg font-serif">“Producto agregado al carrito”</span>.
                        </p>
                    </div>
                    <div className="hidden sm:block text-2xl">✅</div>
                </div>

            </div>

        </div>
      </div>
    </section>
  );
};

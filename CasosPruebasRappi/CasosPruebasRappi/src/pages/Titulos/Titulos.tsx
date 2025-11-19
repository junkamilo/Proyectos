export const Titulos = () => {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 w-full mb-12">
      <div className="max-w-5xl mx-auto">

        {/* 1. Encabezado (Gris/Slate para conectar con el Navar Item #7) */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-slate-100 rounded-2xl mb-4 shadow-sm">
             {/* Icono de Estructura/Lista */}
             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
          </div>
          <h2 className="text-sm font-bold tracking-widest text-slate-500 uppercase mb-2">
            Regla #7
          </h2>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-800 tracking-tight">
            Títulos con estructura <span className="text-slate-600 underline decoration-wavy decoration-slate-300 underline-offset-4">estandarizada</span>
          </h1>
          <p className="mt-6 text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
            La consistencia en el nombrado es clave para encontrar lo que buscas sin tener que abrir cada caso.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* 2. Columna Izquierda: La Fórmula Maestra */}
            <div className="lg:col-span-7 space-y-8">
                
                {/* Tarjeta: La Sintaxis */}
                <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-xl text-white relative overflow-hidden">
                    {/* Decoración de código */}
                    <div className="absolute top-4 right-4 flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    
                    <h3 className="text-slate-400 font-mono text-xs uppercase tracking-widest mb-4">Sintaxis Requerida</h3>
                    
                    <div className="font-mono text-sm sm:text-base leading-loose">
                        <span className="text-purple-400">&lt;Módulo&gt;</span> 
                        <span className="text-slate-500 mx-2">-</span>
                        <span className="text-blue-400">&lt;Func. General&gt;</span>
                        <span className="text-slate-500">_</span>
                        <span className="text-cyan-400">&lt;Func. Específica&gt;</span> 
                        <span className="text-slate-500 mx-2">-</span>
                        <span className="text-green-400">&lt;Objetivo&gt;</span>
                    </div>
                    
                    {/* Explicación visual de separadores */}
                    <div className="mt-6 flex gap-4 text-xs text-slate-400 bg-slate-800/50 p-3 rounded-lg">
                        <div className="flex items-center gap-2">
                            <span className="bg-slate-700 px-1.5 py-0.5 rounded text-white">-</span> Separador Principal
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="bg-slate-700 px-1.5 py-0.5 rounded text-white">_</span> Sub-nivel
                        </div>
                    </div>
                </div>

                {/* Ejemplo Real Desglosado (Interactive Anatomy) */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#3bc967]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        Anatomía de un Ejemplo Real
                    </h3>

                    {/* Título Completo */}
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-8 font-medium text-gray-700 text-sm sm:text-base break-words">
                        IMFT - Creación de productos_Integración copérnico - Productos con EAN en ceros
                    </div>

                    {/* Desglose Visual (Timeline Style) */}
                    <div className="space-y-0 relative pl-4 border-l-2 border-slate-100">
                        
                        {/* Parte 1 */}
                        <div className="relative pb-6 pl-6">
                            <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-purple-400 ring-4 ring-white"></div>
                            <p className="text-xs font-bold text-purple-500 uppercase mb-1">Módulo</p>
                            <p className="text-gray-800 font-bold">Metricas</p>
                            <p className="text-gray-500 text-xs mt-1">Sigla del sistema o módulo principal.</p>
                        </div>

                        {/* Parte 2 */}
                        <div className="relative pb-6 pl-6">
                            <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-blue-400 ring-4 ring-white"></div>
                            <p className="text-xs font-bold text-blue-500 uppercase mb-1">Funcionalidad General</p>
                            <p className="text-gray-800 font-bold">Operaciones_DiasDeInventario</p>
                            <p className="text-gray-500 text-xs mt-1">El flujo macro donde nos encontramos.</p>
                        </div>

                        {/* Parte 3 */}
                        <div className="relative pb-6 pl-6">
                            <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-cyan-400 ring-4 ring-white"></div>
                            <p className="text-xs font-bold text-cyan-500 uppercase mb-1">Funcionalidad Específica</p>
                            <p className="text-gray-800 font-bold">VeridicarDiaSeleccionado</p>
                            <p className="text-gray-500 text-xs mt-1">Componente exacto o sub-proceso.</p>
                        </div>

                        {/* Parte 4 */}
                        <div className="relative pl-6">
                            <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-green-400 ring-4 ring-white"></div>
                            <p className="text-xs font-bold text-green-500 uppercase mb-1">Objetivo Corto</p>
                            <p className="text-gray-800 font-bold">Verificar que tanto en la grafica y la tabla muestren los datos correspendientes al dia seleccionado</p>
                            <p className="text-gray-500 text-xs mt-1">Qué estamos probando puntualmente.</p>
                        </div>

                    </div>
                </div>
            </div>

            {/* 3. Columna Derecha: Beneficios y Tips */}
            <div className="lg:col-span-5 space-y-6">
                
                {/* Tarjeta: ¿Por qué? */}
                <div className="bg-gradient-to-br from-slate-50 to-white rounded-3xl p-6 shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Superpoderes de Organización</h3>
                    <ul className="space-y-4">
                        <li className="flex gap-3">
                            <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center shrink-0 text-lg">🚀</div>
                            <div>
                                <p className="text-sm font-bold text-gray-700">Búsqueda Rápida</p>
                                <p className="text-xs text-gray-500 mt-0.5">Encuentra casos sin necesidad de abrirlos uno por uno.</p>
                            </div>
                        </li>
                        <li className="flex gap-3">
                            <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center shrink-0 text-lg">🗂️</div>
                            <div>
                                <p className="text-sm font-bold text-gray-700">Clasificación Automática</p>
                                <p className="text-xs text-gray-500 mt-0.5">Agrupa casos por módulo simplemente ordenándolos alfabéticamente.</p>
                            </div>
                        </li>
                        <li className="flex gap-3">
                            <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center shrink-0 text-lg">🔎</div>
                            <div>
                                <p className="text-sm font-bold text-gray-700">Trazabilidad</p>
                                <p className="text-xs text-gray-500 mt-0.5">Sabes exactamente a qué parte del sistema pertenece un error reportado.</p>
                            </div>
                        </li>
                    </ul>
                </div>

                {/* Tarjeta: Pro Tip */}
                <div className="bg-[#fffbeb] rounded-3xl p-6 border border-amber-100 relative overflow-hidden">
                    <div className="absolute -right-4 -bottom-4 text-9xl opacity-10 select-none">💡</div>
                    <h3 className="text-amber-800 font-bold mb-2">Consejo de Estilo</h3>
                    <p className="text-amber-700 text-sm leading-relaxed">
                        Mantén los títulos cortos pero descriptivos. Si el "Objetivo Corto" requiere más de 10 palabras, probablemente deberías dividir el caso en dos escenarios más pequeños.
                    </p>
                </div>

            </div>

        </div>
      </div>
    </section>
  );
};

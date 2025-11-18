export const Variables = () => {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 w-full mb-12">
      <div className="max-w-5xl mx-auto">

        {/* 1. Encabezado (Teal para conectar con el Navar Item #5) */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-teal-50 rounded-2xl mb-4 shadow-sm">
             {/* Icono de Código/Variables */}
             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
          </div>
          <h2 className="text-sm font-bold tracking-widest text-teal-500 uppercase mb-2">
            Regla #5
          </h2>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-800 tracking-tight">
            Variables entre <span className="text-teal-500 font-mono bg-teal-50 px-3 py-1 rounded-lg border-2 border-dashed border-teal-200">&lt;&lt;&lt; &gt;&gt;&gt;</span>
          </h1>
          <p className="mt-6 text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Identificamos los datos dinámicos (que cambian en cada prueba) separándolos del texto fijo del sistema.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* 2. Columna Izquierda: Definición y Utilidad */}
            <div className="lg:col-span-1 flex flex-col gap-6">
                
                {/* Tarjeta: ¿Qué es? */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-teal-100 to-transparent rounded-bl-full opacity-50 transition-transform group-hover:scale-110"></div>
                    
                    <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                        <span className="text-2xl">💡</span> ¿Qué es?
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        Es un valor "comodín" que cambia entre ejecuciones: IDs, nombres, fechas o usuarios. No es parte de la interfaz fija.
                    </p>
                </div>

                {/* Tarjeta: ¿Para qué sirve? */}
                <div className="bg-teal-500 rounded-3xl p-6 shadow-lg shadow-teal-500/20 text-white relative overflow-hidden">
                    {/* Decoración de fondo */}
                    <svg className="absolute -bottom-4 -right-4 w-24 h-24 text-white opacity-10" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" /></svg>
                    
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                        Superpoderes
                    </h3>
                    <ul className="space-y-3 text-teal-50 text-sm font-medium">
                        <li className="flex gap-2">
                            <span>•</span> Reutilización masiva de casos.
                        </li>
                        <li className="flex gap-2">
                            <span>•</span> Parametrización automática.
                        </li>
                        <li className="flex gap-2">
                            <span>•</span> Escenarios dinámicos.
                        </li>
                    </ul>
                </div>
            </div>

            {/* 3. Columna Derecha: Laboratorio de Variables (Ejemplos) */}
            <div className="lg:col-span-2">
                <div className="bg-white rounded-3xl shadow-md border border-gray-100 overflow-hidden h-full">
                    
                    {/* Header simulado de "Editor de Código/Prueba" */}
                    <div className="bg-slate-800 px-6 py-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-400"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                            <div className="w-3 h-3 rounded-full bg-green-400"></div>
                        </div>
                        <span className="text-xs font-mono text-slate-400">test_case_variables.feature</span>
                    </div>

                    <div className="p-6 sm:p-8 space-y-6 bg-slate-50 h-full">
                        
                        {/* Ejemplo 1: ID */}
                        <div className="group bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:border-teal-300 transition-all duration-300 flex flex-col sm:flex-row sm:items-center gap-4">
                            <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-xl shrink-0">🆔</div>
                            <div className="flex-grow font-medium text-gray-600">
                                Editar la orden con ID <span className="font-mono text-teal-600 bg-teal-50 border border-dashed border-teal-300 px-2 py-0.5 rounded mx-1 group-hover:bg-teal-100 transition-colors">&lt;&lt;&lt;IdOrden&gt;&gt;&gt;</span>
                            </div>
                            {/* Tooltip simulado */}
                            <div className="text-[10px] font-mono text-teal-500 opacity-0 group-hover:opacity-100 transition-opacity bg-white border border-teal-100 px-2 py-1 rounded shadow-sm whitespace-nowrap">
                                Valor: 84921
                            </div>
                        </div>

                        {/* Ejemplo 2: Buscador */}
                        <div className="group bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:border-teal-300 transition-all duration-300 flex flex-col sm:flex-row sm:items-center gap-4">
                            <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-xl shrink-0">🔍</div>
                            <div className="flex-grow font-medium text-gray-600">
                                Buscar producto <span className="font-mono text-teal-600 bg-teal-50 border border-dashed border-teal-300 px-2 py-0.5 rounded mx-1 group-hover:bg-teal-100 transition-colors">&lt;&lt;&lt;NombreProducto&gt;&gt;&gt;</span>
                            </div>
                            <div className="text-[10px] font-mono text-teal-500 opacity-0 group-hover:opacity-100 transition-opacity bg-white border border-teal-100 px-2 py-1 rounded shadow-sm whitespace-nowrap">
                                Valor: "Hamburguesa"
                            </div>
                        </div>

                        {/* Ejemplo 3: Email Input */}
                        <div className="group bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:border-teal-300 transition-all duration-300 flex flex-col sm:flex-row sm:items-center gap-4">
                            <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-xl shrink-0">📧</div>
                            <div className="flex-grow font-medium text-gray-600">
                                El campo email contiene <span className="font-mono text-teal-600 bg-teal-50 border border-dashed border-teal-300 px-2 py-0.5 rounded mx-1 group-hover:bg-teal-100 transition-colors">&lt;&lt;&lt;CorreoUsuario&gt;&gt;&gt;</span>
                            </div>
                            <div className="text-[10px] font-mono text-teal-500 opacity-0 group-hover:opacity-100 transition-opacity bg-white border border-teal-100 px-2 py-1 rounded shadow-sm whitespace-nowrap">
                                Valor: "user@rappi.com"
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
      </div>
    </section>
  );
};

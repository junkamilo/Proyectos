export const EjemploPrueba = () => {
    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8 w-full bg-gray-50/50 border-t border-gray-100 font-sans">
            <div className="max-w-6xl mx-auto">

                {/* 1. Encabezado de la Sección (Mantenido igual para contexto) */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center p-3 bg-green-50 rounded-2xl mb-4 shadow-sm border border-green-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#3bc967]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <h2 className="text-xs font-bold tracking-[0.2em] text-[#3bc967] uppercase mb-3">
                        Estándar de Calidad
                    </h2>
                    <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-4">
                        Caso de Prueba <span className="text-[#3bc967] relative whitespace-nowrap">
                            <svg aria-hidden="true" viewBox="0 0 418 42" className="absolute top-2/3 left-0 h-[0.58em] w-full fill-green-200/60" preserveAspectRatio="none"><path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C46.117 16.243 34.975 22.175 42.726 29.568l-8.891 10.146c11.372 11.107 27.132 8.429 44.124 4.925l85.86-14.014c21.056-2.646 64.09-6.163 105.554-6.99 42.637-.85 76.077 1.973 95.986 5.922l22.24 4.415c19.912 3.954 36.04 6.817 45.406 6.972l-10.036-10.962c-13.68-1.785-41.668-4.752-82.128-6.684-40.333-1.925-83.547-1.24-127.468 2.616z"></path></svg>
                            <span className="relative">Perfecto</span>
                        </span>
                    </h1>
                </div>

                {/* 2. La Tarjeta Principal (UI Mejorada) */}
                <div className="bg-white rounded-[1.5rem] shadow-2xl shadow-gray-200/50 border border-gray-200 overflow-hidden relative">

                    {/* --- Barra Superior del Ticket --- */}
                    <div className="bg-[#1e293b] px-6 py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-700">
                        {/* ID y Estado */}
                        <div className="flex items-center gap-4">
                            <span className="bg-[#3bc967] text-white text-xs font-black px-3 py-1.5 rounded-lg uppercase tracking-wider shadow-lg shadow-green-900/20">QA-2024</span>
                            <div className="h-6 w-px bg-gray-600 mx-1"></div>
                            <span className="text-gray-300 text-sm font-medium flex items-center gap-2">
                                <span className="relative flex h-2.5 w-2.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
                                </span>
                                En Diseño
                            </span>
                        </div>

                        {/* Botones de Acción (NUEVO) */}
                        <div className="flex items-center gap-2 w-full md:w-auto">
                            <button className="flex-1 md:flex-none items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2 rounded-lg transition-all shadow-lg shadow-blue-900/20 border border-blue-500">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                Ejecutar
                            </button>
                            <button className="hidden sm:flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-gray-300 text-xs font-bold px-4 py-2 rounded-lg transition-all border border-gray-600">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" /></svg>
                                Clonar
                            </button>
                        </div>
                    </div>

                    {/* --- Navegación de Pestañas (NUEVO) --- */}
                    <div className="bg-gray-50 border-b border-gray-200 px-6">
                        <div className="flex gap-8 overflow-x-auto no-scrollbar">
                            <button className="py-4 text-sm font-bold text-blue-600 border-b-2 border-blue-600 whitespace-nowrap">Detalles del Caso</button>
                            <button className="py-4 text-sm font-medium text-gray-500 hover:text-gray-700 border-b-2 border-transparent hover:border-gray-300 whitespace-nowrap flex items-center gap-2">
                                Ejecuciones
                                <span className="bg-gray-200 text-gray-600 text-[10px] px-1.5 py-0.5 rounded-full">0</span>
                            </button>
                            <button className="py-4 text-sm font-medium text-gray-500 hover:text-gray-700 border-b-2 border-transparent hover:border-gray-300 whitespace-nowrap">Evidencia</button>
                            <button className="py-4 text-sm font-medium text-gray-500 hover:text-gray-700 border-b-2 border-transparent hover:border-gray-300 whitespace-nowrap">Historial</button>
                        </div>
                    </div>

                    {/* Cuerpo del Ticket */}
                    <div className="p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

                        {/* Columna Izquierda: Datos Generales */}
                        <div className="lg:col-span-12 space-y-8">

                            {/* Título y Tags */}
                            <div className="flex flex-col gap-4">
                                <div>
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        <span className="px-2 py-1 bg-purple-50 text-purple-700 border border-purple-100 text-[10px] font-bold uppercase rounded">Funcional</span>
                                        <span className="px-2 py-1 bg-red-50 text-red-700 border border-red-100 text-[10px] font-bold uppercase rounded">Prioridad: Alta</span>
                                        <span className="px-2 py-1 bg-orange-50 text-orange-700 border border-orange-100 text-[10px] font-bold uppercase rounded">Manual</span>
                                    </div>
                                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Título del Escenario</h3>
                                    <div className="p-4 rounded-xl border-l-4 border-blue-500 bg-gray-50 font-medium text-gray-800 text-lg">
                                        Validar cambio de estado de Orden a <span className="text-blue-600 font-bold">"En Proceso"</span> y persistencia de datos
                                    </div>
                                </div>
                            </div>

                            {/* Grid de Precondiciones y Resultado Esperado */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Precondiciones */}
                                <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:border-blue-200 transition-colors group">
                                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2 group-hover:text-blue-600">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                                        Precondiciones
                                    </h3>
                                    <ul className="space-y-2">
                                        <li className="flex items-start gap-2 text-sm text-gray-600">
                                            <svg className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                            <span>Usuario autenticado: <strong>Admin</strong></span>
                                        </li>
                                        <li className="flex items-start gap-2 text-sm text-gray-600">
                                            <svg className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                            <span>Orden existente en estado: <strong>Activa</strong></span>
                                        </li>
                                    </ul>
                                </div>

                                {/* Resultado Esperado */}
                                <div className="bg-green-50/40 rounded-xl p-5 border border-green-100 relative">
                                    <h3 className="text-xs font-bold text-green-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                                        Resultado Final
                                    </h3>
                                    <p className="text-sm text-gray-700 leading-relaxed">
                                        El sistema debe mostrar mensaje de éxito y la orden <span className="font-mono text-xs bg-white border border-gray-200 px-1 rounded text-gray-500">&lt;&lt;ID&gt;&gt;</span> debe reflejar el estado <span className="font-bold text-green-700">"En Proceso"</span> en la base de datos.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Sección de Pasos (Con Botones de Ejecución Simulados) */}
                        <div className="lg:col-span-12">
                            <div className="flex justify-between items-end mb-4">
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Pasos de Ejecución</h3>
                                <button className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1">
                                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                                    Añadir Paso
                                </button>
                            </div>

                            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                                {/* Header de la Tabla de Pasos */}
                                <div className="grid grid-cols-12 bg-gray-50 px-4 py-2 border-b border-gray-200 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                                    <div className="col-span-1 text-center">#</div>
                                    <div className="col-span-7">Acción / Datos</div>
                                    <div className="col-span-4 text-center">Estado (Simulación)</div>
                                </div>

                                {/* Paso 1 */}
                                <div className="grid grid-cols-12 px-4 py-3 border-b border-gray-100 items-center hover:bg-gray-50 group">
                                    <div className="col-span-1 flex justify-center">
                                        <span className="w-5 h-5 rounded bg-gray-100 text-gray-500 text-[10px] font-bold flex items-center justify-center">1</span>
                                    </div>
                                    <div className="col-span-7 text-sm text-gray-700">
                                        Acceder a módulo <span className="font-semibold text-purple-600">"Órdenes"</span>.
                                    </div>
                                    <div className="col-span-4 flex justify-center gap-1 opacity-40 group-hover:opacity-100 transition-opacity">
                                        <button className="p-1 hover:bg-green-100 rounded text-green-500"><svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg></button>
                                        <button className="p-1 hover:bg-red-100 rounded text-red-500"><svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg></button>
                                    </div>
                                </div>

                                {/* Paso 2 */}
                                <div className="grid grid-cols-12 px-4 py-3 border-b border-gray-100 items-center hover:bg-gray-50 group">
                                    <div className="col-span-1 flex justify-center">
                                        <span className="w-5 h-5 rounded bg-gray-100 text-gray-500 text-[10px] font-bold flex items-center justify-center">2</span>
                                    </div>
                                    <div className="col-span-7 text-sm text-gray-700">
                                        Filtrar grilla por estado <span className="font-semibold text-purple-600">"Activa"</span>.
                                    </div>
                                    <div className="col-span-4 flex justify-center gap-1 opacity-40 group-hover:opacity-100 transition-opacity">
                                        <button className="p-1 hover:bg-green-100 rounded text-green-500"><svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg></button>
                                        <button className="p-1 hover:bg-red-100 rounded text-red-500"><svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg></button>
                                    </div>
                                </div>

                                {/* Paso 3 - Interactivo */}
                                <div className="grid grid-cols-12 px-4 py-3 border-b border-gray-100 items-center bg-blue-50/30 border-l-4 border-blue-400">
                                    <div className="col-span-1 flex justify-center">
                                        <span className="w-5 h-5 rounded bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center shadow-sm">3</span>
                                    </div>
                                    <div className="col-span-7 text-sm text-gray-800 font-medium">
                                        Seleccionar Orden <span className="font-mono text-xs bg-white border border-blue-200 px-1.5 py-0.5 rounded">&lt;&lt;IdOrden&gt;&gt;</span> y hacer clic en Editar.
                                    </div>
                                    <div className="col-span-4 flex justify-center items-center">
                                        <span className="text-[10px] font-bold uppercase text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">En curso</span>
                                    </div>
                                </div>

                                {/* Pasos Restantes */}
                                <div className="grid grid-cols-12 px-4 py-3 items-center opacity-60">
                                    <div className="col-span-1 flex justify-center">
                                        <span className="w-5 h-5 rounded bg-gray-100 text-gray-400 text-[10px] font-bold flex items-center justify-center">4</span>
                                    </div>
                                    <div className="col-span-7 text-sm text-gray-500 italic">
                                        Cambiar estado a "En proceso" y Guardar...
                                    </div>
                                    <div className="col-span-4 flex justify-center">
                                        <span className="text-[10px] text-gray-400">Pendiente</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sección de Adjuntos (NUEVO) */}
                        <div className="lg:col-span-12">
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Evidencia / Adjuntos</h3>
                            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:bg-gray-50 hover:border-gray-400 transition-colors cursor-pointer">
                                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mb-2 text-blue-500">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                </div>
                                <p className="text-sm font-medium text-gray-600">Arrastra capturas de pantalla aquí</p>
                                <p className="text-xs text-gray-400 mt-1">o haz clic para explorar</p>
                            </div>
                        </div>

                    </div>

                    {/* Footer del Ticket */}
                    <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-3">
                            <div className="flex -space-x-2">
                                <div className="w-6 h-6 rounded-full bg-gray-600 border-2 border-white text-[10px] text-white flex items-center justify-center">JD</div>
                                <div className="w-6 h-6 rounded-full bg-indigo-600 border-2 border-white text-[10px] text-white flex items-center justify-center">AL</div>
                            </div>
                            <span className="text-xs text-gray-400">Creado por Juan D. • Actualizado hace 2h</span>
                        </div>
                        <div className="flex gap-3">
                            <button className="text-xs font-bold text-gray-500 hover:text-gray-800">Comentarios (2)</button>
                            <button className="text-xs font-bold text-[#ff4d38] hover:text-red-600 flex items-center gap-1">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                Eliminar
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

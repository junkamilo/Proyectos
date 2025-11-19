export const EjemploPrueba = () => {
    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8 w-full bg-gray-50/50 border-t border-gray-100">
            <div className="max-w-5xl mx-auto">

                {/* 1. Encabezado de la Sección */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center p-3 bg-green-50 rounded-2xl mb-4 shadow-sm">
                        {/* Icono de Check/Aprobado */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#3bc967]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <h2 className="text-sm font-bold tracking-widest text-[#3bc967] uppercase mb-2">
                        Resultado Final
                    </h2>
                    <h1 className="text-3xl sm:text-4xl font-black text-gray-800 tracking-tight">
                        Un Caso de Prueba <span className="text-[#3bc967] underline decoration-wavy decoration-green-200 underline-offset-4">Perfecto</span>
                    </h1>
                    <p className="mt-6 text-gray-500 text-lg max-w-2xl mx-auto">
                        Así se ve cuando aplicamos todas las reglas de estandarización, redacción y formato en un escenario real.
                    </p>
                </div>

                {/* 2. La Tarjeta Principal (Simulación de Ticket) */}
                <div className="bg-white rounded-[2rem] shadow-xl border border-gray-100 overflow-hidden relative">

                    {/* Barra Superior del Ticket */}
                    <div className="bg-gray-800 px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-700">
                        <div className="flex items-center gap-3">
                            <span className="bg-[#3bc967] text-white text-xs font-bold px-2 py-1 rounded uppercase tracking-wide">QA-2024</span>
                            <span className="text-gray-400 text-sm font-mono">|</span>
                            <span className="text-gray-300 text-sm font-medium flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                                Funcional
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="flex -space-x-2">
                                <div className="w-8 h-8 rounded-full bg-gray-600 border-2 border-gray-800 flex items-center justify-center text-xs text-white font-bold">JD</div>
                            </div>
                            <span className="text-gray-400 text-xs ml-2">Asignado a Juan D.</span>
                        </div>
                    </div>

                    {/* Cuerpo del Ticket */}
                    <div className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

                        {/* Columna Izquierda: Datos Generales */}
                        <div className="lg:col-span-12 space-y-6">

                            {/* Título Estructurado */}
                            <div>
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Título del Caso</h3>
                                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 font-medium text-gray-800 text-lg shadow-sm">
                                    <span className="text-purple-600 font-bold">VMFT</span> - Creación de productos_Integración nitro - <span className="text-gray-600">Validar cambio de estado</span>
                                </div>
                            </div>

                            {/* Objetivo */}
                            <div>
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Descripción / Objetivo</h3>
                                <p className="text-gray-600 leading-relaxed bg-white border-l-4 border-pink-400 pl-4 py-1">
                                    <span className="font-bold text-pink-500">El caso de prueba que</span> valida el correcto cambio de estado de una orden existente por parte del usuario, asegurando la persistencia del dato.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Precondiciones */}
                                <div className="bg-blue-50/50 rounded-2xl p-6 border border-blue-100">
                                    <h3 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-4 flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
                                        Precondiciones
                                    </h3>
                                    <ul className="space-y-3">
                                        <li className="flex items-start gap-3 text-sm text-gray-600">
                                            <span className="text-blue-400 mt-0.5">●</span>
                                            <span>El usuario debe estar autenticado con rol <strong>Admin</strong>.</span>
                                        </li>
                                        <li className="flex items-start gap-3 text-sm text-gray-600">
                                            <span className="text-blue-400 mt-0.5">●</span>
                                            <span>Debe existir una orden en estado <strong>"Activa"</strong>.</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* Resultado Esperado */}
                                <div className="bg-green-50/50 rounded-2xl p-6 border border-green-100 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-16 h-16 bg-green-100 rounded-bl-full opacity-50"></div>
                                    <h3 className="text-sm font-bold text-[#3bc967] uppercase tracking-widest mb-4 flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        Resultado Esperado
                                    </h3>
                                    <p className="text-sm text-gray-700 leading-relaxed">
                                        La orden con ID <span className="font-mono text-teal-600 bg-teal-50 px-1 rounded text-xs">&lt;&lt;&lt;IdOrden&gt;&gt;&gt;</span> se actualiza correctamente con el nuevo estado <span className="font-serif text-purple-600 font-bold bg-purple-50 px-1 rounded">“En proceso”</span> y queda visible en el listado de órdenes filtradas.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Sección Inferior: Pasos (Full Width) */}
                        <div className="lg:col-span-12">
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Pasos de Ejecución</h3>

                            <div className="bg-white rounded-2xl border border-gray-200 divide-y divide-gray-100 shadow-sm">

                                {/* Paso 1 */}
                                <div className="p-4 flex gap-4 items-start hover:bg-gray-50 transition-colors">
                                    <div className="w-6 h-6 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">1</div>
                                    <p className="text-gray-700 text-sm">
                                        Acceder a la sección <span className="font-serif text-purple-600 font-bold bg-purple-50 px-1 rounded">“Órdenes”</span> desde el menú lateral.
                                    </p>
                                </div>

                                {/* Paso 2 */}
                                <div className="p-4 flex gap-4 items-start hover:bg-gray-50 transition-colors">
                                    <div className="w-6 h-6 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">2</div>
                                    <p className="text-gray-700 text-sm">
                                        Filtrar la grilla por el estado <span className="font-serif text-purple-600 font-bold bg-purple-50 px-1 rounded">“Activa”</span>.
                                    </p>
                                </div>

                                {/* Paso 3 */}
                                <div className="p-4 flex gap-4 items-start hover:bg-gray-50 transition-colors">
                                    <div className="w-6 h-6 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">3</div>
                                    <p className="text-gray-700 text-sm">
                                        Seleccionar la orden con ID <span className="font-mono text-teal-600 bg-teal-50 border border-dashed border-teal-200 px-1.5 rounded text-xs font-bold">&lt;&lt;&lt;IdOrden&gt;&gt;&gt;</span>.
                                    </p>
                                </div>

                                {/* Paso 4 */}
                                <div className="p-4 flex gap-4 items-start hover:bg-gray-50 transition-colors">
                                    <div className="w-6 h-6 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">4</div>
                                    <div className="text-gray-700 text-sm">
                                        Presionar el botón <span className="font-mono text-[#ffba00] bg-amber-50 px-1.5 border border-amber-100 rounded text-xs font-bold">[Editar]</span>.
                                    </div>
                                </div>

                                {/* Paso 5 */}
                                <div className="p-4 flex gap-4 items-start hover:bg-gray-50 transition-colors">
                                    <div className="w-6 h-6 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">5</div>
                                    <p className="text-gray-700 text-sm">
                                        Cambiar el campo <span className="font-serif text-purple-600 font-bold bg-purple-50 px-1 rounded">“Estado”</span> a la opción <span className="font-serif text-purple-600 font-bold bg-purple-50 px-1 rounded">“En proceso”</span>.
                                    </p>
                                </div>

                                {/* Paso 6 */}
                                <div className="p-4 flex gap-4 items-start hover:bg-gray-50 transition-colors">
                                    <div className="w-6 h-6 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">6</div>
                                    <div className="text-gray-700 text-sm">
                                        Presionar el botón <span className="font-mono text-[#ffba00] bg-amber-50 px-1.5 border border-amber-100 rounded text-xs font-bold">[Guardar]</span>.
                                    </div>
                                </div>

                                {/* Paso 7 (Validación) */}
                                <div className="p-4 flex gap-4 items-start bg-green-50/30 border-l-4 border-green-400">
                                    <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">✓</div>
                                    <p className="text-gray-700 text-sm">
                                        Verificar que el sistema muestra el mensaje: <span className="font-serif text-purple-600 font-bold bg-purple-50 px-1 rounded">“Orden actualizada exitosamente”</span>.
                                    </p>
                                </div>

                            </div>
                        </div>

                    </div>

                    {/* Footer del Ticket */}
                    <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-between items-center">
                        <span className="text-xs text-gray-400">Última actualización: hace 2 horas</span>
                        <button className="text-xs font-bold text-[#ff4d38] hover:text-red-600 flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                            Editar Caso
                        </button>
                    </div>

                </div>
            </div>
        </section>
    );
}

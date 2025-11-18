export const Botones = () => {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 w-full mb-12">
      <div className="max-w-5xl mx-auto">

        {/* 1. Encabezado (Amarillo para conectar con el Navar) */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-amber-50 rounded-2xl mb-4 shadow-sm">
            {/* Icono de Cursor/Click (Coherente con Navar) */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#ffba00]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" /></svg>
          </div>
          <h2 className="text-sm font-bold tracking-widest text-[#ffba00] uppercase mb-2">
            Regla #2
          </h2>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-800 tracking-tight">
            Botones entre <span className="text-[#ffba00] font-mono bg-amber-50 px-2 rounded-lg decoration-4 decoration-amber-200 underline underline-offset-4">[corchetes]</span>
          </h1>
          <p className="mt-6 text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Para que un caso de prueba sea fácil de leer, los elementos interactivos deben saltar a la vista inmediatamente.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* 2. Columna Izquierda: Explicación y Beneficios */}
          <div className="lg:col-span-1 space-y-6">

            {/* Tarjeta: ¿Por qué? */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-50 rounded-bl-full -mr-6 -mt-6"></div>

              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2 relative z-10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#ffba00]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                ¿Por qué usarlo?
              </h3>

              <ul className="space-y-4 relative z-10">
                <li className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                  <span className="w-2 h-2 bg-[#3bc967] rounded-full mt-2 shrink-0"></span>
                  <p className="text-sm text-gray-600 font-medium">Identificación visual inmediata de acciones.</p>
                </li>
                <li className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                  <span className="w-2 h-2 bg-[#3bc967] rounded-full mt-2 shrink-0"></span>
                  <p className="text-sm text-gray-600 font-medium">Facilita la programación de scripts de automatización.</p>
                </li>
                <li className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                  <span className="w-2 h-2 bg-[#3bc967] rounded-full mt-2 shrink-0"></span>
                  <p className="text-sm text-gray-600 font-medium">Estandariza el lenguaje entre QA y Desarrolladores.</p>
                </li>
              </ul>
            </div>
          </div>

          {/* 3. Columna Derecha: Ejemplos Visuales (Simulación de UI) */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-md border border-gray-100 overflow-hidden">

              {/* Barra de título simulada */}
              <div className="bg-gray-50 border-b border-gray-100 px-6 py-4 flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-700">Ejemplos Prácticos</h3>
                <div className="flex space-x-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-300"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-300"></div>
                  <div className="w-3 h-3 rounded-full bg-green-300"></div>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-6">

                {/* Ejemplo 1 */}
                <div className="group flex flex-col sm:flex-row items-center gap-6 p-4 rounded-2xl hover:bg-amber-50/50 transition-colors border border-transparent hover:border-amber-100">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-[#3bc967] text-xl font-bold">
                      ✓
                    </div>
                  </div>
                  <div className="flex-grow text-center sm:text-left">
                    <p className="text-sm text-gray-400 uppercase tracking-wide font-bold mb-1">Acción</p>
                    <p className="text-gray-700 text-lg">
                      Presionar el botón <span className="font-bold font-mono text-[#ffba00] bg-amber-100/50 px-1 rounded">[Guardar]</span>.
                    </p>
                  </div>
                  {/* Simulación Visual UI */}
                  <div className="flex-shrink-0 transform group-hover:scale-105 transition-transform duration-300">
                    <button className="bg-[#3bc967] text-white text-xs font-bold py-2 px-4 rounded shadow-sm pointer-events-none">
                      Guardar
                    </button>
                  </div>
                </div>

                {/* Separador */}
                <div className="h-px bg-gray-100 w-full"></div>

                {/* Ejemplo 2 */}
                <div className="group flex flex-col sm:flex-row items-center gap-6 p-4 rounded-2xl hover:bg-amber-50/50 transition-colors border border-transparent hover:border-amber-100">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-[#3bc967] text-xl font-bold">
                      ✓
                    </div>
                  </div>
                  <div className="flex-grow text-center sm:text-left">
                    <p className="text-sm text-gray-400 uppercase tracking-wide font-bold mb-1">Resultado Esperado</p>
                    <p className="text-gray-700 text-lg">
                      Verás el botón <span className="font-bold font-mono text-[#ffba00] bg-amber-100/50 px-1 rounded">[Confirmar pago]</span>.
                    </p>
                  </div>
                  {/* Simulación Visual UI */}
                  <div className="flex-shrink-0 transform group-hover:scale-105 transition-transform duration-300">
                    <button className="bg-[#ff4d38] text-white text-xs font-bold py-2 px-4 rounded shadow-sm pointer-events-none">
                      Confirmar pago
                    </button>
                  </div>
                </div>

                {/* Separador */}
                <div className="h-px bg-gray-100 w-full"></div>

                {/* Ejemplo 3 */}
                <div className="group flex flex-col sm:flex-row items-center gap-6 p-4 rounded-2xl hover:bg-amber-50/50 transition-colors border border-transparent hover:border-amber-100">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-[#3bc967] text-xl font-bold">
                      ✓
                    </div>
                  </div>
                  <div className="flex-grow text-center sm:text-left">
                    <p className="text-sm text-gray-400 uppercase tracking-wide font-bold mb-1">Interacción</p>
                    <p className="text-gray-700 text-lg">
                      Hacer clic en <span className="font-bold font-mono text-[#ffba00] bg-amber-100/50 px-1 rounded">[Editar dirección]</span>.
                    </p>
                  </div>
                  {/* Simulación Visual UI */}
                  <div className="flex-shrink-0 transform group-hover:scale-105 transition-transform duration-300">
                    <button className="border border-gray-300 text-gray-600 bg-white text-xs font-bold py-2 px-4 rounded shadow-sm pointer-events-none flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                      Editar dirección
                    </button>
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


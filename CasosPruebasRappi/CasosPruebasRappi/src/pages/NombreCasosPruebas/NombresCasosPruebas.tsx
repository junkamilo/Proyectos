export const NombresCasosPruebas = () => {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 w-full mb-12">
      <div className="max-w-5xl mx-auto">

        {/* 1. Encabezado (Rosa para conectar con el Navar Item #6) */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-pink-50 rounded-2xl mb-4 shadow-sm">
            {/* Icono de Play/Inicio */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <h2 className="text-sm font-bold tracking-widest text-pink-500 uppercase mb-2">
            Regla #6
          </h2>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-800 tracking-tight">
            Todo objetivo inicia con:
          </h1>

          {/* Visualización de la "Frase Bloque" */}
          <div className="mt-6 flex justify-center">
            <div className="bg-pink-500 text-white px-6 py-3 rounded-xl font-mono text-lg sm:text-2xl font-bold shadow-lg shadow-pink-500/30 transform hover:scale-105 transition-transform duration-300 cursor-default flex items-center gap-2">
              <span className="opacity-50 text-sm">▶</span>
              “El caso de prueba que…”
            </div>
          </div>

          <p className="mt-6 text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Esta frase estandariza la redacción, deja claro el propósito y permite entender de inmediato qué se está validando.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* 2. Columna Izquierda: Beneficios (Más compacta) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 h-full relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-400 to-pink-600"></div>

              <h3 className="text-xl font-bold text-gray-800 mb-6">¿Por qué es importante?</h3>

              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center shrink-0 text-pink-600 font-bold">1</div>
                  <div>
                    <h4 className="font-bold text-gray-700 text-sm">Claridad Instantánea</h4>
                    <p className="text-gray-500 text-sm mt-1">Permite entender en una sola línea qué se está validando.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center shrink-0 text-pink-600 font-bold">2</div>
                  <div>
                    <h4 className="font-bold text-gray-700 text-sm">Estandarización</h4>
                    <p className="text-gray-500 text-sm mt-1">Establece un estándar narrativo uniforme para todo el equipo.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* 3. Columna Derecha: Ejemplos de Estructura (Tickets) */}
          <div className="lg:col-span-8">
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider ml-2 mb-2">Ejemplos de Aplicación</h3>

              {/* Ejemplo 1 */}
              <div className="group bg-white rounded-2xl p-5 border-l-4 border-pink-500 shadow-sm hover:shadow-md transition-all duration-300 flex items-start gap-4">
                <div className="mt-1 hidden sm:block">
                  <div className="w-6 h-6 rounded-full bg-[#3bc967] flex items-center justify-center text-white text-xs font-bold">✓</div>
                </div>
                <div className="font-medium text-gray-700 leading-relaxed">
                  <span className="font-bold text-pink-600 bg-pink-50 px-2 py-0.5 rounded mr-1">El caso de prueba que</span>
                  valida la creación de una orden con todos los campos obligatorios completados.
                </div>
              </div>

              {/* Ejemplo 2 */}
              <div className="group bg-white rounded-2xl p-5 border-l-4 border-pink-500 shadow-sm hover:shadow-md transition-all duration-300 flex items-start gap-4">
                <div className="mt-1 hidden sm:block">
                  <div className="w-6 h-6 rounded-full bg-[#3bc967] flex items-center justify-center text-white text-xs font-bold">✓</div>
                </div>
                <div className="font-medium text-gray-700 leading-relaxed">
                  <span className="font-bold text-pink-600 bg-pink-50 px-2 py-0.5 rounded mr-1">El caso de prueba que</span>
                  verifica el comportamiento del sistema al editar un producto sin permisos.
                </div>
              </div>

              {/* Ejemplo 3 */}
              <div className="group bg-white rounded-2xl p-5 border-l-4 border-pink-500 shadow-sm hover:shadow-md transition-all duration-300 flex items-start gap-4">
                <div className="mt-1 hidden sm:block">
                  <div className="w-6 h-6 rounded-full bg-[#3bc967] flex items-center justify-center text-white text-xs font-bold">✓</div>
                </div>
                <div className="font-medium text-gray-700 leading-relaxed">
                  <span className="font-bold text-pink-600 bg-pink-50 px-2 py-0.5 rounded mr-1">El caso de prueba que</span>
                  comprueba la validación de campos al intentar guardar una dirección sin ciudad.
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

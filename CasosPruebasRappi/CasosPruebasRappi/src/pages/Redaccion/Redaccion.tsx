export const Redaccion = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 w-full bg-white/50">
      <div className="max-w-6xl mx-auto">

        {/* 1. Encabezado (Azul - Coherencia con Navar Item #2) */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-blue-50 rounded-2xl mb-4 shadow-sm">
            {/* Icono de Pluma/Edición */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
          </div>
          <h2 className="text-sm font-bold tracking-widest text-blue-500 uppercase mb-2">
            Regla #1
          </h2>
          <h1 className="text-3xl sm:text-5xl font-black text-gray-800 tracking-tight">
            Redacción en <span className="text-blue-500 relative inline-block">
              Tercera Persona
              <svg className="absolute w-full h-3 -bottom-2 left-0 text-blue-300 opacity-40" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" /></svg>
            </span>
          </h1>
          <p className="mt-6 text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed font-light">
            La clave para la automatización es la neutralidad. Describimos qué hace el sistema, no quién lo hace.
          </p>
        </div>

        {/* 2. Grid Comparativo (VS) */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-stretch">

          {/* Badge "VS" Flotante (Centrado absoluto) */}
          <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-16 h-16 bg-white rounded-full shadow-2xl border-4 border-gray-50 items-center justify-center">
            <span className="font-black text-gray-300 text-xl italic">VS</span>
          </div>

          {/* Tarjeta: INCORRECTO (Estilo Warning) */}
          <div className="group bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-lg hover:shadow-2xl hover:shadow-red-100/50 transition-all duration-300 relative overflow-hidden">
            {/* Decoración de fondo */}
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-red-50 rounded-full opacity-50 transition-transform duration-500 group-hover:scale-110"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center text-[#ff4d38] shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">Lo que evitamos</h3>
                  <p className="text-xs font-bold text-[#ff4d38] uppercase tracking-wide">Subjetividad</p>
                </div>
              </div>

              <div className="space-y-4">
                {/* Ejemplo 1 Malo */}
                <div className="p-5 bg-red-50/50 rounded-2xl border border-red-100 group-hover:border-red-200 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-red-400 uppercase">1ra Persona</span>
                    <span className="text-lg opacity-50">❌</span>
                  </div>
                  <p className="text-gray-500 line-through decoration-red-300 decoration-2 text-lg">
                    “Ingresamos los datos...”
                  </p>
                </div>

                {/* Ejemplo 2 Malo */}
                <div className="p-5 bg-red-50/50 rounded-2xl border border-red-100 group-hover:border-red-200 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-red-400 uppercase">Ambigüedad</span>
                    <span className="text-lg opacity-50">❌</span>
                  </div>
                  <p className="text-gray-500 line-through decoration-red-300 decoration-2 text-lg">
                    “Probamos si guarda...”
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tarjeta: CORRECTO (Estilo Success) */}
          <div className="group bg-white rounded-[2.5rem] p-8 border-2 border-transparent hover:border-green-100 shadow-xl hover:shadow-2xl hover:shadow-green-100/50 transition-all duration-300 relative overflow-hidden transform hover:-translate-y-1">
            {/* Decoración de fondo */}
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-green-50 rounded-full opacity-50 transition-transform duration-500 group-hover:scale-110"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#3bc967] to-[#6feba5] flex items-center justify-center text-white shadow-lg shadow-green-500/30">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">El Estándar</h3>
                  <p className="text-xs font-bold text-[#3bc967] uppercase tracking-wide">Neutralidad</p>
                </div>
              </div>

              <div className="space-y-4">
                {/* Ejemplo 1 Bueno */}
                <div className="p-5 bg-green-50 rounded-2xl border border-green-100 group-hover:border-green-300 transition-colors shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-green-600 uppercase">Infinitivo</span>
                    <span className="text-lg text-[#3bc967]">✅</span>
                  </div>
                  <p className="text-gray-800 font-bold text-lg">
                    “Ingresar los datos...”
                  </p>
                </div>

                {/* Ejemplo 2 Bueno */}
                <div className="p-5 bg-green-50 rounded-2xl border border-green-100 group-hover:border-green-300 transition-colors shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-green-600 uppercase">Sistémico</span>
                    <span className="text-lg text-[#3bc967]">✅</span>
                  </div>
                  <p className="text-gray-800 font-bold text-lg">
                    “El sistema valida...”
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 3. Footer Section: Resumen */}
        <div className="mt-12 flex justify-center">
          <div className="bg-blue-50 rounded-3xl p-6 max-w-3xl w-full flex flex-col sm:flex-row items-center gap-6 border border-blue-100">
            <div className="p-4 bg-white rounded-2xl text-blue-500 shadow-sm shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <div className="text-center sm:text-left">
              <h4 className="text-lg font-bold text-gray-800 mb-1">¿Por qué es crucial?</h4>
              <p className="text-gray-600 text-sm">
                Al eliminar el "sujeto humano" (nosotros), los casos se vuelven instrucciones directas compatibles con scripts de automatización y leíbles por cualquier miembro del equipo.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};


export const Redaccion = () => {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 w-full mb-12">
      <div className="max-w-5xl mx-auto">

        {/* 1. Encabezado (Azul para conectar con el Navar) */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-blue-50 rounded-2xl mb-4 shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
          </div>
          <h2 className="text-sm font-bold tracking-widest text-blue-500 uppercase mb-2">
            Regla #1
          </h2>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-800 tracking-tight">
            Redacción en <span className="text-blue-500 relative">
              Tercera Persona
              <svg className="absolute w-full h-2 -bottom-1 left-0 text-blue-200" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" /></svg>
            </span>
          </h1>
          <p className="mt-6 text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
            La clave para la automatización es la neutralidad. Describimos acciones del sistema, no nuestras acciones.
          </p>
        </div>

        {/* 2. Grid Comparativo (VS) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">

          {/* Badge "VS" Flotante (Visible solo en desktop) */}
          <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg border border-gray-100 items-center justify-center font-black text-gray-300 text-xs">
            VS
          </div>

          {/* Tarjeta: INCORRECTO (Rojo Rappi) */}
          <div className="group bg-white rounded-3xl p-8 border-2 border-transparent hover:border-[#ff4d38]/20 shadow-sm hover:shadow-xl hover:shadow-red-100/50 transition-all duration-300 relative overflow-hidden">
            {/* Fondo sutil rojo */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-[#ff4d38]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </div>
                <h3 className="text-lg font-bold text-gray-800">Lo que debemos evitar</h3>
              </div>

              <ul className="space-y-4">
                <li className="p-4 bg-red-50 rounded-2xl border border-red-100 transition-transform group-hover:translate-x-1">
                  <p className="text-sm font-bold text-[#ff4d38] mb-1">1ra Persona (Nosotros/Yo)</p>
                  <p className="text-gray-600 line-through decoration-[#ff4d38]/50">“Ingresamos los datos en el formulario”</p>
                </li>
                <li className="p-4 bg-red-50 rounded-2xl border border-red-100 transition-transform group-hover:translate-x-1 delay-75">
                  <p className="text-sm font-bold text-[#ff4d38] mb-1">Subjetividad</p>
                  <p className="text-gray-600 line-through decoration-[#ff4d38]/50">“Probamos si el sistema permite guardar”</p>
                </li>
              </ul>
            </div>
          </div>

          {/* Tarjeta: CORRECTO (Verde Rappi) */}
          <div className="group bg-white rounded-3xl p-8 border-2 border-transparent hover:border-[#3bc967]/20 shadow-sm hover:shadow-xl hover:shadow-green-100/50 transition-all duration-300 relative overflow-hidden">
            {/* Fondo sutil verde */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#3bc967]/20 flex items-center justify-center text-[#3bc967]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="text-lg font-bold text-gray-800">La forma correcta</h3>
              </div>

              <ul className="space-y-4">
                <li className="p-4 bg-green-50 rounded-2xl border border-green-100 transition-transform group-hover:translate-x-1">
                  <p className="text-sm font-bold text-[#3bc967] mb-1">Infinitivo / Imperativo Neutro</p>
                  <p className="text-gray-700 font-medium">“Ingresar los datos en el formulario”</p>
                </li>
                <li className="p-4 bg-green-50 rounded-2xl border border-green-100 transition-transform group-hover:translate-x-1 delay-75">
                  <p className="text-sm font-bold text-[#3bc967] mb-1">Descripción del Sistema</p>
                  <p className="text-gray-700 font-medium">“El sistema valida los campos obligatorios”</p>
                </li>
              </ul>
            </div>
          </div>

        </div>

        {/* 3. Ventajas (Footer Section) */}
        <div className="mt-10 bg-gradient-to-r from-gray-50 to-white rounded-2xl p-6 border border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-inner">

          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-xl shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <div>
              <h4 className="font-bold text-gray-800">Ventajas Clave</h4>
              <p className="text-sm text-gray-500">Por qué usamos este estándar</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <span className="px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-600 text-sm font-medium shadow-sm flex items-center gap-2">
              <span className="w-2 h-2 bg-[#3bc967] rounded-full"></span>
              Neutralidad
            </span>
            <span className="px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-600 text-sm font-medium shadow-sm flex items-center gap-2">
              <span className="w-2 h-2 bg-[#3bc967] rounded-full"></span>
              Automatización fácil
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};


export const Objetivos = () => {

    const cardsData = [
        {
            id: 1,
            title: "Comprensión Universal",
            text: "Que cualquier persona del equipo pueda entender y ejecutar los casos sin complicaciones. Evita depender de interpretaciones individuales.",
            iconColor: "from-blue-500 to-blue-300", 
            shadowColor: "shadow-blue-500/20",
            borderColor: "group-hover:border-blue-200",
            icon: (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>)
        },
        {
            id: 2,
            title: "Reutilización Inteligente",
            text: "Reutilizar los casos en diferentes escenarios. Ahorra tiempo y mantiene la coherencia del proceso en todo el proyecto.",
            iconColor: "from-[#3bc967] to-[#6feba5]", 
            shadowColor: "shadow-green-500/20",
            borderColor: "group-hover:border-green-200",
            icon: (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>)
        },
        {
            id: 3,
            title: "Mantenimiento y Trazabilidad",
            text: "Facilitar el mantenimiento, la automatización y la trazabilidad. Todo queda más ordenado, controlado y fácil de seguir.",
            iconColor: "from-purple-600 to-purple-400", 
            shadowColor: "shadow-purple-500/20",
            borderColor: "group-hover:border-purple-200",
            icon: (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>)
        },
        {
            id: 4,
            title: "Cero Ambigüedad",
            text: "Reducir errores de interpretación o ambigüedad. Menos confusiones significan menos retrabajo y entregas más rápidas.",
            iconColor: "from-[#ff4d38] to-[#ff8a75]", 
            shadowColor: "shadow-red-500/20",
            borderColor: "group-hover:border-red-200",
            icon: (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>)
        },
        {
            id: 5,
            title: "Legado Profesional",
            text: "Mantener una documentación profesional y consistente a lo largo del tiempo. Que sea útil hoy y también en mucho tiempo.",
            iconColor: "from-[#ffba00] to-[#ffd560]", 
            shadowColor: "shadow-yellow-500/20",
            borderColor: "group-hover:border-yellow-200",
            icon: (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>)
        }
    ];

    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8 w-full bg-white/50">
            <div className="max-w-7xl mx-auto">

                {/* Encabezado de la Sección */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center p-3 bg-green-50 rounded-2xl mb-4 shadow-sm">
                        {/* Icono de Diana/Objetivo (Coherencia con Navar) */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#3bc967]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <h2 className="text-sm font-bold tracking-widest text-[#3bc967] uppercase mb-2">
                        Fundamentos
                    </h2>
                    <h1 className="text-3xl sm:text-5xl font-black text-gray-800 tracking-tight">
                        OBJETIVO: <span className="text-[#ff4d38] relative inline-block">
                            ESTANDARIZACIÓN
                            <svg className="absolute w-full h-3 -bottom-2 left-0 text-[#ff4d38] opacity-30" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" /></svg>
                        </span>
                    </h1>
                    <p className="mt-6 text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed font-light">
                        Las 5 razones por las que transformamos nuestra forma de documentar.
                    </p>
                </div>

                {/* Grid de Tarjetas */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">

                    {cardsData.map((card, index) => (
                        <div
                            key={card.id}
                            className={`group bg-white rounded-[2rem] p-8 shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 ${card.borderColor} hover:-translate-y-2 relative overflow-hidden`}
                        >
                            {/* Numeración Fantasma en el fondo */}
                            <div className="absolute -right-4 -bottom-8 text-9xl font-black text-gray-50 opacity-50 select-none z-0 group-hover:text-gray-100 transition-colors">
                                {index + 1}
                            </div>

                            {/* Fondo gradiente sutil al hover */}
                            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${card.iconColor} opacity-0 group-hover:opacity-10 rounded-bl-full transition-opacity duration-500 z-0`}></div>

                            <div className="relative z-10">
                                {/* Icono */}
                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.iconColor} ${card.shadowColor} flex items-center justify-center shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    {card.icon}
                                </div>

                                {/* Contenido */}
                                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-[#ff4d38] transition-colors">
                                    {card.title}
                                </h3>
                                <p className="text-gray-500 leading-relaxed text-sm font-medium">
                                    {card.text}
                                </p>
                            </div>
                        </div>
                    ))}

                    {/* Tarjeta de Cierre / Resumen (Ocupa el último espacio o centra el grid) */}
                    <div className="md:col-span-2 lg:col-span-1 bg-gray-50 rounded-[2rem] p-8 border border-gray-200 border-dashed flex flex-col justify-center items-center text-center group hover:bg-gray-100 transition-colors">
                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mb-4 group-hover:bg-[#3bc967] transition-colors duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        </div>
                        <h3 className="text-lg font-bold text-gray-700 mb-2">Resultado Final</h3>
                        <p className="text-xs text-gray-500 px-4">
                            Un equipo alineado, entregas más rápidas y software de mayor calidad.
                        </p>
                    </div>

                </div>

            </div>
        </section>
    );
};

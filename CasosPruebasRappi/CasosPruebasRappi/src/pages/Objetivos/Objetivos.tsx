export const Objetivos = () => {

    // Datos estructurados para generar las tarjetas de forma limpia
    const cardsData = [
        {
            id: 1,
            title: "Comprensión Universal",
            text: "Que cualquier persona del equipo pueda entender y ejecutar los casos sin complicaciones. Evita depender de interpretaciones individuales.",
            iconColor: "from-blue-500 to-blue-300", // Azul (Claridad)
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            )
        },
        {
            id: 2,
            title: "Reutilización Inteligente",
            text: "Reutilizar los casos en diferentes escenarios. Ahorra tiempo y mantiene la coherencia del proceso en todo el proyecto.",
            iconColor: "from-[#3bc967] to-[#6feba5]", // Verde (Eficiencia/Rappi)
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            )
        },
        {
            id: 3,
            title: "Mantenimiento y Trazabilidad",
            text: "Facilitar el mantenimiento, la automatización y la trazabilidad. Todo queda más ordenado, controlado y fácil de seguir.",
            iconColor: "from-purple-600 to-purple-400", // Morado (Tecnología/Control)
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            )
        },
        {
            id: 4,
            title: "Cero Ambigüedad",
            text: "Reducir errores de interpretación o ambigüedad. Menos confusiones significan menos retrabajo y entregas más rápidas.",
            iconColor: "from-[#ff4d38] to-[#ff8a75]", // Rojo Rappi (Alerta/Solución)
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            )
        },
        {
            id: 5,
            title: "Legado Profesional",
            text: "Mantener una documentación profesional y consistente a lo largo del tiempo. Que sea útil hoy y también dentro de un año.",
            iconColor: "from-[#ffba00] to-[#ffd560]", // Amarillo (Valor/Premium)
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
            )
        }
    ];

    return (
        <section className="py-12 px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-7xl mx-auto">

                {/* Encabezado de la Sección */}
                <div className="text-center mb-12">
                    <h2 className="text-sm font-bold tracking-widest text-[#3bc967] uppercase mb-2">
                        ¿Por qué hacemos esto?
                    </h2>
                    <h1 className="text-3xl sm:text-4xl font-black text-gray-800 tracking-tight">
                        OBJETIVO: <span className="text-[#ff4d38] relative inline-block">
                            ESTANDARIZACIÓN
                            {/* Subrayado estilo "marker" */}
                            <svg className="absolute w-full h-3 -bottom-1 left-0 text-[#ff4d38] opacity-30" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" /></svg>
                        </span>
                    </h1>
                    <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
                        Establecer las bases para un flujo de trabajo eficiente, escalable y libre de errores para todo el equipo.
                    </p>
                </div>

                {/* Grid de Tarjetas */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">

                    {/* Mapeo de las tarjetas */}
                    {cardsData.map((card) => (
                        <div
                            key={card.id}
                            className="group bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1 relative overflow-hidden"
                        >
                            {/* Fondo decorativo sutil al hover */}
                            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${card.iconColor} opacity-0 group-hover:opacity-10 rounded-bl-full transition-opacity duration-300`}></div>

                            {/* Icono */}
                            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.iconColor} flex items-center justify-center shadow-md mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                {card.icon}
                            </div>

                            {/* Contenido */}
                            <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-[#ff4d38] transition-colors">
                                {card.title}
                            </h3>
                            <p className="text-gray-500 leading-relaxed text-sm">
                                {card.text}
                            </p>
                        </div>
                    ))}

                </div>

                {/* Call to Action / Cierre Visual */}
                <div className="mt-12 flex justify-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-gray-500 text-xs font-bold uppercase tracking-wide">
                        <span className="w-2 h-2 rounded-full bg-[#3bc967] animate-pulse"></span>
                        Optimizando procesos
                    </div>
                </div>

            </div>
        </section>
    );
};

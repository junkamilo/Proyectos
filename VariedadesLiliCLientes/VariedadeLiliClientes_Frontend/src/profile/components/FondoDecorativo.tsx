export const FondoDecorativo = () => {
    return (
        <div className="h-64 bg-gradient-to-br from-emerald-900 via-teal-800 to-emerald-950 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
            {/* Elementos flotantes decorativos */}
            <div className="absolute top-[-50%] left-[-10%] w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-[-50%] right-[-10%] w-[400px] h-[400px] bg-teal-300/10 rounded-full blur-[80px] pointer-events-none"></div>
        </div>
    )
}

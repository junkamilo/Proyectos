import { Leaf } from "lucide-react";

export const AuthBanner = () => {
    return (
        <div className="hidden lg:block relative overflow-hidden bg-emerald-900 h-full min-h-[600px]">
            {/* Imagen de Fondo */}
            <div className="absolute inset-0 opacity-60">
                <img
                    src="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&q=80&w=1000"
                    alt="Background"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Overlay Gradiente */}
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-900/40 to-transparent" />

            {/* Contenido */}
            <div className="relative h-full flex flex-col justify-between p-12 text-white z-10">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/10 text-xs font-bold uppercase tracking-widest mb-6">
                        <Leaf className="w-3 h-3" /> Lifestyle & Garden
                    </div>
                    <h2 className="text-5xl font-black leading-tight mb-4">
                        Cultiva tu <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-200">
                            Propio Mundo
                        </span>
                    </h2>
                    <p className="text-emerald-100/80 text-lg max-w-sm">
                        Únete a nuestra comunidad de amantes de las plantas, artesanos y soñadores.
                    </p>
                </div>

                {/* Badges Inferiores */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/5 hover:bg-white/20 transition-colors">
                        <div className="text-2xl mb-1">🌿</div>
                        <div className="font-bold text-sm">Expertos</div>
                        <div className="text-xs text-white/60">Guías de cuidado</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/5 hover:bg-white/20 transition-colors">
                        <div className="text-2xl mb-1">🏺</div>
                        <div className="font-bold text-sm">Artesanal</div>
                        <div className="text-xs text-white/60">Piezas únicas</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
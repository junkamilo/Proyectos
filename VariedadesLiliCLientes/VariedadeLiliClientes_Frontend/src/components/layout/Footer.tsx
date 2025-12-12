import { Facebook, Instagram, Mail, Twitter, Leaf } from "lucide-react"
import { Link } from "react-router"

export default function Footer() {
    return (
        <footer className="relative bg-stone-50 dark:bg-slate-950 pt-20 pb-10 border-t border-emerald-100 dark:border-slate-800 overflow-hidden">

            {/* --- DECORACIÓN: Borde Superior Gradiente (Bosque) --- */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-700 via-green-600 to-lime-500" />

            {/* --- DECORACIÓN: Resplandores de fondo (Luz filtrada) --- */}
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-lime-500/5 rounded-full blur-3xl translate-y-1/2 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    {/* --- COLUMNA 1: MARCA --- */}
                    <div className="space-y-6">
                        <Link to="/" className="flex items-center gap-3 group w-fit">
                            {/* Logo: Gradiente Hoja */}
                            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 shadow-lg shadow-emerald-500/25 group-hover:scale-105 transition-all duration-300">
                                <Leaf className="text-white w-6 h-6" />
                            </div>
                            <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-800 to-teal-600 bg-clip-text text-transparent">
                                VariedadesLili
                            </span>
                        </Link>
                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed max-w-xs font-medium">
                            Cultivando vida para tu hogar. Llevamos la frescura de la naturaleza directamente a tu puerta con amor y dedicación.
                        </p>

                        {/* Redes Sociales (Hover Verde) */}
                        <div className="flex gap-3">
                            {[Facebook, Instagram, Twitter].map((Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-slate-900 border border-emerald-100 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-200 transition-all duration-300 hover:-translate-y-1"
                                >
                                    <Icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* --- COLUMNA 2: TIENDA --- */}
                    <div>
                        <h3 className="font-bold text-slate-800 dark:text-white text-lg mb-6 flex items-center gap-2">
                            Tienda
                            {/* Punto de acento: Verde Lima */}
                            <span className="w-1.5 h-1.5 rounded-full bg-lime-500" />
                        </h3>
                        <ul className="space-y-4">
                            {["Nuevas Colecciones", "Ofertas Especiales", "Más Vendidos", "Plantas de Interior", "Macetas de Diseño"].map((item) => (
                                <li key={item}>
                                    <Link to="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors flex items-center gap-2 group">
                                        <span className="w-0 group-hover:w-2 h-[2px] bg-emerald-500 transition-all duration-300" />
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* --- COLUMNA 3: SOPORTE --- */}
                    <div>
                        <h3 className="font-bold text-slate-800 dark:text-white text-lg mb-6 flex items-center gap-2">
                            Soporte
                            {/* Punto de acento: Verde Esmeralda */}
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        </h3>
                        <ul className="space-y-4">
                            {["Sobre Nosotros", "Contacto", "Envíos y Devoluciones", "Política de Privacidad", "Guía de Cuidados"].map((item) => (
                                <li key={item}>
                                    <Link to="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors flex items-center gap-2 group">
                                        <span className="w-0 group-hover:w-2 h-[2px] bg-emerald-500 transition-all duration-300" />
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* --- COLUMNA 4: NEWSLETTER --- */}
                    <div className="space-y-6">
                        <h3 className="font-bold text-slate-800 dark:text-white text-lg mb-2">
                            Únete al Vivero 🌿
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            Recibe consejos de jardinería, guías de riego y ofertas exclusivas.
                        </p>

                        <form className="relative group" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder="tu@correo.com"
                                className="w-full pl-4 pr-12 py-3 rounded-xl bg-white dark:bg-slate-900 border border-emerald-100 dark:border-slate-800 focus:bg-white dark:focus:bg-slate-950 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all duration-300 text-sm placeholder:text-slate-400 shadow-sm"
                            />
                            <button
                                type="submit"
                                className="absolute right-1.5 top-1.5 p-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg text-white shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
                            >
                                <Mail className="w-5 h-5" />
                            </button>
                        </form>

                        {/* Info de contacto rápida */}
                        <div className="pt-4 border-t border-emerald-100 dark:border-slate-800">
                            <p className="text-xs text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-900/20 py-2 px-3 rounded-lg inline-block">
                                📞 Atención: Lunes a Sábado
                            </p>
                        </div>
                    </div>
                </div>

                {/* --- BARRA INFERIOR (Copyright) --- */}
                <div className="border-t border-emerald-100 dark:border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-slate-500 text-center md:text-left">
                        © 2025 VariedadesLili. Creciendo contigo.
                    </p>

                    {/* Iconos de Pago */}
                    <div className="flex gap-3 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                        <span className="text-[10px] font-bold text-slate-500 border border-slate-300 dark:border-slate-700 rounded px-2 py-1 bg-white dark:bg-slate-900">VISA</span>
                        <span className="text-[10px] font-bold text-slate-500 border border-slate-300 dark:border-slate-700 rounded px-2 py-1 bg-white dark:bg-slate-900">Mastercard</span>
                        <span className="text-[10px] font-bold text-slate-500 border border-slate-300 dark:border-slate-700 rounded px-2 py-1 bg-white dark:bg-slate-900">Nequi</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}
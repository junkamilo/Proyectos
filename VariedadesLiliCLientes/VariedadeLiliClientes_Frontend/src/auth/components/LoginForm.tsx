
import {Mail, Lock, Eye, EyeOff, ArrowRight,Loader2, Fingerprint,Github, Chrome} from "lucide-react"
import { useLoginForm } from "../Hooks/useLoginForm"
import { Link } from "react-router"

// Importamos la lógica separada


export default function LoginForm() {
    // Extraemos la lógica del Hook
    const {
        formData,
        errors,
        isSubmitting,
        showPassword,
        togglePasswordVisibility,
        handleChange,
        handleSubmit
    } = useLoginForm()

    // --- SUB-COMPONENTE UI ---
    // (Se mantiene aquí para facilitar la lectura del JSX principal)
    const InputField = ({ label, name, type = "text", icon: Icon, placeholder, error, value, onChange }: any) => (
        <div className="space-y-2 group">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1 group-focus-within:text-emerald-600 transition-colors">
                {label}
            </label>
            <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors">
                    <Icon className="w-5 h-5" />
                </div>

                <input
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className={`w-full pl-12 pr-12 py-4 bg-slate-50 dark:bg-slate-900/50 border-2 rounded-2xl outline-none transition-all font-medium text-slate-700 dark:text-slate-200 placeholder:text-slate-400
                    ${error
                            ? "border-red-200 bg-red-50/10 focus:border-red-500"
                            : "border-slate-100 dark:border-slate-700 focus:border-emerald-500 focus:bg-white dark:focus:bg-slate-800 focus:shadow-xl focus:shadow-emerald-500/10"
                        }`}
                />

                {/* Toggle Password usando la función del hook */}
                {name === 'contrasena' && (
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-1"
                    >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                )}
            </div>
            {error && <p className="text-red-500 text-xs font-semibold ml-2 animate-pulse">{error}</p>}
        </div>
    )

    return (
        <div className="min-h-screen flex items-center justify-center p-4 md:p-6 bg-slate-50 dark:bg-slate-950 font-sans selection:bg-emerald-200 selection:text-emerald-900">

            {/* CARD PRINCIPAL */}
            <div className="w-full max-w-6xl bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl overflow-hidden grid lg:grid-cols-5 min-h-[650px] border border-slate-100 dark:border-slate-800 relative">

                {/* --- LADO IZQUIERDO: FORMULARIO (2 cols) --- */}
                <div className="lg:col-span-2 p-8 md:p-12 xl:p-16 flex flex-col justify-center relative z-10">

                    {/* Header Minimalista */}
                    <div className="mb-10">
                        <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center mb-6 text-emerald-600 dark:text-emerald-400">
                            <Fingerprint className="w-7 h-7" />
                        </div>
                        <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">
                            Hola de nuevo.
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 text-lg">
                            Nos alegra verte. Tu jardín digital te espera.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">

                        <InputField
                            label="Correo Electrónico"
                            name="email"
                            type="email"
                            icon={Mail}
                            placeholder="nombre@ejemplo.com"
                            value={formData.email}
                            onChange={handleChange}
                            error={errors.email}
                        />

                        <div className="space-y-2">
                            <InputField
                                label="Contraseña"
                                name="contrasena"
                                // Usamos el estado showPassword que viene del hook
                                type={showPassword ? "text" : "password"}
                                icon={Lock}
                                placeholder="••••••••"
                                value={formData.contrasena}
                                onChange={handleChange}
                                error={errors.contrasena}
                            />

                            {/* Opciones Extra */}
                            <div className="flex items-center justify-between px-1">
                                <label className="flex items-center gap-2 cursor-pointer group">
                                    <div className="relative flex items-center">
                                        <input
                                            type="checkbox"
                                            name="recordar"
                                            checked={formData.recordar}
                                            onChange={handleChange}
                                            className="peer sr-only"
                                        />
                                        <div className="w-5 h-5 border-2 border-slate-300 rounded-md peer-checked:bg-slate-900 peer-checked:border-slate-900 dark:peer-checked:bg-emerald-500 dark:peer-checked:border-emerald-500 transition-all"></div>
                                        <div className="absolute inset-0 flex items-center justify-center text-white opacity-0 peer-checked:opacity-100 transition-opacity text-xs font-bold pointer-events-none">✓</div>
                                    </div>
                                    <span className="text-sm font-medium text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">Recordarme</span>
                                </label>

                                <a href="#" className="text-sm font-bold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 hover:underline">
                                    ¿Olvidaste tu clave?
                                </a>
                            </div>
                        </div>

                        {/* Botón Principal */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full group relative bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl py-4 font-bold text-lg shadow-xl shadow-slate-900/10 hover:shadow-2xl hover:scale-[1.01] transition-all active:scale-[0.99] overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-3">
                                {isSubmitting ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <>
                                        Iniciar Sesión <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </span>
                            {/* Brillo sutil al hover */}
                            <div className="absolute inset-0 bg-white/10 dark:bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                    </form>

                    {/* Separador Social */}
                    <div className="my-8 flex items-center gap-4">
                        <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1" />
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">O continúa con</span>
                        <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1" />
                    </div>

                    {/* Botones Sociales */}
                    <div className="grid grid-cols-2 gap-4">
                        <button className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all font-bold text-slate-600 dark:text-slate-300">
                            <Chrome className="w-5 h-5" /> Google
                        </button>
                        <button className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all font-bold text-slate-600 dark:text-slate-300">
                            <Github className="w-5 h-5" /> GitHub
                        </button>
                    </div>

                    <p className="mt-8 text-center text-slate-500 text-sm">
                        ¿Aún no tienes cuenta?{" "}
                        <Link to={'/register'} className="font-bold text-slate-900 dark:text-white hover:underline">
                            Regístrate gratis
                        </Link>
                    </p>
                </div>

                {/* --- LADO DERECHO: IMAGEN VISUAL (3 cols) --- */}
                <div className="hidden lg:block lg:col-span-3 relative overflow-hidden bg-slate-900">
                    <img
                        src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=1527&auto=format&fit=crop"
                        alt="Interior Plant Aesthetics"
                        className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-overlay hover:scale-105 transition-transform duration-[20s] ease-in-out"
                    />

                    {/* Gradientes y Efectos */}
                    <div className="absolute inset-0 bg-gradient-to-l from-transparent via-slate-900/20 to-slate-900/90" />
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 to-transparent mix-blend-multiply" />

                    {/* Texto sobre la imagen */}
                    <div className="absolute bottom-0 left-0 p-16 z-10">
                        <blockquote className="max-w-md">
                            <p className="text-3xl font-serif text-white/90 leading-relaxed italic mb-6">
                                "La naturaleza no se apresura, y sin embargo, todo se logra."
                            </p>
                            <footer className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/50 backdrop-blur-md" />
                                <div>
                                    <cite className="not-italic font-bold text-white block">Lao Tzu</cite>
                                    <span className="text-emerald-200/60 text-sm">Filosofía Natural</span>
                                </div>
                            </footer>
                        </blockquote>
                    </div>
                </div>
            </div>
        </div>
    )
}
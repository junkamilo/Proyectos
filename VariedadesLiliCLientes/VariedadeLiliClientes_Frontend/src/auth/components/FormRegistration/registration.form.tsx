import {
    User, Mail, Lock, Phone, Calendar,
    Camera, ArrowRight, Loader2, ShieldCheck
} from "lucide-react";
import { useRegistrationForm } from '@/auth/Hooks/useRegistrationForm';
import { AuthBanner } from './AuthBanner';
import { InputGroup } from './InputGroup';

// Imports de nuestros módulos


export default function RegisterPage() {
    // 1. Instanciamos el Hook
    const {
        formData,
        errors,
        isSubmitting,
        successMessage,
        showPassword,
        togglePasswordVisibility,
        handleChange,
        handleSubmit,
        handleFileChange,
    } = useRegistrationForm();

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-slate-100 dark:bg-slate-900 font-sans">

            <div className="w-full max-w-5xl bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-2xl overflow-hidden grid lg:grid-cols-2 relative">

                {/* --- COMPONENTE 1: BANNER VISUAL --- */}
                <AuthBanner />

                {/* --- LADO DERECHO: FORMULARIO --- */}
                <div className="p-8 md:p-12 lg:p-16 overflow-y-auto max-h-[90vh] custom-scrollbar">

                    {/* Cabecera del Form */}
                    <div className="mb-10">
                        <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Crear Cuenta</h1>
                        <p className="text-slate-500 dark:text-slate-400">
                            Completa tus datos para empezar tu colección.
                            <span className="block mt-1 text-xs text-emerald-600 dark:text-emerald-400 font-semibold cursor-pointer hover:underline">
                                ¿Ya tienes cuenta? Inicia sesión aquí
                            </span>
                        </p>
                    </div>

                    {/* Mensaje de Éxito */}
                    {successMessage && (
                        <div className="mb-8 p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl flex items-center gap-3 animate-fade-in">
                            <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <ShieldCheck className="w-5 h-5" />
                            </div>
                            {successMessage}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Grupo 1: Identidad */}
                        <div className="space-y-5">
                            <InputGroup
                                label="Nombre Completo"
                                name="nombre_completo"
                                icon={User}
                                placeholder="Ej: Ana María Polo"
                                value={formData.nombre_completo}
                                onChange={handleChange}
                                error={errors.nombre_completo}
                            />
                            <InputGroup
                                label="Correo Electrónico"
                                name="email"
                                type="email"
                                icon={Mail}
                                placeholder="usuario@ejemplo.com"
                                value={formData.email}
                                onChange={handleChange}
                                error={errors.email}
                            />
                        </div>

                        {/* Grupo 2: Seguridad */}
                        <div className="grid md:grid-cols-2 gap-5">
                            <InputGroup
                                label="Contraseña"
                                name="contrasena"
                                icon={Lock}
                                placeholder="••••••••"
                                value={formData.contrasena}
                                onChange={handleChange}
                                error={errors.contrasena}
                                showPassword={showPassword}
                                togglePasswordVisibility={togglePasswordVisibility}
                            />
                            <InputGroup
                                label="Confirmar"
                                name="confirmarContrasena"
                                icon={Lock}
                                placeholder="••••••••"
                                value={formData.confirmarContrasena}
                                onChange={handleChange}
                                error={errors.confirmarContrasena}
                                showPassword={showPassword}
                                togglePasswordVisibility={togglePasswordVisibility}
                            />
                        </div>

                        {/* Separador */}
                        <div className="relative py-2">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-slate-100 dark:border-slate-700"></span>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-white dark:bg-slate-800 px-2 text-slate-300">
                                    Detalles Personales
                                </span>
                            </div>
                        </div>

                        {/* Grupo 3: Detalles */}
                        <div className="grid md:grid-cols-2 gap-5">
                            <InputGroup
                                label="Teléfono"
                                name="telefono"
                                type="tel"
                                icon={Phone}
                                placeholder="+57 300 123..."
                                value={formData.telefono}
                                onChange={handleChange}
                                error={errors.telefono}
                            />
                            <InputGroup
                                label="Cumpleaños"
                                name="fecha_nacimiento"
                                type="date"
                                icon={Calendar}
                                value={formData.fecha_nacimiento}
                                onChange={handleChange}
                                error={errors.fecha_nacimiento}
                            />
                        </div>

                        {/* Grupo 4: Extra */}
                        <div className="grid md:grid-cols-2 gap-5">
                            <InputGroup
                                label="Género"
                                name="genero"
                                type="select"
                                icon={User}
                                value={formData.genero}
                                onChange={handleChange}
                                error={errors.genero}
                                options={[
                                    { value: "", label: "Seleccionar..." },
                                    { value: "M", label: "Masculino" },
                                    { value: "F", label: "Femenino" },
                                    { value: "Otro", label: "Otro" }
                                ]}
                            />
                            <InputGroup
                                label="Foto de Perfil"
                                name="url_foto_perfil"
                                icon={Camera}
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                error={errors.url_foto_perfil}
                            />
                        </div>

                        {/* Checkbox Términos */}
                        <div className="pt-2">
                            <label className="flex items-start gap-3 cursor-pointer group">
                                <div className="relative flex items-center">
                                    <input type="checkbox" className="peer sr-only" required />
                                    <div className="w-5 h-5 border-2 border-slate-300 rounded peer-checked:bg-emerald-500 peer-checked:border-emerald-500 transition-all"></div>
                                    <div className="absolute left-1 top-0.5 text-white opacity-0 peer-checked:opacity-100 transform scale-50 peer-checked:scale-100 transition-all pointer-events-none">✓</div>
                                </div>
                                <span className="text-sm text-slate-500 group-hover:text-slate-700 transition-colors">
                                    Acepto los <a href="#" className="font-bold text-emerald-600 hover:underline">Términos</a> y la <a href="#" className="font-bold text-emerald-600 hover:underline">Política de Privacidad</a>.
                                </span>
                            </label>
                        </div>

                        {/* Botón Submit */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full relative overflow-hidden group bg-slate-900 dark:bg-emerald-600 text-white rounded-xl py-4 font-bold text-lg shadow-xl shadow-slate-900/10 hover:shadow-2xl hover:shadow-emerald-900/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                {isSubmitting ? (
                                    <> <Loader2 className="w-5 h-5 animate-spin" /> Procesando... </>
                                ) : (
                                    <> Crear mi cuenta <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /> </>
                                )}
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </button>

                    </form>
                </div>
            </div>
        </div>
    );
}

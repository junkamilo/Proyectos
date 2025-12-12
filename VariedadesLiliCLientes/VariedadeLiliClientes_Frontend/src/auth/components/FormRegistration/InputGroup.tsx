import { Eye, EyeOff, type LucideIcon } from 'lucide-react';
import React from 'react';
 // Asumo tus imports

interface InputGroupProps {
    label: string;
    name: string;
    type?: string;
    icon: LucideIcon;
    placeholder?: string;
    error?: string;
    // CAMBIO 1: 'value' ahora es opcional porque el input file no lo usa
    value?: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    options?: { value: string; label: string }[];
    showPassword?: boolean;
    togglePasswordVisibility?: () => void;
    // CAMBIO 2: Agregamos 'accept' para validar tipos de archivos (ej: imagenes)
    accept?: string;
}

export const InputGroup = ({
    label,
    name,
    type = "text",
    icon: Icon,
    placeholder,
    error,
    value,
    onChange,
    options,
    showPassword,
    togglePasswordVisibility,
    accept // Recibimos la prop
}: InputGroupProps) => {

    const inputType = name.includes('contrasena')
        ? (showPassword ? "text" : "password")
        : type;

    return (
        <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                {label}
            </label>
            <div className="relative group">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors pointer-events-none">
                    <Icon className="w-5 h-5" />
                </div>

                {type === 'select' ? (
                    <select
                        name={name}
                        value={value}
                        onChange={onChange}
                        className={`w-full pl-10 pr-4 py-3 bg-slate-50 border-2 rounded-xl outline-none transition-all appearance-none cursor-pointer font-medium text-slate-700
                        ${error
                                ? "border-red-200 bg-red-50/50 focus:border-red-500"
                                : "border-slate-100 focus:border-emerald-400 focus:bg-white focus:shadow-lg focus:shadow-emerald-100"
                            }`}
                    >
                        {options?.map((opt) => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                ) : (
                    <input
                        name={name}
                        type={inputType}
                        placeholder={placeholder}
                        accept={accept} 
                        value={type === 'file' ? undefined : value}

                        onChange={onChange}
                        className={`w-full pl-10 pr-10 py-3 bg-slate-50 border-2 rounded-xl outline-none transition-all font-medium text-slate-700 placeholder:text-slate-400
                        
                        /* Estilos extra para el botón de subir archivo (file input) */
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-emerald-50 file:text-emerald-700
                        hover:file:bg-emerald-100

                        ${error
                                ? "border-red-200 bg-red-50/50 focus:border-red-500"
                                : "border-slate-100 focus:border-emerald-400 focus:bg-white focus:shadow-lg focus:shadow-emerald-100"
                            }`}
                    />
                )}

                {/* Botón de ver contraseña */}
                {name.includes('contrasena') && togglePasswordVisibility && (
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                )}
            </div>
            {error && (
                <p className="text-red-500 text-xs font-semibold ml-1 flex items-center gap-1 animate-pulse">
                    ⚠️ {error}
                </p>
            )}
        </div>
    );
};
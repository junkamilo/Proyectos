import { useState } from 'react';
// IMPORTANTE: Importamos la función que hace la petición real
// Ajusta la ruta a donde tengas "registerUser"
import type { RegisterFormData } from '../types/RegisterFormData';
import { registerUser } from '../action/register-action';


export const useRegistrationForm = () => {
    // 1. ESTADOS
    // Inicializamos url_foto_perfil como null, no como string vacía
    const [formData, setFormData] = useState<RegisterFormData & { confirmarContrasena: string }>({
        nombre_completo: "",
        email: "",
        contrasena: "",
        confirmarContrasena: "",
        telefono: "",
        fecha_nacimiento: "",
        genero: "",
        url_foto_perfil: null,
    })

    const [errors, setErrors] = useState<Record<string, string>>({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [successMessage, setSuccessMessage] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    // 2. TOGGLES Y UTILIDADES
    const togglePasswordVisibility = () => setShowPassword((prev) => !prev)

    // 3. VALIDACIÓN (Sin cambios, tu lógica estaba bien)
    const validateForm = () => {
        const newErrors: Record<string, string> = {}

        if (!formData.nombre_completo.trim()) newErrors.nombre_completo = "Requerido"
        if (!formData.email.trim()) {
            newErrors.email = "Requerido"
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Email inválido"
        }
        if (!formData.contrasena) {
            newErrors.contrasena = "Requerido"
        } else if (formData.contrasena.length < 8) {
            newErrors.contrasena = "Mínimo 8 caracteres"
        }
        if (formData.contrasena !== formData.confirmarContrasena) {
            newErrors.confirmarContrasena = "No coinciden"
        }
        if (formData.telefono && !/^\+?[\d\s-()]{10,}$/.test(formData.telefono)) {
            newErrors.telefono = "Teléfono inválido"
        }
        if (formData.fecha_nacimiento) {
            const edad = new Date().getFullYear() - new Date(formData.fecha_nacimiento).getFullYear()
            if (edad < 18) newErrors.fecha_nacimiento = "Debes ser mayor de 18 (+18)"
        }
        if (!formData.genero) newErrors.genero = "Requerido"

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    // 4. HANDLERS

    // Handler para inputs de texto/select normales
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }))
    }

    // NUEVO: Handler específico para el archivo (Imagen)
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        
        const target = e.target as HTMLInputElement;
        const { name, files } = target;

        if (files && files.length > 0) {
            setFormData((prev) => ({ ...prev, [name]: files }));
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSuccessMessage(""); // Limpiar mensajes previos
        setErrors({}); // Limpiar errores previos

        if (!validateForm()) return

        setIsSubmitting(true)

        try {
            // LÓGICA CORREGIDA: Llamada real al backend
            // registerUser ya se encarga de convertir a FormData
            await registerUser(formData);

            setSuccessMessage("¡Usuario registrado exitosamente! Redirigiendo...")

            // Opcional: Limpiar formulario
            // setFormData({ ...valoresIniciales })

        } catch (error: any) {
            // Capturamos el error que lanza tu servicio (registerUser)
            console.error(error);
            setErrors({ submit: error.message || "Error al intentar registrarse." })
        } finally {
            setIsSubmitting(false)
        }
    }

    // 5. RETORNO
    return {
        formData,
        errors,
        isSubmitting,
        successMessage,
        showPassword,
        togglePasswordVisibility,
        handleChange,
        handleFileChange, // Exportamos el nuevo handler
        handleSubmit
    }
}
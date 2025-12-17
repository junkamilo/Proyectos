import { useState } from 'react';
import type { RegisterFormData } from '../types/RegisterFormData';
import { registerUser } from '../action/register-action';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';


export const useRegistrationForm = () => {

    //inicializamos el hook de navegacion esto es con el proposito de que cuando el usuario se registre lo redirimos al home
    const navigationUser = useNavigate();
    const { login } = useAuth();

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
        e.preventDefault();
        setSuccessMessage(""); // Limpiar mensajes previos
        setErrors({});         // Limpiar errores previos

        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            // 1. Llamada al backend
            const response = await registerUser(formData);

            console.log("Respuesta Backend:", response); // Útil para depurar

            // 2. VERIFICACIÓN: Nos aseguramos de que fue exitoso y trae datos
            if (response && response.status === 'success' && response.data) {

                const usuarioBackend = response.data;

                // 3. MAPEO (ADAPTADOR):
                // Convertimos los datos del Backend (id_cliente) al formato del Frontend (id)
                const usuarioParaContexto = {
                    id: usuarioBackend.id_cliente, // Mapeo clave: id_cliente -> id
                    nombre_completo: usuarioBackend.nombre_completo,
                    email: usuarioBackend.email,
                    telefono: usuarioBackend.telefono,
                    url_foto_perfil: usuarioBackend.url_foto_perfil,
                    token: usuarioBackend.token || "token-simulado-temporal"
                };

                // 4. LOGIN: Guardamos en Contexto y LocalStorage
                // Esto hará que el botón "Cerrar Sesión" aparezca de inmediato
                login(usuarioParaContexto);

                // 5. FEEDBACK Y REDIRECCIÓN
                setSuccessMessage("¡Cuenta creada exitosamente! Redirigiendo...");

                setTimeout(() => {
                    navigationUser('/'); // <--- Usamos 'navigate' (estándar de react-router)
                }, 2000);

            } else {
                // Si el servidor respondió (ej: 400) pero con un mensaje de error controlado
                throw new Error(response.message || "No se pudo completar el registro.");
            }

        } catch (error: any) {
            console.error("Error en submit:", error);
            // Mostramos el mensaje que venga del backend o uno genérico
            setErrors({ submit: error.message || "Error de conexión. Inténtalo más tarde." });
        } finally {
            setIsSubmitting(false);
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
import { useState } from "react"

export const useLoginForm = () => {
    // 1. ESTADOS
    const [formData, setFormData] = useState({
        email: "",
        contrasena: "",
        recordar: false
    })

    const [errors, setErrors] = useState<Record<string, string>>({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    // 2. TOGGLES
    const togglePasswordVisibility = () => setShowPassword((prev) => !prev)

    // 3. HANDLERS
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
        // Limpiar error al escribir
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Validación simple
        const newErrors: Record<string, string> = {}
        if (!formData.email) newErrors.email = "Ingresa tu email"
        if (!formData.contrasena) newErrors.contrasena = "Ingresa tu contraseña"

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            setIsSubmitting(false)
            return
        }

        // Simulación API
        try {
            await new Promise(resolve => setTimeout(resolve, 1500))
            alert("¡Bienvenido de nuevo!")
            // Aquí podrías redirigir: router.push('/dashboard')
        } catch (error) {
            setErrors({ form: "Error al iniciar sesión" })
        } finally {
            setIsSubmitting(false)
        }
    }

    // 4. RETORNO
    return {
        formData,
        errors,
        isSubmitting,
        showPassword,
        togglePasswordVisibility,
        handleChange,
        handleSubmit
    }
}
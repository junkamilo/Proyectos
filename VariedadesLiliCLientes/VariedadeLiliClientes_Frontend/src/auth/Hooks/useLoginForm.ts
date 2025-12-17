import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router';
import { loginUser } from '../action/login-action';
import type { LoginFormData } from '../types/LoginFormData';

export const useLoginForm = () => {

    const navigate = useNavigate();
    const { login } = useAuth(); // Traemos la función para guardar sesión

    // 1. ESTADO
    const [formData, setFormData] = useState<LoginFormData>({
        email: "",
        contrasena: "",
        recordar: false
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // 2. HANDLERS
    const togglePasswordVisibility = () => setShowPassword(prev => !prev);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        // Limpiamos el error específico de ese campo al escribir
        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    // 3. VALIDACIÓN
    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.email) newErrors.email = "El correo es requerido";
        if (!formData.contrasena) newErrors.contrasena = "La contraseña es requerida";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // 3. SUBMIT (LÓGICA PRINCIPAL)
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validate()) return;

        setIsSubmitting(true);

        try {
            // A. Petición al Backend
            const response = await loginUser(formData);

            console.log("Login respuesta:", response);

            // B. Verificamos éxito
            if (response.status === 'success' && response.data) {

                const backendUser = response.data;

                // C. MAPEO (Backend -> Frontend)
                // Igual que hicimos en el registro
                const userForContext = {
                    id: backendUser.id_cliente, // id_cliente -> id
                    nombre_completo: backendUser.nombre_completo,
                    email: backendUser.email,
                    url_foto_perfil: backendUser.url_foto_perfil,
                    telefono: backendUser.telefono,
                    token: backendUser.token
                };

                // D. Guardamos sesión
                login(userForContext);

                // E. Redirección inmediata al Home
                navigate('/');
            }

        } catch (error: any) {
            console.error(error);
            setErrors({
                email: error.message || "Error al iniciar sesión",
                contrasena: error.message || ""
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        formData,
        errors,
        isSubmitting,
        showPassword,
        handleChange,
        handleSubmit,
        togglePasswordVisibility
    };
};
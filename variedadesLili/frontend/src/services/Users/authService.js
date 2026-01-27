import API_URL from "../../utils/api";


//iniciar sesion
export const loginUser = async (identifier, contrasena) => {
  try {
    const res = await fetch(`${API_URL}/User/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ identifier, contrasena }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Error en login");
    return data;
  } catch (error) {
    console.error("[loginUser]", error);
    throw error;
  }
};

//mostrar todos los usuarios
export const getUsuarios = async () => {
  try {
    const res = await fetch(`${API_URL}/User/all`);
    if (!res.ok) throw new Error("Error al obtener usuarios");
    const data = await res.json();
    return data.data || []; // asumimos que la respuesta viene en { data: [...] }
  } catch (error) {
    console.error("[getUsuarios]", error);
    return [];
  }
};

// authService.js
export const registerUser = async (formData) => {
  try {
    const res = await fetch(`${API_URL}/User/register`, {
      method: "POST",
      body: formData, // multipart/form-data automáticamente
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Error al registrar usuario");
    }

    return data;
  } catch (error) {
    console.error("[registerUser]", error);
    throw error;
  }
};

//eliminamos por usuario
export const eliminarUsuario = async (id) => {
  try {
    const res = await fetch(`${API_URL}/User/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Error al eliminar usuario");
    return data;
  } catch (error) {
    console.error("[eliminarUsuario]", error);
    throw error;
  }
};

//editamos usuarios
export const editarUsuario = async (id, formData) => {
  try {
    const res = await fetch(`${API_URL}/User/${id}`, {
      method: "PUT",
      body: formData,
    });
    console.log("fetch status:", res.status);
    const data = await res.json();
    console.log("fetch json:", data);
    if (!res.ok) throw new Error(data.message || "Error al actualizar usuario");
    return data;
  } catch (error) {
    console.error("[editarUsuario]", error);
    throw error;
  }
};
//usuario por id
export const getUserById = async (id) => {
  try {
    // 1. Es buena práctica enviar el token si la ruta es privada
    // const token = localStorage.getItem('token');

    const res = await fetch(`${API_URL}/User/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await res.json();

    // 2. Si el backend responde con error (ej: 404 o 500), lanzamos el mensaje del backend
    if (!res.ok) {
      throw new Error(result.message || "Error al obtener usuario");
    }

    // 3. Retornamos el objeto del usuario directamente.
    // Usamos null si no hay data, ya que esperamos un OBJETO, no un array [].
    return result.data || null;
  } catch (error) {
    console.error("[getUserById] Error:", error.message);
    // Retornamos null para que la vista sepa que no hay usuario que mostrar
    return null;
  }
};

const API_URL = "http://localhost:3000/User";

export const loginUser = async (identifier, contrasena) => {
  try {
    const res = await fetch(`${API_URL}/login`, {
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
    const res = await fetch(`${API_URL}/all`);
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
    const res = await fetch(`${API_URL}/register`, {
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
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
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
    const res = await fetch(`${API_URL}/${id}`, {
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

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

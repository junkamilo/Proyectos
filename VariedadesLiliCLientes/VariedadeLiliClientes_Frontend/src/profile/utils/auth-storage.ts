export const getStoredUserId = (): string | null => {
    
    const directId = localStorage.getItem("id") || localStorage.getItem("userId");
    if (directId) return directId;

    // 2. Intenta buscarlo dentro de objetos comunes
    const keysToCheck = ["user", "usuario", "auth"];

    for (const key of keysToCheck) {
        const item = localStorage.getItem(key);
        if (item) {
            try {
                const parsed = JSON.parse(item);
                if (parsed.id) return parsed.id;
                if (parsed.id_cliente) return parsed.id_cliente;
            } catch {
                continue; // Si falla el parseo, sigue buscando
            }
        }
    }
    return null;
};

export const clearSession = () => {
    localStorage.clear();
    window.location.href = '/login';
};
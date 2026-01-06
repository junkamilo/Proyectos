export const BASE_URL = "http://localhost:3000";

export const fixImgUrl = (path) => {
  if (!path) return "https://via.placeholder.com/150";
  if (path.startsWith("http")) return path;
  return `${BASE_URL}${path}`;
};

export const formatCurrency = (amount) => {
  return Number(amount).toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 });
};
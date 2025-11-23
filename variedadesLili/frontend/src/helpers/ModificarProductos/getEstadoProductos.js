export const getEstadoClasses = (estado) => {
  const e = (estado || "").toLowerCase();

  // Activo: Verde esmeralda con brillo
  if (e === "activo") {
    return (
      "bg-emerald-500/10 text-emerald-400 " + // Fondo sutil y texto brillante
      "ring-1 ring-emerald-500/50 " + // Borde nítido
      "shadow-[0_0_10px_rgba(16,185,129,0.2)]" // Resplandor verde (Glow)
    );
  }

  // Agotado: Rojo/Rosa alerta
  if (e === "agotado") {
    return (
      "bg-rose-500/10 text-rose-400 " +
      "ring-1 ring-rose-500/50 " +
      "shadow-[0_0_10px_rgba(244,63,94,0.2)]"
    );
  }

  // Inactivo: Gris técnico (apagado)
  if (e === "inactivo") {
    return (
      "bg-slate-700/30 text-slate-400 " +
      "ring-1 ring-slate-600 " +
      "shadow-none" // Sin brillo porque está apagado
    );
  }

  // Default: Azul índigo neutro
  return (
    "bg-indigo-500/10 text-indigo-400 " +
    "ring-1 ring-indigo-500/50 " +
    "shadow-[0_0_10px_rgba(99,102,241,0.2)]"
  );
};

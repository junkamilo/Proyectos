export class ResponseProvider {
  static success(res, data, message = "Operación exitosa", meta = null) {
    const payload = { status: "success", message, data };
    if (meta) payload.meta = meta;
    return res.status(200).json(payload);
  }

  static created(res, data, message = "Recurso creado") {
    return res.status(201).json({ status: "success", message, data });
  }

  static noContent(res) {
    return res.status(204).send();
  }

  static badRequest(res, errors, message = "Solicitud inválida") {
    return res.status(400).json({ status: "error", message, errors });
  }

  static notFound(res, message = "Recurso no encontrado") {
    return res.status(404).json({ status: "error", message });
  }

  static unauthorized(res, message = "No autorizado") {
    return res.status(401).json({ status: "error", message });
  }

  static forbidden(res, message = "Acceso prohibido") {
    return res.status(403).json({ status: "error", message });
  }

  static error(res, err, options = {}) {
    const code = options.code || "INTERNAL_ERROR";
    console.error("[ERROR]", { err, code, path: options.path || "" });

    const message =
      process.env.NODE_ENV === "production"
        ? "Error interno del servidor"
        : err.message || "Error";
    const payload = { status: "error", message, code };
    if (process.env.NODE_ENV !== "production" && err.stack)
      payload.stack = err.stack;
    return res.status(500).json(payload);
  }
}

import multer from "multer";
import path from "path";
import fs from "fs";

// --- FUNCIÓN GENERADORA DE CONFIGURACIÓN ---
const createUploadMiddleware = (subfolder) => {
  // 1. Definimos la carpeta dinámica
  const uploadDir = `./uploads/${subfolder}`;

  // 2. Crear la carpeta si no existe (se ejecuta al iniciar la app)
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  // 3. Configuración del almacenamiento
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      // Guardamos en la carpeta dinámica
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const uniqueName = `${Date.now()}-${file.fieldname}${ext}`;
      cb(null, uniqueName);
    },
  });

  // 4. Filtro: solo imágenes (Reutilizable)
  const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const mimeType = allowedTypes.test(file.mimetype);
    const extName = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (mimeType && extName) {
      cb(null, true);
    } else {
      cb(new Error("Solo se permiten imágenes (jpg, png, webp)"));
    }
  };

  // Retornamos la instancia de Multer configurada
  return multer({ storage, fileFilter });
};

// --- EXPORTACIONES ---

// Esta la usas para tus Admins (guarda en ./uploads/usuarios)
export const uploadUsuario = createUploadMiddleware("usuarios");

// Esta la usas para tus Clientes (guarda en ./uploads/clientes)
export const uploadCliente = createUploadMiddleware("clientes");

// middlewares/uploadMiddleware.js
import multer from "multer";
import path from "path";
import fs from "fs";

// 1. Definir rutas ABSOLUTAS usando process.cwd()
// Esto evita errores si inicias el servidor desde diferentes carpetas
const uploadDir = path.join(process.cwd(), "uploads", "productos");
const uploadCliente = path.join(process.cwd(), "uploads", "perfiles");

// 2. Función helper para asegurar que un directorio exista
const ensureDirExists = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`📂 Directorio creado: ${dir}`);
  }
};

// 3. Crear las carpetas al iniciar la aplicación
ensureDirExists(uploadDir);
ensureDirExists(uploadCliente);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Por seguridad, verificamos de nuevo antes de guardar
    ensureDirExists(uploadDir);
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${file.fieldname}${ext}`;
    cb(null, uniqueName);
  },
});

// 5. Configuración del almacenamiento para PERFILES (CLIENTES)
const storageCliente = multer.diskStorage({
  destination: (req, file, cb) => {
    // Por seguridad, verificamos de nuevo antes de guardar
    ensureDirExists(uploadCliente);
    cb(null, uploadCliente);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${file.fieldname}${ext}`;
    cb(null, uniqueName);
  },
});

// 6. Filtro: solo imágenes
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

// 7. Exportar los middlewares configurados
export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

export const uploadPerfil = multer({
  storage: storageCliente,
  fileFilter: fileFilter,
});

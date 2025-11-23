import { createButton } from "./BtnUser";
import { createInputGroup } from "./DatosUser";
import { createPhotoGroup } from "./imgUser";
import { createSelectGroup } from "./RolUser";

export const FormularioUsuarios = () => {
  // Instanciamos los componentes basados en la tabla SQL
  const groupNombre = createInputGroup(
    "Nombre Completo",
    "text",
    "Ej: Juan Pérez"
  );
  const groupUsername = createInputGroup(
    "Nombre de Usuario",
    "text",
    "Ej: juanperez99"
  );
  const groupEmail = createInputGroup(
    "Correo Electrónico",
    "email",
    "usuario@ejemplo.com"
  );
  const groupPassword = createInputGroup("Contraseña", "password", "••••••••");

  // SQL: ENUM('superadmin','admin','usuario')
  const groupRol = createSelectGroup("Rol de Usuario", [
    "Usuario",
    "Admin",
    "Superadmin",
  ]);

  const groupFoto = createPhotoGroup();

  const button = createButton();

  // --- Contenedor Principal (Dark Glass) ---
  const container = document.createElement("div");
  container.className =
    "w-full max-w-3xl mx-auto " +
    "p-6 sm:p-10 " +
    "mt-8 sm:mt-12 mb-12 " +
    "bg-white/90 dark:bg-slate-800/95 backdrop-blur-xl " + // Efecto Glass
    "shadow-2xl shadow-purple-900/10 dark:shadow-black/50 " +
    "rounded-2xl border border-white/50 dark:border-slate-700 " +
    "animate-fade-in-up transition-all duration-500";

  // --- Título ---
  const title = document.createElement("h2");
  title.textContent = "Nuevo Usuario";
  title.className =
    "text-3xl md:text-4xl font-extrabold text-center mb-8 md:mb-10 " +
    "bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent " +
    "tracking-tight drop-shadow-sm";

  // --- Formulario (Layout Grid) ---
  const form = document.createElement("form");
  form.className =
    "grid grid-cols-1 md:grid-cols-2 " + "gap-6 md:gap-x-8 md:gap-y-8"; // Espaciado consistente

  // --- Ensamblaje Final ---
  // El orden sigue lógica visual: Datos personales -> Credenciales -> Configuración
  form.append(
    groupNombre.container, // Col 1
    groupUsername.container, // Col 2
    groupEmail.container, // Col 1
    groupRol.container, // Col 2 (Rol al lado del email es común)
    groupPassword.container, // Col 1
    groupFoto.container, // Col 2 (Foto al lado del password equilibra altura)
    button // Full width
  );

  container.append(title, form);

  return {
    container,
    form,
    groups: {
      groupNombre,
      groupUsername,
      groupEmail,
      groupPassword,
      groupRol,
      groupFoto,
    },
    // Método helper para sacar la data fácil (opcional pero útil)
    getFormData: () => {
      const formData = new FormData();
      formData.append("nombre", groupNombre.input.value);
      formData.append("username", groupUsername.input.value);
      formData.append("email", groupEmail.input.value);
      formData.append("contrasena", groupPassword.input.value);
      formData.append("rol", groupRol.select.value);
      if (groupFoto.input.files[0]) {
        formData.append("url_foto_perfil", groupFoto.input.files[0]);
      }
      return formData;
    },
  };
};

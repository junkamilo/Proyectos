import { registerUser } from "../../services/Users/authService";

export const USersForm = () => {
  const addForm = (form, groups) => {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Creamos FormData
      const formData = new FormData();
      formData.append("nombre", groups.groupNombre.input.value);
      formData.append("username", groups.groupUsername.input.value);
      formData.append("email", groups.groupEmail.input.value);
      formData.append("contrasena", groups.groupPassword.input.value);
      formData.append("rol", groups.groupRol.select.value.toLowerCase());

      // Adjuntamos archivo si existe
      const file = groups.groupFoto.input.files[0];
      if (file) formData.append("url_foto_perfil", file);

      try {
        const response = await registerUser(formData);

        alert(`Usuario creado: ${response.data.username}`);
        form.reset();
        if (groups.groupFoto.reset) groups.groupFoto.reset(); // limpia preview si existe
      } catch (error) {
        alert(`Error al registrar usuario: ${error.message}`);
      }
    });
  };

  return { addForm };
};

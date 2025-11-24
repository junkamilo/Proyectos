import { UserProfileView } from "../../components/UserProfileView/UserProfileView.js";

// Usuario de ejemplo
const usuarioEjemplo = {
    id_usuario: 1,
    nombre: "Juanka Torres",
    username: "juanka_dev",
    email: "juanka@mail.com",
    rol: "admin",
    url_foto_perfil: "https://ui-avatars.com/api/?name=Juanka+Torres&background=random",
    telefono: "+57 300 123 4567",
    direccion: "Calle Falsa 123, Bogotá, Colombia",
};

export const userProfileController = () => {
    const content = document.querySelector(".Profileview");
    const profileView = UserProfileView(usuarioEjemplo);
    
    content.append(profileView);
  
    return content;
}

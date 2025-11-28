 import { AvatarFlotante } from "./AvatarFlotante";
import { cardProfile } from "./cardProfile";
import { cardSecuriti } from "./cardSecurity";
import { identitysections } from "./identitysection";

export const UserProfileView = (usuario) => {
  //instanciamos componentes
  const identitySection = identitysections(usuario);
  const headerSection = AvatarFlotante(usuario);
  const cardPersonal = cardProfile(usuario);
  const cardSecurity = cardSecuriti(usuario);

  const container = document.createElement("div");
  container.className = "w-full max-w-4xl mx-auto pb-12 animate-fade-in";

  // --- C. GRID DE INFORMACIÓN (Tarjetas Glass) ---
  const gridContainer = document.createElement("div");
  gridContainer.className =
    "grid grid-cols-1 lg:grid-cols-2 gap-6 px-4 sm:px-8";

  gridContainer.append(cardPersonal, cardSecurity);

  // Ensamblaje Final
  container.append(headerSection, identitySection, gridContainer);

  return container;
};

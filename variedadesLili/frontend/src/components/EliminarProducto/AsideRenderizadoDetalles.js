// AsideRenderizadoDetalles.js
import { renderView } from "./renderView.js";
export const AsideRenderizadoDetalles = (product, aside) => {
  const { detailContent, productDetailSection } = aside;
  productDetailSection.classList.remove("hidden");
  productDetailSection.classList.add("flex");
  renderView(product, detailContent, productDetailSection);
};

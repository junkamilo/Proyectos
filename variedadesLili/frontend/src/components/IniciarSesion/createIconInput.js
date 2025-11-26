import "./css/createInputs.css";

export const createIconInput = (labelText, id, type, placeholder, iconSvg) => {
    const group = document.createElement("div");
    group.className = "inputGroup";

    const label = document.createElement("label");
    label.textContent = labelText;
    label.setAttribute("for", id);
    label.className = "inputLabel";

    const relativeWrapper = document.createElement("div");
    relativeWrapper.className = "inputWrapper";

    // Icono SVG (Placeholder visual)
    const iconContainer = document.createElement("div");
    iconContainer.className = "inputIconContainer";
    iconContainer.innerHTML = iconSvg;

    const input = document.createElement("input");
    input.type = type;
    input.id = id;
    input.placeholder = placeholder;
    input.className = "inputField";

    relativeWrapper.append(iconContainer, input);
    group.append(label, relativeWrapper);

    return { group, input };
};
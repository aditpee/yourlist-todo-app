export function moveHiddenAttribute(removeHidden, addHidden) {
  removeHidden.removeAttribute("hidden");
  addHidden.setAttribute("hidden", "");
}

import { changeVariables } from "./utils/changeVariables.js";

export function handleContextMenu(e) {
  // cancel default context menu , when rigth click on custom context menu
  const isContextMenu =
    e.target.parentElement.classList.contains("context-menu");
  isContextMenu && e.preventDefault();

  const isCardHeading = e.target.classList.contains("heading");
  const isFormList = e.target.classList.contains("list-form");

  if (isCardHeading || isFormList) {
    e.preventDefault();
    showContextMenu(e);
    changeVariables.targetElement = isFormList
      ? e.target
      : e.target.parentElement;
  }
}

function showContextMenu(e) {
  const contextMenu = document.querySelector(".context-menu");
  contextMenu.style.top = `${e.pageY}px`;
  contextMenu.style.left = `${e.pageX}px`;
  contextMenu.setAttribute("aria-hidden", false);
  contextMenu.classList.remove("overflow");

  const screenWidth = document.body.scrollWidth;
  if (e.pageX > screenWidth / 2) contextMenu.classList.add("overflow");
}

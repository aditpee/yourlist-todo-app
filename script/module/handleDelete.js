import { changeVariables } from "./utils/changeVariables.js";
import { removeElement } from "./utils/removeElement.js";
import { removeCardFromLocal } from "./utils/removeCardFromLocal.js";
import { removeListFromLocal } from "./utils/removeListFromLocal.js";
import { setCardHeight } from "./utils/setCardHeight.js";

export function handleDelete() {
  document.querySelector(".context-menu").setAttribute("aria-hidden", true);

  const targetDelete = changeVariables.targetElement;
  const isCardList = targetDelete.classList.contains("card-list");
  const isListForm = targetDelete.classList.contains("list-form");

  const confirmDelete = confirm("sure?");
  if (confirmDelete == true) {
    if (isCardList) {
      removeElement(targetDelete);
      removeCardFromLocal(targetDelete);
    } else if (isListForm) {
      const cardContentWrapper = targetDelete.parentElement;
      removeElement(targetDelete);
      removeListFromLocal(targetDelete);
      setTimeout(() => setCardHeight(cardContentWrapper), 600);
    }
  }
}

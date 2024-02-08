import { printListTemplate } from "./utils/printTemplate.js";
import { moveHiddenAttribute } from "./utils/moveHiddenAttribute.js";
import { setCardHeight } from "./utils/setCardHeight.js";
import { submitFormList } from "./utils/submitFormList.js";
import { changeVariables } from "./utils/changeVariables.js";

export function handleNewFormList(e) {
  const listTemplate = printListTemplate();

  const cardAddItem = e.target.parentElement;
  cardAddItem.parentElement.insertBefore(listTemplate, cardAddItem);

  const newListForm = cardAddItem.previousElementSibling;
  const cardList = newListForm.parentElement.parentElement;
  const cardContentWrapper = cardList.children[1];
  const [submitBtn, , newListContent, newListInput] = newListForm.children;

  moveHiddenAttribute(newListInput, newListContent);
  setCardHeight(cardContentWrapper);
  newListInput.focus();

  changeVariables.forEdit = false;

  newListForm.addEventListener("submit", (e) => {
    submitFormList(e, cardList, newListForm).newForm();
  });
  // if focusout, submit form
  newListInput.addEventListener("focusout", () => submitBtn.click());
}

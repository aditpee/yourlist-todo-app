import { changeVariables } from "./utils/changeVariables.js";
import { printFormHeading } from "./utils/printTemplate.js";
import { submitEditHeading } from "./utils/submitEditHeading.js";
import { moveHiddenAttribute } from "./utils/moveHiddenAttribute.js";
import { submitFormList } from "./utils/submitFormList.js";

export function handleEdit() {
  document.querySelector(".context-menu").setAttribute("aria-hidden", true);

  const targetEdit = changeVariables.targetElement;
  const isCardList = targetEdit.classList.contains("card-list");
  const isListForm = targetEdit.classList.contains("list-form");

  if (isCardList) {
    const editCardHeading = printFormHeading();
    const [submitBtn, newInputHeading] = editCardHeading.children;
    const cardHeading = targetEdit.firstElementChild;

    targetEdit.replaceChild(editCardHeading, cardHeading);
    newInputHeading.value = cardHeading.textContent;
    newInputHeading.focus();
    newInputHeading.select();

    editCardHeading.addEventListener("submit", (e) => {
      submitEditHeading(e, editCardHeading, cardHeading, targetEdit);
    });
    // if focus out from input heading, submit
    editCardHeading.addEventListener("focusout", () => submitBtn.click());
  }
  if (isListForm) {
    const cardList = targetEdit.parentElement.parentElement;
    const [submitBtn, , listContent, listInput] = targetEdit.children;
    const isChecked = targetEdit.getAttribute("aria-checked");

    if (isChecked == "true") return false;

    moveHiddenAttribute(listInput, listContent);

    listInput.value = "";
    listInput.value = listContent.textContent;
    listInput.focus();
    listInput.select();

    changeVariables.forEdit = true;
    targetEdit.addEventListener("submit", (e) => {
      submitFormList(e, cardList, targetEdit).oldForm();
    });
    listInput.addEventListener("focusout", () => submitBtn.click());
  }
}

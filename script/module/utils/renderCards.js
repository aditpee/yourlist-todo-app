import { getLocalStorage } from "./localStorageController.js";
import {
  printCardTemplate,
  printCheckListSvg,
  printListTemplate,
} from "./printTemplate.js";
import { changeVariables } from "./changeVariables.js";

export function renderCards(hue) {
  const localCards = getLocalStorage("cards");
  const mainSection = document.getElementById("main-section");
  mainSection.innerHTML = "";
  localCards?.forEach((card) => {
    const { title, lists } = card;
    const cardTemplate = printCardTemplate();
    cardTemplate.style.setProperty("--hue", hue);
    cardTemplate.style.setProperty("--check-icon-path", printCheckListSvg(hue));
    hue += 45;
    changeVariables.randomHueColor = hue;

    const cardContentWrapper = cardTemplate.lastElementChild;
    const cardAddItem = cardContentWrapper.lastElementChild;

    const cardHeading = cardTemplate.firstElementChild;
    cardHeading.textContent = title; // change title

    lists.forEach((list) => {
      const listForm = printListTemplate();
      const [, , listContent, listInput] = listForm.children;
      listContent.textContent = list.content;
      listInput.setAttribute("value", list.content);

      cardContentWrapper.insertBefore(
        listForm,
        cardAddItem // get button "add new item"
      );

      if (list.checked == true) listForm.setAttribute("aria-checked", true);
    });
    mainSection.appendChild(cardTemplate);
  });
}

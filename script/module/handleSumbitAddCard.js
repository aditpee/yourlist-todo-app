import {
  getLocalStorage,
  sendToLocalStorage,
} from "./utils/localStorageController.js";
import { printCardTemplate, printCheckListSvg } from "./utils/printTemplate.js";
import { changeVariables } from "./utils/changeVariables.js";

export function handleSubmitAddCard(e, formPlusCard) {
  e.preventDefault();

  const inputPlusCard = formPlusCard.firstElementChild;
  const localCards = getLocalStorage("cards");
  const isDuplicateTitle = localCards.find(
    ({ title }) =>
      title.toLowerCase() == inputPlusCard.value.toLowerCase().trim()
  );
  if (isDuplicateTitle) {
    return alert("title already included");
  } else {
    localCards.push({
      title: inputPlusCard.value.trim(),
      lists: [],
    });

    const mainSection = document.getElementById("main-section");
    const cardTemplate = printCardTemplate();
    const cardHeading = cardTemplate.firstElementChild;
    cardTemplate.style.setProperty("--hue", changeVariables.randomHueColor);
    cardTemplate.style.setProperty(
      "--check-icon-path",
      printCheckListSvg(changeVariables.randomHueColor)
    );
    changeVariables.randomHueColor += 45;
    cardHeading.textContent = inputPlusCard.value.trim();
    mainSection.appendChild(cardTemplate);

    inputPlusCard.value = "";
    inputPlusCard.setAttribute("disabled", "");
    formPlusCard.setAttribute("aria-expanded", false);

    sendToLocalStorage("cards", localCards);
  }
}

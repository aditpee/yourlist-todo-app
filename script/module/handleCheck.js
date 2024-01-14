import {
  getLocalStorage,
  sendToLocalStorage,
} from "./utils/localStorageController.js";

export function handleCheck(e) {
  const checkBtn = e.target;
  const listForm = checkBtn.parentElement;
  const listContent = checkBtn.nextElementSibling;
  const cardHeading = listForm.parentElement.previousElementSibling;

  const localCards = getLocalStorage("cards");
  const currentCard = localCards.find(
    ({ title }) => title == cardHeading.textContent
  );
  const listChecked = currentCard.lists.find(
    ({ content }) => content == listContent.textContent
  );

  const isChecked = listForm.getAttribute("aria-checked");
  if (isChecked == "false") {
    listChecked.checked = true;
    listForm.setAttribute("aria-checked", true);
  } else if (isChecked == "true") {
    listChecked.checked = false;
    listForm.setAttribute("aria-checked", false);
  }
  sendToLocalStorage("cards", localCards);
}

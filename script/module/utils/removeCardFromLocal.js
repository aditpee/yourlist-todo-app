import {
  getLocalStorage,
  sendToLocalStorage,
} from "./localStorageController.js";

export function removeCardFromLocal(cardList) {
  const currentHeading = cardList.firstElementChild;
  const localCards = getLocalStorage("cards");
  const newLocalCards = localCards.filter(
    ({ title }) => title != currentHeading.textContent
  );
  sendToLocalStorage("cards", newLocalCards);
}

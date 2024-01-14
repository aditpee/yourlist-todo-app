import {
  getLocalStorage,
  sendToLocalStorage,
} from "./localStorageController.js";

export function submitEditHeading(
  e,
  editCardHeading,
  cardHeading,
  currentTarget
) {
  e.preventDefault();
  const inputEditHeading = editCardHeading.lastElementChild;
  const oldHeadingName = cardHeading.textContent;
  const localCards = getLocalStorage("cards");
  currentTarget.replaceChild(cardHeading, editCardHeading);

  const isDuplicateTitle = localCards.find(
    ({ title }) =>
      title.toLowerCase() == inputEditHeading.value.toLowerCase().trim()
  );
  const isSameTitle =
    inputEditHeading.value.toLowerCase().trim() == oldHeadingName.toLowerCase();
  if (inputEditHeading.value == "") {
    return false;
  } else if (isDuplicateTitle && !isSameTitle) {
    return alert("card name is already included!");
  } else {
    cardHeading.textContent = inputEditHeading.value.trim();

    const editedCard = localCards.find(({ title }) => title == oldHeadingName);
    const indexEditedCard = localCards.indexOf(editedCard);
    editedCard.title = cardHeading.textContent;

    // replace edited card at local storage
    localCards.splice(indexEditedCard, 1, editedCard);
    sendToLocalStorage("cards", localCards);
  }
}

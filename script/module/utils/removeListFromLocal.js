import {
  getLocalStorage,
  sendToLocalStorage,
} from "./localStorageController.js";

export function removeListFromLocal(listForm) {
  const listContent = listForm.children[2];
  const currentHeading = listForm.parentElement.previousElementSibling;
  const localCards = getLocalStorage("cards");
  const { lists: formLists } = localCards.find(
    ({ title }) => title == currentHeading.textContent
  );
  const newFormLists = formLists.filter(
    ({ content }) => content !== listContent.textContent
  );
  localCards.forEach((card) => {
    if (card.title == currentHeading.textContent) {
      card.lists = newFormLists;
    }
  });
  sendToLocalStorage("cards", localCards);
}

import { printListTemplate } from "./printTemplate.js";
import {
  getLocalStorage,
  sendToLocalStorage,
} from "./localStorageController.js";
import { removeListFromLocal } from "./removeListFromLocal.js";
import { cancelAddFormList } from "./cancelAddFormList.js";
import { moveHiddenAttribute } from "./moveHiddenAttribute.js";
import { setCardHeight } from "./setCardHeight.js";
// import { changeVariables } from "./changeVariables.js";
import { removeElement } from "./removeElement.js";

export function submitFormList(e, cardList, listForm) {
  e.preventDefault();
  const [headingTarget, cardContentWrapper] = cardList.children;
  const [, , listContent, listInput] = listForm.children;

  // for fix bug event listener return multiple times
  const newListForm = printListTemplate();
  const [, , newListContent, newListInput] = newListForm.children;
  newListContent.textContent = listContent.textContent;
  newListInput.value = listContent.textContent;
  const nextListForm = listForm.nextElementSibling;

  cardContentWrapper.removeChild(listForm);
  cardContentWrapper.insertBefore(newListForm, nextListForm);

  const localCards = getLocalStorage("cards");
  const { lists: formLists } = localCards.find(
    ({ title }) => title == headingTarget.textContent
  );
  const oldValue = formLists.find(
    ({ content }) =>
      content.toLowerCase() == listContent.textContent.toLowerCase()
  );
  const indexList = formLists.indexOf(oldValue);
  const isDuplicatList = formLists.find(
    ({ content }) =>
      content.toLowerCase() == listInput.value.toLowerCase().trim()
  );

  const isInputSameName =
    listInput.value.toLowerCase().trim() ==
    listContent.textContent.toLowerCase();

  return {
    oldForm: function () {
      if (listInput.value == "") {
        const confirmDelete = confirm("delete?");
        if (confirmDelete) {
          removeListFromLocal(newListForm);
          return removeElement(newListForm);
        }
      } else if (isDuplicatList) {
        if (isInputSameName) {
          moveHiddenAttribute(listContent, listInput);
        } else {
          alert("list already included in this card!");
          moveHiddenAttribute(listContent, listInput);
        }
        return false;
      } else {
        newListContent.textContent = listInput.value.trim();
        moveHiddenAttribute(newListContent, newListInput);
        setCardHeight(cardContentWrapper);

        formLists.splice(indexList, 1, {
          content: newListContent.textContent,
          checked: false,
        });
        sendToLocalStorage("cards", localCards);
      }
    },
    newForm: function () {
      if (listInput.value == "") {
        return cancelAddFormList(cardContentWrapper, newListForm);
      } else if (isDuplicatList) {
        cancelAddFormList(cardContentWrapper, newListForm);
        alert("list already included in this card!");
        return false;
      } else {
        newListContent.textContent = listInput.value.trim();
        moveHiddenAttribute(newListContent, newListInput);
        setCardHeight(cardContentWrapper);

        formLists.push({
          content: newListContent.textContent,
          checked: false,
        });
        sendToLocalStorage("cards", localCards);
      }
    },
  };
}

// if (listInput.value == "") {
//   removeListFromLocal(newListForm);
//   return cancelAddFormList(cardContentWrapper, newListForm);
// } else if (isDuplicatList && changeVariables.forEdit) {
//   if (isInputSameName) {
//     return moveHiddenAttribute(listContent, listInput);
//   }
//   alert("list already included in this card!");
//   moveHiddenAttribute(listContent, listInput);
//   return false;
// } else if (isDuplicatList) {
//   cancelAddFormList(cardContentWrapper, newListForm);
//   alert("list already included in this card!");
//   return false;
// } else {
//   newListContent.textContent = listInput.value.trim();
//   moveHiddenAttribute(newListContent, newListInput);
//   setCardHeight(cardContentWrapper);

//   if (changeVariables.forEdit) {
//     formLists.splice(indexList, 1, {
//       content: newListContent.textContent,
//       checked: false,
//     });
//   } else {
//     formLists.push({
//       content: newListContent.textContent,
//       checked: false,
//     });
//   }
// }

import { handleSubmitAddCard } from "./module/handleSumbitAddCard.js";
import { showInputAddCard } from "./module/showInputAddCard.js";
import { handleDelete } from "./module/handleDelete.js";
import { handleEdit } from "./module/handleEdit.js";
import { handleContextMenu } from "./module/handleContextMenu.js";
import { handleNewFormList } from "./module/handleNewFormList.js";
import { handleExpandCard } from "./module/handleExpandCard.js";
import { handleCheck } from "./module/handleCheck.js";
import { renderCards } from "./module/utils/renderCards.js";
import { changeVariables } from "./module/utils/changeVariables.js";

if (!localStorage.getItem("cards")) {
  localStorage.setItem("cards", JSON.stringify([]));
}

renderCards(changeVariables.randomHueColor);

const formPlusCard = document.querySelector(".form-plus-card");
const plusBtn = formPlusCard.lastElementChild;
const deleteBtn = document.querySelector(".delete");
const editBtn = document.querySelector(".edit");

formPlusCard.addEventListener("submit", (e) =>
  handleSubmitAddCard(e, formPlusCard)
);
plusBtn.addEventListener("click", () => showInputAddCard(formPlusCard));
deleteBtn.addEventListener("click", handleDelete);
editBtn.addEventListener("click", handleEdit);
document.body.addEventListener("contextmenu", (e) => handleContextMenu(e));

// event bubbling
document.body.addEventListener("click", (e) => {
  const isAddBtn = e.target.classList.contains("add-item");
  const isCardHeading = e.target.classList.contains("card-heading");
  const isCheckList = e.target.classList.contains("check-list");

  if (isAddBtn) handleNewFormList(e);
  if (isCardHeading) handleExpandCard(e);
  if (isCheckList) handleCheck(e);
});

//  remove context menu when mouse down
["mousedown", "touchstart"].forEach((event) =>
  document.body.addEventListener(event, (e) => removeContextMenu(e))
);

function removeContextMenu(e) {
  const isContextMenu =
    e.target.parentElement.classList.contains("context-menu");
  if (!isContextMenu) {
    document.querySelector(".context-menu").setAttribute("aria-hidden", true);
  }
}

// const targetDelete = {
//   currentTarget: null,
//   hue: Math.floor(Math.random() * 360),
//   // edit: null,
// };
// let forEdit = false;

// // show card if we created card list before
// renderCards(targetDelete.hue);

// function htmlToElement(html) {
//   const template = document.createElement("template");
//   html.trim();
//   template.innerHTML = html;
//   return template.content.firstChild;
// }

// function handleAddItem(e) {
//   const listTemplate = printListTemplate();
//   const cardAddItem = e.target.parentElement;
//   cardAddItem.parentElement.insertBefore(listTemplate, cardAddItem);

//   const newListForm = cardAddItem.previousElementSibling;
//   const cardList = newListForm.parentElement.parentElement;
//   const cardContentWrapper = cardList.children[1];
//   const [submitBtn, , newListContent, newListInput] = newListForm.children;

//   removeAddHidden(newListInput, newListContent);
//   setCardHeight(cardContentWrapper);
//   newListInput.focus();

//   forEdit = false;
//   newListForm.addEventListener("submit", (e) => {
//     handleSubmitFormList(e, cardList, newListForm);
//   });
//   newListInput.addEventListener("focusout", () => submitBtn.click());
// }

// function handleCardExpanded(e) {
//   const cardTodo = e.target.parentElement;
//   const cardContentWrapper = cardTodo.lastElementChild;
//   const isExpanded = cardTodo.getAttribute("aria-expanded");
//   if (isExpanded == "false") {
//     const allCardList = document.querySelectorAll(".content-wrapper");
//     allCardList.forEach((card) => {
//       card.parentElement.setAttribute("aria-expanded", false);
//       card.style.maxHeight = 0;
//     });
//     cardTodo.setAttribute("aria-expanded", true);
//     setCardHeight(cardContentWrapper);
//   } else {
//     cardTodo.setAttribute("aria-expanded", false);
//     cardContentWrapper.style.maxHeight = 0;
//   }
// }

// function handleCheck(e) {
//   const checkBtn = e.target;
//   const listForm = checkBtn.parentElement;
//   const listContent = checkBtn.nextElementSibling;
//   const cardHeading = listForm.parentElement.previousElementSibling;

//   const localCards = getLocalStorage("cards");
//   const currentCard = localCards.find(
//     ({ title }) => title == cardHeading.textContent
//   );
//   const listChecked = currentCard.lists.find(
//     ({ content }) => content == listContent.textContent
//   );

//   const isChecked = listForm.getAttribute("aria-checked");
//   if (isChecked == "false") {
//     listChecked.checked = true;
//     listForm.setAttribute("aria-checked", true);
//   } else {
//     listChecked.checked = false;
//     listForm.setAttribute("aria-checked", false);
//   }
//   sendToLocalStorage("cards", localCards);
// }

// function handleDelete() {
//   document.querySelector(".context-menu").setAttribute("aria-hidden", true);

//   const { currentTarget: targetDel } = targetDelete;
//   const isCardList = targetDel.classList.contains("card-todo");
//   const isListForm = targetDel.classList.contains("list-form");

//   const confirmDelete = true; //confirm("sure?");
//   if (confirmDelete == true) {
//     if (isCardList) {
//       removeCurrentTarget(targetDel);
//       removeCardFormLocal(targetDel);
//     } else if (isListForm) {
//       const cardContentWrapper = targetDel.parentElement;
//       removeCurrentTarget(targetDel);
//       removeListFormLocal(targetDel);
//       setTimeout(() => setCardHeight(cardContentWrapper), 600);
//     }
//   }
// }

// function handleEdit() {
//   document.querySelector(".context-menu").setAttribute("aria-hidden", true);

//   const { currentTarget: targetEdit } = targetDelete;
//   const isCardList = targetEdit.classList.contains("card-todo");
//   const isListForm = targetEdit.classList.contains("list-form");

//   if (isCardList) {
//     const newFormHeading = printFormHeading();
//     const [submitBtn, newInputHeading] = newFormHeading.children;
//     const cardHeading = targetEdit.firstElementChild;
//     targetEdit.replaceChild(newFormHeading, cardHeading);
//     newInputHeading.value = cardHeading.textContent;
//     newInputHeading.focus();
//     newInputHeading.select();

//     newFormHeading.addEventListener("submit", (e) => {
//       handleSubmitEditTitle(e, newFormHeading, cardHeading, targetEdit);
//     });
//     newFormHeading.addEventListener("focusout", () => submitBtn.click());
//   } else if (isListForm) {
//     const cardList = targetEdit.parentElement.parentElement;
//     const [submitBtn, , listContent, listInput] = targetEdit.children;
//     const isChecked = targetEdit.getAttribute("aria-checked");
//     if (isChecked == "true") return false;
//     removeAddHidden(listInput, listContent);
//     listInput.value = "";
//     listInput.value = listContent.textContent;
//     listInput.focus();
//     listInput.select();

//     forEdit = true;
//     targetEdit.addEventListener("submit", (e) => {
//       handleSubmitFormList(e, cardList, targetEdit);
//     });
//     listInput.addEventListener("focusout", () => submitBtn.click());
//   }
// }

// function handlePlusBtn() {
//   const inputFocus = {
//     focusTrue() {
//       this.timeoutID = setTimeout(() => {
//         inputPlusCard.removeAttribute("disabled");
//         inputPlusCard.focus();
//       }, 300);
//     },
//     cancelTimeout() {
//       inputPlusCard.setAttribute("disabled", "");
//       clearTimeout(this.timeoutID);
//     },
//   };

//   let isExpanded = formPlusCard.getAttribute("aria-expanded");
//   if (isExpanded == "false") {
//     formPlusCard.setAttribute("aria-expanded", true);
//     inputFocus.focusTrue();
//   } else if (isExpanded == "true" && inputPlusCard.value != "") {
//     inputPlusCard.value = "";
//     inputPlusCard.focus();
//   } else {
//     formPlusCard.setAttribute("aria-expanded", false);
//     inputFocus.cancelTimeout();
//     // renderCards(targetDelete.hue);
//   }
// }
// function handleSubmitAddCard(e) {
//   e.preventDefault();
//   const card = JSON.parse(localStorage.getItem("cards"));
//   const isDuplicateTitle = card.find(
//     ({ title }) =>
//       title.toLowerCase() == inputPlusCard.value.toLowerCase().trim()
//   );
//   if (isDuplicateTitle) {
//     return alert("title already included");
//   } else {
//     card.push({
//       title: inputPlusCard.value.trim(),
//       lists: [],
//     });

//     const mainSection = document.getElementById("main-section");
//     const cardTemplate = printCardTemplate();
//     const cardHeading = cardTemplate.firstElementChild;
//     cardTemplate.style.setProperty("--hue", targetDelete.hue);
//     cardTemplate.style.setProperty(
//       "--check-icon-path",
//       printSvgPath(targetDelete.hue)
//     );
//     targetDelete.hue += 45;
//     cardHeading.textContent = inputPlusCard.value.trim();
//     mainSection.appendChild(cardTemplate);

//     inputPlusCard.value = "";
//     inputPlusCard.setAttribute("disabled", "");
//     localStorage.setItem("cards", JSON.stringify(card));
//     formPlusCard.setAttribute("aria-expanded", false);
//   }
// }

// function handleContextMenu(e) {
//   // cancel default context menu , when rigth click on custom context menu
//   const isContextMenu =
//     e.target.parentElement.classList.contains("context-menu");
//   isContextMenu && e.preventDefault();

//   const isCardHeading = e.target.classList.contains("heading");
//   const isFormList = e.target.classList.contains("list-form");
//   if (isCardHeading || isFormList) {
//     e.preventDefault();
//     showContextMenu(e);
//     targetDelete.currentTarget = isFormList ? e.target : e.target.parentElement;
//   }
//   function showContextMenu() {
//     const contextMenu = document.querySelector(".context-menu");
//     contextMenu.style.top = `${e.pageY}px`;
//     contextMenu.style.left = `${e.pageX}px`;
//     contextMenu.setAttribute("aria-hidden", false);
//     contextMenu.classList.remove("overflow");

//     const screenWidth = document.body.scrollWidth;
//     if (e.pageX > screenWidth / 2) contextMenu.classList.add("overflow");
//   }
// }
// // ================
// // ================
// // ================
// // ================
// // ================
// // ================

// function handleSubmitFormList(e, cardList, listForm) {
//   e.preventDefault();
//   const [headingTarget, cardContentWrapper] = cardList.children;
//   const [, , listContent, listInput] = listForm.children;

//   // for fix bug event listener return multiple times
//   const newListForm = printListTemplate();
//   const [, , newListContent, newListInput] = newListForm.children;
//   newListContent.textContent = listContent.textContent;
//   newListInput.value = listContent.textContent;
//   const nextListForm = listForm.nextElementSibling;

//   cardContentWrapper.removeChild(listForm);
//   cardContentWrapper.insertBefore(newListForm, nextListForm);

//   const localCards = getLocalStorage("cards");
//   const { lists: formLists } = localCards.find(
//     ({ title }) => title == headingTarget.textContent
//   );
//   const isDuplicatList = formLists.find(
//     ({ content }) =>
//       content.toLowerCase() == listInput.value.toLowerCase().trim()
//   );
//   const oldValue = formLists.find(
//     ({ content }) =>
//       content.toLowerCase() == listContent.textContent.toLowerCase()
//   );
//   const indexList = formLists.indexOf(oldValue);

//   const isInputSameName =
//     listInput.value.toLowerCase().trim() ==
//     listContent.textContent.toLowerCase();
//   if (listInput.value == "") {
//     removeListFormLocal(newListForm);
//     return cancelAddFormList(cardContentWrapper, newListForm);
//   } else if (isDuplicatList && forEdit) {
//     if (isInputSameName) {
//       return removeAddHidden(listContent, listInput);
//     }
//     alert("list already included in this card!");
//     removeAddHidden(listContent, listInput);
//     return false;
//   } else if (isDuplicatList) {
//     cancelAddFormList(cardContentWrapper, newListForm);
//     alert("list already included in this card!");
//     return false;
//   } else {
//     newListContent.textContent = listInput.value.trim();
//     removeAddHidden(newListContent, newListInput);
//     setCardHeight(cardContentWrapper);

//     if (forEdit) {
//       formLists.splice(indexList, 1, {
//         content: newListContent.textContent,
//         checked: false,
//       });
//     } else {
//       formLists.push({
//         content: newListContent.textContent,
//         checked: false,
//       });
//     }
//     sendToLocalStorage("cards", localCards);
//   }
// }

// function removeListFormLocal(listForm) {
//   const listContent = listForm.children[2];
//   const currentHeading = listForm.parentElement.previousElementSibling;
//   const localCards = getLocalStorage("cards");
//   const { lists: formLists } = localCards.find(
//     ({ title }) => title == currentHeading.textContent
//   );
//   const newFormLists = formLists.filter(
//     ({ content }) => content !== listContent.textContent
//   );
//   localCards.forEach((card) => {
//     if (card.title == currentHeading.textContent) {
//       card.lists = newFormLists;
//     }
//   });
//   sendToLocalStorage("cards", localCards);
// }

// function removeAddHidden(removeHidden, addHidden) {
//   removeHidden.removeAttribute("hidden");
//   addHidden.setAttribute("hidden", "");
// }

// function cancelAddFormList(cardContentWrapper, formList) {
//   formList.parentElement.removeChild(formList);
//   setCardHeight(cardContentWrapper);
// }

// function setCardHeight(cardContentWrapper) {
//   cardContentWrapper.style.maxHeight = cardContentWrapper.scrollHeight + "px";
// }

// function renderCards(hue) {
//   const localCards = getLocalStorage("cards");
//   const mainSection = document.getElementById("main-section");
//   mainSection.innerHTML = "";
//   localCards?.forEach((card) => {
//     const { title, lists } = card;
//     const cardTemplate = printCardTemplate();
//     cardTemplate.style.setProperty("--hue", hue);
//     cardTemplate.style.setProperty("--check-icon-path", printSvgPath(hue));
//     hue += 45;
//     targetDelete.hue = hue;
//     const cardContentWrapper = cardTemplate.lastElementChild;
//     const cardAddItem = cardContentWrapper.lastElementChild;

//     const cardHeading = cardTemplate.firstElementChild;
//     cardHeading.textContent = title; // change title

//     lists.forEach((list) => {
//       const listForm = printListTemplate();
//       const [, , listContent, listInput] = listForm.children;
//       listContent.textContent = list.content;
//       listInput.setAttribute("value", list.content);

//       cardContentWrapper.insertBefore(
//         listForm,
//         cardAddItem // get button "add new item"
//       );

//       if (list.checked == true) listForm.setAttribute("aria-checked", true);
//     });
//     mainSection.appendChild(cardTemplate);
//   });
// }

// function removeCardFormLocal(cardList) {
//   const currentHeading = cardList.firstElementChild;
//   const localCards = getLocalStorage("cards");
//   const newLocalCards = localCards.filter(
//     ({ title }) => title != currentHeading.textContent
//   );
//   sendToLocalStorage("cards", newLocalCards);
// }

// function removeCurrentTarget(target) {
//   target.style.maxHeight = `${target.scrollHeight}px`;
//   target.style.overflow = "hidden";
//   setTimeout(() => {
//     target.style.transition = "all 300ms";
//     target.style.maxHeight = "0";
//     target.style.paddingBlock = "0";
//   }, 300);
//   setTimeout(() => {
//     target.parentElement.removeChild(target);
//     // renderCards();
//   }, 600);
// }

// function handleSubmitEditTitle(e, newFormHeading, cardHeading, currentTarget) {
//   e.preventDefault();
//   const newInputHeading = newFormHeading.lastElementChild;
//   const oldHeadingName = cardHeading.textContent;
//   const localCards = getLocalStorage("cards");
//   currentTarget.replaceChild(cardHeading, newFormHeading);

//   const isDuplicateTitle = localCards.find(
//     ({ title }) =>
//       title.toLowerCase() == newInputHeading.value.toLowerCase().trim()
//   );
//   const isSameTitle =
//     newInputHeading.value.toLowerCase().trim() == oldHeadingName.toLowerCase();
//   if (newInputHeading.value == "") {
//     return false;
//   } else if (isDuplicateTitle && !isSameTitle) {
//     return alert("card name is already included!");
//   } else {
//     cardHeading.textContent = newInputHeading.value.trim();

//     const editedCard = localCards.find(({ title }) => title == oldHeadingName);
//     const indexEditedCard = localCards.indexOf(editedCard);
//     editedCard.title = cardHeading.textContent;

//     localCards.splice(indexEditedCard, 1, editedCard);
//     sendToLocalStorage("cards", localCards);
//   }
// }

// function getLocalStorage(key) {
//   return JSON.parse(localStorage.getItem(key));
// }
// function sendToLocalStorage(key, value) {
//   localStorage.setItem(key, JSON.stringify(value));
// }

// function printSvgPath(hue) {
//   return `url("data:image/svg+xml,%3Csvg width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5.29389 13.998C4.85889 13.998 4.44689 13.795 4.18289 13.445L0.609892 8.72399C0.499425 8.57819 0.418778 8.41206 0.372559 8.23507C0.326341 8.05809 0.315459 7.87373 0.340534 7.69253C0.365609 7.51134 0.426151 7.33686 0.518698 7.17908C0.611244 7.0213 0.733982 6.88331 0.879892 6.77299C1.02575 6.66222 1.19204 6.58131 1.36922 6.53492C1.5464 6.48853 1.731 6.47756 1.91243 6.50264C2.09386 6.52772 2.26856 6.58837 2.42651 6.68109C2.58446 6.77381 2.72256 6.8968 2.83289 7.04299L5.18389 10.147L11.0949 0.654992C11.2909 0.341592 11.6033 0.118739 11.9634 0.0353157C12.3235 -0.0481073 12.702 0.0147113 13.0159 0.209992C13.6689 0.615992 13.8699 1.47599 13.4619 2.12999L6.47789 13.34C6.35867 13.5322 6.19434 13.6924 5.99916 13.8067C5.80399 13.9211 5.58386 13.986 5.35789 13.996C5.33589 13.998 5.31589 13.998 5.29389 13.998Z' fill='hsl(${hue}, 100%, 20%)'/%3E%3C/svg%3E%0A")`;
// }

// function printCardTemplate() {
//   const cardStr = `<article aria-expanded="false" class="card-todo">
//     <h2 class="card-heading heading"></h2>
//     <div class="content-wrapper">
//     <div>
//       <button class="add-item">+ Add New Item</button>
//     </div>
//     </div>
//   </article>`;
//   return htmlToElement(cardStr);
// }

// function printListTemplate() {
//   const listStr = `<form action="" aria-checked="false" class="list-form">
//     <button hidden type="submit"></button>
//     <button class="check-list" type="button"></button>
//     <p class="list-content"></p>
//     <input hidden class="input-list" type="text" value="" />
//   </form>`;
//   return htmlToElement(listStr);
// }

// function printFormHeading() {
//   const inputHeadingStr = `<form action="">
//     <button hidden type="submit"></button>
//     <input class="heading" type="text">
//   </form>`;
//   return htmlToElement(inputHeadingStr);
// }

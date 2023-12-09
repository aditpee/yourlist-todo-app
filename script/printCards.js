const cardStr = `<article aria-expanded="false" class="card-todo">
<h2 class="card-heading heading"></h2>
<div class="content-wrapper">
<div>
  <button class="add-item">+ Add New Item</button>
</div>
</div>
</article>`;
const listStr = `<form action="" aria-checked="false" class="list-form">
  <button hidden type="submit"></button>
  <button class="check-list" type="button"></button>
  <p class="list-content"></p>
  <input hidden class="input-list" type="text" value="" />
</form>`;
const inputHeadingStr = `<form action="">
  <button hidden type="submit"></button>
  <input class="heading" type="text">
</form>`;

function printSvgPath(hue) {
  return `url("data:image/svg+xml,%3Csvg width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5.29389 13.998C4.85889 13.998 4.44689 13.795 4.18289 13.445L0.609892 8.72399C0.499425 8.57819 0.418778 8.41206 0.372559 8.23507C0.326341 8.05809 0.315459 7.87373 0.340534 7.69253C0.365609 7.51134 0.426151 7.33686 0.518698 7.17908C0.611244 7.0213 0.733982 6.88331 0.879892 6.77299C1.02575 6.66222 1.19204 6.58131 1.36922 6.53492C1.5464 6.48853 1.731 6.47756 1.91243 6.50264C2.09386 6.52772 2.26856 6.58837 2.42651 6.68109C2.58446 6.77381 2.72256 6.8968 2.83289 7.04299L5.18389 10.147L11.0949 0.654992C11.2909 0.341592 11.6033 0.118739 11.9634 0.0353157C12.3235 -0.0481073 12.702 0.0147113 13.0159 0.209992C13.6689 0.615992 13.8699 1.47599 13.4619 2.12999L6.47789 13.34C6.35867 13.5322 6.19434 13.6924 5.99916 13.8067C5.80399 13.9211 5.58386 13.986 5.35789 13.996C5.33589 13.998 5.31589 13.998 5.29389 13.998Z' fill='hsl(${hue}, 100%, 20%)'/%3E%3C/svg%3E%0A")`;
}

function htmlToElement(html) {
  const template = document.createElement("template");
  html.trim();
  template.innerHTML = html;
  return template.content.firstChild;
}

// const getLocalCards = JSON.parse(localStorage.getItem("cards"));
const getLocalStorage = (key) => JSON.parse(localStorage.getItem(key));
const sendToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
const setCardHeight = (cardContentWrapper) => {
  cardContentWrapper.style.maxHeight = cardContentWrapper.scrollHeight + "px";
};
const removeAddHidden = (removeHidden, addHidden) => {
  removeHidden.removeAttribute("hidden");
  addHidden.setAttribute("hidden", "");
};
const saveListToLocal = (currentTarget) => {
  const listContent = currentTarget.children[2];
  const currentHeading = currentTarget.parentElement.previousElementSibling;
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
};

const localCards = getLocalStorage("cards");
const mainSection = document.getElementById("main-section");
let hue = Math.floor(Math.random() * 360);
console.log(printSvgPath(hue));
mainSection.innerHTML = "";
localCards?.forEach((card) => {
  const { title, lists } = card;
  const cardTemplate = htmlToElement(cardStr);
  cardTemplate.style.setProperty("--hue", hue);
  cardTemplate.style.setProperty("--check-icon-path", printSvgPath(hue));
  hue += 45;
  const cardContentWrapper = cardTemplate.lastElementChild;
  const cardAddItem = cardContentWrapper.lastElementChild;

  const cardHeading = cardTemplate.firstElementChild;
  cardHeading.textContent = title; // change title

  lists.forEach((list) => {
    const listForm = htmlToElement(listStr);
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

const addItemBtn = document.querySelectorAll(".add-item");
// ========
//  add btn click
// ========
let isInputText = false;

function printVarListForm(listForm) {
  const [submitBtn, checkBtn, listContent, listInput] = listForm.children;

  return {
    submitBtn,
    checkBtn,
    listContent,
    listInput,
  };
}

const cancelAddFormList = (cardContentWrapper, formList) => {
  formList.parentElement.removeChild(formList);
  setCardHeight(cardContentWrapper);
};
let forEdit = false;
const handleSubmit = (e, cardList, listForm) => {
  e.preventDefault();
  const [headingTarget, cardContentWrapper] = cardList.children;
  const [submitBtn, , listContent, listInput] = listForm.children;

  // for fix bug event listener return multiple times
  const newListForm = htmlToElement(listStr);
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
  const isDuplicatList = formLists.find(
    ({ content }) =>
      content.toLowerCase() == listInput.value.toLowerCase().trim()
  );

  if (listInput.value == "") {
    saveListToLocal(newListForm);
    return cancelAddFormList(cardContentWrapper, newListForm);
  } else if (isDuplicatList && forEdit) {
    if (
      listInput.value.toLowerCase().trim() ==
      listContent.textContent.toLowerCase()
    ) {
      return removeAddHidden(listContent, listInput);
    }
    alert("list already included in this card!");
    removeAddHidden(listContent, listInput);
    return false;
  } else if (isDuplicatList) {
    cancelAddFormList(cardContentWrapper, newListForm);
    alert("list already included in this card!");
    return false;
  }
  console.log("kaka");
  newListContent.textContent = listInput.value.trim();
  removeAddHidden(newListContent, newListInput);
  setCardHeight(cardContentWrapper);

  const oldValue = formLists.find(
    ({ content }) =>
      content.toLowerCase() == listContent.textContent.toLowerCase()
  );
  const indexList = formLists.indexOf(oldValue);
  console.log(listInput.value == listContent.textContent);

  if (forEdit) {
    formLists.splice(indexList, 1, {
      content: newListContent.textContent,
      checked: false,
    });
  } else {
    formLists.push({
      content: newListContent.textContent,
      checked: false,
    });
  }
  sendToLocalStorage("cards", localCards);
};
const handleAddItem = (e) => {
  const listTemplate = htmlToElement(listStr);
  const cardAddItem = e.target.parentElement;
  cardAddItem.parentElement.insertBefore(listTemplate, cardAddItem);

  const newListForm = cardAddItem.previousElementSibling;
  const cardList = newListForm.parentElement.parentElement;
  const cardContentWrapper = cardList.children[1];
  const [submitBtn, , newListContent, newListInput] = newListForm.children;

  removeAddHidden(newListInput, newListContent);
  setCardHeight(cardContentWrapper);
  newListInput.focus();

  forEdit = false;
  newListForm.addEventListener("submit", (e) => {
    handleSubmit(e, cardList, newListForm);
  });
  newListInput.addEventListener("focusout", () => submitBtn.click());
};

const handleCardExpanded = (e) => {
  const cardTodo = e.target.parentElement;
  const cardContentWrapper = cardTodo.lastElementChild;
  const isExpanded = cardTodo.getAttribute("aria-expanded");
  if (isExpanded == "false") {
    const allCardList = document.querySelectorAll(".content-wrapper");
    allCardList.forEach((card) => {
      card.parentElement.setAttribute("aria-expanded", false);
      card.style.maxHeight = 0;
    });
    cardTodo.setAttribute("aria-expanded", true);
    setCardHeight(cardContentWrapper);
  } else {
    cardTodo.setAttribute("aria-expanded", false);
    cardContentWrapper.style.maxHeight = 0;
  }
};

const handleCheck = (e) => {
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
  } else {
    listChecked.checked = false;
    listForm.setAttribute("aria-checked", false);
  }
  sendToLocalStorage("cards", localCards);
};

// ============
// ============
// ============
// ============
// ============
// ============

const showContextMenu = (e) => {
  e.preventDefault();
  const contextMenu = document.querySelector(".context-menu");
  contextMenu.style.top = `${e.pageY}px`;
  contextMenu.style.left = `${e.pageX}px`;
  contextMenu.setAttribute("aria-hidden", false);
  contextMenu.classList.remove("overflow");

  const screenWidth = document.body.scrollWidth;
  if (e.pageX > screenWidth / 2) contextMenu.classList.add("overflow");
};

// kkkk
// kkkk
// kkkk
// kkkk
// kkkk
// kkkk

document.body.addEventListener("click", (e) => {
  const isAddBtn = e.target.classList.contains("add-item");
  if (isAddBtn) handleAddItem(e);

  const isCardHeading = e.target.classList.contains("card-heading");
  if (isCardHeading) handleCardExpanded(e);

  const isCheckList = e.target.classList.contains("check-list");
  if (isCheckList) handleCheck(e);
});

const targetDelete = {
  currentTarget: null,
};
document.body.addEventListener("contextmenu", (e) => {
  const isContextMenu =
    e.target.parentElement.classList.contains("context-menu");
  isContextMenu && e.preventDefault();
  // ========
  //  delete card
  // ========
  const isCardHeading = e.target.classList.contains("heading");
  const isFormList = e.target.classList.contains("list-form");
  if (isCardHeading || isFormList) {
    showContextMenu(e);
    targetDelete.currentTarget = isFormList ? e.target : e.target.parentElement;
  }
});

const saveCardToLocal = (currentTarget) => {
  const currentHeading = currentTarget.firstElementChild;
  const localCards = getLocalStorage("cards");
  const newLocalCards = localCards.filter(
    ({ title }) => title != currentHeading.textContent
  );
  sendToLocalStorage("cards", newLocalCards);
};
function removeCurrentTarget(cardList) {
  cardList.style.maxHeight = `${cardList.scrollHeight}px`;
  cardList.style.overflow = "hidden";
  setTimeout(() => {
    cardList.style.transition = "all 300ms";
    cardList.style.maxHeight = "0";
    cardList.style.paddingBlock = "0";
    // cardList.parentElement.removeChild(cardList);
  }, 300);
  setTimeout(() => {
    cardList.parentElement.removeChild(cardList);
  }, 600);
}

const deleteBtn = document.querySelector(".delete");
deleteBtn.addEventListener("click", () => {
  document.querySelector(".context-menu").setAttribute("aria-hidden", true);

  const { currentTarget } = targetDelete;
  const isCardList = currentTarget.classList.contains("card-todo");
  const isListForm = currentTarget.classList.contains("list-form");

  const confirmDelete = true; //confirm("sure?");
  if (confirmDelete == true) {
    if (isCardList) {
      removeCurrentTarget(currentTarget);
      saveCardToLocal(currentTarget);
    } else if (isListForm) {
      const cardContentWrapper = currentTarget.parentElement;
      removeCurrentTarget(currentTarget);
      saveListToLocal(currentTarget);
      setTimeout(() => setCardHeight(cardContentWrapper), 600);
    }
  }
});
// ========
//  remove context menu when mouse down
// ========
const removeContextMenu = (e) => {
  const isContextMenu =
    e.target.parentElement.classList.contains("context-menu");
  if (!isContextMenu) {
    document.querySelector(".context-menu").setAttribute("aria-hidden", true);
  }
};
["mousedown", "touchstart"].forEach((event) =>
  document.body.addEventListener(event, (e) => removeContextMenu(e))
);

const editBtn = document.querySelector(".edit");
editBtn.addEventListener("click", () => {
  document.querySelector(".context-menu").setAttribute("aria-hidden", true);

  const { currentTarget } = targetDelete;
  const isCardList = currentTarget.classList.contains("card-todo");
  const isListForm = currentTarget.classList.contains("list-form");

  if (isCardList) {
    const newFormHeading = htmlToElement(inputHeadingStr);
    const [submitBtn, newInputHeading] = newFormHeading.children;
    const cardHeading = currentTarget.firstElementChild;
    const oldHeadingName = cardHeading.textContent;
    currentTarget.replaceChild(newFormHeading, cardHeading);
    newInputHeading.value = cardHeading.textContent;
    newInputHeading.focus();
    newInputHeading.select();

    newFormHeading.addEventListener("submit", (e) => {
      e.preventDefault();
      const localCards = getLocalStorage("cards");
      currentTarget.replaceChild(cardHeading, newFormHeading);

      const isDuplicateTitle = localCards.find(
        ({ title }) =>
          title.toLowerCase() == newInputHeading.value.toLowerCase().trim()
      );
      if (newInputHeading.value == "") {
        return false;
      } else if (
        isDuplicateTitle &&
        newInputHeading.value.toLowerCase().trim() !=
          oldHeadingName.toLowerCase()
      ) {
        return alert("card name is already included!");
      }
      cardHeading.textContent = newInputHeading.value.trim();

      const editedCard = localCards.find(
        ({ title }) => title == oldHeadingName
      );
      const indexEditedCard = localCards.indexOf(editedCard);
      editedCard.title = cardHeading.textContent;

      localCards.splice(indexEditedCard, 1, editedCard);
      sendToLocalStorage("cards", localCards);
    });
    newFormHeading.addEventListener("focusout", () => submitBtn.click());
  } else if (isListForm) {
    const cardList = currentTarget.parentElement.parentElement;
    const [submitBtn, checkBtn, listContent, listInput] =
      currentTarget.children;
    const isChecked = currentTarget.getAttribute("aria-checked");
    if (isChecked == "true") return false;
    removeAddHidden(listInput, listContent);
    listInput.value = "";
    listInput.value = listContent.textContent;
    listInput.focus();
    listInput.select();

    forEdit = true;
    currentTarget.addEventListener("submit", (e) => {
      handleSubmit(e, cardList, currentTarget);
    });
    listInput.addEventListener("focusout", () => submitBtn.click());
  }
});

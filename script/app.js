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
// import { handleInputAddCard } from "./module/handleInputAddCard.js";
import { handleClickSearchBtn } from "./module/handleClickSearchBtn.js";
import { handleInputSearchCard } from "./module/handleInputSearchCard.js";

if (!localStorage.getItem("cards")) {
  localStorage.setItem("cards", JSON.stringify([]));
}

renderCards(changeVariables.randomHueColor);

const formPlusCard = document.querySelector(".form-plus-card");
const plusBtn = formPlusCard.lastElementChild;

const deleteBtn = document.querySelector(".delete");
const editBtn = document.querySelector(".edit");

const searchBtn = document.querySelector(".search-btn");
const inputSearch = document.querySelector(".input-search");

formPlusCard.addEventListener("submit", (e) =>
  handleSubmitAddCard(e, formPlusCard)
);
plusBtn.addEventListener("click", () => showInputAddCard(formPlusCard));

deleteBtn.addEventListener("click", handleDelete);
editBtn.addEventListener("click", handleEdit);

document.body.addEventListener("contextmenu", (e) => handleContextMenu(e));

searchBtn.addEventListener("click", (e) => handleClickSearchBtn(e));
inputSearch.addEventListener("input", (e) => handleInputSearchCard(e));

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

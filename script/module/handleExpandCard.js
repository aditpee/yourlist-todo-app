import { setCardHeight } from "./utils/setCardHeight.js";

export function handleExpandCard(e) {
  const cardTodo = e.target.parentElement;
  const cardContentWrapper = cardTodo.lastElementChild;

  const isExpanded = cardTodo.getAttribute("aria-expanded");

  if (isExpanded == "false") {
    const allCardList = document.querySelectorAll(".content-wrapper");

    allCardList.forEach((card) => makeAllCardNotExpand(card));
    cardTodo.setAttribute("aria-expanded", true);
    setCardHeight(cardContentWrapper);
  } else if (isExpanded == "true") {
    cardTodo.setAttribute("aria-expanded", false);
    cardContentWrapper.style.maxHeight = 0;
  }
}

function makeAllCardNotExpand(card) {
  card.parentElement.setAttribute("aria-expanded", false);
  card.style.maxHeight = 0;
}

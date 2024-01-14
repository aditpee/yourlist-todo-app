export function showInputAddCard(formPlusCard) {
  const inputPlusCard = formPlusCard.firstElementChild;

  const inputFocus = {
    focusTrue() {
      this.timeoutID = setTimeout(() => {
        inputPlusCard.removeAttribute("disabled");
        inputPlusCard.focus();
      }, 300);
    },
    cancelTimeout() {
      inputPlusCard.setAttribute("disabled", "");
      clearTimeout(this.timeoutID);
    },
  };

  let isExpanded = formPlusCard.getAttribute("aria-expanded");
  if (isExpanded == "false") {
    formPlusCard.setAttribute("aria-expanded", true);
    inputFocus.focusTrue();
  } else if (isExpanded == "true" && inputPlusCard.value != "") {
    inputPlusCard.value = "";
    inputPlusCard.focus();
  } else {
    formPlusCard.setAttribute("aria-expanded", false);
    inputFocus.cancelTimeout();
    // renderCards(targetDelete.hue);
  }
}

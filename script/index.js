const plusTodo = document.querySelector(".plus-todo");
const plusBtn = plusTodo.lastElementChild;
const inputPlusTodo = plusTodo.firstElementChild;

// console.log(localStorage.getItem("title"));
const coba = localStorage.getItem("title");
if (!localStorage.getItem("cards"))
  localStorage.setItem("cards", JSON.stringify([]));

const inputFocus = {
  focusTrue() {
    this.timeoutID = setTimeout(() => {
      inputPlusTodo.removeAttribute("disabled");
      inputPlusTodo.focus();
    }, 300);
  },
  cancelTimeout() {
    inputPlusTodo.setAttribute("disabled", "");
    clearTimeout(this.timeoutID);
  },
};
plusBtn.addEventListener("click", () => {
  let isExpanded = plusTodo.getAttribute("aria-expanded");
  if (isExpanded == "false") {
    plusTodo.setAttribute("aria-expanded", true);
    inputFocus.focusTrue();
  } else if (isExpanded == "true" && inputPlusTodo.value != "") {
    inputPlusTodo.value = "";
    inputPlusTodo.focus();
  } else {
    plusTodo.setAttribute("aria-expanded", false);
    inputFocus.cancelTimeout();
  }
});

function htmlToElement(html) {
  const template = document.createElement("template");
  html.trim();
  template.innerHTML = html;
  return template.content.firstChild;
}
function printSvgPath(hue) {
  return `url("data:image/svg+xml,%3Csvg width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5.29389 13.998C4.85889 13.998 4.44689 13.795 4.18289 13.445L0.609892 8.72399C0.499425 8.57819 0.418778 8.41206 0.372559 8.23507C0.326341 8.05809 0.315459 7.87373 0.340534 7.69253C0.365609 7.51134 0.426151 7.33686 0.518698 7.17908C0.611244 7.0213 0.733982 6.88331 0.879892 6.77299C1.02575 6.66222 1.19204 6.58131 1.36922 6.53492C1.5464 6.48853 1.731 6.47756 1.91243 6.50264C2.09386 6.52772 2.26856 6.58837 2.42651 6.68109C2.58446 6.77381 2.72256 6.8968 2.83289 7.04299L5.18389 10.147L11.0949 0.654992C11.2909 0.341592 11.6033 0.118739 11.9634 0.0353157C12.3235 -0.0481073 12.702 0.0147113 13.0159 0.209992C13.6689 0.615992 13.8699 1.47599 13.4619 2.12999L6.47789 13.34C6.35867 13.5322 6.19434 13.6924 5.99916 13.8067C5.80399 13.9211 5.58386 13.986 5.35789 13.996C5.33589 13.998 5.31589 13.998 5.29389 13.998Z' fill='hsl(${hue}, 100%, 20%)'/%3E%3C/svg%3E%0A")`;
}

plusTodo.addEventListener("submit", (e) => {
  e.preventDefault();
  const card = JSON.parse(localStorage.getItem("cards"));
  const isDuplicateTitle = card.find(
    ({ title }) =>
      title.toLowerCase() == inputPlusTodo.value.toLowerCase().trim()
  );
  if (isDuplicateTitle) return alert("title already included");
  card.push({
    title: inputPlusTodo.value.trim(),
    lists: [],
  });
  console.log(card.length);
  console.log(hue);

  const cardTemplate = htmlToElement(cardStr);
  const cardHeading = cardTemplate.firstElementChild;
  cardTemplate.style.setProperty("--hue", hue);
  hue += 45;
  cardTemplate.style.setProperty("--check-icon-path", printSvgPath(hue));
  cardHeading.textContent = inputPlusTodo.value.trim();
  mainSection.appendChild(cardTemplate);

  inputPlusTodo.value = "";
  inputPlusTodo.setAttribute("disabled", "");
  localStorage.setItem("cards", JSON.stringify(card));
  plusTodo.setAttribute("aria-expanded", false);
});

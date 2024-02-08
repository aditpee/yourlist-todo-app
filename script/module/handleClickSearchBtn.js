export function handleClickSearchBtn(e) {
  const formSearch = e.currentTarget.parentElement;
  const inputSearch = e.currentTarget.previousElementSibling;

  let ifShow = formSearch.classList.contains("show-input");
  if (ifShow && inputSearch.value !== "") {
    inputSearch.value = "";
    const cardsList = document.querySelectorAll(".card-list");
    inputSearch.focus();

    //show all card
    cardsList.forEach((card) => (card.style.display = "block"));
    // remove not found text if show
    const notFound = document.querySelector(".text-not-found");
    notFound.classList.remove("show-not-found");
  } else if (ifShow === true) {
    formSearch.classList.remove("show-input");
    inputSearch.setAttribute("disabled", "");
    ifShow = false;
  } else {
    formSearch.classList.add("show-input");
    inputSearch.removeAttribute("disabled");
    inputSearch.focus();
    ifShow = true;
  }
}

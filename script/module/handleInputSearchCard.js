export function handleInputSearchCard(e) {
  const cardsList = document.querySelectorAll(".card-list");
  const notFound = document.querySelector(".text-not-found");

  cardsList.forEach((card) => {
    const title = card.querySelector("h2").textContent;
    const cardSearch = title
      .toLowerCase()
      .includes(`${e.target.value.toLowerCase()}`);

    card.style.display = "none";
    notFound.classList.remove("show-not-found");
    if (cardSearch) {
      card.classList.remove("hide-card");
      setTimeout(() => {
        card.style.display = "block";
      });
    } else {
      card.classList.add("hide-card");
      const isNotFoundCard = [...cardsList].filter((card) =>
        card.classList.contains("hide-card")
      );

      if (isNotFoundCard.length === cardsList.length) {
        notFound.classList.add("show-not-found");
      }
    }
  });
}

function handleDeleteCard(evt) {
  evt.target.closest(".card").remove();
}

function handleLikeClick(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

export function createCard(cardData, handleImageClick) {
  const template = document.querySelector("#card-template").content.cloneNode(true);
  const cardElement = template.querySelector(".card");
  const imgElement = cardElement.querySelector(".card__image");
  const titleElement = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  // Наполнение содержимым
  imgElement.src = cardData.link;
  imgElement.alt = cardData.name;
  titleElement.textContent = cardData.name;

  // Навешиваем обработчики
  deleteButton.addEventListener("click", handleDeleteCard);
  likeButton.addEventListener("click", handleLikeClick);
  imgElement.addEventListener("click", () => handleImageClick(cardData.name, cardData.link));

  return cardElement;
}

export { handleDeleteCard, handleLikeClick };

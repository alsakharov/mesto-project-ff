export function createCard(cardData, handleDeleteCard, handleLikeClick, handleImageClick) {
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

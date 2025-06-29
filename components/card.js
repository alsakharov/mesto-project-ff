function handleDeleteCard(evt) {
  evt.target.closest(".card").remove();
}

function handleLikeClick(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

export function createCard(data, { onDeleteCard, onLikeCard, onOpenPreviewImage } = {}) {
  const template = document.querySelector("#card-template").content.cloneNode(true);
  const cardElement = template.querySelector(".card");
  const imgElement = cardElement.querySelector(".card__image");
  const titleElement = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  imgElement.src = data.link;
  imgElement.alt = data.name;
  titleElement.textContent = data.name;

  if (onDeleteCard) {
    deleteButton.addEventListener("click", onDeleteCard);
  }
  if (onLikeCard) {
    likeButton.addEventListener("click", onLikeCard);
  }
  if (onOpenPreviewImage) {
    imgElement.addEventListener("click", () => onOpenPreviewImage(data.name, data.link));
  }

  return cardElement;
}

export { handleDeleteCard, handleLikeClick };

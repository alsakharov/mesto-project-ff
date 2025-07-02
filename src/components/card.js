export function createCard(data, currentUserId, { onDeleteCard, onOpenPreviewImage, onLikeCard }) {
  const template = document.querySelector("#card-template").content.cloneNode(true);
  const cardElement = template.querySelector(".card");
  const imgElement = cardElement.querySelector(".card__image");
  const titleElement = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCount = cardElement.querySelector(".card__like-count");

  imgElement.src = data.link;
  imgElement.alt = data.name;
  titleElement.textContent = data.name;

  // Удаление — только если владелец
  if (data.owner._id === currentUserId) {
    deleteButton.style.display = "block";
    deleteButton.addEventListener("click", () => onDeleteCard(cardElement, data._id));
  } else {
    deleteButton.style.display = "none";
  }

  // Установка лайков
  likeCount.textContent = data.likes.length;
  if (data.likes.some((user) => user._id === currentUserId)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  likeButton.addEventListener("click", () => {
    onLikeCard(data._id, likeButton, likeCount);
  });

  imgElement.addEventListener("click", () => {
    onOpenPreviewImage(data.name, data.link);
  });

  imgElement.addEventListener("error", () => {
    cardElement.style.display = "none";
  });

  return cardElement;
}

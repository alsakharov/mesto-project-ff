import { likeCardApi, dislikeCardApi } from './api.js';

export function createCard(data, currentUserId, { onDeleteCard, onOpenPreviewImage }) {
  const template = document.querySelector('#card-template').content.cloneNode(true);
  const cardElement = template.querySelector('.card');
  const imgElement = cardElement.querySelector('.card__image');
  const titleElement = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likesCounter = cardElement.querySelector('.card__like-count');

  imgElement.src = data.link;
  imgElement.alt = data.name;
  titleElement.textContent = data.name;
  likesCounter.textContent = data.likes.length;

  if (data.likes.some(user => user._id === currentUserId)) {
    likeButton.classList.add('card__like-button_is-active');
  }

  if (data.owner._id !== currentUserId && deleteButton) {
    deleteButton.style.display = 'none';
  }

  likeButton.addEventListener('click', () => {
    const isLiked = likeButton.classList.contains('card__like-button_is-active');
    const likeAction = isLiked ? dislikeCardApi(data._id) : likeCardApi(data._id);

    likeAction
      .then(updatedCard => {
        likeButton.classList.toggle('card__like-button_is-active');
        likesCounter.textContent = updatedCard.likes.length;
      })
      .catch(err => console.log(`Ошибка при обновлении лайка: ${err}`));
  });

  if (onDeleteCard) {
    deleteButton.addEventListener('click', () => onDeleteCard(cardElement, data._id));
  }

  if (onOpenPreviewImage) {
    imgElement.addEventListener('click', () => onOpenPreviewImage(data.name, data.link));
  }

  return cardElement;
}

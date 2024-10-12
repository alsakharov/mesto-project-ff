// @todo: Темплейт карточки
function createCard(cardData, deleteCallback) {
  const template = document.querySelector('#card-template').content.cloneNode(true);
  const imgElement = template.querySelector('.card__image');
  const titleElement = template.querySelector('.card__title');
  const cardElement = template.querySelector('.card');

  imgElement.src = cardData.link;
  imgElement.alt = cardData.name;
  titleElement.textContent = cardData.name;
  
  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', deleteCallback);
  
  return cardElement;
}
function deleteCard(evt) {
  const listItem = evt.target.closest('.card');
  if (listItem) {
      listItem.remove();
  }
}

// @todo: Вывести карточки на страницу

const container = document.querySelector('.places__list');
initialCards.forEach((data) => {
    const cardElement = createCard(data, deleteCard);
    container.append(cardElement);
});


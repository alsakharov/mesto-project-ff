// @todo: Темплейт карточки
function createCard(cardData, deleteCallback) {
  const template = document.querySelector('#card-template').content.cloneNode(true);
  const imgElement = template.querySelector('.card__image');
  const titleElement = template.querySelector('.card__title');
  const cardElement = template.querySelector('.card');
// @todo: DOM узлы
imgElement.src = cardData.link;
imgElement.alt = cardData.name;
titleElement.textContent = cardData.name;
// @todo: Функция создания карточки

const deleteButton = cardElement.querySelector('.card__delete-button');
deleteButton.addEventListener('click', deleteCallback);

return cardElement;
}
// @todo: Функция удаления карточки
function handleDeleteCard(event) {
  const listItem = event.target.closest('.card');
  if (listItem) {
      listItem.remove();
  }
}
// @todo: Вывести карточки на страницу

const container = document.querySelector('.places__list');
initialCards.forEach((data) => {
    const cardElement = createCard(data, handleDeleteCard);
    container.append(cardElement);
});
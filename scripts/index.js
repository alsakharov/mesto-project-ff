// @todo: Темплейт карточки
const container = document.querySelector('.places__list');
console.log(container);
// @todo: DOM узлы
const cardData = initialCards;
// @todo: Функция создания карточки

cardData.forEach((data) => {
        const template = document.querySelector('#card-template').content.cloneNode(true);
        const imgElement = template.querySelector('.card__image');
        const titleElement = template.querySelector('.card__title');
        imgElement.src = data.link;
        imgElement.alt = data.name; 
        titleElement.textContent = data.name;
        container.append(template); 
    });
// @todo: Функция удаления карточки
const deleteButtons = document.querySelectorAll('.card__delete-button');

deleteButtons.forEach(button => {
    button.addEventListener('click', function () {
      const listItem = button.closest('.card');
      if (listItem) {
        listItem.remove(); 
      }
    });
  });
// @todo: Вывести карточки на страницу
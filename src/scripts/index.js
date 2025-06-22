// Импорт стилей
import "../pages/index.css";

// Импорт начальных карточек и функций из модулей
import { initialCards } from "../components/cards.js";
import { createCard } from "../components/card.js";
import {
  openModal,
  closeModal,
  setOverlayClose,
  setCloseButtonHandler
} from "../components/modal.js";

// === Выбор DOM-элементов ===
// Кнопки открытия попапов
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");

// Отдельные попапы
const editProfilePopup = document.querySelector(".popup_type_edit");
const addCardPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");

// Форма редактирования профиля
const editProfileForm = editProfilePopup.querySelector("form[name='edit-profile']");
const nameInput = editProfileForm.querySelector("input[name='name']");
const jobInput = editProfileForm.querySelector("input[name='description']");

const addCardForm = addCardPopup.querySelector("form[name='new-place']");
const placeNameInput = addCardForm.querySelector("input[name='place-name']");
const placeLinkInput = addCardForm.querySelector("input[name='link']");

// Элементы профиля
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");

// Контейнер для карточек
const cardList = document.querySelector(".places__list");

// === Обработчики ===
function handleProfileSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closeModal(editProfilePopup);
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const newCard = createCard(
    {
      name: placeNameInput.value,
      link: placeLinkInput.value
    },
    handleImageClick
  );
  cardList.prepend(newCard);
  addCardForm.reset();
  closeModal(addCardPopup);
}

function handleImageClick(name, link) {
  const popupImage = imagePopup.querySelector(".popup__image");
  const popupCaption = imagePopup.querySelector(".popup__caption");

  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;

  openModal(imagePopup);
}

// === Установка слушателей ===

// Открытие попапов
profileEditButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openModal(editProfilePopup);
});

profileAddButton.addEventListener("click", () => openModal(addCardPopup));

// Закрытие попапов
[editProfilePopup, addCardPopup, imagePopup].forEach((popup) => {
  setOverlayClose(popup);
  setCloseButtonHandler(popup);
});

// Обработчики форм
editProfileForm.addEventListener("submit", handleProfileSubmit);
addCardForm.addEventListener("submit", handleAddCardSubmit);

// Первоначальная отрисовка карточек
initialCards.forEach((cardData) => {
  const card = createCard(cardData, handleImageClick);
  cardList.append(card);
});

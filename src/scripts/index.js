import "../pages/index.css";

import { initialCards } from "../components/cards.js";
import { createCard } from "../components/card.js";
import { openModal, closeModal, setOverlayClose } from "../components/modal.js";

// Кнопки открытия попапов
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");

// Все попапы и кнопки закрытия
const popups = document.querySelectorAll(".popup");
const closeButtons = document.querySelectorAll(".popup__close");

// Конкретные попапы
const editProfilePopup = document.querySelector(".popup_type_edit");
const addCardPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");

// Форма редактирования профиля
const editProfileForm = editProfilePopup.querySelector("form[name='edit-profile']");
const nameInput = editProfileForm.querySelector("input[name='name']");
const jobInput = editProfileForm.querySelector("input[name='description']");

// Текущий профиль
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");

// Форма добавления карточки
const addCardForm = addCardPopup.querySelector("form[name='new-place']");
const placeNameInput = addCardForm.querySelector("input[name='place-name']");
const placeLinkInput = addCardForm.querySelector("input[name='link']");

// Контейнер карточек
const cardList = document.querySelector(".places__list");

// Обработчики карточек
function handleDeleteCard(evt) {
  evt.target.closest(".card").remove();
}

function handleLikeClick(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

function handleImageClick(name, link) {
  const popupImage = imagePopup.querySelector(".popup__image");
  const popupCaption = imagePopup.querySelector(".popup__caption");

  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;

  openModal(imagePopup);
}

// Отправка формы редактирования профиля
function handleProfileSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closeModal(editProfilePopup);
}

// Отправка формы добавления карточки
function handleAddCardSubmit(evt) {
  evt.preventDefault();

  const newCard = createCard(
    {
      name: placeNameInput.value,
      link: placeLinkInput.value
    },
    {
      onDeleteCard: handleDeleteCard,
      onLikeCard: handleLikeClick,
      onOpenPreviewImage: handleImageClick
    }
  );

  cardList.prepend(newCard);
  addCardForm.reset();
  closeModal(addCardPopup);
}

// Навешивание слушателей

profileEditButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openModal(editProfilePopup);
});

profileAddButton.addEventListener("click", () => openModal(addCardPopup));

closeButtons.forEach((btn) => {
  const popup = btn.closest(".popup");
  btn.addEventListener("click", () => closeModal(popup));
});

popups.forEach(setOverlayClose);

editProfileForm.addEventListener("submit", handleProfileSubmit);
addCardForm.addEventListener("submit", handleAddCardSubmit);

// Первоначальная отрисовка карточек

initialCards.forEach((cardData) => {
  const card = createCard(cardData, {
    onDeleteCard: handleDeleteCard,
    onLikeCard: handleLikeClick,
    onOpenPreviewImage: handleImageClick
  });
  cardList.append(card);
});

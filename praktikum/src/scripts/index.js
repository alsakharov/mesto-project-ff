// Импорт стилей
import "../pages/index.css";

// Импорт начальных карточек и функций из модулей
import { initialCards } from "../components/cards.js";
import { createCard } from "../components/card.js";
import { openModal, closeModal, setOverlayClose } from "../components/modal.js";

// === Выбор DOM-элементов ===
// Кнопки открытия попапов
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");

// Все попапы и кнопки закрытия
const popups = document.querySelectorAll(".popup");
const closeButtons = document.querySelectorAll(".popup__close");

// Отдельные попапы по типу
const editProfilePopup = document.querySelector(".popup_type_edit");
const addCardPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");

// Форма редактирования профиля
const editProfileForm = editProfilePopup.querySelector("form[name='edit-profile']");
const nameInput = editProfileForm.querySelector("input[name='name']");
const jobInput = editProfileForm.querySelector("input[name='description']");

// Текущий текст профиля
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");

// Форма добавления карточки
const addCardForm = addCardPopup.querySelector("form[name='new-place']");
const placeNameInput = addCardForm.querySelector("input[name='place-name']");
const placeLinkInput = addCardForm.querySelector("input[name='link']");

// Контейнер для карточек
const cardList = document.querySelector(".places__list");

// === Локальные обработчики карточек ===
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

// === Функции ===

// Обработка отправки формы редактирования профиля
function handleProfileSubmit(evt) {
  evt.preventDefault(); // Предотвращаем стандартную отправку
  profileName.textContent = nameInput.value; // Обновляем имя
  profileJob.textContent = jobInput.value;   // Обновляем описание
  closeModal(editProfilePopup);              // Закрываем попап
}

// Обработка отправки формы добавления карточки
function handleAddCardSubmit(evt) {
  evt.preventDefault();

  // Создаём новую карточку с данными из формы
  const newCard = createCard(
    {
      name: placeNameInput.value,
      link: placeLinkInput.value
    },
    handleDeleteCard,
    handleLikeClick,
    handleImageClick
  );

  cardList.prepend(newCard);  // Добавляем в начало списка
  addCardForm.reset();        // Очищаем поля формы
  closeModal(addCardPopup);   // Закрываем попап
}

// === Обработчики событий ===

// Открытие попапа редактирования профиля
profileEditButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent; // Подставляем текущее имя
  jobInput.value = profileJob.textContent;   // Подставляем текущее описание
  openModal(editProfilePopup);
});

// Открытие попапа добавления карточки
profileAddButton.addEventListener("click", () => openModal(addCardPopup));

// Закрытие всех попапов по кнопке-крестику
closeButtons.forEach((btn) => {
  const popup = btn.closest(".popup");
  btn.addEventListener("click", () => closeModal(popup));
});

// Закрытие по клику на оверлей и по Esc
popups.forEach(setOverlayClose);

// Отправка форм
editProfileForm.addEventListener("submit", handleProfileSubmit);
addCardForm.addEventListener("submit", handleAddCardSubmit);

// === Первоначальная отрисовка карточек ===
initialCards.forEach((card) => {
  const cardElement = createCard(
    card,
    handleDeleteCard,
    handleLikeClick,
    handleImageClick
  );
  cardList.append(cardElement);
});
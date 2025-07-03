import "../pages/index.css";
import { createCard } from "../components/card.js";
import { openModal, closeModal, setOverlayClose } from "../components/modal.js";
import { enableValidation, clearValidation } from "../components/validation.js";
import {
  getUserInfo,
  getInitialCards,
  updateUserInfo,
  addCardApi,
  deleteCardApi,
  likeCardApi,
  dislikeCardApi,
  updateAvatar
} from "../components/api.js";
import { renderLoading } from "../components/utils.js";

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active"
};

const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const editProfilePopup = document.querySelector(".popup_type_edit");
const addCardPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");
const avatarPopup = document.querySelector(".popup_type_avatar");
const confirmDeletePopup = document.querySelector("#confirm-delete-popup");
const errorPopup = document.querySelector(".popup_type_error");

const editProfileForm = editProfilePopup.querySelector("form[name='edit-profile']");
const addCardForm = addCardPopup.querySelector("form[name='new-place']");
const avatarForm = avatarPopup.querySelector("form[name='edit-avatar']");
const confirmDeleteForm = confirmDeletePopup.querySelector("form[name='confirm-delete']");
const confirmDeleteButton = confirmDeleteForm.querySelector('button[type="submit"]');
const errorPopupCloseButton = errorPopup.querySelector(".popup__close");
const errorPopupMessage = errorPopup.querySelector(".popup__error-message");

const nameInput = editProfileForm.querySelector("#profile-name");
const jobInput = editProfileForm.querySelector("#profile-description");
const placeNameInput = addCardForm.querySelector("#place-name");
const placeLinkInput = addCardForm.querySelector("#link");
const avatarInput = avatarForm.querySelector("#avatar-url");

const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");
const profileImageContainer = document.querySelector(".profile__image-container");

const cardList = document.querySelector(".places__list");
const closeButtons = document.querySelectorAll(".popup__close");
const popups = document.querySelectorAll(".popup");

let currentUserId = null;
let cardToDelete = null;
let cardToDeleteId = null;
let lastPopupWithLink = null;

function handleImageClick(name, link) {
  const popupImage = imagePopup.querySelector(".popup__image");
  const popupCaption = imagePopup.querySelector(".popup__caption");
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;
  openModal(imagePopup);
}

function openConfirmDeletePopup(cardElement, cardId) {
  cardToDelete = cardElement;
  cardToDeleteId = cardId;
  openModal(confirmDeletePopup);
}

function handleConfirmDeleteSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, confirmDeleteButton, 'Да');
  deleteCardApi(cardToDeleteId)
    .then(() => {
      cardToDelete.remove();
      closeModal(confirmDeletePopup);
    }) 
    .finally(() => renderLoading(false, confirmDeleteButton, 'Да'));
}

confirmDeleteForm.addEventListener("submit", handleConfirmDeleteSubmit);

function handleProfileSubmit(evt) {
  evt.preventDefault();
  const submitButton = editProfileForm.querySelector('button[type="submit"]');
  renderLoading(true, submitButton);
  updateUserInfo({ name: nameInput.value, about: jobInput.value })
    .then((userData) => {
      profileName.textContent = userData.name;
      profileJob.textContent = userData.about;
      closeModal(editProfilePopup);
    })
    .finally(() => renderLoading(false, submitButton));
}

function checkImageExists(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => reject(false);
    img.src = url;
  });
}

function openErrorPopup(message, source) {
  errorPopupMessage.textContent = message;
  lastPopupWithLink = source;
  openModal(errorPopup);
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const submitButton = addCardForm.querySelector('button[type="submit"]');
  renderLoading(true, submitButton);

  checkImageExists(placeLinkInput.value)
    .then(() => {
      return addCardApi({ name: placeNameInput.value, link: placeLinkInput.value });
    })
    .then((newCardData) => {
      const newCard = createCard(newCardData, currentUserId, {
        onDeleteCard: openConfirmDeletePopup,
        onOpenPreviewImage: handleImageClick,
        onLikeCard: handleLikeToggle
      });
      cardList.prepend(newCard);
      addCardForm.reset();
      clearValidation(addCardForm, validationConfig);
      closeModal(addCardPopup);
    })
    .catch(() => {
      openErrorPopup("По ссылке не найдено изображение. Проверьте URL.", "card");
    })
    .finally(() => renderLoading(false, submitButton));
}

function handleLikeToggle(cardId, likeButton, likeCount) {
  const liked = likeButton.classList.contains("card__like-button_is-active");
  const apiCall = liked ? dislikeCardApi : likeCardApi;

  apiCall(cardId)
    .then((updatedCard) => {
      likeButton.classList.toggle("card__like-button_is-active");
      likeCount.textContent = updatedCard.likes.length;
    })   
}

function handleAvatarSubmit(evt) {
  evt.preventDefault();
  const submitButton = avatarForm.querySelector('button[type="submit"]');
  renderLoading(true, submitButton);

  checkImageExists(avatarInput.value)
    .then(() => {
      return updateAvatar(avatarInput.value);
    })
    .then((userData) => {
      profileImage.src = userData.avatar;
      avatarForm.reset();
      closeModal(avatarPopup);
    })
    .catch(() => {
      openErrorPopup("По ссылке не удалось загрузить аватар. Убедитесь, что URL правильный.", "avatar");
    })
    .finally(() => {
      renderLoading(false, submitButton);
    });
}

profileEditButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  clearValidation(editProfileForm, validationConfig);
  openModal(editProfilePopup);
});

profileAddButton.addEventListener("click", () => {
  addCardForm.reset();
  clearValidation(addCardForm, validationConfig);
  openModal(addCardPopup);
});

profileImageContainer.addEventListener("click", () => {
  avatarForm.reset();
  clearValidation(avatarForm, validationConfig);
  openModal(avatarPopup);
});

editProfileForm.addEventListener("submit", handleProfileSubmit);
addCardForm.addEventListener("submit", handleAddCardSubmit);
avatarForm.addEventListener("submit", handleAvatarSubmit);

closeButtons.forEach((btn) => {
  const popup = btn.closest(".popup");
  btn.addEventListener("click", () => closeModal(popup));
});

popups.forEach(setOverlayClose);

Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cards]) => {
    currentUserId = userData._id;
    profileName.textContent = userData.name;
    profileJob.textContent = userData.about;
    profileImage.src = userData.avatar;

    cards.forEach((cardData) => {
      const card = createCard(cardData, currentUserId, {
        onDeleteCard: openConfirmDeletePopup,
        onOpenPreviewImage: handleImageClick,
        onLikeCard: handleLikeToggle
      });
      cardList.append(card);
    });
  });

enableValidation(validationConfig);

const errorOkButton = errorPopup.querySelector(".popup__button");

function handleCloseErrorPopup() {
  closeModal(errorPopup);

  if (lastPopupWithLink === "card" && placeLinkInput) {
    placeLinkInput.value = "";
  }

  if (lastPopupWithLink === "avatar" && avatarInput) {
    avatarInput.value = "";
  }

  lastPopupWithLink = null;
}

errorOkButton.addEventListener("click", handleCloseErrorPopup);
errorPopupCloseButton.addEventListener("click", handleCloseErrorPopup);

export function openModal(modal) {
  modal.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscClose);
}

export function closeModal(modal) {
  modal.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscClose);
}

function handleEscClose(evt) {
  if (evt.key === 'Escape') {
    const openedModal = document.querySelector('.popup_is-opened');
    if (openedModal) closeModal(openedModal);
  }
}

// Закрытие по клику на оверлей
export function setOverlayClose(modal) {
  modal.addEventListener('mousedown', (evt) => {
    if (evt.target === evt.currentTarget) {
      closeModal(modal);
    }
  });
}

// Закрытие по кнопке крестик (одна кнопка внутри попапа)
export function setCloseButtonHandler(modal) {
  const closeButton = modal.querySelector('.popup__close');
  if (closeButton) {
    closeButton.addEventListener('click', () => closeModal(modal));
  }
}

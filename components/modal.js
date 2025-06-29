export const openModal = (modal) => {
  modal.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscClose);
};

export const closeModal = (modal) => {
  modal.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscClose);
};

const handleEscClose = (evt) => {
  if (evt.key === 'Escape') {
    const openedModal = document.querySelector('.popup_is-opened');
    if (openedModal) closeModal(openedModal);
  }
};

// Закрытие по клику на оверлей
export const setOverlayClose = (modal) => {
  modal.addEventListener('mousedown', (evt) => {
    if (evt.target === evt.currentTarget) closeModal(modal);
  });
};
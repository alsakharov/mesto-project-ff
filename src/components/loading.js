export function renderLoading(isLoading, button, defaultText = 'Сохранить') {
  button.textContent = isLoading ? 'Сохранение...' : defaultText;
}

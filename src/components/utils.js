/**
 * Проверка валидности URL
 * @param {string} string
 * @returns {boolean}
 */
export function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch {
    return false;
  }
}

/**
 * Проверяет, загрузилась ли картинка по URL
 * Возвращает Promise, который резолвится true/false
 * @param {string} url
 * @returns {Promise<boolean>}
 */
export function checkImageLoad(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
}

/**
 * Функция отображает состояние загрузки на кнопке формы
 * @param {boolean} isLoading
 * @param {HTMLElement} button
 * @param {string} defaultText
 */
export function renderLoading(isLoading, button, defaultText = "Сохранить") {
  button.textContent = isLoading ? "Сохранение..." : defaultText;
}
export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

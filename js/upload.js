"use strict";
(() => {
  const StatusCode = {
    ОК: 200
  };
  const URL = `https://21.javascript.pages.academy/keksobooking`;
  const TIMEOUT_IN_MS = 1;

  const errorMessageTemplate = document.querySelector(`#error`).content.querySelector(`.error`);

  const showError = (message) => {
    const errorMessageElement = errorMessageTemplate.cloneNode(true);
    errorMessageElement.querySelector(`.error__message`).textContent = message;
    window.reset.mainNode.appendChild(errorMessageElement);

    document.addEventListener(`keydown`, window.util.onPopupMessageEscPress, {once: true});
    errorMessageElement.addEventListener(`click`, window.reset.removeMessageElement, {once: true});
  };

  window.upload = function (data, onSuccess) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {
      if (xhr.status === StatusCode.ОК) {
        onSuccess(xhr.response);
      } else {
        showError(`Ошибка загрузки объявления. Код ошибки: ${xhr.status} ${xhr.statusText}`);
      }
    });
    xhr.addEventListener(`timeout`, () => {
      showError(`Ошибка загрузки объявления. Код ошибки: ${xhr.status} ${xhr.statusText}`);
    });
    xhr.addEventListener(`error`, () => {
      showError(`Ошибка загрузки объявления. Код ошибки: ${xhr.status} ${xhr.statusText}`);
    });

    xhr.open(`POST`, URL);
    xhr.timeout = TIMEOUT_IN_MS;
    xhr.send(data);
  };
})();

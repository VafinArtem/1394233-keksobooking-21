"use strict";

const Url = {
  LOAD: `https://21.javascript.pages.academy/keksobooking/data`,
  UPLOAD: `https://21.javascript.pages.academy/keksobooking`
};
const StatusCode = {
  ОК: 200
};
const TIMEOUT_IN_MS = 1;

const errorMessageTemplate = document.querySelector(`#error`).content.querySelector(`.error`);

const showError = (message) => {
  const errorMessageElement = errorMessageTemplate.cloneNode(true);
  errorMessageElement.querySelector(`.error__message`).textContent = message;
  window.form.mainNode.appendChild(errorMessageElement);

  document.addEventListener(`keydown`, window.util.onPopupMessageEscPress, {once: true});
  errorMessageElement.addEventListener(`click`, window.form.removeMessageElement, {once: true});
};

const workWithServer = (method, dataUrl, onSuccess, data) => {
  let xhr = new XMLHttpRequest();
  xhr.responseType = `json`;
  xhr.addEventListener(`load`, () => {
    if (xhr.status === StatusCode.ОК) {
      onSuccess(xhr.response);
    } else {
      showError(`При обращению к серверу произошла ошибка. Статус ответа: ${xhr.status} ${xhr.statusText}. Попробуйте перезагрузить страницу`);
    }
  });
  xhr.addEventListener(`error`, () => {
    showError(`Произошла ошибка соединения. Статус ответа: ${xhr.status} ${xhr.statusText}. Попробуйте перезагрузить страницу`);
  });
  xhr.addEventListener(`timeout`, () => {
    showError(`Запрос не успел выполниться за ${xhr.timeout}мс. Статус ответа: ${xhr.status} ${xhr.statusText}. Попробуйте перезагрузить страницу`);
  });
  xhr.open(method, dataUrl);
  xhr.timeout = TIMEOUT_IN_MS;
  xhr.send(method === `GET` ? `` : data);
};

window.backend = {
  load: (onSuccess) => {
    workWithServer(`GET`, Url.LOAD, onSuccess);
  },
  upload: (data, onSuccess) => {
    workWithServer(`POST`, Url.UPLOAD, onSuccess, data);
  },
  showError
};

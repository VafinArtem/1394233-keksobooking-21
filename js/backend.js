"use strict";

const TIMEOUT_IN_MS = 10000;

const Url = {
  LOAD: `https://21.javascript.pages.academy/keksobooking/data`,
  UPLOAD: `https://21.javascript.pages.academy/keksobooking`
};
const StatusCode = {
  OK: 200
};
const RequestMethod = {
  GET: `GET`,
  POST: `POST`
};

const errorMessageTemplate = document.querySelector(`#error`).content.querySelector(`.error`);

const showError = (message) => {
  const errorMessageNode = errorMessageTemplate.cloneNode(true);
  errorMessageNode.querySelector(`.error__message`).textContent = message;
  window.form.node.appendChild(errorMessageNode);

  document.addEventListener(`keydown`, window.util.onPopupMessageEscPress, {once: true});
  errorMessageNode.addEventListener(`click`, window.form.removeMessageNode, {once: true});
};

const workWithServer = (method, dataUrl, onSuccess, data) => {
  let xhr = new XMLHttpRequest();
  xhr.responseType = `json`;
  xhr.addEventListener(`load`, () => {
    if (xhr.status === StatusCode.OK) {
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
  xhr.send(method === RequestMethod.GET ? `` : data);
};

window.backend = {
  load: (onSuccess) => {
    workWithServer(RequestMethod.GET, Url.LOAD, onSuccess);
  },
  upload: (data, onSuccess) => {
    workWithServer(RequestMethod.POST, Url.UPLOAD, onSuccess, data);
  },
  showError
};

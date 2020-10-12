"use strict";
(() => {
  const URL = `https://21.javascript.pages.academy/keksobooking/data`;
  const StatusCode = {
    ОК: 200
  };
  const TIMEOUT_IN_MS = 10000;

  window.load = (onSuccess, onError) => {
    let xhr = new XMLHttpRequest();
    xhr.responseType = `json`;
    xhr.addEventListener(`load`, () => {
      if (xhr.status === StatusCode.ОК) {
        onSuccess(xhr.response);
      } else {
        onError(`При загрузке данных с сервера произошла ошибка. Статус ответа: ${xhr.status} ${xhr.statusText}`);
      }
    });
    xhr.addEventListener(`error`, () => {
      onError(`Произошла ошибка соединения. Статус ответа: ${xhr.status} ${xhr.statusText}`);
    });
    xhr.addEventListener(`timeout`, () => {
      onError(`Запрос не успел выполниться за ${xhr.timeout}мс. Статус ответа: ${xhr.status} ${xhr.statusText}`);
    });
    xhr.open(`GET`, URL);
    xhr.timeout = TIMEOUT_IN_MS;
    xhr.send();
  };
})();

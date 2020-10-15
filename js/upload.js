"use strict";
(() => {
  const StatusCode = {
    ОК: 200
  };
  const URL = `https://21.javascript.pages.academy/keksobooking`;
  const TIMEOUT_IN_MS = 1;

  const errorMessageTemplate = document.querySelector(`#error`).content.querySelector(`.error`);

  const showError = () => {
    const errorMessageElement = errorMessageTemplate.cloneNode(true);
    window.reset.mainNode.appendChild(errorMessageElement);
  };

  window.upload = function (data, onSuccess) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {
      if (xhr.status === StatusCode.ОК) {
        onSuccess(xhr.response);
      } else {
        showError();
      }
    });
    xhr.addEventListener(`timeout`, () => {
      showError();
    });
    xhr.addEventListener(`error`, () => {
      showError();
    });

    xhr.open(`POST`, URL);
    xhr.timeout = TIMEOUT_IN_MS;
    xhr.send(data);
  };
})();

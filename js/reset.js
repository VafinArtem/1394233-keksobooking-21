"use strict";

(() => {
  const mainNode = document.querySelector(`main`);
  const successMessageTemplate = document.querySelector(`#success`).content.querySelector(`.success`);

  const createMessageElement = () => {
    const successMessageElement = successMessageTemplate.cloneNode(true);
    mainNode.appendChild(successMessageElement);

    document.addEventListener(`keydown`, window.util.onPopupMessageEscPress, {once: true});
    successMessageElement.addEventListener(`click`, removeMessageElement, {once: true});
  };

  const removeMessageElement = () => {
    const succesMessageElement = mainNode.querySelector(`.success`);
    const errorMessageElement = mainNode.querySelector(`.error`);
    if (succesMessageElement) {
      succesMessageElement.parentNode.removeChild(succesMessageElement);
      document.removeEventListener(`keydown`, window.util.onPopupMessageEscPress);
    } else {
      errorMessageElement.parentNode.removeChild(errorMessageElement);
      document.removeEventListener(`keydown`, window.util.onPopupMessageEscPress);
    }
  };

  const page = () => {
    let pinsNode = window.pin.mapPinsNode.querySelectorAll(`.map__pin:not(.map__pin--main)`);

    window.pin.mapNode.classList.add(`map--faded`);
    window.form.formNode.classList.add(`ad-form--disabled`);

    window.activate.toggleDisabledOnFormNodes();

    for (let pinNode of pinsNode) {
      pinNode.parentNode.removeChild(pinNode);
    }

    window.form.formNode.reset();

    window.map.mapPinMain.style.left = `570px`;
    window.map.mapPinMain.style.top = `375px`;
    window.form.passAddressInput(window.move.MainPinSize.circle.WIDTH, window.move.MainPinSize.circle.HEIGHT);

    window.map.removeActiveCard();

    window.map.mapPinMain.addEventListener(`mousedown`, window.activate.onPinMainMousedownPress, {
      once: true
    });
    window.map.mapPinMain.addEventListener(`keydown`, window.activate.onPinMainEnterPress, {
      once: true
    });
  };

  window.reset = {
    page,
    removeMessageElement,
    mainNode,
    createMessageElement
  };
})();

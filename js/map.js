"use strict";

(() => {
  const successHandler = (similarData) => {
    const pinsNodesFragment = window.pin.createPinsNodeFragment(similarData);
    window.pin.mapPinsNode.appendChild(pinsNodesFragment);
  };

  const errorHandler = (errorMessage) => {
    const errorLoadNode = document.querySelector(`.error-load`);
    const errorLoadMessageNode = errorLoadNode.querySelector(`.error-load__message`);

    errorLoadNode.classList.remove(`hidden`);
    errorLoadMessageNode.textContent = errorMessage;
  };

  window.map = {
    mapPinMain: window.pin.mapNode.querySelector(`.map__pin--main`),
    initPinsScreen: () => {
      window.load(successHandler, errorHandler);
    },
    removeActiveCard: () => {
      const cardNode = window.pin.mapNode.querySelector(`.map__card`);
      if (cardNode) {
        cardNode.parentNode.removeChild(cardNode);
        document.removeEventListener(`keydown`, window.util.onPopupEscPress);
      }
    },
    errorHandler
  };
})();

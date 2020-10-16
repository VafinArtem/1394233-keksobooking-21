"use strict";

(() => {

  const mapPinMain = window.pin.mapNode.querySelector(`.map__pin--main`);

  const defaultMainPinCoordinates = {
    Y: mapPinMain.style.top,
    X: mapPinMain.style.left
  };

  window.map = {
    mapPinMain,
    defaultMainPinCoordinates,
    initPinsScreen: (array) => {
      const pinsNodesFragment = window.pin.createPinsNodeFragment(array);
      window.pin.mapPinsNode.appendChild(pinsNodesFragment);
    },
    removeActiveCard: () => {
      const cardNode = window.pin.mapNode.querySelector(`.map__card`);
      if (cardNode) {
        cardNode.parentNode.removeChild(cardNode);
        document.removeEventListener(`keydown`, window.util.onPopupEscPress);
      }
    }
  };
})();

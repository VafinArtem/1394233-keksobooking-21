"use strict";

(() => {

  window.map = {
    mapPinMain: window.pin.mapNode.querySelector(`.map__pin--main`),
    initPinsScreen: () => {
      window.load((similarPins) => {
        const pinsNodesFragment = window.pin.createPinsNodeFragment(similarPins);
        window.pin.mapPinsNode.appendChild(pinsNodesFragment);
      });
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

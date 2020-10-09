"use strict";

(() => {
  window.map = {
    mapPinMain: window.pin.mapNode.querySelector(`.map__pin--main`),
    initPinsScreen: () => {
      const pinsNodesFragment = window.pin.createPinsNodeFragment(window.data.pinsDataArray);
      window.pin.mapPinsNode.appendChild(pinsNodesFragment);
    },
    removeActiveCard: () => {
      const cardNode = window.pin.mapNode.querySelector(`.map__card`);
      if (cardNode) {
        cardNode.parentNode.removeChild(cardNode);
      }
    }
  };
})();

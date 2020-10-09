"use strict";

(() => {
  window.map = {
    mapPinMain: window.pin.mapNode.querySelector(`.map__pin--main`),
    initPinsScreen: () => {
      const pinsNodesFragment = window.pin.createPinsNodeFragment(window.data.pinsDataArray);
      window.pin.mapPinsNode.appendChild(pinsNodesFragment);
    },
    cardNode: ``,
    removeActiveCard: () => {
      window.map.cardNode.parentNode.removeChild(window.map.cardNode);
      document.removeEventListener(`keydown`, window.util.onPopupEscPress);
    }
  };
})();

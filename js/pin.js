"use strict";

(() => {
  const mapNode = document.querySelector(`.map`);
  const mapPinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

  const createPin = (obj) => {
    const pinElement = mapPinTemplate.cloneNode(true);
    pinElement.style.left = `${obj.location.x}px`;
    pinElement.style.top = `${obj.location.y}px`;
    pinElement.querySelector(`img`).src = obj.author.avatar;
    pinElement.querySelector(`img`).alt = obj.offer.title;

    return pinElement;
  };

  const removePins = () => {
    let pinsNode = window.pin.mapPinsNode.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    for (let pinNode of pinsNode) {
      pinNode.parentNode.removeChild(pinNode);
    }
  };

  window.pin = {
    mapNode,
    mapPinsNode: mapNode.querySelector(`.map__pins`),
    createPinsNodeFragment: (pinsArr) => {
      const fragment = document.createDocumentFragment();
      for (let i = 0; i < pinsArr.length; i++) {
        fragment.appendChild(createPin(pinsArr[i]));
      }

      return fragment;
    },
    remove: removePins
  };
})();


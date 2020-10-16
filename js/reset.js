"use strict";

(() => {
  const resetPage = () => {
    let pinsNode = window.pin.mapPinsNode.querySelectorAll(`.map__pin:not(.map__pin--main)`);

    window.pin.mapNode.classList.add(`map--faded`);
    window.form.formNode.classList.add(`ad-form--disabled`);

    window.activate.toggleDisabledOnFormNodes();

    for (let pinNode of pinsNode) {
      pinNode.parentNode.removeChild(pinNode);
    }

    window.form.formNode.reset();

    window.map.mapPinMain.style.left = window.map.defaultMainPinCoordinates.X;
    window.map.mapPinMain.style.top = window.map.defaultMainPinCoordinates.Y;
    window.form.passAddressInput(window.move.MainPinSize.circle.WIDTH, window.move.MainPinSize.circle.HEIGHT);

    window.map.removeActiveCard();

    window.map.mapPinMain.addEventListener(`mousedown`, window.activate.onPinMainMousedownPress, {
      once: true
    });
    window.map.mapPinMain.addEventListener(`keydown`, window.activate.onPinMainEnterPress, {
      once: true
    });
    window.scrollTo({top: 0, behavior: `smooth`});
  };

  window.reset = {
    page: resetPage
  };
})();

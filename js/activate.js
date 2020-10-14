"use strict";

(() => {
  const showError = (errorMessage) => {
    const errorLoadNode = document.querySelector(`.error-load`);
    const errorLoadMessageNode = errorLoadNode.querySelector(`.error-load__message`);

    errorLoadNode.classList.remove(`hidden`);
    errorLoadMessageNode.textContent = errorMessage;
  };

  const onPinsClick = (array) => {
    let pinsArr = window.pin.mapPinsNode.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    pinsArr.forEach((element, index) => {
      element.addEventListener(`click`, () => {
        window.map.removeActiveCard();
        const cardNodesFragment = window.card.createСardFragment(array[index]);
        cardNodesFragment.querySelector(`.popup__close`).addEventListener(`click`, window.map.removeActiveCard);
        document.addEventListener(`keydown`, window.util.onPopupEscPress);
        window.pin.mapNode.insertBefore(cardNodesFragment, window.form.mapFiltersNode);
      });
    });
  };

  const activatePage = (array) => {
    window.pin.mapNode.classList.remove(`map--faded`);
    window.form.formNode.classList.remove(`ad-form--disabled`);
    window.form.toggleDisabledOnFormNodes();
    window.form.passAddressInput(window.move.MainPinSize.pin.WIDTH, window.move.MainPinSize.pin.HEIGHT);
    window.map.initPinsScreen(array);
    onPinsClick(array);
  };

  const onPinMainMousedownPress = (evt) => {
    if (evt.button === window.util.MouseButtons.MAIN) {
      evt.preventDefault();
      window.load(activatePage, showError);
      window.map.mapPinMain.removeEventListener(`keydown`, onPinMainEnterPress);
    }
  };

  const onPinMainEnterPress = (evt) => {
    if (evt.key === window.util.KeyboardKeys.ENTER) {
      evt.preventDefault();
      window.load(activatePage, showError);
      window.map.mapPinMain.removeEventListener(`mousedown`, onPinMainMousedownPress);
    }
  };

  window.activate = {
    onPinMainMousedownPress,
    onPinMainEnterPress
  };
})();

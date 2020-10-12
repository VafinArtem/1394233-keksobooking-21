"use strict";

(() => {
  const mapFiltersNode = window.pin.mapNode.querySelector(`.map__filters-container`);
  const formFiltersNode = mapFiltersNode.querySelector(`.map__filters`);

  let isPageDisabled = false;

  const toggleDisabledOnFormNodes = () => {
    isPageDisabled = !isPageDisabled;
    const classListMethod = isPageDisabled ? `add` : `remove`;
    Array.from(window.form.formNode.children).forEach((child) => {
      child.disabled = isPageDisabled;
      child.classList[classListMethod](`disable-cursor`);
    });
    Array.from(formFiltersNode.children).forEach((child) => {
      child.disabled = isPageDisabled;
      child.classList[classListMethod](`disable-cursor`);
    });
  };

  const successHandler = (similarData) => {
    let pinsArr = window.pin.mapPinsNode.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    pinsArr.forEach((element, index) => {
      element.addEventListener(`click`, () => {
        window.map.removeActiveCard();
        const cardNodesFragment = window.card.createСardFragment(similarData[index]);
        cardNodesFragment.querySelector(`.popup__close`).addEventListener(`click`, window.map.removeActiveCard);
        document.addEventListener(`keydown`, window.util.onPopupEscPress);
        window.pin.mapNode.insertBefore(cardNodesFragment, mapFiltersNode);
      });
    });
  };

  const onPinsClick = () => {
    window.load(successHandler, window.map.errorHandler);
  };

  const activatePage = () => {
    window.pin.mapNode.classList.remove(`map--faded`);
    window.form.formNode.classList.remove(`ad-form--disabled`);
    toggleDisabledOnFormNodes();
    window.form.passAddressInput(window.move.MainPinSize.pin.WIDTH, window.move.MainPinSize.pin.HEIGHT);
    window.map.initPinsScreen();
    onPinsClick();
  };

  const onPinMainMousedownPress = (evt) => {
    if (evt.button === window.util.MouseButtons.MAIN) {
      evt.preventDefault();
      activatePage();
      window.map.mapPinMain.removeEventListener(`keydown`, onPinMainEnterPress);
    }
  };

  const onPinMainEnterPress = (evt) => {
    if (evt.key === window.util.KeyboardKeys.ENTER) {
      evt.preventDefault();
      activatePage();
      onPinsClick();
      window.map.mapPinMain.removeEventListener(`mousedown`, onPinMainMousedownPress);
    }
  };

  toggleDisabledOnFormNodes();
  window.form.passAddressInput(window.move.MainPinSize.circle.WIDTH, window.move.MainPinSize.circle.HEIGHT);
  window.map.mapPinMain.addEventListener(`mousedown`, onPinMainMousedownPress, {
    once: true
  });
  window.map.mapPinMain.addEventListener(`keydown`, onPinMainEnterPress, {
    once: true
  });
})();

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

  const onActiveMode = () => {
    window.pin.mapNode.classList.remove(`map--faded`);
    window.form.formNode.classList.remove(`ad-form--disabled`);
    toggleDisabledOnFormNodes();
    window.form.passAddressInput(window.move.MainPinSize.WIDTH, window.move.MainPinSize.HEIGHT);
  };

  toggleDisabledOnFormNodes();
  window.form.passAddressInput(window.move.MainPinCircleSize.WIDTH, window.move.MainPinCircleSize.HEIGHT);

  window.map.mapPinMain.addEventListener(`mousedown`, function (evt) {
    if (evt.button === window.util.MouseButtons.MAIN) {
      evt.preventDefault();
      onActiveMode();
      window.map.initPinsScreen();

      let pinsArr = Array.from(window.pin.mapPinsNode.querySelectorAll(`.map__pin:not(.map__pin--main)`));

      pinsArr.forEach((element, index) => {
        element.addEventListener(`click`, () => {
          window.map.removeActiveCard();
          const cardNodesFragment = window.card.createСardFragment(window.data.pinsDataArray[index]);
          cardNodesFragment.querySelector(`.popup__close`).addEventListener(`click`, window.map.removeActiveCard);
          document.addEventListener(`keydown`, window.util.onPopupEscPress);
          window.pin.mapNode.insertBefore(cardNodesFragment, mapFiltersNode);
        });
      });
    }
  }, {
    once: true
  });
  window.map.mapPinMain.addEventListener(`keydown`, function (evt) {
    if (evt.key === window.util.KeyboardKeys.ESCAPE) {
      onActiveMode();
      window.map.initPinsScreen();

      let pinsArr = Array.from(window.pin.mapPinsNode.querySelectorAll(`.map__pin:not(.map__pin--main)`));

      pinsArr.forEach((element, index) => {
        element.addEventListener(`click`, () => {
          window.map.removeActiveCard();
          const cardNodesFragment = window.card.createСardFragment(window.data.pinsDataArray[index]);
          cardNodesFragment.querySelector(`.popup__close`).addEventListener(`click`, window.map.removeActiveCard);
          document.addEventListener(`keydown`, window.util.onPopupEscPress);
          window.pin.mapNode.insertBefore(cardNodesFragment, mapFiltersNode);
        });
      });
    }
  }, {
    once: true
  });
})();

"use strict";

(() => {
  const mapFiltersNode = window.pin.mapNode.querySelector(`.map__filters-container`);
  const formFiltersNode = mapFiltersNode.querySelector(`.map__filters`);
  const checkBoxes = formFiltersNode.features;

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

  const activatePage = (array) => {
    const simillarPinsArray = array;
    window.pin.mapNode.classList.remove(`map--faded`);
    window.form.formNode.classList.remove(`ad-form--disabled`);
    toggleDisabledOnFormNodes();
    window.form.passAddressInput(window.move.MainPinSize.pin.WIDTH, window.move.MainPinSize.pin.HEIGHT);
    window.map.initPinsScreen(simillarPinsArray);
    window.card.addCardNode(simillarPinsArray);

    checkBoxes.forEach((element) => {
      element.addEventListener(`change`, () => {
        if (element.checked) {
          window.map.removeActiveCard();
          window.filter.updatePins(simillarPinsArray);
        }
      });
    });
    window.activate.formFiltersNode.querySelectorAll(`select`).forEach((element) => {
      element.addEventListener(`change`, () => {
        window.map.removeActiveCard();
        window.filter.updatePins(simillarPinsArray);
      });
    });
  };

  const onPinMainMousedownPress = (evt) => {
    if (evt.button === window.util.MouseButtons.MAIN) {
      evt.preventDefault();
      window.backend.load(activatePage);
      window.map.mapPinMain.removeEventListener(`keydown`, onPinMainEnterPress);
    }
  };

  const onPinMainEnterPress = (evt) => {
    if (evt.key === window.util.KeyboardKeys.ENTER) {
      evt.preventDefault();
      window.backend.load(activatePage);
      window.map.mapPinMain.removeEventListener(`mousedown`, onPinMainMousedownPress);
    }
  };

  window.activate = {
    onPinMainMousedownPress,
    onPinMainEnterPress,
    toggleDisabledOnFormNodes,
    mapFiltersNode,
    formFiltersNode,
  };
})();

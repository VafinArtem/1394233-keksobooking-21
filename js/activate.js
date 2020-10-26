"use strict";

(() => {
  const mapFiltersNode = window.pin.mapNode.querySelector(`.map__filters-container`);
  const formFiltersNode = mapFiltersNode.querySelector(`.map__filters`);

  let isPageDisabled = false;

  const toggleDisabledOnFormNodes = () => {
    isPageDisabled = !isPageDisabled;
    Array.from(window.form.formNode.children).forEach((child) => {
      child.disabled = isPageDisabled;
      child.classList.toggle(`disable-cursor`, isPageDisabled);
    });
    Array.from(formFiltersNode.children).forEach((child) => {
      child.disabled = isPageDisabled;
      child.classList.toggle(`disable-cursor`, isPageDisabled);
    });
  };

  const activatePage = (array) => {
    const simillarPinsArray = array;
    window.pin.mapNode.classList.remove(`map--faded`);
    window.form.formNode.classList.remove(`ad-form--disabled`);
    toggleDisabledOnFormNodes();
    window.form.passAddressInput(window.move.MainPinSize.pin.WIDTH, window.move.MainPinSize.pin.HEIGHT);
    window.filter.updateSimillarPins(simillarPinsArray);

    const filterPins = window.util.debounce(() => {
      window.filter.updateSimillarPins(simillarPinsArray);
    });

    formFiltersNode.addEventListener(`change`, filterPins);
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
    formFiltersNode
  };
})();

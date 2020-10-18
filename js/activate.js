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

  const addCardNode = (array) => {
    let pinsArr = window.pin.mapPinsNode.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    pinsArr.forEach((element, index) => {
      element.addEventListener(`click`, () => {
        window.map.removeActiveCard();
        const cardNodesFragment = window.card.createСardFragment(array[index]);
        cardNodesFragment.querySelector(`.popup__close`).addEventListener(`click`, window.map.removeActiveCard);
        document.addEventListener(`keydown`, window.util.onPopupEscPress);
        window.pin.mapNode.insertBefore(cardNodesFragment, mapFiltersNode);
      });
    });
  };

  const activatePage = (array) => {
    const simillarPinsArray = array;
    window.pin.mapNode.classList.remove(`map--faded`);
    window.form.formNode.classList.remove(`ad-form--disabled`);
    toggleDisabledOnFormNodes();
    window.form.passAddressInput(window.move.MainPinSize.pin.WIDTH, window.move.MainPinSize.pin.HEIGHT);
    window.map.initPinsScreen(simillarPinsArray);
    addCardNode(simillarPinsArray);

    const updateSimillarPins = () => {
      const sameTypeHouse = simillarPinsArray.filter((pinSimmillar) => {
        if (formFiltersNode.housingType.value === `any`) {
          return simillarPinsArray;
        } else {
          return pinSimmillar.offer.type === formFiltersNode.housingType.value;
        }
      });
      window.pin.remove();
      window.map.initPinsScreen(sameTypeHouse);
      addCardNode(sameTypeHouse);
    };

    formFiltersNode.housingType.addEventListener(`change`, () => {
      window.map.removeActiveCard();
      updateSimillarPins();
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
    mapFiltersNode
  };
})();

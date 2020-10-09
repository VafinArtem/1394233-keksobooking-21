"use strict";


const ROOMS_FOR_GUESTS_MAP = {
  1: [`1`],
  2: [`1`, `2`],
  3: [`1`, `2`, `3`],
  100: [`0`]
};
const MIN_PRICE = {
  palace: 10000,
  house: 5000,
  flat: 1000,
  bungalow: 0
};

const MainPinSize = {
  WIDTH: 62,
  HEIGHT: 72
};
const TitleLength = {
  MIN: 30,
  MAX: 100
};

const mapPinMain = window.pin.mapNode.querySelector(`.map__pin--main`);
const mapFiltersNode = window.pin.mapNode.querySelector(`.map__filters-container`);
const formFiltersNode = mapFiltersNode.querySelector(`.map__filters`);
const formNode = document.querySelector(`.ad-form`);


const validateTimeSelects = (evt) => {
  if (evt.target === formNode.timein) {
    formNode.timeout.value = formNode.timein.value;
  } else {
    formNode.timein.value = formNode.timeout.value;
  }
};

const validateRoomsInput = () => {
  formNode.capacity.setCustomValidity(ROOMS_FOR_GUESTS_MAP[formNode.rooms.value].includes(formNode.capacity.value) ? `` : `Вы не можете выбрать данное количество гостей`);
  formNode.capacity.reportValidity();
};

const validatePriceInput = () => {
  formNode.price.min = MIN_PRICE[formNode.type.value];
  formNode.price.placeholder = MIN_PRICE[formNode.type.value];
};

const validateTitleInput = () => {
  const valueLength = formNode.title.value.length;

  if (valueLength < TitleLength.MIN) {
    formNode.title.setCustomValidity(`Ещё ${TitleLength.MIN - valueLength} симв.`);
  } else if (valueLength > TitleLength.MAX) {
    formNode.title.setCustomValidity(`Удалите лишние ${valueLength - TitleLength.MAX} симв.`);
  } else {
    formNode.title.setCustomValidity(``);
  }
  formNode.title.reportValidity();
};

const onFormNodeChange = (evt) => {
  switch (evt.target) {
    case formNode.title:
      validateTitleInput();
      break;
    case formNode.rooms:
    case formNode.capacity:
      validateRoomsInput();
      break;
    case formNode.timein:
    case formNode.timeout:
      validateTimeSelects(evt);
      break;
    case formNode.type:
      validatePriceInput();
      break;
  }
};

const getMainMapPinCoordinateX = () => {
  return parseInt(mapPinMain.style.left, 10) + (MainPinSize.WIDTH / 2);
};

const getMainMapPinCoordinateY = () => {
  return parseInt(mapPinMain.style.top, 10) + (MainPinSize.HEIGHT);
};

const passAddressInput = () => {
  formNode.address.value = `${getMainMapPinCoordinateX()}, ${getMainMapPinCoordinateY()}`;
};

let isPageDisabled = false;

const toggleDisabledOnFormNodes = () => {
  isPageDisabled = !isPageDisabled;
  const classListMethod = isPageDisabled ? `add` : `remove`;
  Array.from(formNode.children).forEach((child) => {
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
  formNode.classList.remove(`ad-form--disabled`);
  toggleDisabledOnFormNodes();
};

toggleDisabledOnFormNodes();


mapPinMain.addEventListener(`click`, function () {
  onActiveMode();
  window.map.initPinsScreen();
  passAddressInput();

  let pinsArr = Array.from(window.pin.mapPinsNode.querySelectorAll(`.map__pin:not(.map__pin--main)`));

  pinsArr.forEach((element, index) => {
    element.addEventListener(`click`, () => {
      window.map.cardNode = window.pin.mapNode.querySelector(`.map__card`);
      if (window.map.cardNode) {
        window.map.removeActiveCard();
      }
      const cardNodesFragment = window.card.createСardFragment(window.data.pinsDataArray[index]);
      window.pin.mapNode.insertBefore(cardNodesFragment, mapFiltersNode);
      window.map.cardNode = window.pin.mapNode.querySelector(`.map__card`);
      const closeButton = window.map.cardNode.querySelector(`.popup__close`);
      closeButton.addEventListener(`click`, window.map.removeActiveCard);
      document.addEventListener(`keydown`, window.util.onPopupEscPress);
    });
  });
}, {
  once: true
});

formNode.addEventListener(`change`, onFormNodeChange);

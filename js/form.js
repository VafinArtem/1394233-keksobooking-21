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

const TitleLength = {
  MIN: 30,
  MAX: 100
};

const formNode = document.querySelector(`.ad-form`);
const formResetButton = formNode.querySelector(`.ad-form__reset`);
const mainNode = document.querySelector(`main`);
const successMessageTemplate = document.querySelector(`#success`).content.querySelector(`.success`);

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

const getMainMapPinCoordinateX = (pinWidth) => {
  return parseInt(window.map.mapPinMain.style.left, 10) + (pinWidth / 2);
};

const getMainMapPinCoordinateY = (pinHeight) => {
  return pinHeight === window.move.MainPinSize.pin.HEIGHT ? parseInt(window.map.mapPinMain.style.top, 10) : parseInt(window.map.mapPinMain.style.top, 10) - (pinHeight / 2);
};

const passAddressInput = (pinWidth, pinHeight) => {
  formNode.address.value = `${getMainMapPinCoordinateX(pinWidth)}, ${getMainMapPinCoordinateY(pinHeight)}`;
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

const createMessageElement = () => {
  const successMessageElement = successMessageTemplate.cloneNode(true);
  mainNode.appendChild(successMessageElement);

  document.addEventListener(`keydown`, window.util.onPopupMessageEscPress, {once: true});
  successMessageElement.addEventListener(`click`, removeMessageElement, {once: true});
};

const removeMessageElement = () => {
  const modalNode = mainNode.querySelector(`.success, .error`);

  if (modalNode) {
    modalNode.parentNode.removeChild(modalNode);
    document.removeEventListener(`keydown`, window.util.onPopupMessageEscPress);
  }
};

formNode.addEventListener(`change`, onFormNodeChange);
formNode.addEventListener(`submit`, (evt) => {
  window.backend.upload(new FormData(formNode), window.reset.page);
  createMessageElement();
  evt.preventDefault();
});

formResetButton.addEventListener(`click`, () => {
  window.reset.page();
});

window.form = {
  formNode,
  passAddressInput
};

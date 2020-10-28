/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
(() => {
/*!********************!*\
  !*** ./js/util.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */



const DEBOUNCE_INTERVAL = 500;

const KeyboardKeys = {
  ESCAPE: `Escape`,
  ENTER: `Enter`
};

window.util = {
  getRandomArrElement: (arr) => {
    return arr[Math.floor(Math.random() * arr.length)];
  },
  getRandomInt: (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  getDeclension: (number, titles) => {
    const cases = [2, 0, 1, 1, 1, 2];
    return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
  },
  getRandomLenghtArr: (array) => {
    return array.slice(0, window.util.getRandomInt(0, array.length));
  },
  onPopupEscPress: (evt) => {
    if (evt.key === KeyboardKeys.ESCAPE) {
      evt.preventDefault();
      window.map.removeActiveCard();
    }
  },
  onPopupMessageEscPress: (evt) => {
    if (evt.key === KeyboardKeys.ESCAPE) {
      evt.preventDefault();
      window.form.removeMessageNode();
    }
  },
  debounce: (cb) => {
    let lastTimeout = null;

    return (...parameters) => {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(() => {
        cb(...parameters);
      }, DEBOUNCE_INTERVAL);
    };
  },
  MouseButtons: {
    MAIN: 0
  },
  KeyboardKeys
};

})();

(() => {
/*!*******************!*\
  !*** ./js/pin.js ***!
  \*******************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const mapNode = document.querySelector(`.map`);
const mapPinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

const createPin = (obj) => {
  const pinNode = mapPinTemplate.cloneNode(true);
  pinNode.style.left = `${obj.location.x}px`;
  pinNode.style.top = `${obj.location.y}px`;
  pinNode.querySelector(`img`).src = obj.author.avatar;
  pinNode.querySelector(`img`).alt = obj.offer.title;

  return pinNode;
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

(() => {
/*!*******************!*\
  !*** ./js/map.js ***!
  \*******************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const mapPinMain = window.pin.mapNode.querySelector(`.map__pin--main`);

window.map = {
  mapPinMain,
  DefaultMainPinCoordinates: {
    Y: mapPinMain.style.top,
    X: mapPinMain.style.left
  },
  initPinsScreen: (array) => {
    const pinsNodesFragment = window.pin.createPinsNodeFragment(array);
    window.pin.mapPinsNode.appendChild(pinsNodesFragment);
  },
  removeActiveCard: () => {
    const cardNode = window.pin.mapNode.querySelector(`.map__card`);
    if (cardNode) {
      cardNode.parentNode.removeChild(cardNode);
      document.removeEventListener(`keydown`, window.util.onPopupEscPress);
    }
  }
};

})();

(() => {
/*!************************!*\
  !*** ./js/activate.js ***!
  \************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


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

(() => {
/*!**********************!*\
  !*** ./js/filter.js ***!
  \**********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */



const MAX_SIMILLAR_PINS_COUNT = 5;
const FILTER_DEFAULT_VALUE = `any`;

const RoomPrice = {
  LOW: 10000,
  HIGH: 50000
};

const checkBoxes = Array.from(window.activate.formFiltersNode.features);

const containsValue = (objectValue, filterValue, sourceArray, newArray) => {
  if (window.activate.formFiltersNode[objectValue].value === FILTER_DEFAULT_VALUE) {
    return sourceArray;
  } else {
    return parseInt(newArray.offer[filterValue], 10) === parseInt(window.activate.formFiltersNode[objectValue].value, 10);
  }
};

const filterPinsByType = (element, array) => {
  if (window.activate.formFiltersNode[`housing-type`].value === FILTER_DEFAULT_VALUE) {
    return array;
  } else {
    return element.offer.type === window.activate.formFiltersNode[`housing-type`].value;
  }
};

const filterPinsByRooms = (pinSimmillar, index, array) => {
  return containsValue(`housing-rooms`, `rooms`, array, pinSimmillar);
};

const filterPinsByGuests = (pinSimmillar, index, array) => {
  return containsValue(`housing-guests`, `guests`, array, pinSimmillar);
};

const filterPinsByPrice = (pinSimmillar, index, array) => {
  switch (window.activate.formFiltersNode[`housing-price`].value) {
    case `low`:
      return pinSimmillar.offer.price < RoomPrice.LOW;
    case `middle`:
      return pinSimmillar.offer.price >= RoomPrice.LOW && pinSimmillar.offer.price <= RoomPrice.HIGH;
    case `high`:
      return pinSimmillar.offer.price > RoomPrice.HIGH;
    default:
      return array;
  }
};

const filterPinsByFeatures = function (pinSimmillar) {
  return !checkBoxes.some(function (element) {
    return element.checked && !pinSimmillar.offer.features.includes(element.value);
  });
};

window.filter = {
  updateSimillarPins: (array) => {

    const filteredOffersArray = array.filter(filterPinsByType)
    .filter(filterPinsByRooms)
    .filter(filterPinsByGuests)
    .filter(filterPinsByPrice)
    .filter(filterPinsByFeatures)
    .slice(0, MAX_SIMILLAR_PINS_COUNT);


    window.map.removeActiveCard();
    window.pin.remove();
    window.map.initPinsScreen(filteredOffersArray);
    window.card.addCardNode(filteredOffersArray);
  }
};

})();

(() => {
/*!********************!*\
  !*** ./js/form.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const RoomsForGuestsMap = {
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
  formNode.capacity.setCustomValidity(RoomsForGuestsMap[formNode.rooms.value].includes(formNode.capacity.value) ? `` : `Вы не можете выбрать данное количество гостей`);
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

const createMessageNode = () => {
  const successMessageNode = successMessageTemplate.cloneNode(true);
  mainNode.appendChild(successMessageNode);

  document.addEventListener(`keydown`, window.util.onPopupMessageEscPress, {once: true});
  successMessageNode.addEventListener(`click`, removeMessageNode, {once: true});
};

const removeMessageNode = () => {
  const modalNode = mainNode.querySelector(`.success, .error`);

  if (modalNode) {
    if (modalNode.classList.contains(`error`)) {
      window.map.mapPinMain.addEventListener(`mousedown`, window.activate.onPinMainMousedownPress, {
        once: true
      });
      window.map.mapPinMain.addEventListener(`keydown`, window.activate.onPinMainEnterPress, {
        once: true
      });
    }
    modalNode.parentNode.removeChild(modalNode);
    document.removeEventListener(`keydown`, window.util.onPopupMessageEscPress);
  }
};

formNode.addEventListener(`change`, onFormNodeChange);
formNode.addEventListener(`submit`, (evt) => {
  window.backend.upload(new FormData(formNode), window.reset.page);
  createMessageNode();
  evt.preventDefault();
});

formResetButton.addEventListener(`click`, () => {
  window.reset.page();
});

window.form = {
  formNode,
  passAddressInput,
  mainNode,
  removeMessageNode
};

})();

(() => {
/*!*********************!*\
  !*** ./js/reset.js ***!
  \*********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const previewAvatarNode = window.form.formNode.querySelector(`.ad-form-header__preview img`);
const previewRoomNode = window.form.formNode.querySelector(`.ad-form__photo img`);

const DefaultImage = {
  AVATAR: previewAvatarNode.src,
  ROOM: ``
};

const resetPage = () => {

  window.pin.mapNode.classList.add(`map--faded`);
  window.form.formNode.classList.add(`ad-form--disabled`);

  window.activate.toggleDisabledOnFormNodes();

  window.pin.remove();

  window.form.formNode.reset();
  window.activate.formFiltersNode.reset();

  window.map.mapPinMain.style.left = window.map.DefaultMainPinCoordinates.X;
  window.map.mapPinMain.style.top = window.map.DefaultMainPinCoordinates.Y;
  window.form.passAddressInput(window.move.MainPinSize.circle.WIDTH, window.move.MainPinSize.circle.HEIGHT);

  window.map.removeActiveCard();

  previewRoomNode.classList.add(`hidden`);
  previewRoomNode.src = DefaultImage.ROOM;
  previewAvatarNode.src = DefaultImage.AVATAR;

  window.map.mapPinMain.addEventListener(`mousedown`, window.activate.onPinMainMousedownPress, {
    once: true
  });
  window.map.mapPinMain.addEventListener(`keydown`, window.activate.onPinMainEnterPress, {
    once: true
  });
  window.scrollTo({top: 0, behavior: `smooth`});
};

window.reset = {
  page: resetPage,
  previewAvatarNode,
  previewRoomNode
};

})();

(() => {
/*!***********************!*\
  !*** ./js/backend.js ***!
  \***********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const TIMEOUT_IN_MS = 10000;

const Url = {
  LOAD: `https://21.javascript.pages.academy/keksobooking/data`,
  UPLOAD: `https://21.javascript.pages.academy/keksobooking`
};
const StatusCode = {
  ОК: 200
};

const errorMessageTemplate = document.querySelector(`#error`).content.querySelector(`.error`);

const showError = (message) => {
  const errorMessageNode = errorMessageTemplate.cloneNode(true);
  errorMessageNode.querySelector(`.error__message`).textContent = message;
  window.form.mainNode.appendChild(errorMessageNode);

  document.addEventListener(`keydown`, window.util.onPopupMessageEscPress, {once: true});
  errorMessageNode.addEventListener(`click`, window.form.removeMessageNode, {once: true});
};

const workWithServer = (method, dataUrl, onSuccess, data) => {
  let xhr = new XMLHttpRequest();
  xhr.responseType = `json`;
  xhr.addEventListener(`load`, () => {
    if (xhr.status === StatusCode.ОК) {
      onSuccess(xhr.response);
    } else {
      showError(`При обращению к серверу произошла ошибка. Статус ответа: ${xhr.status} ${xhr.statusText}. Попробуйте перезагрузить страницу`);
    }
  });
  xhr.addEventListener(`error`, () => {
    showError(`Произошла ошибка соединения. Статус ответа: ${xhr.status} ${xhr.statusText}. Попробуйте перезагрузить страницу`);
  });
  xhr.addEventListener(`timeout`, () => {
    showError(`Запрос не успел выполниться за ${xhr.timeout}мс. Статус ответа: ${xhr.status} ${xhr.statusText}. Попробуйте перезагрузить страницу`);
  });
  xhr.open(method, dataUrl);
  xhr.timeout = TIMEOUT_IN_MS;
  xhr.send(method === `GET` ? `` : data);
};

window.backend = {
  load: (onSuccess) => {
    workWithServer(`GET`, Url.LOAD, onSuccess);
  },
  upload: (data, onSuccess) => {
    workWithServer(`POST`, Url.UPLOAD, onSuccess, data);
  },
  showError
};

})();

(() => {
/*!********************!*\
  !*** ./js/card.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const FEATURES_CLASS_MAP = {
  wifi: `popup__feature--wifi`,
  dishwasher: `popup__feature--dishwasher`,
  parking: `popup__feature--parking`,
  washer: `popup__feature--washer`,
  elevator: `popup__feature--elevator`,
  conditioner: `popup__feature--conditioner`
};

const HOUSE_TYPES = {
  flat: `Квартира`,
  bungalow: `Бунгало`,
  palace: `Замок`,
  house: `Дом`
};

const mapCardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);

const createCard = (dataObject) => {
  const cardNode = mapCardTemplate.cloneNode(true);
  if (dataObject.offer.title.length) {
    cardNode.querySelector(`.popup__title`).classList.remove(`hidden`);
    cardNode.querySelector(`.popup__title`).textContent = dataObject.offer.title;
  }
  if (dataObject.offer.address.length) {
    cardNode.querySelector(`.popup__text--address`).classList.remove(`hidden`);
    cardNode.querySelector(`.popup__text--address`).textContent = dataObject.offer.address;
  }
  if (dataObject.offer.price) {
    cardNode.querySelector(`.popup__text--price`).classList.remove(`hidden`);
    cardNode.querySelector(`.popup__text--price`).textContent = `${new Intl.NumberFormat(`ru-RU`).format(dataObject.offer.price)} ₽/ночь`;
  }
  if (dataObject.offer.type.length) {
    cardNode.querySelector(`.popup__type`).classList.remove(`hidden`);
    cardNode.querySelector(`.popup__type`).textContent = HOUSE_TYPES[dataObject.offer.type];
  }
  cardNode.querySelector(`.popup__text--capacity`).textContent = `${dataObject.offer.rooms} ${window.util.getDeclension(dataObject.offer.rooms, [`комната`, `комнаты`, `комнат`])} ${dataObject.offer.guests > 0 ? `для ${dataObject.offer.guests} ${window.util.getDeclension(dataObject.offer.guests, [`гостя`, `гостей`, `гостей`])}` : `не для гостей`}`;
  cardNode.querySelector(`.popup__text--time`).textContent = `Заезд после ${dataObject.offer.checkin}, выезд до ${dataObject.offer.checkout} `;

  if (dataObject.offer.description.length) {
    cardNode.querySelector(`.popup__description`).classList.remove(`hidden`);
    cardNode.querySelector(`.popup__description`).textContent = dataObject.offer.description;
  }
  if (dataObject.author.avatar.length) {
    cardNode.querySelector(`.popup__avatar`).classList.remove(`hidden`);
    cardNode.querySelector(`.popup__avatar`).src = dataObject.author.avatar;
  }
  if (dataObject.offer.features.length) {
    cardNode.querySelector(`.popup__features`).classList.remove(`hidden`);
    const featureNodes = cardNode.querySelectorAll(`.popup__feature`);
    for (let i = 0; i < featureNodes.length; i++) {
      for (let j = 0; j < dataObject.offer.features.length; j++) {
        if (featureNodes[i].classList.contains(FEATURES_CLASS_MAP[dataObject.offer.features[j]])) {
          featureNodes[i].classList.remove(`hidden`);
          break;
        }
      }
    }
  }
  if (dataObject.offer.photos.length) {
    cardNode.querySelector(`.popup__photos`).classList.remove(`hidden`);
    let photoNode = cardNode.querySelector(`.popup__photo`);
    photoNode.src = dataObject.offer.photos[0];
    if (dataObject.offer.photos.length > 1) {
      const fragment = document.createDocumentFragment();
      for (let i = 1; i < dataObject.offer.photos.length; i++) {
        fragment.appendChild(photoNode.cloneNode(true)).src = dataObject.offer.photos[i];
      }
      photoNode.parentElement.appendChild(fragment);
    }
  }

  return cardNode;
};

const createСardFragment = (cardObj) => {
  const fragment = document.createDocumentFragment();
  fragment.appendChild(createCard(cardObj));
  return fragment;
};

const addCardNode = (array) => {
  let pinsArr = window.pin.mapPinsNode.querySelectorAll(`.map__pin:not(.map__pin--main)`);
  pinsArr.forEach((element, index) => {
    element.addEventListener(`click`, () => {
      window.map.removeActiveCard();
      const cardNodesFragment = createСardFragment(array[index]);
      cardNodesFragment.querySelector(`.popup__close`).addEventListener(`click`, window.map.removeActiveCard);
      document.addEventListener(`keydown`, window.util.onPopupEscPress);
      window.pin.mapNode.insertBefore(cardNodesFragment, window.activate.mapFiltersNode);
    });
  });
};

window.card = {
  createСardFragment,
  addCardNode
};

})();

(() => {
/*!********************!*\
  !*** ./js/move.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const MainPinSize = {
  circle: {
    WIDTH: 62,
    HEIGHT: 62
  },
  pin: {
    WIDTH: 62,
    HEIGHT: 84
  }
};

const Coordinates = {
  Y: {
    MAX: 630,
    MIN: 130
  },
  X: {
    MAX: window.pin.mapNode.offsetWidth - (MainPinSize.pin.WIDTH / 2),
    MIN: -(MainPinSize.pin.WIDTH / 2)
  }
};

window.map.mapPinMain.addEventListener(`mousedown`, (evt) => {
  if (evt.button === window.util.MouseButtons.MAIN) {
    evt.preventDefault();

    let StartCoords = {
      X: evt.clientX,
      Y: evt.clientY
    };

    const onMouseMove = (moveEvt) => {
      moveEvt.preventDefault();

      const Shift = {
        X: StartCoords.X - moveEvt.clientX,
        Y: StartCoords.Y - moveEvt.clientY
      };

      const CoordinatesMainPin = {
        X: window.map.mapPinMain.offsetLeft - Shift.X,
        Y: window.map.mapPinMain.offsetTop - Shift.Y
      };

      StartCoords = {
        X: moveEvt.clientX,
        Y: moveEvt.clientY
      };

      if (CoordinatesMainPin.X >= Coordinates.X.MIN && CoordinatesMainPin.X <= Coordinates.X.MAX) {
        window.map.mapPinMain.style.left = `${CoordinatesMainPin.X}px`;
      }

      if (CoordinatesMainPin.Y >= Coordinates.Y.MIN && CoordinatesMainPin.Y <= Coordinates.Y.MAX) {
        window.map.mapPinMain.style.top = `${CoordinatesMainPin.Y}px`;
      }

      window.form.passAddressInput(MainPinSize.pin.WIDTH, MainPinSize.pin.HEIGHT);
    };

    const onMouseUp = (upEvt) => {
      upEvt.preventDefault();

      window.pin.mapNode.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    };

    window.pin.mapNode.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  }
});

window.move = {
  MainPinSize
};

})();

(() => {
/*!**********************!*\
  !*** ./js/images.js ***!
  \**********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];

const avatarImageChooserNode = window.form.formNode.querySelector(`.ad-form-header__input`);
const roomImageChooserNode = window.form.formNode.querySelector(`.ad-form__input`);

const addImage = (imageChooserInput, previewImageNode) => {
  const image = imageChooserInput.files[0];
  const imageName = image.name.toLowerCase();

  const matches = FILE_TYPES.some(function (it) {
    return imageName.endsWith(it);
  });

  if (matches) {
    let reader = new FileReader();

    reader.addEventListener(`load`, () => {
      previewImageNode.classList.remove(`hidden`);
      previewImageNode.src = reader.result;
    });

    reader.readAsDataURL(image);
  }
};

avatarImageChooserNode.addEventListener(`change`, () => {
  addImage(avatarImageChooserNode, window.reset.previewAvatarNode);
});

roomImageChooserNode.addEventListener(`change`, () => {
  addImage(roomImageChooserNode, window.reset.previewRoomNode);
});


})();

(() => {
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


window.activate.toggleDisabledOnFormNodes();
window.form.passAddressInput(window.move.MainPinSize.circle.WIDTH, window.move.MainPinSize.circle.HEIGHT);
window.map.mapPinMain.addEventListener(`mousedown`, window.activate.onPinMainMousedownPress, {
  once: true
});
window.map.mapPinMain.addEventListener(`keydown`, window.activate.onPinMainEnterPress, {
  once: true
});

})();

/******/ })()
;
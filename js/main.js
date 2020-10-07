"use strict";

const TITLES = [
  `Дворец из коробки`,
  `Квартира без окон`,
  `Квартирка с видом на автобусную остановку`,
  `Бунгало у фонтана`,
  `Дом трехэтажный с бассейном`,
  `Просторный гараж`
];
const DESCRIPTIONS = [
  `Великолепный таун-хауз в центре Токио. Подходит как туристам, так и бизнесменам. Дом полностью укомплектован и имеет свежий ремонт.`,
  `Маленькая чистая квратира на краю парка. Без интернета, регистрации и СМС.`,
  `Замечательный дворец в старинном центре города. Только для тех кто может себе позволить дворец. Лакеев и прочих жокеев просим не беспокоить.`
];
const FEATURES_CLASS_MAP = {
  wifi: `popup__feature--wifi`,
  dishwasher: `popup__feature--dishwasher`,
  parking: `popup__feature--parking`,
  washer: `popup__feature--washer`,
  elevator: `popup__feature--elevator`,
  conditioner: `popup__feature--conditioner`
};
const CHECKINS = [
  `12:00`,
  `13:00`,
  `14:00`
];
const CHECKOUTS = [
  `12:00`,
  `13:00`,
  `14:00`
];
const ROOMS_AMOUNT = [
  1,
  2,
  3,
  100
];
const GUESTS_AMOUNT = [
  3,
  2,
  1,
  0
];
const PHOTO_URLS = [
  `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
];
const HOUSE_TYPES = {
  flat: `Квартира`,
  bungalow: `Бунгало`,
  palace: `Замок`,
  house: `Дом`
};
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
const MAX_PRICE = 1000000;
const PINS_AMOUNT = 8;


const Price = {
  MAX: 10000,
  MIN: 1000
};
const PinSize = {
  WIDTH: 50,
  HEIGHT: 70
};
const MainPinSize = {
  WIDTH: 62,
  HEIGHT: 72
};
const KeyboardKeys = {
  ESCAPE: `Escape`,
  ENTER: `Enter`
};
const TitleLength = {
  MIN: 30,
  MAX: 100
};

const mapNode = document.querySelector(`.map`);
const mapPinsNode = mapNode.querySelector(`.map__pins`);
const mapPinMain = mapNode.querySelector(`.map__pin--main`);
const mapFiltersNode = mapNode.querySelector(`.map__filters-container`);
const formFiltersNode = mapFiltersNode.querySelector(`.map__filters`);
const mapPinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const mapCardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
const formNode = document.querySelector(`.ad-form`);
const formSubmit = formNode.querySelector(`.ad-form__submit`);

const Coordinates = {
  Y: {
    MAX: 630 - PinSize.HEIGHT,
    MIN: 130
  },
  X: {
    MAX: mapPinsNode.offsetWidth - (PinSize.WIDTH / 2),
    MIN: -(PinSize.WIDTH / 2)
  }
};

const getRandomArrElement = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getDeclension = (number, titles) => {
  const cases = [2, 0, 1, 1, 1, 2];
  return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
};

const getMainMapPinCoordinateX = () => {
  return parseInt(mapPinMain.style.left, 10) + (MainPinSize.WIDTH / 2);
};

const getMainMapPinCoordinateY = () => {
  return parseInt(mapPinMain.style.top, 10) + (MainPinSize.HEIGHT);
};

const getRandomLenghtArr = (array) => {
  return array.slice(0, getRandomInt(0, array.length));
};

const createDataArray = (amount) => {
  const array = [];
  for (let i = 0; i < amount; i++) {
    array.push({
      author: {
        avatar: `img/avatars/user0${i + 1}.png`
      },
      location: {
        x: getRandomInt(Coordinates.X.MIN, Coordinates.X.MAX),
        y: getRandomInt(Coordinates.Y.MIN, Coordinates.Y.MAX)
      },
      offer: {
        title: getRandomArrElement(TITLES),
        address: `${getRandomInt(Coordinates.X.MIN, Coordinates.X.MAX)}, ${getRandomInt(Coordinates.Y.MIN, Coordinates.Y.MAX)}`,
        price: getRandomInt(Price.MIN, Price.MAX),
        type: getRandomArrElement(Object.keys(HOUSE_TYPES)),
        rooms: getRandomArrElement(ROOMS_AMOUNT),
        guests: getRandomArrElement(GUESTS_AMOUNT),
        checkin: getRandomArrElement(CHECKINS),
        checkout: getRandomArrElement(CHECKOUTS),
        features: getRandomLenghtArr(Object.keys(FEATURES_CLASS_MAP)),
        description: getRandomArrElement(DESCRIPTIONS),
        photos: getRandomLenghtArr(PHOTO_URLS)
      }
    });
  }
  return array;
};

const createPin = (obj) => {
  const pinElement = mapPinTemplate.cloneNode(true);
  pinElement.style.left = `${obj.location.x}px`;
  pinElement.style.top = `${obj.location.y}px`;
  pinElement.querySelector(`img`).src = obj.author.avatar;
  pinElement.querySelector(`img`).alt = obj.offer.title;

  return pinElement;
};

const createCard = (dataObject) => {
  const cardElement = mapCardTemplate.cloneNode(true);
  if (dataObject.offer.title.length) {
    cardElement.querySelector(`.popup__title`).classList.remove(`hidden`);
    cardElement.querySelector(`.popup__title`).textContent = dataObject.offer.title;
  }
  if (dataObject.offer.address.length) {
    cardElement.querySelector(`.popup__text--address`).classList.remove(`hidden`);
    cardElement.querySelector(`.popup__text--address`).textContent = dataObject.offer.address;
  }
  if (dataObject.offer.price) {
    cardElement.querySelector(`.popup__text--price`).classList.remove(`hidden`);
    cardElement.querySelector(`.popup__text--price`).textContent = `${new Intl.NumberFormat(`ru-RU`).format(dataObject.offer.price)} ₽/ночь`;
  }
  if (dataObject.offer.type.length) {
    cardElement.querySelector(`.popup__type`).classList.remove(`hidden`);
    cardElement.querySelector(`.popup__type`).textContent = HOUSE_TYPES[dataObject.offer.type];
  }
  cardElement.querySelector(`.popup__text--capacity`).textContent = `${dataObject.offer.rooms} ${getDeclension(dataObject.offer.rooms, [`комната`, `комнаты`, `комнат`])} ${dataObject.offer.guests > 0 ? `для ${dataObject.offer.guests} ${getDeclension(dataObject.offer.guests, [`гостя`, `гостей`, `гостей`])}` : `не для гостей`}`;
  cardElement.querySelector(`.popup__text--time`).textContent = `Заезд после ${dataObject.offer.checkin}, выезд до ${dataObject.offer.checkout} `;

  if (dataObject.offer.description.length) {
    cardElement.querySelector(`.popup__description`).classList.remove(`hidden`);
    cardElement.querySelector(`.popup__description`).textContent = dataObject.offer.description;
  }
  if (dataObject.author.avatar.length) {
    cardElement.querySelector(`.popup__avatar`).classList.remove(`hidden`);
    cardElement.querySelector(`.popup__avatar`).src = dataObject.author.avatar;
  }
  if (dataObject.offer.features.length) {
    cardElement.querySelector(`.popup__features`).classList.remove(`hidden`);
    const featureNodes = cardElement.querySelectorAll(`.popup__feature`);
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
    cardElement.querySelector(`.popup__photos`).classList.remove(`hidden`);
    let photoNode = cardElement.querySelector(`.popup__photo`);
    photoNode.src = dataObject.offer.photos[0];
    if (dataObject.offer.photos.length > 1) {
      const fragment = document.createDocumentFragment();
      for (let i = 1; i < dataObject.offer.photos.length; i++) {
        fragment.appendChild(photoNode.cloneNode(true)).src = dataObject.offer.photos[i];
      }
      photoNode.parentElement.appendChild(fragment);
    }
  }

  return cardElement;
};

const createPinsNodeFragment = (pinsArr) => {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < pinsArr.length; i++) {
    fragment.appendChild(createPin(pinsArr[i]));
  }

  return fragment;
};

const createСardFragment = (cardObj) => {
  const fragment = document.createDocumentFragment();
  fragment.appendChild(createCard(cardObj));
  return fragment;
};

const pinsDataArray = createDataArray(PINS_AMOUNT);

const initPinsScreen = () => {
  const pinsNodesFragment = createPinsNodeFragment(pinsDataArray);
  mapPinsNode.appendChild(pinsNodesFragment);
};

const validateCheckInInput = () => {
  if (formNode.timein.value) {
    formNode.timeout.value = formNode.timein.value;
  }
};

const validateCheckOutInput = () => {
  if (formNode.timeout.value) {
    formNode.timein.value = formNode.timeout.value;
  }
};

const validateRoomsInput = () => {
  formNode.capacity.setCustomValidity(ROOMS_FOR_GUESTS_MAP[formNode.rooms.value].includes(formNode.capacity.value) ? `` : `Вы не можете выбрать данное количество гостей`);
  formNode.capacity.reportValidity();
};

const validatePriceInput = () => {
  if (formNode.price.value > MAX_PRICE) {
    formNode.price.setCustomValidity(`Вы превысили масимальную цену за номер на ${new Intl.NumberFormat(`ru-RU`).format(formNode.price.value - MAX_PRICE)} руб.`);
  } else {
    formNode.price.setCustomValidity(formNode.price.value >= MIN_PRICE[formNode.type.value] ? `` : `Минимальцая цена за номер ${new Intl.NumberFormat(`ru-RU`).format(MIN_PRICE[formNode.type.value])} руб.`);
  }

  formNode.price.reportValidity();
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

const passAddressInput = () => {
  formNode.address.value = `${getMainMapPinCoordinateX()}, ${getMainMapPinCoordinateY()}`;
};

let mapPins;

const getPins = () => {
  mapPins = mapPinsNode.querySelectorAll(`.map__pin`);

  return mapPins;
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
  mapNode.classList.remove(`map--faded`);
  formNode.classList.remove(`ad-form--disabled`);
  toggleDisabledOnFormNodes();
};

toggleDisabledOnFormNodes();

let cardNode;

const closeCard = () => {
  cardNode.parentNode.removeChild(cardNode);
  document.removeEventListener(`keydown`, onPopupEscPress);
};

const onPopupEscPress = function (evt) {
  if (evt.key === KeyboardKeys.ESCAPE) {
    evt.preventDefault();
    closeCard();
  }
};

mapPinMain.addEventListener(`click`, function () {
  onActiveMode();
  initPinsScreen();
  passAddressInput();
  getPins();

  let pinsArr = Array.from(mapPins);
  pinsArr.shift();

  pinsArr.forEach((element, index) => {
    element.addEventListener(`click`, () => {
      cardNode = mapNode.querySelector(`.map__card`);
      if (cardNode) {
        closeCard();
      }
      const cardNodesFragment = createСardFragment(pinsDataArray[index]);
      mapNode.insertBefore(cardNodesFragment, mapFiltersNode);
      cardNode = mapNode.querySelector(`.map__card`);
      const closeButton = cardNode.querySelector(`.popup__close`);
      closeButton.addEventListener(`click`, closeCard);
      document.addEventListener(`keydown`, onPopupEscPress);
    });
  });
}, {
  once: true
});

formNode.capacity.addEventListener(`input`, validateRoomsInput);
formNode.rooms.addEventListener(`input`, validateRoomsInput);
formNode.title.addEventListener(`input`, validateTitleInput);
formNode.price.addEventListener(`input`, validatePriceInput);
formNode.timein.addEventListener(`input`, validateCheckInInput);
formNode.timeout.addEventListener(`input`, validateCheckOutInput);
formSubmit.addEventListener(`click`, validateRoomsInput);

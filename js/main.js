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
const PINS_AMOUNT = 8;

const Price = {
  MAX: 10000,
  MIN: 1000
};
const PinSize = {
  WIDTH: 50,
  HEIGHT: 70
};

const mapNode = document.querySelector(`.map`);
const mapPinsNode = mapNode.querySelector(`.map__pins`);
const mapFiltersNode = mapNode.querySelector(`.map__filters-container`);
const mapPinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const mapCardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);

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

const activeModeOn = (element) => {
  element.classList.remove(`map--faded`);
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

const getRandomValuesArr = (array) => {
  return array.slice(0, (Math.floor(Math.random() * array.length)));
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
        features: getRandomValuesArr(Object.keys(FEATURES_CLASS_MAP)),
        description: getRandomArrElement(DESCRIPTIONS),
        photos: getRandomValuesArr(PHOTO_URLS)
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
  if (dataObject.offer.price.length) {
    cardElement.querySelector(`.popup__text--price`).classList.remove(`hidden`);
    cardElement.querySelector(`.popup__text--price`).textContent = `${dataObject.offer.price} ₽/ночь`;
  }
  if (dataObject.offer.price.length) {
    cardElement.querySelector(`.popup__text--price`).classList.remove(`hidden`);
    cardElement.querySelector(`.popup__text--price`).textContent = `${dataObject.offer.price} ₽/ночь`;
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

const initPinsScreen = () => {
  const pinsDataArray = createDataArray(PINS_AMOUNT);
  const pinsNodesFragment = createPinsNodeFragment(pinsDataArray);
  const cardNodesFragment = createСardFragment(pinsDataArray[0]);

  mapNode.insertBefore(cardNodesFragment, mapFiltersNode);
  mapPinsNode.appendChild(pinsNodesFragment);
  activeModeOn(mapNode);
};

initPinsScreen();

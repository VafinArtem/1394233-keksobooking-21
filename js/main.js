"use strict";

const TITLES = [
  `Дворец из коробки`,
  `Квартира без окон`,
  `Квартирка с видом на автобусную остановку`,
  `Бунгало у фонтана`,
  `Дом трехэтажный с бассейном`,
  `Просторный гараж`
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
const Coordinate = {
  MAX: 630,
  MIN: 130
};

const mapNode = document.querySelector(`.map`);
const mapPinsNode = mapNode.querySelector(`.map__pins`);
const mapFiltersNode = mapNode.querySelector(`.map__filters-container`);
const mapPinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const mapCardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);

const activeModeOn = (element) => {
  element.classList.remove(`map--faded`);
};

const getRandomData = (arrayName) => {
  return arrayName[Math.floor(Math.random() * arrayName.length)];
};

const getRandomInRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getDeclension = (number, titles) => {
  const cases = [2, 0, 1, 1, 1, 2];
  return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
};

const createDataArray = (amount) => {
  const array = [];
  for (let i = 0; i < amount; i++) {
    array.push({
      author: {
        avatar: `img/avatars/user0${i + 1}.png`
      },
      location: {
        x: getRandomInRange(Coordinate.MIN, Coordinate.MAX),
        y: getRandomInRange(Coordinate.MIN, Coordinate.MAX)
      },
      offer: {
        title: getRandomData(TITLES),
        address: `${getRandomInRange(Coordinate.MIN, Coordinate.MAX)}, ${getRandomInRange(Coordinate.MIN, Coordinate.MAX)}`,
        price: getRandomInRange(Price.MIN, Price.MAX),
        type: getRandomData(Object.keys(HOUSE_TYPES)),
        rooms: getRandomData(ROOMS_AMOUNT),
        guests: getRandomData(GUESTS_AMOUNT),
        checkin: getRandomData(CHECKINS),
        checkout: getRandomData(CHECKOUTS),
        features: Object.keys(FEATURES_CLASS_MAP),
        description: ``,
        photos: PHOTO_URLS
      }
    });
  }
  return array;
};

const createPin = (array) => {
  const pinElement = mapPinTemplate.cloneNode(true);
  pinElement.style.left = `${array.location.x - 25}px`;
  pinElement.style.top = `${array.location.y - 35}px`;
  pinElement.querySelector(`img`).src = array.author.avatar;
  pinElement.querySelector(`img`).alt = array.offer.title;

  return pinElement;
};

const createCard = (object) => {
  const cardElement = mapCardTemplate.cloneNode(true);
  if (object.offer.title.length) {
    cardElement.querySelector(`.popup__title`).classList.remove(`hidden`);
    cardElement.querySelector(`.popup__title`).textContent = object.offer.title;
  }
  if (object.offer.address.length) {
    cardElement.querySelector(`.popup__text--address`).classList.remove(`hidden`);
    cardElement.querySelector(`.popup__text--address`).textContent = object.offer.title;
  }
  if (object.offer.price.length) {
    cardElement.querySelector(`.popup__text--price`).classList.remove(`hidden`);
    cardElement.querySelector(`.popup__text--price`).textContent = `${object.offer.price} ₽/ночь`;
  }
  if (object.offer.price.length) {
    cardElement.querySelector(`.popup__text--price`).classList.remove(`hidden`);
    cardElement.querySelector(`.popup__text--price`).textContent = `${object.offer.price} ₽/ночь`;
  }
  if (object.offer.type.length) {
    cardElement.querySelector(`.popup__type`).classList.remove(`hidden`);
    cardElement.querySelector(`.popup__type`).textContent = HOUSE_TYPES[object.offer.type];
  }
  cardElement.querySelector(`.popup__text--capacity`).textContent = `${object.offer.rooms} ${getDeclension(object.offer.rooms, [`комната`, `комнаты`, `комнат`])} для ${object.offer.guests} ${getDeclension(object.offer.guests, [`гостя`, `гостей`, `гостей`])}`;
  cardElement.querySelector(`.popup__text--time`).textContent = `Заезд после ${object.offer.checkin}, выезд до ${object.offer.checkout}`;

  if (object.offer.description.length) {
    cardElement.querySelector(`.popup__description`).classList.remove(`hidden`);
    cardElement.querySelector(`.popup__description`).textContent = object.offer.description;
  }
  if (object.author.avatar.length) {
    cardElement.querySelector(`.popup__avatar`).classList.remove(`hidden`);
    cardElement.querySelector(`.popup__avatar`).src = object.author.avatar;
  }
  if (object.offer.features.length) {
    cardElement.querySelector(`.popup__features`).classList.remove(`hidden`);
    const featureNodes = cardElement.querySelectorAll(`.popup__feature`);
    for (let i = 0; i < featureNodes.length; i++) {
      for (let j = 0; j < object.offer.features.length; j++) {
        if (featureNodes[i].classList.contains(FEATURES_CLASS_MAP[object.offer.features[j]])) {
          featureNodes[i].classList.remove(`hidden`);
          break;
        }
      }
    }
  }
  if (object.offer.photos.length) {
    cardElement.querySelector(`.popup__photos`).classList.remove(`hidden`);
    let photoNode = cardElement.querySelector(`.popup__photo`);
    photoNode.src = object.offer.photos[0];
    if (object.offer.photos.length > 1) {
      const fragment = document.createDocumentFragment();
      for (let i = 1; i < object.offer.photos.length; i++) {
        fragment.appendChild(photoNode.cloneNode(true)).src = object.offer.photos[i];
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

const addNodeFragment = (element) => {
  mapPinsNode.appendChild(element);
};

const addCardFragment = (element) => {
  mapNode.insertBefore(element, mapFiltersNode);
};

const initPinsScreen = () => {
  const pinsDataArray = createDataArray(PINS_AMOUNT);
  const pinsNodesFragment = createPinsNodeFragment(pinsDataArray);
  const cardNodesFragnment = createСardFragment(pinsDataArray[0]);

  addCardFragment(cardNodesFragnment);
  addNodeFragment(pinsNodesFragment);
  activeModeOn(mapNode);
};

initPinsScreen();

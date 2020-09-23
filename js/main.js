"use strict";

const TITLES = [
  `Дворец из коробки`,
  `Квартира без окон`,
  `Квартирка с видом на автобусную остановку`,
  `Бунгало у фонтана`,
  `Дом трехэтажный с бассейном`,
  `Просторный гараж`
];
const HOUSES_TYPES = [
  `palace`,
  `flat`,
  `house`,
  `bungalow`
];
const FEATURES = [
  `wifi`,
  `dishwasher`,
  `parking`,
  `washer`,
  `elevator`,
  `conditioner`
];
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
const PHOTOS_URLS = [
  `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
];

const PIN_AMOUNT = 8;

const MAX_COORDINATE = 630;
const MIN_COORDINATE = 130;
const MAX_PRICE = 10000;
const MIN_PRICE = 1000;
const MAX_AMOUNT_USERS = 8;
const MIN_AMOUNT_USERS = 1;

const mapNode = document.querySelector(`.map`);
const mapPinsNode = mapNode.querySelector(`.map__pins`);
const mapPinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

const activeModeOn = function (element) {
  element.classList.remove(`map--faded`);
};

const getRandomData = function (arrayName) {
  return arrayName[Math.floor(Math.random() * arrayName.length)];
};

const getRandomInRange = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const createDataArray = function (amount) {
  const array = [];
  for (let i = 0; i < amount; i++) {
    array.push(
        {
          author: {
            avatar: `img/avatars/user0${getRandomInRange(MIN_AMOUNT_USERS, MAX_AMOUNT_USERS)}.png`
          },
          location: {
            x: getRandomInRange(MIN_COORDINATE, MAX_COORDINATE),
            y: getRandomInRange(MIN_COORDINATE, MAX_COORDINATE)
          },
          offer: {
            title: getRandomData(TITLES),
            address: `${getRandomInRange(MIN_COORDINATE, MAX_COORDINATE)}, ${getRandomInRange(MIN_COORDINATE, MAX_COORDINATE)}`,
            price: getRandomInRange(MIN_PRICE, MAX_PRICE),
            type: getRandomData(HOUSES_TYPES),
            rooms: getRandomData(ROOMS_AMOUNT),
            guests: getRandomData(GUESTS_AMOUNT),
            checkin: getRandomData(CHECKINS),
            checkout: getRandomData(CHECKOUTS),
            features: getRandomData(FEATURES),
            description: ` `,
            photos: getRandomData(PHOTOS_URLS)
          }
        }
    );
  }
  return array;
};

const createPin = function (array) {
  const pinElement = mapPinTemplate.cloneNode(true);
  pinElement.style.left = `${array.location.x + 25}px`;
  pinElement.style.top = `${array.location.y + 35}px`;
  pinElement.querySelector(`img`).src = array.author.avatar;
  pinElement.querySelector(`img`).alt = array.offer.title;

  return pinElement;
};

const createNodeFragment = function (pin) {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < pin.length; i++) {
    fragment.appendChild(createPin(pin[i]));
  }

  return fragment;
};

const addNodeFragment = function (element) {
  mapPinsNode.appendChild(element);
};

const initPinsScreen = function () {
  const pinsDataArray = createDataArray(PIN_AMOUNT);
  const pinsNodesFragment = createNodeFragment(pinsDataArray);

  addNodeFragment(pinsNodesFragment);

  activeModeOn(mapNode);
};

initPinsScreen();

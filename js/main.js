"use strict";

const TITLES = [
  `Дворец из коробки`,
  `Квартира без окон`,
  `Квартирка с видом на автобусную остановку`,
  `Бунгало у фонтана`,
  `Дом трехэтажный с бассейном`,
  `Просторный гараж`
];
const HOUSE_TYPES = [
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
const PHOTO_URLS = [
  `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
];
const USERS_AMOUNT = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8
];
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
const cardPhotoTemplate = document.querySelector(`#card`).content.querySelector(`.popup__photo`);

const activeModeOn = (element) => {
  element.classList.remove(`map--faded`);
};

const getRandomData = (arrayName) => {
  return arrayName[Math.floor(Math.random() * arrayName.length)];
};

const getRandomInRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const shuffleArray = (array) => {
  let a = array.slice();
  a.sort(() => Math.random() - 0.5);
  return a;
};

const delChild = (parent, child) => {
  parent.removeChild(child);
};

const disableNode = (node, childTag) => {
  if (!node.contains(node.querySelector(childTag))) {
    node.style = `display: none`;
  }
};

const disableTextElement = (parent, typeTextElement) => {
  const childs = parent.querySelectorAll(typeTextElement);
  for (let i = 0; i < childs.length; i++) {
    if (childs[i].textContent === ``) {
      childs[i].style = `display:none`;
    }
  }
};

const createDataArray = (amount) => {
  const array = [];
  const numbersArray = shuffleArray(USERS_AMOUNT);
  for (let i = 0; i < amount; i++) {
    array.push({
      author: {
        avatar: `img/avatars/user0${numbersArray[i]}.png`
      },
      location: {
        x: getRandomInRange(Coordinate.MIN, Coordinate.MAX),
        y: getRandomInRange(Coordinate.MIN, Coordinate.MAX)
      },
      offer: {
        title: getRandomData(TITLES),
        address: `${getRandomInRange(Coordinate.MIN, Coordinate.MAX)}, ${getRandomInRange(Coordinate.MIN, Coordinate.MAX)}`,
        price: getRandomInRange(Price.MIN, Price.MAX),
        type: getRandomData(HOUSE_TYPES),
        rooms: getRandomData(ROOMS_AMOUNT),
        guests: getRandomData(GUESTS_AMOUNT),
        checkin: getRandomData(CHECKINS),
        checkout: getRandomData(CHECKOUTS),
        features: FEATURES,
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

const translateHouseType = (objectValue) => {
  switch (objectValue) {
    case `flat`:
      objectValue = `Квартира`;
      break;
    case `bungalow`:
      objectValue = `Бунгало`;
      break;
    case `house`:
      objectValue = `Дом`;
      break;
    case `palace`:
      objectValue = `Дворец`;
      break;
  }

  return objectValue;
};

const createPhotosElements = (photosArr, source) => {
  for (let i = 0; i < photosArr.length; i++) {
    const photoElement = cardPhotoTemplate.cloneNode(true);
    photoElement.src = photosArr[i];
    source.appendChild(photoElement);
  }
  return source;
};

const createFeaturesElements = (featuresArr) => {
  const mapCardNode = mapCardTemplate.cloneNode(true);
  const featuresNode = mapCardNode.querySelector(`.popup__features`);
  const featuresElement = featuresNode.querySelectorAll(`.popup__feature`);

  if (featuresArr.length === 0) {
    for (let featureElement of featuresElement) {
      delChild(featuresNode, featureElement);
    }
  } else {
    for (let i = 0; i < featuresArr.length; i++) {
      if (!featuresArr.includes(`wifi`)) {
        featuresNode.querySelector(`.popup__feature--wifi`).style = `display: none`;
      }
      if (!featuresArr.includes(`dishwasher`)) {
        featuresNode.querySelector(`.popup__feature--dishwasher`).style = `display: none`;
      }
      if (!featuresArr.includes(`parking`)) {
        featuresNode.querySelector(`.popup__feature--parking`).style = `display: none`;
      }
      if (!featuresArr.includes(`washer`)) {
        featuresNode.querySelector(`.popup__feature--washer`).style = `display: none`;
      }
      if (!featuresArr.includes(`elevator`)) {
        featuresNode.querySelector(`.popup__feature--elevator`).style = `display: none`;
      }
      if (!featuresArr.includes(`conditioner`)) {
        featuresNode.querySelector(`.popup__feature--conditioner`).style = `display: none`;
      }
    }
  }

  return featuresNode;
};

const createCard = (object) => {
  const cardElement = mapCardTemplate.cloneNode(true);
  const photoSource = cardElement.querySelector(`.popup__photos`);
  const photoImg = photoSource.querySelector(`.popup__photo`);
  const featuresSource = cardElement.querySelector(`.popup__features`);
  delChild(cardElement, featuresSource);
  delChild(photoSource, photoImg);
  cardElement.querySelector(`.popup__title`).textContent = object.offer.title;
  cardElement.querySelector(`.popup__text--address`).textContent = object.offer.address;
  cardElement.querySelector(`.popup__text--price`).textContent = `${object.offer.price} ₽/ночь`;
  cardElement.querySelector(`.popup__type`).textContent = translateHouseType(object.offer.type);
  cardElement.querySelector(`.popup__text--capacity`).textContent = `${object.offer.rooms} комнаты для ${object.offer.guests} гостей`;
  cardElement.querySelector(`.popup__text--time`).textContent = `Заезд после ${object.offer.checkin}, выезд до ${object.offer.checkout}`;
  cardElement.querySelector(`.popup__description`).textContent = object.offer.description;
  cardElement.querySelector(`.popup__avatar`).src = object.author.avatar;
  const featuresNode = cardElement.insertBefore(createFeaturesElements(object.offer.features), cardElement.querySelector(`.popup__description`));
  const photosNode = cardElement.appendChild(createPhotosElements(object.offer.photos, photoSource));
  disableNode(featuresNode, `li`);
  disableNode(photosNode, `img`);
  disableTextElement(cardElement, `p`);
  disableTextElement(cardElement, `h3`);
  disableTextElement(cardElement, `h4`);

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

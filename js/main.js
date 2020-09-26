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

const PINS_AMOUNT = 8;

const Price = {
  MAX: 10000,
  MIN: 1000
};
const Coordinate = {
  MAX: 630,
  MIN: 130
};
const AmountUsers = {
  MAX: 8,
  MIN: 1
};

const mapNode = document.querySelector(`.map`);
const mapPinsNode = mapNode.querySelector(`.map__pins`);
const mapFiltersNode = mapNode.querySelector(`.map__filters-container`);
const mapPinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const mapCardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
const cardPhotoTemplate = document.querySelector(`#card`).content.querySelector(`.popup__photo`);
const cardFeaturesTemplate = document.querySelector(`#card`).content.querySelector(`.popup__features`);


// 1. Отрисуйте сгенерированные DOM-элементы в блок .map__pins. Для вставки элементов используйте DocumentFragment.

// 2. На основе первого по порядку элемента из сгенерированного массива и шаблона #card создайте DOM-элемент объявления (карточка объявления), заполните его данными из объекта:

// Выведите заголовок объявления offer.title в заголовок .popup__title.
// Выведите адрес offer.address в блок .popup__text--address.
// Выведите цену offer.price в блок .popup__text--price строкой вида {{offer.price}}₽/ночь. Например, 5200₽/ночь.
// В блок .popup__type выведите тип жилья offer.type: Квартира для flat, Бунгало для bungalow, Дом для house, Дворец для palace.
// Выведите количество гостей и комнат offer.rooms и offer.guests в блок .popup__text--capacity строкой вида {{offer.rooms}} комнаты для {{offer.guests}} гостей. Например, 2 комнаты для 3 гостей.
// Время заезда и выезда offer.checkin и offer.checkout в блок .popup__text--time строкой вида Заезд после {{offer.checkin}}, выезд&nbsp;до {{offer.checkout}}. Например, заезд после 14:00, выезд до 12:00.
// В список .popup__features выведите все доступные удобства в объявлении.
// В блок .popup__description выведите описание объекта недвижимости offer.description.
// В блок .popup__photos выведите все фотографии из списка offer.photos. Каждая из строк массива photos должна записываться как src соответствующего изображения.
// Замените src у аватарки пользователя — изображения, которое записано в .popup__avatar — на значения поля author.avatar отрисовываемого объекта.
// Если данных для заполнения не хватает, соответствующий блок в карточке скрывается.

// 3. Вставьте полученный DOM-элемент в блок .map перед блоком.map__filters-container.

const activeModeOn = (element) => {
  element.classList.remove(`map--faded`);
};

const getRandomData = (arrayName) => {
  return arrayName[Math.floor(Math.random() * arrayName.length)];
};

const getRandomInRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const createDataArray = (amount) => {
  const array = [];
  for (let i = 0; i < amount; i++) {
    array.push({
      author: {
        avatar: `img/avatars/user0${getRandomInRange(AmountUsers.MIN, AmountUsers.MAX)}.png`
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

const houseTypeStr = (objectValue) => {
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

// if (objectValue === `flat`) {
//   return `Квартира`;
// } else if (objectValue === `bungalow`) {
//   return `Бунгало`;
// } else if (objectValue === `house`) {
//   return `Дом`;
// } else {
//   return `Дворец`;
// }

const createPhotosElements = (photosArr, source) => {
  for (let i = 0; i < photosArr.length; i++) {
    const photoElement = cardPhotoTemplate.cloneNode(true);
    photoElement.src = photosArr[i];
    source.appendChild(photoElement);
  }
  return source;
};

const delChild = (parent, child) => {
  parent.removeChild(child);
};

const featuresContain = (featuresArr) => {
  const featuresNode = cardFeaturesTemplate.cloneNode(true);
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
  return featuresNode;
};

const createCard = (object) => {
  const cardElement = mapCardTemplate.cloneNode(true);
  const photoSource = cardElement.querySelector(`.popup__photos`);
  const photoImg = photoSource.querySelector(`img`);
  const featuresNode = cardElement.querySelector(`.popup__features`);
  delChild(cardElement, featuresNode);
  delChild(photoSource, photoImg);
  cardElement.querySelector(`.popup__title`).textContent = object.offer.title;
  cardElement.querySelector(`.popup__text--address`).textContent = object.offer.address;
  cardElement.querySelector(`.popup__text--price`).textContent = `${object.offer.price} ₽/ночь`;
  cardElement.querySelector(`.popup__type`).textContent = houseTypeStr(object.offer.type);
  cardElement.querySelector(`.popup__text--capacity`).textContent = `${object.offer.rooms} комнаты для ${object.offer.guests} гостей`;
  cardElement.querySelector(`.popup__text--time`).textContent = `Заезд после ${object.offer.checkin}, выезд до ${object.offer.checkout}`;
  cardElement.insertBefore(featuresContain(object.offer.features), cardElement.querySelector(`.popup__description`));
  cardElement.querySelector(`.popup__description`).textContent = object.offer.description;
  cardElement.appendChild(createPhotosElements(object.offer.photos, photoSource));
  cardElement.querySelector(`.popup__avatar`).src = object.author.avatar;

  return cardElement;
};

const createNodeFragment = (pinsArr) => {
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
  const pinsNodesFragment = createNodeFragment(pinsDataArray);
  const cardNodesFragnment = createСardFragment(pinsDataArray[0]);

  addCardFragment(cardNodesFragnment);
  addNodeFragment(pinsNodesFragment);
  activeModeOn(mapNode);
};

initPinsScreen();

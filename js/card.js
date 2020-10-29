"use strict";

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

const createCardFragment = (cardObj) => {
  const fragment = document.createDocumentFragment();
  fragment.appendChild(createCard(cardObj));
  return fragment;
};

const addCardNode = (array) => {
  let pinsArr = window.pin.mapPinsNode.querySelectorAll(`.map__pin:not(.map__pin--main)`);
  pinsArr.forEach((element, index) => {
    element.addEventListener(`click`, () => {
      window.map.removeActiveCard();
      const cardNodesFragment = createCardFragment(array[index]);
      cardNodesFragment.querySelector(`.popup__close`).addEventListener(`click`, window.map.removeActiveCard);
      document.addEventListener(`keydown`, window.util.onPopupEscPress);
      window.pin.mapNode.insertBefore(cardNodesFragment, window.activate.mapFiltersNode);
    });
  });
};

window.card = {
  addNode: addCardNode
};

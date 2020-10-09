"use strict";

(() => {
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

  const PinSize = {
    WIDTH: 50,
    HEIGHT: 70
  };
  const Price = {
    MAX: 10000,
    MIN: 1000
  };
  const FEATURES_CLASS_MAP = {
    wifi: `popup__feature--wifi`,
    dishwasher: `popup__feature--dishwasher`,
    parking: `popup__feature--parking`,
    washer: `popup__feature--washer`,
    elevator: `popup__feature--elevator`,
    conditioner: `popup__feature--conditioner`
  };
  const Coordinates = {
    Y: {
      MAX: 630 - PinSize.HEIGHT,
      MIN: 130
    },
    X: {
      MAX: window.pin.mapPinsNode.offsetWidth - (PinSize.WIDTH / 2),
      MIN: -(PinSize.WIDTH / 2)
    }
  };

  const createDataArray = (amount) => {
    const array = [];
    for (let i = 0; i < amount; i++) {
      array.push({
        author: {
          avatar: `img/avatars/user0${i + 1}.png`
        },
        location: {
          x: window.util.getRandomInt(Coordinates.X.MIN, Coordinates.X.MAX),
          y: window.util.getRandomInt(Coordinates.Y.MIN, Coordinates.Y.MAX)
        },
        offer: {
          title: window.util.getRandomArrElement(TITLES),
          address: `${window.util.getRandomInt(Coordinates.X.MIN, Coordinates.X.MAX)}, ${window.util.getRandomInt(Coordinates.Y.MIN, Coordinates.Y.MAX)}`,
          price: window.util.getRandomInt(Price.MIN, Price.MAX),
          type: window.util.getRandomArrElement(Object.keys(HOUSE_TYPES)),
          rooms: window.util.getRandomArrElement(ROOMS_AMOUNT),
          guests: window.util.getRandomArrElement(GUESTS_AMOUNT),
          checkin: window.util.getRandomArrElement(CHECKINS),
          checkout: window.util.getRandomArrElement(CHECKOUTS),
          features: window.util.getRandomLenghtArr(Object.keys(FEATURES_CLASS_MAP)),
          description: window.util.getRandomArrElement(DESCRIPTIONS),
          photos: window.util.getRandomLenghtArr(PHOTO_URLS)
        }
      });
    }
    return array;
  };

  window.data = {
    pinsDataArray: createDataArray(PINS_AMOUNT),
  };
})();

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

const mapNode = document.querySelector(`.map`);
const mapPinsNode = mapNode.querySelector(`.map__pins`);
const mapPinTemplate = document.querySelector(`#pin`).content.querySelector(`.map-pin`);

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
            avatar: `img/avatars/user0${Math.floor(Math.random() * 10)}.png`
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
  pinElement.querySelector(`.map__pin`).style.left = `(${array.location.x} + 25)px`;
  pinElement.querySelector(`.map__pin`).style.top = `(${array.location.y} + 35)px`;
  pinElement.querySelector(`.map__pin`).src = array.author.avatar;
  pinElement.querySelector(`.map__pin`).alt = array.offer.title;

  return pinElement;
};

const addElement = function (element) {
  mapPinsNode.appendChild(element);
};

activeModeOn(mapNode);

// 4 Отрисуйте сгенерированные DOM-элементы в блок .map__pins. Для вставки элементов используйте DocumentFragment

// ГОТОВО:
// 1 Напишите функцию для создания массива из 8 сгенерированных JS объектов. Каждый объект массива ‐ описание похожего объявления неподалёку. Структура объектов должна быть следующей:
// {
//     "author": {
//         "avatar": строка, адрес изображения вида img/avatars/user{{xx}}.png, где {{xx}} это число от 1 до 8 с ведущим нулём. Например, 01, 02 и т. д. Адреса изображений не повторяются
//     },
//     "offer": {
//         "title": строка, заголовок предложения ARRAY
//         "address": строка, адрес предложения. Для простоты пусть пока представляет собой запись вида "{{location.x}}, {{location.y}}", например, "600, 350" RANDOM
//         "price": число, стоимость RANDOM
//         "type": строка с одним из четырёх фиксированных значений: palace, flat, house или bungalow ARRAY
//         "rooms": число, количество комнат ARRAY
//         "guests": число, количество гостей, которое можно разместить ARRAY
//         "checkin": строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00, ARRAY
//         "checkout": строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00 ARRAY
//         "features": массив строк случайной длины из ниже предложенных: "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner", ARRAY
//         "description": строка с описанием, ARRAY
//         "photos": массив строк случайной длины, содержащий адреса фотографий "http://o0.github.io/assets/images/tokyo/hotel1.jpg", ARRAY
//                        "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"
//     },
//     "location": {
//         "x": случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка.
//         "y": случайное число, координата y метки на карте от 130 до 630.
//     }
// }
// 2 У блока .map уберите класс .map--faded.
// Это временное решение, этот класс переключает карту из неактивного состояния в активное. В последующих заданиях,
// в соответствии с ТЗ вы будете переключать режимы страницы: неактивный, в котором карта и форма заблокированы и активный режим,
// в котором производится ввод данных и просмотр похожих объявлений. Сейчас для тестирования функции генерации похожих объявлений мы
// временно сымитируем активный режим, а в последующих разделах запрограммируем его полностью.

// 3 На основе данных, созданных в первом пункте, создайте DOM-элементы,
// соответствующие меткам на карте, и заполните их данными из массива.
// Итоговую разметку метки .map__pin можно взять из шаблона #pin.
// У метки укажите:
// Координаты: style="left: {{location.x + смещение по X}}px;
// top: {{location.y + смещение по Y}}px;"
// Обратите внимание. Координаты X и Y, которые вы вставите в разметку,
// это не координаты левого верхнего угла блока метки,
// а координаты, на которые указывает метка своим острым концом. Чтобы найти
// эту координату нужно учесть размеры элемента с меткой.
//     width: 50px; height: 70px;
// У изображения метки укажите:
// Аватар: src="{{author.avatar}}"
// Альтернативный текст: alt="{{заголовок объявления}}"

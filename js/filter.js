"use strict";


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
    window.card.addNode(filteredOffersArray);
  }
};

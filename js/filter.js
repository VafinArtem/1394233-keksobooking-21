"use strict";

const RoomPrice = {
  low: 10000,
  high: 50000
};

const MAX_SIMILLAR_PINS_COUNT = 5;

const FILTER_DEFAULT_VALUE = `any`;

const checkBoxes = Array.from(window.activate.formFiltersNode.features);

const containsValue = (objectValue, filterValue, sourceArray, newArray) => {
  if (window.activate.formFiltersNode[objectValue].value === FILTER_DEFAULT_VALUE) {
    return sourceArray;
  } else {
    return parseInt(newArray.offer[filterValue], 10) === parseInt(window.activate.formFiltersNode[objectValue].value, 10);
  }
};

window.filter = {
  updateSimillarPins: (array) => {

    let simmillarPinsArray = array;

    const filterPinsByType = (pinSimmillar) => {
      if (window.activate.formFiltersNode[`housing-type`].value === FILTER_DEFAULT_VALUE) {
        return simmillarPinsArray;
      } else {
        return pinSimmillar.offer.type === window.activate.formFiltersNode[`housing-type`].value;
      }
    };

    const filterPinsByRooms = (pinSimmillar) => {
      return containsValue(`housing-rooms`, `rooms`, simmillarPinsArray, pinSimmillar);
    };

    const filterPinsByGuests = (pinSimmillar) => {
      return containsValue(`housing-guests`, `guests`, simmillarPinsArray, pinSimmillar);
    };

    const filterPinsByPrice = (pinSimmillar) => {
      switch (window.activate.formFiltersNode[`housing-price`].value) {
        case `low`:
          return pinSimmillar.offer.price < RoomPrice.low;
        case `middle`:
          return pinSimmillar.offer.price >= RoomPrice.low && pinSimmillar.offer.price <= RoomPrice.high;
        case `high`:
          return pinSimmillar.offer.price > RoomPrice.high;
        default:
          return simmillarPinsArray;
      }
    };

    const filterPinsByFeatures = function (pinSimmillar) {
      return !checkBoxes.some(function (element) {
        return element.checked && !pinSimmillar.offer.features.includes(element.value);
      });
    };

    const newArray = simmillarPinsArray.filter(filterPinsByType)
    .filter(filterPinsByRooms)
    .filter(filterPinsByGuests)
    .filter(filterPinsByPrice)
    .filter(filterPinsByPrice)
    .filter(filterPinsByFeatures)
    .slice(0, MAX_SIMILLAR_PINS_COUNT);


    window.map.removeActiveCard();
    window.pin.remove();
    window.map.initPinsScreen(newArray);
    window.card.addCardNode(newArray);
  }
};

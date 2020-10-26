"use strict";

(() => {
  const RoomPrice = {
    low: 10000,
    high: 50000
  };

  const MAX_SIMILLAR_PINS_COUNT = 5;

  const FILTER_DEFAULT_VALUE = `any`;

  const checkBoxes = window.activate.formFiltersNode.features;

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

      simmillarPinsArray = simmillarPinsArray.filter((pinSimmillar) => {
        if (window.activate.formFiltersNode[`housing-type`].value === FILTER_DEFAULT_VALUE) {
          return simmillarPinsArray;
        } else {
          return pinSimmillar.offer.type === window.activate.formFiltersNode[`housing-type`].value;
        }
      });

      simmillarPinsArray = simmillarPinsArray.filter((pinSimmillar) => {
        return containsValue(`housing-rooms`, `rooms`, simmillarPinsArray, pinSimmillar);
      });

      simmillarPinsArray = simmillarPinsArray.filter((pinSimmillar) => {
        return containsValue(`housing-guests`, `guests`, simmillarPinsArray, pinSimmillar);
      });

      simmillarPinsArray = simmillarPinsArray.filter((pinSimmillar) => {
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
      });

      checkBoxes.forEach((element) => {
        if (element.checked) {
          simmillarPinsArray = simmillarPinsArray.filter((pinSimmillar) => {
            return pinSimmillar.offer.features.includes(element.value);
          });
        }
      });

      simmillarPinsArray = simmillarPinsArray.slice(0, MAX_SIMILLAR_PINS_COUNT);

      window.map.removeActiveCard();
      window.pin.remove();
      window.map.initPinsScreen(simmillarPinsArray);
      window.card.addCardNode(simmillarPinsArray);
    }
  };
})();

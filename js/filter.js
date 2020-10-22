"use strict";

(() => {
  const getRank = (pinSimmillar) => {
    let rank = 0;

    const RoomPrice = {
      low: 10000,
      high: 50000
    };

    const checkBoxes = window.activate.formFiltersNode.features;

    const containsValue = (objectValue, filterValue) => {
      if (parseInt(pinSimmillar.offer[objectValue], 10) === parseInt(window.activate.formFiltersNode[filterValue].value, 10)) {
        rank += 2;
      } else if (parseInt(pinSimmillar.offer[objectValue], 10) > parseInt(window.activate.formFiltersNode[filterValue].value, 10) || parseInt(pinSimmillar.offer[objectValue], 10) < parseInt(window.activate.formFiltersNode[filterValue].value, 10)) {
        rank += 1;
      } else if (window.activate.formFiltersNode[`housing-guests`].value === `any`) {
        rank += 0;
      }
    };

    if (pinSimmillar.offer.type === window.activate.formFiltersNode[`housing-type`].value) {
      rank += 4;
    } else if (window.activate.formFiltersNode[`housing-type`].value === `any`) {
      rank += 0;
    }

    if (window.activate.formFiltersNode[`housing-price`].value === `middle` && pinSimmillar.offer.price >= RoomPrice.low && pinSimmillar.offer.price <= RoomPrice.high) {
      rank += 2;
    } else if (window.activate.formFiltersNode[`housing-price`].value === `low` && pinSimmillar.offer.price < RoomPrice.low) {
      rank += 2;
    } else if (window.activate.formFiltersNode[`housing-price`].value === `high` && pinSimmillar.offer.price > RoomPrice.high) {
      rank += 2;
    } else if (window.activate.formFiltersNode[`housing-price`].value === `any`) {
      rank += 0;
    }

    checkBoxes.forEach((element) => {
      if (element.checked && pinSimmillar.offer.features.includes(element.value)) {
        rank += 0.5;
      }
    });

    containsValue(`rooms`, `housing-rooms`);
    containsValue(`guests`, `housing-guests`);

    return rank;
  };

  const updatePins = (array) => {
    const samePins = array.sort((left, right) => {
      return getRank(right) - getRank(left);
    });
    window.pin.remove();
    window.map.initPinsScreen(samePins);
    window.card.addCardNode(samePins);
  };


  window.filter = {
    updatePins
  };
})();


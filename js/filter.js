"use strict";

(() => {
  // const getRank = (pinSimmillar) => {
  //   let rank = 0;

  // const RoomPrice = {
  //   low: 10000,
  //   high: 50000
  // };

  const checkBoxes = window.activate.formFiltersNode.features;

  // const containsValue = (objectValue, filterValue) => {
  //   if (parseInt(pinSimmillar.offer[objectValue], 10) === parseInt(window.activate.formFiltersNode[filterValue].value, 10)) {
  //     rank += 2;
  //   } else if (parseInt(pinSimmillar.offer[objectValue], 10) > parseInt(window.activate.formFiltersNode[filterValue].value, 10) || parseInt(pinSimmillar.offer[objectValue], 10) < parseInt(window.activate.formFiltersNode[filterValue].value, 10)) {
  //     rank += 1;
  //   } else if (window.activate.formFiltersNode[`housing-guests`].value === `any`) {
  //     rank += 0;
  //   }
  // };

  // if (pinSimmillar.offer.type === window.activate.formFiltersNode[`housing-type`].value) {
  //   rank += 4;
  // } else if (window.activate.formFiltersNode[`housing-type`].value === `any`) {
  //   rank += 0;
  // }

  // if (window.activate.formFiltersNode[`housing-price`].value === `middle` && pinSimmillar.offer.price >= RoomPrice.low && pinSimmillar.offer.price <= RoomPrice.high) {
  //   rank += 2;
  // } else if (window.activate.formFiltersNode[`housing-price`].value === `low` && pinSimmillar.offer.price < RoomPrice.low) {
  //   rank += 2;
  // } else if (window.activate.formFiltersNode[`housing-price`].value === `high` && pinSimmillar.offer.price > RoomPrice.high) {
  //   rank += 2;
  // } else if (window.activate.formFiltersNode[`housing-price`].value === `any`) {
  //   rank += 0;
  // }

  // checkBoxes.forEach((element) => {
  //   if (element.checked && pinSimmillar.offer.features.includes(element.value)) {
  //     rank += 0.5;
  //   }
  // });

  //   containsValue(`rooms`, `housing-rooms`);
  //   containsValue(`guests`, `housing-guests`);

  //   return rank;
  // };

  // const updatePins = (array) => {
  //   const samePins = array.sort((left, right) => {
  //     return getRank(right) - getRank(left);
  //   });
  //   window.pin.remove();
  //   window.map.initPinsScreen(samePins);
  //   window.card.addCardNode(samePins);
  // };


  window.filter = {
    updateSimillarPins: (array) => {

      let simmillarPinsArray = array;

      const RoomPrice = {
        low: 10000,
        high: 50000
      };

      simmillarPinsArray = simmillarPinsArray.filter((pinSimmillar) => {
        if (window.activate.formFiltersNode[`housing-type`].value === `any`) {
          return array;
        } else {
          return pinSimmillar.offer.type === window.activate.formFiltersNode[`housing-type`].value;
        }
      });

      simmillarPinsArray = simmillarPinsArray.filter((pinSimmillar) => {
        if (window.activate.formFiltersNode[`housing-rooms`].value === `any`) {
          return simmillarPinsArray;
        } else {
          return parseInt(pinSimmillar.offer.rooms, 10) === parseInt(window.activate.formFiltersNode[`housing-rooms`].value, 10);
        }
      });

      simmillarPinsArray = simmillarPinsArray.filter((pinSimmillar) => {
        if (window.activate.formFiltersNode[`housing-guests`].value === `any`) {
          return simmillarPinsArray;
        } else {
          return parseInt(pinSimmillar.offer.guests, 10) === parseInt(window.activate.formFiltersNode[`housing-guests`].value, 10);
        }
      });

      simmillarPinsArray = simmillarPinsArray.filter((pinSimmillar) => {
        if (window.activate.formFiltersNode[`housing-price`].value === `low`) {
          return pinSimmillar.offer.price < RoomPrice.low;
        } else if (window.activate.formFiltersNode[`housing-price`].value === `middle`) {
          return pinSimmillar.offer.price >= RoomPrice.low && pinSimmillar.offer.price <= RoomPrice.high;
        } else if (window.activate.formFiltersNode[`housing-price`].value === `high`) {
          return pinSimmillar.offer.price > RoomPrice.high;
        } else {
          return simmillarPinsArray;
        }
      });

      // simmillarPinsArray = simmillarPinsArray.filter((pinSimmillar) => {
      //   checkBoxes.forEach((element) => {
      //     if (element.checked) {
      //       return pinSimmillar.offer.features.includes(element.value);
      //     } else {
      //       return simmillarPinsArray;
      //     }
      //   });
      // });

      window.pin.remove();
      window.map.initPinsScreen(simmillarPinsArray);
      window.card.addCardNode(simmillarPinsArray);
    }
  };
})();

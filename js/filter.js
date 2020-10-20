"use strict";

(() => {
  window.filter = {
    updateSimillarPins: (array) => {
      const sameTypeHouse = array.filter((pinSimmillar) => {
        if (window.activate.formFiltersNode[`housing-type`].value === `any`) {
          return array;
        } else {
          return pinSimmillar.offer.type === window.activate.formFiltersNode[`housing-type`].value;
        }
      });
      window.pin.remove();
      window.map.initPinsScreen(sameTypeHouse);
      window.card.addCardNode(sameTypeHouse);
    }
  };
})();


"use strict";

(() => {
  window.filter = {
    updateSimillarPins: (array) => {
      const sameTypeHouse = array.filter((pinSimmillar) => {
        if (window.activate.formFiltersNode.housingType.value === `any`) {
          return array;
        } else {
          return pinSimmillar.offer.type === window.activate.formFiltersNode.housingType.value;
        }
      });
      window.pin.remove();
      window.map.initPinsScreen(sameTypeHouse);
      window.card.addCardNode(sameTypeHouse);
    }
  };
})();


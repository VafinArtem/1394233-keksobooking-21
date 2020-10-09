"use strict";

(() => {
  window.util = {
    getRandomArrElement: (arr) => {
      return arr[Math.floor(Math.random() * arr.length)];
    },
    getRandomInt: (min, max) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    getDeclension: (number, titles) => {
      const cases = [2, 0, 1, 1, 1, 2];
      return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
    },
    getRandomLenghtArr: (array) => {
      return array.slice(0, window.util.getRandomInt(0, array.length));
    },
    KeyboardKeys: {
      ESCAPE: `Escape`,
      ENTER: `Enter`
    }
  };
})();
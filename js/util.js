"use strict";


const DEBOUNCE_INTERVAL = 500;

const KeyboardKeys = {
  ESCAPE: `Escape`,
  ENTER: `Enter`
};

window.util = {
  getRandomInt: (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  getDeclension: (number, titles) => {
    const cases = [2, 0, 1, 1, 1, 2];
    return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
  },
  onPopupEscPress: (evt) => {
    if (evt.key === KeyboardKeys.ESCAPE) {
      evt.preventDefault();
      window.map.removeActiveCard();
    }
  },
  onPopupMessageEscPress: (evt) => {
    if (evt.key === KeyboardKeys.ESCAPE) {
      evt.preventDefault();
      window.form.removeMessageNode();
    }
  },
  debounce: (cb) => {
    let lastTimeout = null;

    return (...parameters) => {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(() => {
        cb(...parameters);
      }, DEBOUNCE_INTERVAL);
    };
  },
  MouseButtons: {
    MAIN: 0
  },
  KeyboardKeys
};

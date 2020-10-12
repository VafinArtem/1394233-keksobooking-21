"use strict";

(() => {

  const MainPinSize = {
    circle: {
      WIDTH: 62,
      HEIGHT: 62
    },
    pin: {
      WIDTH: 62,
      HEIGHT: 84
    }
  };

  const Coordinates = {
    Y: {
      MAX: 630 - MainPinSize.pin.HEIGHT,
      MIN: 130 - MainPinSize.pin.HEIGHT
    },
    X: {
      MAX: window.pin.mapNode.offsetWidth - (MainPinSize.pin.WIDTH / 2),
      MIN: -(MainPinSize.pin.WIDTH / 2)
    }
  };

  window.map.mapPinMain.addEventListener(`mousedown`, (evt) => {
    if (evt.button === window.util.MouseButtons.MAIN) {
      evt.preventDefault();

      let startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      const onMouseMove = (moveEvt) => {
        moveEvt.preventDefault();

        const shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        const CoordinatesMainPin = {
          x: window.map.mapPinMain.offsetLeft - shift.x,
          y: window.map.mapPinMain.offsetTop - shift.y
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        if (CoordinatesMainPin.x >= Coordinates.X.MIN && CoordinatesMainPin.x <= Coordinates.X.MAX) {
          window.map.mapPinMain.style.left = `${CoordinatesMainPin.x}px`;
        }

        if (CoordinatesMainPin.y >= Coordinates.Y.MIN && CoordinatesMainPin.y <= Coordinates.Y.MAX) {
          window.map.mapPinMain.style.top = `${CoordinatesMainPin.y}px`;
        }

        window.form.passAddressInput(MainPinSize.pin.WIDTH, MainPinSize.pin.HEIGHT);
      };

      const onMouseUp = (upEvt) => {
        upEvt.preventDefault();

        window.pin.mapNode.removeEventListener(`mousemove`, onMouseMove);
        document.removeEventListener(`mouseup`, onMouseUp);
      };

      window.pin.mapNode.addEventListener(`mousemove`, onMouseMove);
      document.addEventListener(`mouseup`, onMouseUp);
    }
  });

  window.move = {
    MainPinSize
  };
})();

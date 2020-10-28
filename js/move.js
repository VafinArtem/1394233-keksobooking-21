"use strict";

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
    MAX: 630,
    MIN: 130
  },
  X: {
    MAX: window.pin.mapNode.offsetWidth - (MainPinSize.pin.WIDTH / 2),
    MIN: -(MainPinSize.pin.WIDTH / 2)
  }
};

window.map.mapPinMain.addEventListener(`mousedown`, (evt) => {
  if (evt.button === window.util.MouseButtons.MAIN) {
    evt.preventDefault();

    let StartCoords = {
      X: evt.clientX,
      Y: evt.clientY
    };

    const onMouseMove = (moveEvt) => {
      moveEvt.preventDefault();

      const Shift = {
        X: StartCoords.X - moveEvt.clientX,
        Y: StartCoords.Y - moveEvt.clientY
      };

      const CoordinatesMainPin = {
        X: window.map.mapPinMain.offsetLeft - Shift.X,
        Y: window.map.mapPinMain.offsetTop - Shift.Y
      };

      StartCoords = {
        X: moveEvt.clientX,
        Y: moveEvt.clientY
      };

      if (CoordinatesMainPin.X >= Coordinates.X.MIN && CoordinatesMainPin.X <= Coordinates.X.MAX) {
        window.map.mapPinMain.style.left = `${CoordinatesMainPin.X}px`;
      }

      if (CoordinatesMainPin.Y >= Coordinates.Y.MIN && CoordinatesMainPin.Y <= Coordinates.Y.MAX) {
        window.map.mapPinMain.style.top = `${CoordinatesMainPin.Y}px`;
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

"use strict";

(() => {

  const MainPinSize = {
    WIDTH: 62,
    HEIGHT: 72
  };

  const Coordinates = {
    Y: {
      MAX: 630 - MainPinSize.HEIGHT,
      MIN: 130
    },
    X: {
      MAX: window.pin.mapNode.offsetWidth - (MainPinSize.WIDTH / 2),
      MIN: -(MainPinSize.WIDTH / 2)
    }
  };

  const getBoundPinCoorinates = () => {
    if (parseInt(window.map.mapPinMain.style.top, 10) < Coordinates.Y.MIN) {
      window.map.mapPinMain.style.top = `${Coordinates.Y.MIN}px`;
    }

    if (parseInt(window.map.mapPinMain.style.top, 10) > Coordinates.Y.MAX) {
      window.map.mapPinMain.style.top = `${Coordinates.Y.MAX}px`;
    }

    if (parseInt(window.map.mapPinMain.style.left, 10) < Coordinates.X.MIN) {
      window.map.mapPinMain.style.left = `${Coordinates.X.MIN}px`;
    }

    if (parseInt(window.map.mapPinMain.style.left, 10) > Coordinates.X.MAX) {
      window.map.mapPinMain.style.left = `${Coordinates.X.MAX}px`;
    }
  };

  window.move = {
    MainPinSize: {
      WIDTH: 62,
      HEIGHT: 72
    },
    onMouseDownMainPin: (evt) => {
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

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        window.map.mapPinMain.style.top = `${window.map.mapPinMain.offsetTop - shift.y}px`;
        window.map.mapPinMain.style.left = `${window.map.mapPinMain.offsetLeft - shift.x}px`;

        getBoundPinCoorinates();

        window.form.passAddressInput();
      };

      const onMouseUp = (upEvt) => {
        upEvt.preventDefault();

        window.pin.mapNode.removeEventListener(`mousemove`, onMouseMove);
        document.removeEventListener(`mouseup`, onMouseUp);
      };

      window.pin.mapNode.addEventListener(`mousemove`, onMouseMove);
      document.addEventListener(`mouseup`, onMouseUp);
    }
  };
})();

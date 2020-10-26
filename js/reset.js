"use strict";

const previewAvatarNode = window.form.formNode.querySelector(`.ad-form-header__preview img`);
const previewRoomNode = window.form.formNode.querySelector(`.ad-form__photo img`);

const defaultAvatarImage = previewAvatarNode.src;
const defaultRoomImage = ``;


const resetPage = () => {

  window.pin.mapNode.classList.add(`map--faded`);
  window.form.formNode.classList.add(`ad-form--disabled`);

  window.activate.toggleDisabledOnFormNodes();

  window.pin.remove();

  window.form.formNode.reset();
  window.activate.formFiltersNode.reset();

  window.map.mapPinMain.style.left = window.map.defaultMainPinCoordinates.X;
  window.map.mapPinMain.style.top = window.map.defaultMainPinCoordinates.Y;
  window.form.passAddressInput(window.move.MainPinSize.circle.WIDTH, window.move.MainPinSize.circle.HEIGHT);

  window.map.removeActiveCard();

  previewRoomNode.classList.add(`hidden`);
  previewRoomNode.src = defaultRoomImage;
  previewAvatarNode.src = defaultAvatarImage;

  window.map.mapPinMain.addEventListener(`mousedown`, window.activate.onPinMainMousedownPress, {
    once: true
  });
  window.map.mapPinMain.addEventListener(`keydown`, window.activate.onPinMainEnterPress, {
    once: true
  });
  window.scrollTo({top: 0, behavior: `smooth`});
};

window.reset = {
  page: resetPage,
  previewAvatarNode,
  previewRoomNode
};

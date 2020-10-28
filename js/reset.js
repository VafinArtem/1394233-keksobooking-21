"use strict";

const previewAvatarNode = window.form.formNode.querySelector(`.ad-form-header__preview img`);
const previewRoomNode = window.form.formNode.querySelector(`.ad-form__photo img`);

const DefaultImage = {
  AVATAR: previewAvatarNode.src,
  ROOM: ``
};

const resetPage = () => {

  window.pin.mapNode.classList.add(`map--faded`);
  window.form.formNode.classList.add(`ad-form--disabled`);

  window.activate.toggleDisabledOnFormNodes();

  window.pin.remove();

  window.form.formNode.reset();
  window.activate.formFiltersNode.reset();

  window.map.mapPinMain.style.left = window.map.DefaultMainPinCoordinates.X;
  window.map.mapPinMain.style.top = window.map.DefaultMainPinCoordinates.Y;
  window.form.passAddressInput(window.move.MainPinSize.circle.WIDTH, window.move.MainPinSize.circle.HEIGHT);

  window.map.removeActiveCard();

  previewRoomNode.classList.add(`hidden`);
  previewRoomNode.src = DefaultImage.ROOM;
  previewAvatarNode.src = DefaultImage.AVATAR;

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

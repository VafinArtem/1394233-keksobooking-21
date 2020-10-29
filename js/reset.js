"use strict";

const previewAvatarNode = window.form.node.querySelector(`.ad-form-header__preview img`);
const previewRoomNode = window.form.node.querySelector(`.ad-form__photo img`);

const DefaultImage = {
  AVATAR: previewAvatarNode.src,
  ROOM: ``
};

const DEFAULT_PRICE = `5000`;

const resetPage = () => {

  window.pin.mapNode.classList.add(`map--faded`);
  window.form.node.classList.add(`ad-form--disabled`);

  window.activate.toggleDisabledOnFormNodes();

  window.pin.remove();

  window.form.node.reset();
  window.activate.formFiltersNode.reset();

  window.form.node.price.placeholder = DEFAULT_PRICE;
  window.form.node.price.min = DEFAULT_PRICE;

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

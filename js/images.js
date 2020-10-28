"use strict";

const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];

const avatarImageChooserNode = window.form.node.querySelector(`.ad-form-header__input`);
const roomImageChooserNode = window.form.node.querySelector(`.ad-form__input`);

const addImage = (imageChooserInput, previewImageNode) => {
  const image = imageChooserInput.files[0];
  const imageName = image.name.toLowerCase();

  const matches = FILE_TYPES.some(function (it) {
    return imageName.endsWith(it);
  });

  if (matches) {
    let reader = new FileReader();

    reader.addEventListener(`load`, () => {
      previewImageNode.classList.remove(`hidden`);
      previewImageNode.src = reader.result;
    });

    reader.readAsDataURL(image);
  }
};

avatarImageChooserNode.addEventListener(`change`, () => {
  addImage(avatarImageChooserNode, window.reset.previewAvatarNode);
});

roomImageChooserNode.addEventListener(`change`, () => {
  addImage(roomImageChooserNode, window.reset.previewRoomNode);
});


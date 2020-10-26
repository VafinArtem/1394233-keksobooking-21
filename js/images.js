"use strict";

const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];

const avatarImageChooserNode = window.form.formNode.querySelector(`.ad-form-header__input`);
const previewAvatarNode = window.form.formNode.querySelector(`.ad-form-header__preview img`);
const roomImageChooserNode = window.form.formNode.querySelector(`.ad-form__input`);
const previewRoomImageNode = window.form.formNode.querySelector(`.ad-form__photo`);


const addImage = (imageChooserInput, previewImageElement) => {
  const image = imageChooserInput.files[0];
  const imageName = image.name.toLowerCase();

  const matches = FILE_TYPES.some(function (it) {
    return imageName.endsWith(it);
  });

  if (matches) {
    let reader = new FileReader();

    if (imageChooserInput === roomImageChooserNode) {
      reader.addEventListener(`load`, () => {
        const previewRoomImageElement = document.createElement(`img`);
        previewRoomImageElement.classList.add(`ad-form__photo-img`);
        previewImageElement.appendChild(previewRoomImageElement);
        previewRoomImageElement.src = reader.result;
      });
    } else {
      reader.addEventListener(`load`, () => {
        previewImageElement.src = reader.result;
      });
    }

    reader.readAsDataURL(image);
  }
};

avatarImageChooserNode.addEventListener(`change`, () => {
  addImage(avatarImageChooserNode, previewAvatarNode);
});

roomImageChooserNode.addEventListener(`change`, () => {
  addImage(roomImageChooserNode, previewRoomImageNode);
});

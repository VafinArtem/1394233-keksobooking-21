"use strict";

const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];

const imageChooserNode = window.form.formNode.querySelector(`.ad-form-header__input`);
const previewAvatarNode = window.form.formNode.querySelector(`.ad-form-header__preview img`);

imageChooserNode.addEventListener(`change`, () => {
  const image = imageChooserNode.files[0];
  const imageName = image.name.toLowerCase();

  const matches = FILE_TYPES.some(function (it) {
    return imageName.endsWith(it);
  });

  if (matches) {
    let reader = new FileReader();

    reader.addEventListener(`load`, () => {
      previewAvatarNode.src = reader.result;
    });

    reader.readAsDataURL(image);
  }
});

import Popup from './popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector('.modal__image');
  }

  open(src, alt) {
    this._image.src = src;
    this._image.alt = alt;
    super.open();
  }
}
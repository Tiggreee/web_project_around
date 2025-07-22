import Popup from './popup.js';

export default class PopupWithImage extends Popup {
  open({ src, alt, caption }) {
    const imageElement = this._popup.querySelector('.modal__image');
    const captionElement = this._popup.querySelector('.modal__caption');
    if (imageElement) {
      imageElement.src = src;
      imageElement.alt = alt || '';
    }
    if (captionElement) {
      captionElement.textContent = caption || '';
    }
    super.open();
  }
} 
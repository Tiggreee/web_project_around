import Popup from './popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleConfirm) {
    super(popupSelector);
    this._handleConfirm = handleConfirm;
    this._confirmButton = this._popup.querySelector('.modal__save');
    this._cardId = null;
  }

  open(cardId) {
    this._cardId = cardId;
    super.open();
  }

  close() {
    super.close();
    this._cardId = null;
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      if (this._cardId) {
        this._handleConfirm(this._cardId);
      }
    });
  }
}
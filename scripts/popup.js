export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.style.display = 'flex';
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.style.display = 'none';
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(e) {
    if (e.key === 'Escape' || e.key === 'Esc') {
      this.close();
    }
  }

  setEventListeners() {
    const closeButton = this._popup.querySelector('.modal__close');
    if (closeButton) {
      closeButton.addEventListener('click', () => this.close());
    }
    const overlay = this._popup.querySelector('.modal__overlay');
    if (overlay) {
      overlay.addEventListener('click', () => this.close());
    }
  }
}
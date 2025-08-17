export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    // Close all open modals first
    document.querySelectorAll('.modal_opened').forEach(modal => {
      modal.classList.remove('modal_opened');
      modal.style.display = 'none';
    });
    
    this._popup.classList.add('modal_opened');
    this._popup.style.display = 'flex';
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('modal_opened');
    this._popup.style.display = 'none';
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('modal') || 
          evt.target.classList.contains('modal__overlay') ||
          evt.target.classList.contains('modal__close') ||
          evt.target.closest('.modal__close')) {
        this.close();
      }
    });
  }
}
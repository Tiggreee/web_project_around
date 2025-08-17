export default class Card {
  constructor({ name, link, _id, isLiked, owner }, templateSelector, userId, handlers) {
    this._name = name;
    this._link = link;
    this._id = _id;
    this._isLiked = isLiked;
    this._owner = owner;
    this._userId = userId;
    this._templateSelector = templateSelector;
    this._handleCardClick = handlers.handleCardClick;
    this._handleDeleteClick = handlers.handleDeleteClick;
    this._handleLikeClick = handlers.handleLikeClick;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.grid__item')
      .cloneNode(true);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.dataset.cardId = this._id;
    
    const cardImage = this._element.querySelector('.grid__pic');
    const cardTitle = this._element.querySelector('.grid__title');
    const deleteButton = this._element.querySelector('.grid__delete');
    const likeButton = this._element.querySelector('.grid__like');
    
    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardTitle.textContent = this._name;

    // Arreglar la comparación: owner puede ser string o objeto
    const ownerId = typeof this._owner === 'string' ? this._owner : this._owner?._id;
    
    // Solo mostrar botón de eliminar si es del usuario actual
    if (ownerId !== this._userId) {
      deleteButton.style.display = 'none';
    }

    // Configurar estado inicial del like
    if (this._isLiked) {
      likeButton.classList.add('grid__like_active');
    }

    this._setEventListeners();
    return this._element;
  }

  setLikeStatus(isLiked) {
    this._isLiked = isLiked;
    const likeButton = this._element.querySelector('.grid__like');
    
    if (likeButton) {
      if (this._isLiked) {
        likeButton.classList.add('grid__like_active');
      } else {
        likeButton.classList.remove('grid__like_active');
      }
    }
  }

  _setEventListeners() {
    const deleteButton = this._element.querySelector('.grid__delete');
    const cardImage = this._element.querySelector('.grid__pic');
    const likeButton = this._element.querySelector('.grid__like');

    // Event listener del botón de eliminar
    deleteButton.addEventListener('click', (e) => {
      e.stopPropagation();
      this._handleDeleteClick(this._id);
    });

    // Event listener de la imagen
    cardImage.addEventListener('click', () => {
      this._handleCardClick({ src: this._link, alt: this._name });
    });

    // Event listener del like
    likeButton.addEventListener('click', () => {
      this._handleLikeClick(this._id, this._isLiked);
    });
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }
}
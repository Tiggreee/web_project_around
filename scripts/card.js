export default class Card {
    constructor(name, link, templateSelector) {
        this._name = name;
        this._link = link;
        this._templateSelector = templateSelector;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.grid__item')
            .cloneNode(true);
        return cardElement;
    }

    generateCard() {
        this.cardElement = this._getTemplate();
        this.cardImage = this.cardElement.querySelector('.grid__pic');
        this.cardTitle = this.cardElement.querySelector('.grid__title');
        this.buttonLike = this.cardElement.querySelector('.grid__like');
        this.buttonDelete = this.cardElement.querySelector('.grid__delete');

        this.cardImage.src = this._link;
        this.cardImage.alt = this._name;
        this.cardTitle.textContent = this._name;

        this._setEventListeners();

        return this.cardElement;
    }

    _setEventListeners() {
        this.buttonLike.addEventListener('click', () => {
            this.buttonLike.classList.toggle('grid__like_active');
            const heartImg = this.buttonLike.querySelector('.grid__like-heart');
            if (this.buttonLike.classList.contains('grid__like_active')) {
                heartImg.src = './images/heart_logo-act.jpg';
            } else {
                heartImg.src = './images/heart_logo-unact.jpg';
            }
        });

        this.buttonDelete.addEventListener('click', () => {
            this.cardElement.remove();
        });

        this.cardImage.addEventListener('click', () => {
            // Aquí puedo abrir el popup de imagen si lo necesito
        });
    }
}
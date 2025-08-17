import Card from './card.js';
import Section from './section.js';
import PopupWithForm from './popupWithForm.js';
import PopupWithConfirmation from './PopupWithConfirmation.js';
import UserInfo from './userInfo.js';
import Api from './api.js';
import PopupWithImage from './popupWithImage.js';

let userId;
let cardsList;

const api = new Api({
  baseUrl: 'https://around-api.es.tripleten-services.com/v1',
  headers: {
    authorization: 'a92acc59-ad8f-4f23-876e-e79c43778572',
    'Content-Type': 'application/json'
  }
});

// Instancia de UserInfo
const userInfo = new UserInfo({
  nameSelector: '.header__title',
  jobSelector: '.header__subtitle',
  avatarSelector: '.header__pic',
});

// Popup para confirmar eliminación
const deleteCardPopup = new PopupWithConfirmation('#deleteCardModal', (cardId) => {
  return api.deleteCard(cardId)
    .then(() => {
      const cardElement = document.querySelector(`[data-card-id="${cardId}"]`);
      if (cardElement) {
        cardElement.remove();
      }
      deleteCardPopup.close();
    })
    .catch(err => console.error('Error al eliminar tarjeta:', err));
});

deleteCardPopup.setEventListeners();

// Initialize image popup
const imagePopup = new PopupWithImage('#imagePopup');
imagePopup.setEventListeners();

// Función para crear una nueva tarjeta
function createCard(cardData) {
  const card = new Card(
    cardData,
    '#card-template',
    userId,
    {
      handleCardClick: (imageData) => {
        imagePopup.open(imageData.src, imageData.alt);
      },
      handleDeleteClick: (cardId) => {
        deleteCardPopup.open(cardId);
      },
      handleLikeClick: (cardId, isLiked) => {
        const apiMethod = isLiked ? api.unlikeCard(cardId) : api.likeCard(cardId);
        apiMethod
          .then((newCardData) => {
            card.setLikeStatus(newCardData.isLiked);
          })
          .catch(err => console.error('Error al actualizar like:', err));
      }
    }
  );
  return card.generateCard();
}

// Popup para editar perfil
const editProfilePopup = new PopupWithForm('#editProfileModal', (formData) => {
  return api.updateProfile(formData.name, formData.about)
    .then((userData) => {
      userInfo.setUserInfo({
        name: userData.name,
        job: userData.about,
        avatar: userData.avatar
      });
      editProfilePopup.close();
    })
    .catch(err => console.error('Error al actualizar perfil:', err));
});

editProfilePopup.setEventListeners();

// Inicializar popup de agregar tarjeta
const addCardPopup = new PopupWithForm('#addCardModal', (formData) => {
  return api.addCard(formData.title, formData.link)
    .then((newCard) => {
      const cardElement = createCard(newCard);
      cardsList.addItem(cardElement);
      addCardPopup.close();
    })
    .catch(err => console.error('Error al agregar tarjeta:', err));
});

addCardPopup.setEventListeners();

// Event listener para el botón de editar perfil
document.querySelector('.header__edit').addEventListener('click', () => {
  const currentUserInfo = userInfo.getUserInfo();
  editProfilePopup.setInputValues({
    name: currentUserInfo.name,
    about: currentUserInfo.job
  });
  editProfilePopup.open();
});

// Event listener para el botón de agregar tarjeta
document.querySelector('.header__add').addEventListener('click', () => {
  addCardPopup.open();
});

// Carga inicial de datos
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userId = userData._id;
    userInfo.setUserInfo({
      name: userData.name,
      job: userData.about,
      avatar: userData.avatar
    });

    cardsList = new Section({
      items: cards,
      renderer: (item) => {
        const cardElement = createCard(item);
        cardsList.addItem(cardElement);
      }
    }, '.cards__list');

    cardsList.renderItems();
  })
  .catch(err => console.error('Error al cargar datos iniciales:', err));


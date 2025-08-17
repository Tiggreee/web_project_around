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
      // Buscar y eliminar la tarjeta del DOM
      const cardElement = document.querySelector(`[data-card-id="${cardId}"]`);
      if (cardElement) {
        cardElement.remove();
      }
      deleteCardPopup.close();
    })
    .catch(err => {
      console.error('Error al eliminar tarjeta:', err);
      alert('Error al eliminar la tarjeta. Por favor, inténtalo de nuevo.');
    });
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
        if (isLiked) {
          api.unlikeCard(cardId)
            .then(() => {
              card.setLikeStatus(false);
            })
            .catch(err => console.error('Error:', err));
        } else {
          api.likeCard(cardId)
            .then(() => {
              card.setLikeStatus(true);
            })
            .catch(err => console.error('Error:', err));
        }
      }
    }
  );
  return card.generateCard();
}

// Popup para editar perfil
const editProfilePopup = new PopupWithForm('#editProfileModal', (formData) => {
  console.log('Datos del perfil:', formData); // Debug temporal
  return api.updateProfile(formData.name, formData.about)
    .then((userData) => {
      console.log('Perfil actualizado:', userData); // Debug temporal
      userInfo.setUserInfo({
        name: userData.name,
        job: userData.about,
        avatar: userData.avatar
      });
      editProfilePopup.close();
    })
    .catch(err => {
      console.error('Error al actualizar perfil:', err);
      alert('Error al actualizar el perfil. Inténtalo de nuevo.');
    });
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
    .catch(err => {
      console.error('Error al agregar tarjeta:', err);
      alert('Error al agregar la tarjeta. Verifica que la URL de la imagen sea válida.');
    });
});

addCardPopup.setEventListeners();

// Popup para actualizar avatar
const updateAvatarPopup = new PopupWithForm('#updateAvatarModal', (formData) => {
  return api.updateAvatar(formData.avatar)
    .then((userData) => {
      userInfo.setUserInfo({
        name: userData.name,
        job: userData.about,
        avatar: userData.avatar
      });
      updateAvatarPopup.close();
    })
    .catch(err => {
      console.error('Error al actualizar avatar:', err);
      alert('Error al actualizar avatar. Usa una URL completa (https://...)');
    });
});

updateAvatarPopup.setEventListeners();

// Event listener para el botón de editar perfil
document.querySelector('.header__edit').addEventListener('click', () => {
  console.log('Botón editar perfil clickeado'); // Debug temporal
  const currentUserInfo = userInfo.getUserInfo();
  console.log('Info actual del usuario:', currentUserInfo); // Debug temporal
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

// Event listener para actualizar avatar
document.querySelector('.header__pic').addEventListener('click', () => {
  updateAvatarPopup.open();
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
      items: cards.reverse(),
      renderer: (cardData) => {
        console.log('Datos de la tarjeta desde API:', cardData);
        const cardElement = createCard(cardData);
        cardsList.addItem(cardElement);
      }
    }, '#cardsContainer');

    cardsList.renderItems();
  })
  .catch(err => {
    console.error('Error al cargar datos iniciales:', err);
    // Mostrar algún mensaje de error al usuario
    document.querySelector('#cardsContainer').innerHTML = 
      '<p style="color: white; text-align: center;">Error al cargar las tarjetas. Por favor, recarga la página.</p>';
  });


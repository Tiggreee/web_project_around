import Card from './card.js';
import Section from './section.js';
import PopupWithForm from './popupWithForm.js';
import UserInfo from './userInfo.js';
import Api from './api.js';

// Configuración de la API
const api = new Api({
  baseUrl: 'https://around-api.es.tripleten-services.com/v1',
  headers: {
    authorization: 'TU-TOKEN-AQUÍ', // Reemplaza con tu token
    'Content-Type': 'application/json'
  }
});

// Instancia de UserInfo
const userInfo = new UserInfo({
  nameSelector: '.header__title',
  jobSelector: '.header__subtitle',
  avatarSelector: '.header__pic'
});

// Función para crear una nueva tarjeta
function createCard(data) {
  const card = new Card(
    data.name, 
    data.link, 
    '#card-template',
    () => {
      // Manejo del clic en la tarjeta
    }
  );
  return card.generateCard();
}

// Carga inicial de datos
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    // Establecer información del usuario
    userInfo.setUserInfo({
      name: userData.name,
      job: userData.about,
      avatar: userData.avatar
    });

    // Crear sección de tarjetas
    const cardsList = new Section({
      items: cards,
      renderer: (item) => {
        const cardElement = createCard(item);
        cardsList.addItem(cardElement);
      }
    }, '.cards__list');

    cardsList.renderItems();
  })
  .catch((err) => console.error('Error al cargar los datos iniciales:', err));

// Popup para editar perfil
const editProfilePopup = new PopupWithForm('#editProfileModal', (formData) => {
  api.updateProfile(formData.name, formData.about)
    .then((res) => {
      userInfo.setUserInfo({
        name: res.name,
        job: res.about
      });
      editProfilePopup.close();
    })
    .catch((err) => console.error('Error al actualizar el perfil:', err));
});

editProfilePopup.setEventListeners();

// Event listener para el botón de editar perfil
document.querySelector('.header__edit').addEventListener('click', () => {
  const currentUserInfo = userInfo.getUserInfo();
  document.querySelector('input[name="name"]').value = currentUserInfo.name;
  document.querySelector('input[name="about"]').value = currentUserInfo.job;
  editProfilePopup.open();
});


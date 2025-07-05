import FormValidator from './formValidator.js';

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// Instancias de validadores
const forms = Array.from(document.querySelectorAll(validationConfig.formSelector));
const validators = {};
forms.forEach(form => {
  const validator = new FormValidator(validationConfig, form);
  validator.enableValidation();
  if (form.id) {
    validators[form.id] = validator;
  }
});
import Card from './card.js';
import { openModal, closeModal } from './utils.js';

const addButtonImg = document.querySelector('.header__add img');
const editButtonImg = document.querySelector('.header__edit img');
const editButton = document.querySelector('.header__edit');
const editProfileModal = document.getElementById('editProfileModal');
const closeModalBtn = document.querySelector('.modal__close');
const modalNameInput = document.querySelector('.popup__input[name="name"]');
const headerTitle = document.querySelector('.header__title');
const modalAboutInput = document.querySelector('.popup__input[name="about"]');
const headerSubtitle = document.querySelector('.header__subtitle');
const cardsContainer = document.getElementById('cardsContainer');
const cardTemplateSelector = '#cardTemplate';
const cardTemplate = document.querySelector(cardTemplateSelector);
const addCardModal = document.getElementById('addCardModal');
const addCardForm = document.getElementById('addCardForm');
const addCardCloseBtn = addCardModal.querySelector('.modal__close');
const imagePopup = document.getElementById('imagePopup');
const imagePopupImg = imagePopup.querySelector('.modal__image');
const imagePopupCloseBtn = imagePopup.querySelector('.modal__close');
const editProfileForm = document.getElementById('editProfileForm');
const addButton = document.querySelector('.header__add');

// Mostrar y ocultar el modal de edición de perfil y rellenar el input con el header__title
if (editButton && editProfileModal && closeModalBtn && modalNameInput && headerTitle) {
  editButton.addEventListener('click', function() {
    modalNameInput.value = headerTitle.textContent;
    modalAboutInput.value = headerSubtitle.textContent;
    openModal(editProfileModal);
    if (validators['editProfileForm']) {
      validators['editProfileForm'].resetValidation();
    }
  });
  closeModalBtn.addEventListener('click', function() {
    closeModal(editProfileModal);
    if (validators['editProfileForm']) {
      validators['editProfileForm'].resetValidation();
    }
  });
}

// Guardar cambios del modal en el perfil
if (editProfileForm && modalNameInput && modalAboutInput && headerTitle && headerSubtitle) {
  editProfileForm.addEventListener('submit', function(e) {
    e.preventDefault();
    headerTitle.textContent = modalNameInput.value;
    headerSubtitle.textContent = modalAboutInput.value;
    closeModal(editProfileModal);
  });
}

// Lógica para el modal de agregar tarjeta
if (addCardModal && addCardForm && addCardCloseBtn) {
  document.querySelector('.header__add').addEventListener('click', () => {
    openModal(addCardModal);
    addCardForm.resetValidation && addCardForm.resetValidation();
  });

  // Cerrar modal al dar click en la X
    addCardCloseBtn.addEventListener('click', () => {
      addCardModal.style.display = 'none';
      document.body.classList.remove('modal-open');
      addCardForm.resetValidation && addCardForm.resetValidation();
    });

    // Agregar tarjeta al enviar el formulario
    addCardForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = addCardForm.elements['title'].value;
      const link = addCardForm.elements['link'].value;
      if (name && link) {
        initialCards.unshift({ name, link });
        renderCards(initialCards);
        addCardModal.style.display = 'none';
        document.body.classList.remove('modal-open');
        addCardForm.reset();
        addCardForm.resetValidation && addCardForm.resetValidation();
      }
    });
  }

  // Tarjetas dinámicas
  const initialCards = [
    { name: "Valle de Yosemite", link: "./images/paisaje1.jpg" },
    { name: "Lago Louise", link: "./images/paisaje2.webp" },
    { name: "Montañas Calvas", link: "./images/paisaje3.jpg" },
    { name: "Latemar", link: "./images/paisaje4.jpg" },
    { name: "Vanois National Park", link: "./images/paisaje5.jpg" },
    { name: "Lago di Braies", link: "./images/paisaje6.jpg" }
  ];

  function createCard({ name, link }) {
    const card = new Card(name, link, cardTemplateSelector);
    return card.generateCard();
  }

  function renderCards(cards) {
    if (!cardsContainer) {
      console.warn('No se encontró el contenedor de tarjetas (#cardsContainer)');
      return;
    }
    if (!cardTemplate) {
      console.warn('No se encontró el template de tarjetas (#cardTemplate)');
      return;
    }
    cardsContainer.innerHTML = '';
    cards.forEach(cardData => {
      const card = createCard(cardData);
      cardsContainer.appendChild(card);
    });
  }

  // Renderiza las tarjetas iniciales
  renderCards(initialCards);

  // Abrir popup al hacer click en una imagen de tarjeta
  cardsContainer.addEventListener('click', function(e) {
    const img = e.target.closest('.grid__pic');
    if (img) {
      imagePopupImg.src = img.src;
      imagePopupImg.alt = img.alt;
      imagePopup.style.display = 'flex';
      document.body.classList.add('modal-open');
    }
  });

  // Cerrar popup al dar click en la X
  imagePopupCloseBtn.addEventListener('click', function() {
    imagePopup.style.display = 'none';
    document.body.classList.remove('modal-open');
    imagePopupImg.src = '';
    imagePopupImg.alt = '';
  });

  // Cerrar modal al hacer clic en la superposición (overlay)
  document.querySelectorAll('.modal').forEach(modal => {
    const overlay = modal.querySelector('.modal__overlay');
    if (overlay) {
      overlay.addEventListener('click', () => closeModal(modal));
    }
  });

  // Cerrar modal al presionar la tecla Esc
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' || e.key === 'Esc') {
      document.querySelectorAll('.modal').forEach(modal => {
        if (modal.style.display === 'flex') {
          closeModal(modal);
        }
      });
    }
  });


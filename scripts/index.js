document.addEventListener('DOMContentLoaded', function() {

  // Constantes de los elementos
  const addButtonImg = document.querySelector('.header__add img');
  const editButtonImg = document.querySelector('.header__edit img');
  const editButton = document.querySelector('.header__edit');
  const editProfileModal = document.getElementById('editProfileModal');
  const closeModalBtn = document.querySelector('.modal__close');
  const modalNameInput = document.querySelector('.modal__input[name="name"]');
  const headerTitle = document.querySelector('.header__title');
  const modalAboutInput = document.querySelector('.modal__input[name="about"]');
  const headerSubtitle = document.querySelector('.header__subtitle');
  const modalForm = document.querySelector('.modal__form');
  const cardsContainer = document.getElementById('cardsContainer');
  const cardTemplate = document.getElementById('cardTemplate').content;
  const addCardModal = document.getElementById('addCardModal');
  const addCardForm = document.getElementById('addCardForm');
  const addCardCloseBtn = addCardModal.querySelector('.modal__close');
  const imagePopup = document.getElementById('imagePopup');
  const imagePopupImg = imagePopup.querySelector('.modal__image');
  const imagePopupCloseBtn = imagePopup.querySelector('.modal__close');

  // Función para listeners de "like" en corazones 
  function addLikeListeners(img) {
    let liked = false;
    img.addEventListener('mouseenter', function() {
      if (!liked) img.src = './images/heart_logo-hover.jpg';
    });
    img.addEventListener('mouseleave', function() {
      img.src = liked ? './images/heart_logo-act.jpg' : './images/heart_logo-unact.jpg';
    });
    img.addEventListener('click', function() {
      liked = !liked;
      img.src = liked ? './images/heart_logo-act.jpg' : './images/heart_logo-unact.jpg';
    });
  }

  // Hover para el botón de agregar imagen
  if (addButtonImg) {
    const originalSrc = './images/add_button.png';
    addButtonImg.src = originalSrc;
    addButtonImg.addEventListener('mouseenter', function() {
      addButtonImg.src = './images/add_button-hover.png';
    });
    addButtonImg.addEventListener('mouseleave', function() {
      addButtonImg.src = originalSrc;
    });
  }

  // Hover para el botón de editar perfil
  if (editButtonImg) {
    const originalEditSrc = editButtonImg.src;
    editButtonImg.addEventListener('mouseenter', function() {
      editButtonImg.src = './images/edit_button-hover.png';
    });
    editButtonImg.addEventListener('mouseleave', function() {
      editButtonImg.src = originalEditSrc;
    });
  }

  // Mostrar y ocultar el modal de edición de perfil y rellenar el input con el header__title
  if (editButton && editProfileModal && closeModalBtn && modalNameInput && headerTitle) {
    editButton.addEventListener('click', function() {
      modalNameInput.value = headerTitle.textContent;
      modalAboutInput.value = headerSubtitle.textContent;
      editProfileModal.style.display = 'flex';
      document.body.classList.add('modal-open');
    });
    closeModalBtn.addEventListener('click', function() {
      editProfileModal.style.display = 'none';
      document.body.classList.remove('modal-open');
    });
  }

  // Guardar cambios del modal en el perfil
  if (modalForm && modalNameInput && modalAboutInput && headerTitle && headerSubtitle) {
    modalForm.addEventListener('submit', function(e) {
      e.preventDefault();
      headerTitle.textContent = modalNameInput.value;
      headerSubtitle.textContent = modalAboutInput.value;
      editProfileModal.style.display = 'none';
      document.body.classList.remove('modal-open');
    });
  }

  // Lógica para el modal de agregar tarjeta
  if (addCardModal && addCardForm && addCardCloseBtn) {
    document.querySelector('.header__add').addEventListener('click', () => {
      addCardModal.style.display = 'flex';
      document.body.classList.add('modal-open');
    });

    // Cerrar modal al dar click en la X
    addCardCloseBtn.addEventListener('click', () => {
      addCardModal.style.display = 'none';
      document.body.classList.remove('modal-open');
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
    const card = cardTemplate.cloneNode(true);
    const img = card.querySelector('.grid__pic');
    const title = card.querySelector('.grid__title');
    const likeHeart = card.querySelector('.grid__like-heart');
    const deleteBtn = card.querySelector('.grid__delete');

    img.src = link;
    img.alt = name;
    title.textContent = name;

    addLikeListeners(likeHeart);

    // Eliminar tarjeta al hacer click en el trash bin
    deleteBtn.addEventListener('click', function() {
      // Encuentra el índice de la tarjeta a eliminar
      const index = initialCards.findIndex(cardData =>
        cardData.name === name && cardData.link === link
      );
      if (index !== -1) {
        initialCards.splice(index, 1); 
        renderCards(initialCards);
      }
    });
    deleteBtn.addEventListener('mouseenter', function() {
      deleteBtn.querySelector('.grid__delete-icon').src = './images/trashbin-hover.png';
    });
    deleteBtn.addEventListener('mouseleave', function() {
      deleteBtn.querySelector('.grid__delete-icon').src = './images/trashbin.png';
    });

    return card;
  }

  function renderCards(cards) {
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

});



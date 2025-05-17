document.addEventListener('DOMContentLoaded', function() {
  // Cambia la imagen del corazón al hacer hover y la regresa al salir

  document.querySelectorAll('.grid__heart').forEach(function(img) {
    let liked = false;

    img.addEventListener('mouseenter', function() {
      if (!liked) img.src = './images/heart_logo-hover.jpg';
    });

    img.addEventListener('mouseleave', function() {
      if (liked) {
        img.src = './images/heart_logo-act.jpg';
      } else {
        img.src = './images/heart_logo-unact.jpg';
      }
    });

    img.addEventListener('click', function() {
      liked = !liked;
      if (liked) {
        img.src = './images/heart_logo-act.jpg';
      } else {
        img.src = './images/heart_logo-unact.jpg';
      }
    });
  });

  // Hover para el botón de agregar imagen
  const addButtonImg = document.querySelector('.header__add img');
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
  const editButtonImg = document.querySelector('.header__edit img');
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
  const editButton = document.querySelector('.header__edit');
  const editProfileModal = document.getElementById('editProfileModal');
  const closeModalBtn = document.querySelector('.modal__close');
  const modalNameInput = document.querySelector('.modal__input[name="name"]');
  const headerTitle = document.querySelector('.header__title');
  const modalAboutInput = document.querySelector('.modal__input[name="about"]');
  const headerSubtitle = document.querySelector('.header__subtitle');
  const modalForm = document.querySelector('.modal__form');

  if (editButton && editProfileModal && closeModalBtn && modalNameInput && headerTitle) {
    editButton.addEventListener('click', function() {
      modalNameInput.value = headerTitle.textContent;
      editProfileModal.style.display = 'flex';
      document.body.classList.add('modal-open');
    });
    closeModalBtn.addEventListener('click', function() {
      editProfileModal.style.display = 'none';
      document.body.classList.remove('modal-open');
    });
    // Cerrar modal al hacer click fuera del contenido
    editProfileModal.addEventListener('mousedown', function(e) {
      if (e.target === editProfileModal) {
        editProfileModal.style.display = 'none';
        document.body.classList.remove('modal-open');
      }
    });
  }

  if (modalForm && modalNameInput && modalAboutInput && headerTitle && headerSubtitle) {
    modalForm.addEventListener('submit', function(e) {
      e.preventDefault();
      headerTitle.textContent = modalNameInput.value;
      headerSubtitle.textContent = modalAboutInput.value;
      editProfileModal.style.display = 'none';
      document.body.classList.remove('modal-open');
    });
  }
});

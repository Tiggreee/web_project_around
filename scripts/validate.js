document.addEventListener('DOMContentLoaded', function() {
  function enableValidation(config) {
    const forms = Array.from(document.querySelectorAll(config.formSelector));
    forms.forEach(form => {
      const inputs = Array.from(form.querySelectorAll(config.inputSelector));
      const button = form.querySelector(config.submitButtonSelector);

      function validateInput(input) {
        const errorElement = form.querySelector(`#${input.name}-error`);
        let message = '';
        if (!input.validity.valid) {
          if (input.name === 'link') {
            try {
              new URL(input.value);
            } catch {
              if (
                typeof input.value === 'string' &&
                (input.value.startsWith('./images/') || input.value.startsWith('/images/'))
              ) {
                message = '';
              } else {
                message = input.validationMessage;
              }
            }
          } else {
            message = input.validationMessage;
          }
        }
        errorElement.textContent = message;
        if (message) {
          errorElement.classList.add(config.errorClass);
          input.classList.add(config.inputErrorClass);
        } else {
          errorElement.classList.remove(config.errorClass);
          input.classList.remove(config.inputErrorClass);
        }
      }

      function toggleButtonState() {
        const isValid = inputs.every(input => {
          if (input.name === 'link') {
            try {
              new URL(input.value);
              return true;
            } catch {
              return (
                typeof input.value === 'string' &&
                (input.value.startsWith('./images/') || input.value.startsWith('/images/'))
              );
            }
          }
          return input.validity.valid;
        });
        button.disabled = !isValid;
        if (isValid) {
          button.classList.remove(config.inactiveButtonClass);
        } else {
          button.classList.add(config.inactiveButtonClass);
        }
      }

      function resetValidation() {
        inputs.forEach(input => {
          const errorElement = form.querySelector(`#${input.name}-error`);
          errorElement.textContent = '';
          errorElement.classList.remove(config.errorClass);
          input.classList.remove(config.inputErrorClass);
        });
        toggleButtonState();
      }

      // Listeners
      inputs.forEach(input => {
        input.addEventListener('input', () => {
          validateInput(input);
          toggleButtonState();
        });
      });
      form.addEventListener('submit', (e) => {
        if (!form.checkValidity()) {
          e.preventDefault();
          inputs.forEach(input => validateInput(input));
        }
      });

      form.resetValidation = resetValidation;
      resetValidation();
    });
  }

  enableValidation({
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible"
  });

  // Resetear validación al abrir/cerrar modales
  const editProfileForm = document.getElementById('editProfileForm');
  const editButton = document.querySelector('.header__edit');
  const closeModalBtn = document.querySelector('.modal__close');
  if (editProfileForm && editButton && closeModalBtn) {
    editButton.addEventListener('click', () => {
      editProfileForm.resetValidation();
    });
    closeModalBtn.addEventListener('click', () => {
      editProfileForm.resetValidation();
    });
  }

  const addCardForm = document.getElementById('addCardForm');
  const addCardCloseBtn = document.querySelector('#addCardModal .modal__close');
  const addButton = document.querySelector('.header__add');
  if (addCardForm && addCardCloseBtn && addButton) {
    addButton.addEventListener('click', () => {
      addCardForm.resetValidation();
    });
    addCardCloseBtn.addEventListener('click', () => {
      addCardForm.resetValidation();
    });
  }
});

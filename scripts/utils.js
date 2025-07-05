export function openModal(modal) {
  modal.style.display = 'flex';
  document.body.classList.add('modal-open');
}

export function closeModal(modal) {
  modal.style.display = 'none';
  document.body.classList.remove('modal-open');
}


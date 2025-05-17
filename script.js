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

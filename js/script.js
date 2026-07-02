let hamburger = document.getElementById('hamburger');
let dropdown = document.getElementById('mobile');
let hamburgerIcon = document.getElementById('hamburger-icon');
let closeIcon = document.getElementById('close-icon');

hamburger.addEventListener('click', () => {
  dropdown.classList.toggle('hidden')

  // dropdown.classList.toggle('max-h-0');
  // dropdown.classList.toggle('max-h-screen');

  hamburgerIcon.classList.toggle('hidden');
  closeIcon.classList.toggle('hidden')


  
});
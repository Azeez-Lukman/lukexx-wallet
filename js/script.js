let hamburger = document.getElementById('hamburger');
let dropdown = document.getElementById('mobile');
let hamburgerIcon = document.getElementById('hamburger-icon');
let closeIcon = document.getElementById('close-icon');
const mobileLink = document.querySelectorAll('.mobile-link');


hamburger.addEventListener('click', () => {
  
  dropdown.classList.toggle('hidden')

  // dropdown.classList.toggle('max-h-0');
  // dropdown.classList.toggle('max-h-screen');

  hamburgerIcon.classList.toggle('hidden');
  closeIcon.classList.toggle('hidden')



});


  // mobile link hidden after clicked
  
    mobileLink.forEach(link => {
     link.addEventListener('click', () => {
      dropdown.classList.add('hidden');

      if(!hamburger.classList.contains('hidden')) {
        hamburgerIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
      } 
    })
  });




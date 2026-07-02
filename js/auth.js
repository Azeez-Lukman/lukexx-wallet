// get all ids'

const registerForm = document.getElementById('register-form');
const fullName = document.getElementById('full-name');
const userEmail = document.getElementById('email');
const phoneNumber = document.getElementById('phone');
const userPassword = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');
const registerBtn = document.getElementById('register-btn');

// form submission event listener

registerForm.addEventListener('submit', (e) => {
  e.preventDefault(); 

  // get the values from the input fields

  const fullNameValue = fullName.ariaValueMax.trim();
  const userEmailValue = userEmail.value.trim();
  const phoneNumberValue = phoneNumber.value.trim();
  const userPasswordValue = userPassword.value.trim();
  const confirmPasswordValue = confirmPassword.value;

  // validate the input fields
  if (!fullNameValue || !userEmailValue || !phoneNumberValue || userPasswordValue || !confirmpasswordValue) {
    
  }

});
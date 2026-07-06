// get all register page IDs'

const registerForm = document.getElementById('register-form');
const fullNameInput = document.getElementById('full-name');
const userEmailInput = document.getElementById('email');
const phoneNumberInput = document.getElementById('phone');
const userPasswordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');
const message = document.getElementById('message-display');
const registerBtn = document.getElementById('register-btn');

// get existing users or create an empty array
let users = JSON.parse(localStorage.getItem('users')) || [];


// message display
function displayMessage(text, type) {
  message.textContent = text;
  
  message.classList.remove("hidden");

  if (type === 'error') {
    message.className = 'text-sm font-semibold text-rose-600 bg-white border border-rose-800 rounded-lg p-3';
  } else {
    message.className = 'text-sm font-semibold text-green-600 bg-white border border-green-800/50 rounded-lg p-3 ';
  }
  setTimeout(() => {
    message.classList.add("hidden");
  },4000)
}

if(registerForm) {
  // form submission event listener

  registerForm.addEventListener('submit', (e) => {
    e.preventDefault(); 

    // hide previous message
    message.classList.add("hidden");


    // get the values from the input fields

    const fullName = fullNameInput.value.trim();
    const userEmail = userEmailInput.value.trim().toLowerCase();
    const phoneNumber = phoneNumberInput.value.trim();
    const password = userPasswordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value;

    // validate the input fields
    if (!fullName || !userEmail || !phoneNumber || !password || !confirmPassword) {
      displayMessage('Please fill in all fields', 'error');
      return;
    }
    //  password match validation
    if (password !== confirmPassword) {
      displayMessage('Passwords do not match', 'error');
      return;
    }
    // password length validation
    if (password.length < 8) {
      displayMessage('Password must be at least 8 characters long', 'error');
      return;
    }

    // check if mail already exists
  const existingUser = users.find((user) => user.email === userEmail);
  if (existingUser) {
    displayMessage('An account with this email already exists.', 'error');
    return;
  }

    // disable button while processing
    registerBtn.disabled = true;
    registerBtn.textContent = 'Creating Account...';
    displayMessage('Creating your account, please wait...', 'success');


  // Creaate new user
  const newUser = {
    id: Date.now().toString(),
    fullName: fullName,
    email: userEmail,
    phone: phoneNumber,
    password: password,
    balance: 0,
    transactions: [],
  };

  // save error
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));

  // success message
  displayMessage('Accout created successfully! Redirecting to login....', 'success');

  // Redirect to login page
  setTimeout(() => {
    window.location.href = "./login.html";
  }, 2000);

  // reset  button (ifnredirect fails)
    registerBtn.disabled = false;
    registerBtn.textContent = 'Create Account';

  });
}

// ########### LOGIN AUTHORISAION ############

// Getting all login IDs

const loginForm = document.getElementById('login-form');
const loginEmail = document.getElementById('login-email');
const loginPassword = document.getElementById('login-password');
const loginBtn = document.getElementById('login-btn');
const loginMessage = document.getElementById('message-display')


// error message display for login page
 function messageDisplay (text, type) {
  loginMessage.textContent = text;
  loginMessage.classList.remove('hidden');

  if (type === 'error') {
    loginMessage.className = 'text-sm font-semibold text-rose-600 bg-white border border-rose-800 rounded-lg p-3';
  } else{
    loginMessage.className = 'text-sm font-semibold text-green-600 bg-white border border-green-800/50 rounded-lg p-3 ';
  } 
  setTimeout(() => {
    loginMessage.classList.add('hidden');
  }, 4000)
 }


//  ############# LOGIN #########

if (loginForm){
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    

    // hide previous message
    loginMessage.classList.add('hidden');

    // get user input
    const user = {
      email: loginEmail.value.trim().toLowerCase(),
      password: loginPassword.value,
    };


    // validate empty fields
    if(!user.email || !user.password) {
      messageDisplay('Please fill in all fields', 'error');
      return;
    }

    // get registered users

    const users = JSON.parse(localStorage.getItem('users')) || [];

    // check if mail exist
    const existingUser = users.find((registeredUser) => registeredUser.email === user.email);
    
    if(!existingUser){
      messageDisplay('no account found with this email', 'error')
      return;
    }

    // check if password is correct
    if(existingUser.password !== user.password) {
      messageDisplay('Incorrect password', 'error');
      return;
    }

    // disable button while processing
    loginBtn.disabled = true;
    loginBtn.textContent = 'Logging in...';
    messageDisplay('Logging in, please wait...', 'success');

    // save logged in user to local storage
    localStorage.setItem(
      'currentUser',
      JSON.stringify(existingUser)
    );

    // success message
    messageDisplay('Login successful! Redirecting to dashboard....', 'success');

    // Redirect to dashboard page
    setTimeout(() => {
      window.location.href = "./dashboard.html";
    }, 2000)

    // reset button (if redirect fails)
    loginBtn.disabled = false;
    loginBtn.textContent = 'Login'


  });
}
// ########## GET ALL IDs FOR REGISTER AND LOGIN ##########
// ######### REGISTER #########

const registerForm = document.getElementById('register-form');
const fullName = document.getElementById('full-name');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');
const registerBtn = document.getElementById('register-btn');

// ######### REGISTER PAGE ########

const loginForm = document.getElementById('login-form');
const loginEmail = document.getElementById('login-email');
const loginPassword = document.getElementById('login-password');
const loginBtn = document.getElementById('login-btn');

//  FOR BOTH
const message = document.getElementById('message-display');

// ########### MESSAGE DISPLAY (error/success) #########

function displayMessage(text, type) {
  message.textContent = text;
  message.classList.remove('hidden');

  if (type === 'error') {
    message.className = 'text-sm font-semibold text-rose-600 bg-white border border-rose-800 rounded-lg p-3';
  } else {
    message.className = 'text-sm font-semibold text-green-600 bg-white border border-green-800/50 rounded-lg p-3 ';
  }
  setTimeout(() => {
    message.classList.add('hidden');
  }, 4000);
}

// ###### GET ALL USERS ########
function getUsers(){
  return JSON.parse(localStorage.getItem('users')) || [];

}

// ######## SAVE ALL USERS #####
function saveUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));

}

// ######## CHECK EXISTING EMAIL ########
function emailExists(email) {
  const users = getUsers();
  return users.find(user => user.email === email);
}

// ####### SAVE LOGGED-IN USERS ######
function saveCurrentUser(user) {
  localStorage.setItem('currentUser', JSON.stringify(user));

}

// ####### GET CURRENT USER ########
function getCurrentUser() {
  return JSON.parse(localStorage.getItem('currentUser'));
}

// ######### REDIRECT USER REGISTER #########
function redirect(path) {
  window.location.href = './login.html'
}
// ######### REDIRECT USER LOGIN #########
function redirectLogin(path) {
  window.location.href = './dashboard.html'
}


// ####### RESET BUTTON #########
function resetButton(button, text){
  button.disabled = false;
  button.textContent = text;

}

// ####### REGISTER USER #######
function registerUser(e) {
  e.preventDefault();

  const user = {
    id: Date.now(),
    fullName: fullName.value.trim(),
    email: email.value.trim().toLowerCase(),
    phone: phone.value,
    password: password.value,
    balance: 0,
    transactions: []
  };

  // validate empty fields
  if(
    !user.fullName || 
    !user.email || 
    !user.phone || 
    !user.password || 
    !confirmPassword.value
  )
     {
    displayMessage('please fill in all fields', 'error');
    return;

  }

  // password check
  if(user.password !== confirmPassword.value) {
    displayMessage('Password do not match', 'error');
    return;
  }

  // password length
  if(user.password.length < 8) {
    displayMessage('Password must be at least 8 characters long', 'error');
    return;
  }

  // Existing Email
  if(emailExists(user.email)) {
    displayMessage('An account with this email already exists.', 'error');
    return;
  }

  // disable button while processing
  registerBtn.disabled = true;
  registerBtn.textContent = 'Creating Account...';
  displayMessage('Creating your account...', 'success');
  
  // save users
  const users = getUsers();
  users.push(user);
  saveUsers(users);
  displayMessage('Account created successfully! Redirecting to login...', 'success');

  setTimeout(() => {
    redirect('./login.html')
  }, 2000);


  
  resetButton(registerBtn, 'Create Account');

}

// Register event
if (registerForm) {
  registerForm.addEventListener('submit', registerUser);
}

// ######### LOGIN PAGE ########

function loginUser(e) {
  e.preventDefault();

  // validate input
  const user = {
    email: loginEmail.value.trim(),
    password: loginPassword.value,
  }

  // vaidate empty fields
  if (!user.email ||!user.password) {
    displayMessage('Please fill in all fields', 'error');
    return;
  }

  // Get All Users
  const users = getUsers();

  // Find Users By Email
  const existingUser = users.find((registeredUser) => registeredUser.email === user.email);

  // Check Email Match
  if(!existingUser) {
    displayMessage('No account found with this email', 'error');
    return;
  }

  // check if password is correct
  if(existingUser.password !== user.password) {
    displayMessage('Incorrect password', 'error');
    return;
  }

  // disable button
  loginBtn.disabled = true;
  loginBtn.innerText = 'Logging in...';
  displayMessage('Logging in, please wait...', 'success');

  // save logged in users
  saveCurrentUser(existingUser);

  // success message
  // displayMessage('Welcome back', 'success');

  // redirect to dashboard
  setTimeout(() => {
    redirectLogin('./dashboard.html');
  }, 2000);
  
  //  Reset Button
  resetButton(loginBtn, 'Login');

}

// #### LOGIN EVENT
if(loginForm){
  loginForm.addEventListener('submit', loginUser);
}


// PROTECT DASHBOARD
function protectDashboard() {
  const currentUser = getCurrentUser();

  if(!currentUser){
    window.location.href = './login.html';
  }
}
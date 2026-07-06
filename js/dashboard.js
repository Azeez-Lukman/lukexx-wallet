protectDashboard();

// welcome user name
const welcomeUser = document.getElementById('welcome-user');
const currentUser = getCurrentUser();
welcomeUser.textContent = `Welcome, ${currentUser.fullName}`;


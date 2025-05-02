// DOM Elements
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const errorMessage = document.getElementById('errorMessage');

// Validation Functions
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePassword(password) {
    // Password must be at least 8 characters long and contain at least one number and one letter
    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return re.test(password);
}

// Form Submission Handler
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    
    // Reset error message
    errorMessage.textContent = '';
    errorMessage.classList.add('hidden');
    
    // Validate email
    if (!validateEmail(email)) {
        errorMessage.textContent = 'Please enter a valid email address';
        errorMessage.classList.remove('hidden');
        emailInput.focus();
        return;
    }
    
    // Validate password
    if (!validatePassword(password)) {
        errorMessage.textContent = 'Password must be at least 8 characters long and contain at least one number and one letter';
        errorMessage.classList.remove('hidden');
        passwordInput.focus();
        return;
    }
    
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Find user with matching email
    const user = users.find(user => user.email === email);
    
    if (!user) {
        errorMessage.textContent = 'Email not found. Please register first.';
        errorMessage.classList.remove('hidden');
        return;
    }
    
    // Check password
    if (user.password !== password) {
        errorMessage.textContent = 'Incorrect password';
        errorMessage.classList.remove('hidden');
        return;
    }
    
    // Store current user in localStorage
    localStorage.setItem('currentUser', JSON.stringify({
        email: user.email,
        name: user.name
    }));
    
    // Redirect to home page
    window.location.href = 'coffe.html';
});

// Check if user is already logged in
document.addEventListener('DOMContentLoaded', function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        window.location.href = 'coffe.html';
    }
}); 
// Form elements
const loginForm = document.querySelector('.login-form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginButton = document.getElementById('login-button');
const togglePasswordButton = document.getElementById('togglePassword');

// Password visibility toggle
togglePasswordButton.addEventListener('click', function() {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    
    // Toggle the eye icon
    this.classList.toggle('fa-eye');
    this.classList.toggle('fa-eye-slash');
});

// Form validation and submission
async function validateLogin(event) {
    event.preventDefault();

    // Basic validation
    if (!usernameInput.value || !passwordInput.value) {
        showError('Please fill in all fields');
        return false;
    }

    // Disable button and show loading state
    loginButton.disabled = true;
    const originalButtonText = loginButton.innerHTML;
    loginButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing in...';

    try {
        const response = await submitLoginData({
            username: usernameInput.value,
            password: passwordInput.value
        });

        if (response.success) {
            // Store auth token if provided
            if (response.data.token) {
                localStorage.setItem('authToken', response.data.token);
            }
            
            // Store user data if needed
            if (response.data.user) {
                localStorage.setItem('userData', JSON.stringify(response.data.user));
            }

            // Redirect to dashboard/home
            window.location.href = 'index.html';
        } else {
            showError(response.error || 'Login failed. Please try again.');
        }
    } catch (error) {
        showError('An error occurred. Please try again later.');
        console.error('Login error:', error);
    } finally {
        // Restore button state
        loginButton.disabled = false;
        loginButton.innerHTML = originalButtonText;
    }

    return false;
}

// Function to submit login data to backend
async function submitLoginData(loginData) {
    try {
        const response = await fetch('YOUR_BACKEND_API_URL/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Login failed');
        }

        return {
            success: true,
            data: data
        };
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
}

// Error handling
function showError(message) {
    const errorDiv = document.getElementById('error-message');
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
        
        // Hide error after 5 seconds
        setTimeout(() => {
            errorDiv.style.display = 'none';
        }, 5000);
    } else {
        alert(message); // Fallback if error div doesn't exist
    }
}

// Add form submit event listener
loginForm.addEventListener('submit', validateLogin);

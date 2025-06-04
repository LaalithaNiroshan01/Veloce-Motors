document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements
  const loginForm = document.getElementById('loginForm');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const togglePasswordBtn = document.querySelector('.toggle-password');
  const loginBtn = document.querySelector('.login-btn');
  const errorToast = document.getElementById('errorToast');
  
  // Form validation state
  let isFormValid = false;
  
  // Toggle password visibility
  togglePasswordBtn.addEventListener('click', function() {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    
    // Update icon
    const icon = this.querySelector('i');
    icon.classList.toggle('fa-eye');
    icon.classList.toggle('fa-eye-slash');
  });
  
  // Input validation
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
  
  function validatePassword(password) {
    return password.length >= 6;
  }
  
  function showError(input, message) {
    const field = input.closest('.input-field');
    field.classList.add('error');
    
    // Add error message if it doesn't exist
    let errorMessage = field.querySelector('.error-message');
    if (!errorMessage) {
      errorMessage = document.createElement('div');
      errorMessage.className = 'error-message';
      field.appendChild(errorMessage);
    }
    errorMessage.textContent = message;
  }
  
  function clearError(input) {
    const field = input.closest('.input-field');
    field.classList.remove('error');
    const errorMessage = field.querySelector('.error-message');
    if (errorMessage) {
      errorMessage.textContent = '';
    }
  }
  
  function validateInput(input) {
    const value = input.value.trim();
    let isValid = true;
    
    if (input === emailInput) {
      if (!value) {
        showError(input, 'Email is required');
        isValid = false;
      } else if (!validateEmail(value)) {
        showError(input, 'Please enter a valid email address');
        isValid = false;
      } else {
        clearError(input);
      }
    } else if (input === passwordInput) {
      if (!value) {
        showError(input, 'Password is required');
        isValid = false;
      } else if (!validatePassword(value)) {
        showError(input, 'Password must be at least 6 characters');
        isValid = false;
      } else {
        clearError(input);
      }
    }
    
    return isValid;
  }
  
  // Real-time validation
  [emailInput, passwordInput].forEach(input => {
    input.addEventListener('input', function() {
      validateInput(this);
      updateFormValidity();
    });
    
    input.addEventListener('blur', function() {
      validateInput(this);
      updateFormValidity();
    });
  });
  
  function updateFormValidity() {
    isFormValid = validateInput(emailInput) && validateInput(passwordInput);
    loginBtn.disabled = !isFormValid;
  }
  
  // Show toast message
  function showToast(message, duration = 3000) {
    errorToast.textContent = message;
    errorToast.classList.add('show');
    
    setTimeout(() => {
      errorToast.classList.remove('show');
    }, duration);
  }
  
  // Demo credentials
  const DEMO_CREDENTIALS = {
    email: 'user@demo.com',
    password: '12345678'
  };
  
  // Form submission
  loginForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    if (!isFormValid) {
      showToast('Please fix the errors in the form');
      return;
    }
    
    // Show loading state
    loginBtn.classList.add('loading');
    loginForm.classList.add('loading');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const email = emailInput.value.trim();
      const password = passwordInput.value;
      
      // Check demo credentials
      if (email === DEMO_CREDENTIALS.email && password === DEMO_CREDENTIALS.password) {
        showToast('Login successful! Redirecting...', 'success');
        
        // Store demo session
        sessionStorage.setItem('isDemoUser', 'true');
        
        setTimeout(() => {
          window.location.href = 'home.html';
        }, 1000);
      } else {
        showToast('Invalid email or password');
      }
      
    } catch (error) {
      showToast('Login failed. Please try again.');
      console.error('Login error:', error);
    } finally {
      loginBtn.classList.remove('loading');
      loginForm.classList.remove('loading');
    }
  });
  
  // Social login handlers
  const socialButtons = document.querySelectorAll('.social-btn');
  
  socialButtons.forEach(button => {
    button.addEventListener('click', async function() {
      const provider = this.classList.contains('google') ? 'Google' :
                      this.classList.contains('facebook') ? 'Facebook' : 'Apple';
      
      // Show loading state
      this.classList.add('loading');
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // In a real application, you would:
        // 1. Redirect to the provider's OAuth endpoint
        // 2. Handle the callback with the authentication token
        // 3. Exchange the token with your backend
        // 4. Complete the login process
        
        showToast(`${provider} login would be implemented here`);
        
      } catch (error) {
        showToast(`${provider} login failed. Please try again.`);
        console.error(`${provider} login error:`, error);
      } finally {
        this.classList.remove('loading');
      }
    });
  });
  
  // Initialize form state
  updateFormValidity();
});
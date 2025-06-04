document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements
  const signupForm = document.getElementById('signupForm');
  const firstNameInput = document.getElementById('firstName');
  const lastNameInput = document.getElementById('lastName');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const confirmPasswordInput = document.getElementById('confirmPassword');
  const termsCheckbox = document.getElementById('terms');
  const signupBtn = document.querySelector('.signup-btn');
  const togglePasswordBtns = document.querySelectorAll('.toggle-password');
  const errorToast = document.getElementById('errorToast');
  
  // Form validation state
  let isFormValid = false;
  
  // Toggle password visibility
  togglePasswordBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const input = this.previousElementSibling;
      const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
      input.setAttribute('type', type);
      
      // Update icon
      const icon = this.querySelector('i');
      icon.classList.toggle('fa-eye');
      icon.classList.toggle('fa-eye-slash');
    });
  });
  
  // Input validation
  function validateName(name) {
    return name.length >= 2 && /^[a-zA-Z\s-']+$/.test(name);
  }
  
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
  
  function validatePassword(password) {
    // At least 6 characters, 1 uppercase, 1 lowercase, 1 number
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    return re.test(password);
  }
  
  function showError(input, message) {
    const field = input.closest('.input-field');
    field.classList.add('error');
    field.classList.remove('success');
    
    // Add error message if it doesn't exist
    let errorMessage = field.querySelector('.error-message');
    if (!errorMessage) {
      errorMessage = document.createElement('div');
      errorMessage.className = 'error-message';
      field.appendChild(errorMessage);
    }
    errorMessage.textContent = message;
  }
  
  function showSuccess(input) {
    const field = input.closest('.input-field');
    field.classList.remove('error');
    field.classList.add('success');
    const errorMessage = field.querySelector('.error-message');
    if (errorMessage) {
      errorMessage.textContent = '';
    }
  }
  
  function validateInput(input) {
    const value = input.value.trim();
    let isValid = true;
    
    if (input === firstNameInput || input === lastNameInput) {
      if (!value) {
        showError(input, `${input === firstNameInput ? 'First' : 'Last'} name is required`);
        isValid = false;
      } else if (!validateName(value)) {
        showError(input, 'Please enter a valid name');
        isValid = false;
      } else {
        showSuccess(input);
      }
    } else if (input === emailInput) {
      if (!value) {
        showError(input, 'Email is required');
        isValid = false;
      } else if (!validateEmail(value)) {
        showError(input, 'Please enter a valid email address');
        isValid = false;
      } else {
        showSuccess(input);
      }
    } else if (input === passwordInput) {
      if (!value) {
        showError(input, 'Password is required');
        isValid = false;
      } else if (!validatePassword(value)) {
        showError(input, 'Password must be at least 6 characters with 1 uppercase, 1 lowercase, and 1 number');
        isValid = false;
      } else {
        showSuccess(input);
      }
    } else if (input === confirmPasswordInput) {
      if (!value) {
        showError(input, 'Please confirm your password');
        isValid = false;
      } else if (value !== passwordInput.value) {
        showError(input, 'Passwords do not match');
        isValid = false;
      } else {
        showSuccess(input);
      }
    }
    
    return isValid;
  }
  
  // Real-time validation
  [firstNameInput, lastNameInput, emailInput, passwordInput, confirmPasswordInput].forEach(input => {
    input.addEventListener('input', function() {
      validateInput(this);
      updateFormValidity();
    });
    
    input.addEventListener('blur', function() {
      validateInput(this);
      updateFormValidity();
    });
  });
  
  termsCheckbox.addEventListener('change', updateFormValidity);
  
  function updateFormValidity() {
    const isTermsChecked = termsCheckbox.checked;
    isFormValid = validateInput(firstNameInput) &&
                 validateInput(lastNameInput) &&
                 validateInput(emailInput) &&
                 validateInput(passwordInput) &&
                 validateInput(confirmPasswordInput) &&
                 isTermsChecked;
    
    signupBtn.disabled = !isFormValid;
  }
  
  // Show toast message
  function showToast(message, type = 'error', duration = 3000) {
    errorToast.textContent = message;
    errorToast.className = `toast ${type}`;
    errorToast.classList.add('show');
    
    setTimeout(() => {
      errorToast.classList.remove('show');
    }, duration);
  }
  
  // Form submission
  signupForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    if (!isFormValid) {
      showToast('Please fix the errors in the form');
      return;
    }
    
    // Show loading state
    signupBtn.classList.add('loading');
    signupForm.classList.add('loading');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real application, you would:
      // 1. Make an actual API call to your registration endpoint
      // 2. Handle the response (success/error)
      // 3. Store the auth token if successful
      // 4. Redirect or show error message
      
      // For demo purposes, we'll simulate a successful registration
      showToast('Account created successfully! Redirecting...', 'success');
      
      setTimeout(() => {
        window.location.href = 'home.html';
      }, 1500);
      
    } catch (error) {
      showToast('Registration failed. Please try again.');
      console.error('Registration error:', error);
    } finally {
      signupBtn.classList.remove('loading');
      signupForm.classList.remove('loading');
    }
  });
  
  // Social signup handlers
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
        // 4. Complete the registration process
        
        showToast(`${provider} signup would be implemented here`);
        
      } catch (error) {
        showToast(`${provider} signup failed. Please try again.`);
        console.error(`${provider} signup error:`, error);
      } finally {
        this.classList.remove('loading');
      }
    });
  });
  
  // Initialize form state
  updateFormValidity();
});
document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements
  const form = document.querySelector('.form-fields');
  const firstNameInput = document.getElementById('firstName');
  const lastNameInput = document.getElementById('lastName');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const confirmPasswordInput = document.getElementById('confirmPassword');
  const termsCheckbox = document.getElementById('terms');
  const createAccountBtn = document.querySelector('.create-account-btn');
  const togglePasswordBtns = document.querySelectorAll('.toggle-password');
  const socialBtns = document.querySelectorAll('.social-btn');

  // Toggle password visibility for both password fields
  togglePasswordBtns.forEach(btn => {
      btn.addEventListener('click', function() {
          const inputField = this.closest('.input-field').querySelector('input');
          const type = inputField.getAttribute('type') === 'password' ? 'text' : 'password';
          inputField.setAttribute('type', type);
          
          // Toggle visual state
          this.classList.toggle('visible');
      });
  });

  // Form validation and submission
  createAccountBtn.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Reset previous error states
      clearErrors();
      
      // Validate inputs
      const isValid = validateForm();
      
      if (isValid) {
          // Simulate account creation (replace with actual API call)
          simulateAccountCreation();
      }
  });

  // Form validation function
  function validateForm() {
      let isValid = true;

      // Validate First Name
      if (!firstNameInput.value.trim()) {
          showError(firstNameInput, 'First name is required');
          isValid = false;
      }

      // Validate Last Name
      if (!lastNameInput.value.trim()) {
          showError(lastNameInput, 'Last name is required');
          isValid = false;
      }

      // Validate Email
      if (!emailInput.value.trim()) {
          showError(emailInput, 'Email is required');
          isValid = false;
      } else if (!validateEmail(emailInput.value)) {
          showError(emailInput, 'Please enter a valid email');
          isValid = false;
      }

      // Validate Password
      if (!passwordInput.value) {
          showError(passwordInput, 'Password is required');
          isValid = false;
      } else if (passwordInput.value.length < 8) {
          showError(passwordInput, 'Password must be at least 8 characters');
          isValid = false;
      }

      // Validate Confirm Password
      if (!confirmPasswordInput.value) {
          showError(confirmPasswordInput, 'Please confirm your password');
          isValid = false;
      } else if (passwordInput.value !== confirmPasswordInput.value) {
          showError(confirmPasswordInput, 'Passwords do not match');
          isValid = false;
      }

      // Validate Terms checkbox
      if (!termsCheckbox.checked) {
          const termsLabel = termsCheckbox.nextElementSibling;
          termsLabel.classList.add('error');
          isValid = false;
      }

      return isValid;
  }

  // Email validation helper
  function validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
  }

  // Show error message
  function showError(input, message) {
      const inputField = input.closest('.input-field');
      let errorElement = inputField.querySelector('.error-message');
      
      if (!errorElement) {
          errorElement = document.createElement('div');
          errorElement.className = 'error-message';
          inputField.appendChild(errorElement);
      }
      
      errorElement.textContent = message;
      inputField.classList.add('error');
  }

  // Clear all error states
  function clearErrors() {
      document.querySelectorAll('.input-field').forEach(field => {
          field.classList.remove('error');
          const errorMessage = field.querySelector('.error-message');
          if (errorMessage) errorMessage.remove();
      });
      
      termsCheckbox.nextElementSibling.classList.remove('error');
  }

  // Simulate account creation (replace with actual API call)
  function simulateAccountCreation() {
      // Show loading state
      createAccountBtn.textContent = 'Creating account...';
      createAccountBtn.disabled = true;
      
      // Simulate API call delay
      setTimeout(() => {
          // In a real app, you would:
          // 1. Collect form data
          const formData = {
              firstName: firstNameInput.value.trim(),
              lastName: lastNameInput.value.trim(),
              email: emailInput.value.trim(),
              password: passwordInput.value
          };
          
          // 2. Send to your backend API
          console.log('Form data to be sent:', formData);
          
          // 3. Handle response (success/error)
          // For demo, we'll assume success and redirect
          alert('Account created successfully! Redirecting to login...');
          window.location.href = 'index.html';
          
          // Reset button state in case redirect fails
          createAccountBtn.textContent = 'Create account';
          createAccountBtn.disabled = false;
      }, 1500);
  }

  // Social login button handlers
  socialBtns.forEach(btn => {
      btn.addEventListener('click', function() {
          let provider;
          
          if (this.classList.contains('facebook')) {
              provider = 'Facebook';
          } else if (this.classList.contains('google')) {
              provider = 'Google';
          } else if (this.classList.contains('apple')) {
              provider = 'Apple';
          }
          
          console.log(`Attempting ${provider} sign up`);
          alert(`${provider} sign up would be implemented here.\nThis would redirect to ${provider} OAuth.`);
          
          // In a real app:
          // 1. Redirect to provider's OAuth endpoint
          // 2. Handle callback with auth token
          // 3. Exchange token with your backend
          // 4. Complete signup process
      });
  });

  // Enhance input fields with focus effects
  document.querySelectorAll('.input-field input').forEach(input => {
      // Initialize fields with existing values
      if (input.value) {
          input.closest('.input-field').classList.add('has-value');
      }
      
      // Add focus/blur handlers
      input.addEventListener('focus', function() {
          this.closest('.input-field').classList.add('focused');
      });
      
      input.addEventListener('blur', function() {
          const field = this.closest('.input-field');
          field.classList.remove('focused');
          
          if (this.value) {
              field.classList.add('has-value');
          } else {
              field.classList.remove('has-value');
          }
      });
      
      // Add input handler for real-time validation on blur
      input.addEventListener('input', function() {
          if (this === passwordInput && confirmPasswordInput.value) {
              validatePasswordMatch();
          }
      });
  });

  // Real-time password match validation
  function validatePasswordMatch() {
      if (passwordInput.value && confirmPasswordInput.value && 
          passwordInput.value !== confirmPasswordInput.value) {
          confirmPasswordInput.closest('.input-field').classList.add('error');
      } else {
          confirmPasswordInput.closest('.input-field').classList.remove('error');
      }
  }
});
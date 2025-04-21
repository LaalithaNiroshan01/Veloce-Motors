document.addEventListener('DOMContentLoaded', function() {
  // Toggle password visibility
  const togglePasswordBtn = document.querySelector('.toggle-password');
  const passwordInput = document.getElementById('password');
  
  togglePasswordBtn.addEventListener('click', function() {
      const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', type);
      
      // Toggle the eye icon visual state
      this.classList.toggle('show-password');
  });

  // Form validation and submission
  const loginForm = document.querySelector('.form-fields');
  const loginBtn = document.querySelector('.create-account-btn');
  
  loginBtn.addEventListener('click', function(e) {
      e.preventDefault();
      
      const email = document.getElementById('email').value;
      const password = passwordInput.value;
      const rememberMe = document.getElementById('terms').checked;
      
      // Basic validation
      if (!email || !password) {
          alert('Please fill in both email and password fields.');
          return;
      }
      
      if (!validateEmail(email)) {
          alert('Please enter a valid email address.');
          return;
      }
      
      // In a real application, you would send this data to your server
      console.log('Login attempt with:', { email, password, rememberMe });
      
      // For demo purposes, we'll simulate a successful login
      simulateLogin();
  });
  
  // Email validation function
  function validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
  }
  
  // Simulate login (replace with actual API call)
  function simulateLogin() {
      // Show loading state
      loginBtn.textContent = 'Logging in...';
      loginBtn.disabled = true;
      
      // Simulate API call delay
      setTimeout(function() {
          // Redirect to home page after "successful" login
          window.location.href = 'home.html';
          
          // In a real app, you would:
          // 1. Make an actual API call to your authentication endpoint
          // 2. Handle the response (success/error)
          // 3. Store the auth token if successful
          // 4. Redirect or show error message
      }, 1500);
  }
  
  // Social login button handlers
  const socialButtons = document.querySelectorAll('.social-btn');
  
  socialButtons.forEach(button => {
      button.addEventListener('click', function() {
          let provider;
          
          if (this.classList.contains('facebook')) {
              provider = 'Facebook';
          } else if (this.classList.contains('google')) {
              provider = 'Google';
          } else if (this.classList.contains('apple')) {
              provider = 'Apple';
          }
          
          console.log(`Attempting ${provider} login`);
          alert(`${provider} login would be implemented here.\nIn a real app, this would redirect to ${provider} OAuth.`);
          
          // In a real application, you would:
          // 1. Redirect to the provider's OAuth endpoint
          // 2. Handle the callback with the authentication token
          // 3. Exchange the token with your backend
          // 4. Complete the login process
      });
  });
  
  // Enhance the form with input focus effects
  const inputFields = document.querySelectorAll('.input-field input');
  
  inputFields.forEach(input => {
      // Add focus/blur classes for better UX
      input.addEventListener('focus', function() {
          this.parentElement.classList.add('focused');
      });
      
      input.addEventListener('blur', function() {
          if (!this.value) {
              this.parentElement.classList.remove('focused');
          }
      });
      
      // Initialize fields that already have values
      if (input.value) {
          input.parentElement.classList.add('focused');
      }
  });
});
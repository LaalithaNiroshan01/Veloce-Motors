// DOM Elements
const header = document.querySelector('.header');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const scrollIndicator = document.querySelector('.scroll-indicator');
const animateElements = document.querySelectorAll('.animate-on-scroll');
const contactForm = document.querySelector('.contact-form');
const quickViewBtns = document.querySelectorAll('.btn-quick-view');
const modal = document.querySelector('.modal');
const modalClose = document.querySelector('.modal-close');

// Utility Functions
const showToast = (message, type = 'success') => {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);
  
  // Trigger reflow to enable animation
  toast.offsetHeight;
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
};

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const validateForm = (formData) => {
  const errors = {};
  
  if (!formData.get('name').trim()) {
    errors.name = 'Name is required';
  }
  
  if (!formData.get('email').trim()) {
    errors.email = 'Email is required';
  } else if (!validateEmail(formData.get('email'))) {
    errors.email = 'Please enter a valid email';
  }
  
  if (!formData.get('subject').trim()) {
    errors.subject = 'Subject is required';
  }
  
  if (!formData.get('message').trim()) {
    errors.message = 'Message is required';
  }
  
  return errors;
};

const showFormError = (input, message) => {
  const formGroup = input.closest('.form-group');
  const errorElement = formGroup.querySelector('.error-message') || document.createElement('div');
  errorElement.className = 'error-message';
  errorElement.textContent = message;
  
  if (!formGroup.querySelector('.error-message')) {
    formGroup.appendChild(errorElement);
  }
  
  input.classList.add('error');
};

const clearFormError = (input) => {
  const formGroup = input.closest('.form-group');
  const errorElement = formGroup.querySelector('.error-message');
  
  if (errorElement) {
    errorElement.remove();
  }
  
  input.classList.remove('error');
};

// Header Scroll Effect
let lastScroll = 0;
const handleScroll = () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
};

// Mobile Menu Toggle
const toggleMobileMenu = () => {
  const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
  mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
  navLinks.classList.toggle('show');
  
  // Animate menu button
  const spans = mobileMenuBtn.querySelectorAll('span');
  if (!isExpanded) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
  }
};

// Scroll Animation
const handleScrollAnimation = () => {
  animateElements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const elementBottom = element.getBoundingClientRect().bottom;
    const isVisible = (elementTop < window.innerHeight - 100) && (elementBottom > 0);
    
    if (isVisible) {
      element.classList.add('visible');
    }
  });
};

// Update active navigation item based on scroll position
const updateActiveNavItem = () => {
  const sections = document.querySelectorAll('section[id]');
  const scrollPosition = window.scrollY + header.offsetHeight + 100;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    const navItem = document.querySelector(`.nav-item[href="#${sectionId}"]`);

    if (navItem && scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
      navItem.classList.add('active');
    }
  });
};

// Enhanced smooth scroll with active state
const handleSmoothScroll = (e) => {
  if (e.target.matches('a[href^="#"]')) {
    e.preventDefault();
    const targetId = e.target.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      const headerOffset = header.offsetHeight;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      // Update active state
      document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
      e.target.classList.add('active');
      
      // Smooth scroll
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // Close mobile menu if open
      if (navLinks.classList.contains('show')) {
        toggleMobileMenu();
      }
    }
  }
};

// Contact Form Handler
const handleContactSubmit = async (e) => {
  e.preventDefault();
  
  const form = e.target;
  const formData = new FormData(form);
  const errors = validateForm(formData);
  
  // Clear previous errors
  form.querySelectorAll('.error-message').forEach(el => el.remove());
  form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
  
  if (Object.keys(errors).length > 0) {
    Object.entries(errors).forEach(([field, message]) => {
      const input = form.querySelector(`[name="${field}"]`);
      showFormError(input, message);
    });
    return;
  }
  
  // Add loading state
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.classList.add('loading');
  submitBtn.disabled = true;
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Show success message
    showToast('Message sent successfully! We\'ll get back to you soon.');
    form.reset();
  } catch (error) {
    console.error('Error sending message:', error);
    showToast('Failed to send message. Please try again.', 'error');
  } finally {
    // Remove loading state
    submitBtn.classList.remove('loading');
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
  }
};

// Quick View Modal
const handleQuickView = (e) => {
  e.preventDefault();
  const productCard = e.target.closest('.product-card');
  const productName = productCard.querySelector('h4').textContent;
  const productPrice = productCard.querySelector('.price').textContent;
  const productImage = productCard.querySelector('img').src;
  const productDescription = productCard.querySelector('p').textContent;
  
  // Update modal content
  modal.querySelector('.modal-title').textContent = productName;
  modal.querySelector('.modal-content').innerHTML = `
    <button class="modal-close" aria-label="Close modal">
      <i class="fas fa-times"></i>
    </button>
    <div class="modal-body">
      <img src="${productImage}" alt="${productName}" class="modal-image">
      <div class="modal-info">
        <h3 class="modal-price">${productPrice}</h3>
        <p>${productDescription}</p>
        <button class="btn-primary">Add to Cart</button>
      </div>
    </div>
  `;
  
  // Show modal
  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
  
  // Add event listener to new close button
  modal.querySelector('.modal-close').addEventListener('click', handleModalClose);
};

const handleModalClose = () => {
  modal.classList.remove('show');
  document.body.style.overflow = '';
};

// Event Listeners
window.addEventListener('scroll', () => {
  handleScroll();
  handleScrollAnimation();
  updateActiveNavItem();
});

window.addEventListener('load', () => {
  // Add animate-on-scroll class to elements
  document.querySelectorAll('.section-header, .feature-card, .car-card, .product-card, .contact-form').forEach(el => {
    el.classList.add('animate-on-scroll');
  });
  
  // Initial scroll animation check
  handleScrollAnimation();
});

mobileMenuBtn.addEventListener('click', toggleMobileMenu);

document.addEventListener('click', handleSmoothScroll);

if (contactForm) {
  contactForm.addEventListener('submit', handleContactSubmit);
  
  // Real-time validation
  contactForm.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('input', () => {
      clearFormError(input);
    });
    
    input.addEventListener('blur', () => {
      const formData = new FormData(contactForm);
      const errors = validateForm(formData);
      
      if (errors[input.name]) {
        showFormError(input, errors[input.name]);
      }
    });
  });
}

quickViewBtns.forEach(btn => {
  btn.addEventListener('click', handleQuickView);
});

modalClose.addEventListener('click', handleModalClose);

// Close modal on outside click
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    handleModalClose();
  }
});

// Close modal on escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('show')) {
    handleModalClose();
  }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  checkDemoSession();
  updateLoginButton();
  
  // Add scroll indicator click handler
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
      const featuresSection = document.querySelector('.features');
      if (featuresSection) {
        featuresSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
  
  // Add loading animation to buttons
  document.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', function(e) {
      if (this.classList.contains('loading')) return;
      
      const originalText = this.textContent;
      this.classList.add('loading');
      this.disabled = true;
      
      // Simulate loading state
      setTimeout(() => {
        this.classList.remove('loading');
        this.disabled = false;
        this.textContent = originalText;
      }, 1000);
    });
  });
});

// Check demo user session
const checkDemoSession = () => {
  const isDemoUser = sessionStorage.getItem('isDemoUser');
  if (!isDemoUser) {
    window.location.href = 'index.html';
  }
};

// Logout handler
const handleLogout = () => {
  sessionStorage.removeItem('isDemoUser');
  window.location.href = 'index.html';
};

// Update login button to logout for demo user
const updateLoginButton = () => {
  const loginBtn = document.querySelector('.btn-login');
  if (loginBtn) {
    loginBtn.textContent = 'Logout';
    loginBtn.addEventListener('click', (e) => {
      e.preventDefault();
      handleLogout();
    });
  }
};
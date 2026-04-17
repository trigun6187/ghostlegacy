/**
 * Ghost Legacy - Gaming Website
 * Interactive JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
  
  // ====================================
  // Mobile Menu Toggle
  // ====================================
  
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const mainNav = document.getElementById('mainNav');
  const navLinks = document.querySelectorAll('.nav-link');
  
  if (mobileMenuToggle && mainNav) {
    mobileMenuToggle.addEventListener('click', function() {
      mobileMenuToggle.classList.toggle('active');
      mainNav.classList.toggle('active');
      
      // Prevent body scroll when menu is open
      document.body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking a nav link
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        mobileMenuToggle.classList.remove('active');
        mainNav.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }
  
  // ====================================
  // Header Scroll Effect
  // ====================================
  
  const header = document.querySelector('.site-header');
  
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }
  
  // ====================================
  // Smooth Scroll for Anchor Links
  // ====================================
  
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // ====================================
  // Active Nav Link Highlighting
  // ====================================
  
  const sections = document.querySelectorAll('section[id]');
  
  if (sections.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -20% 0px',
      threshold: 0
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            const linkId = link.getAttribute('href').replace('#', '');
            if (linkId === entry.target.id) {
              navLinks.forEach(l => l.classList.remove('active'));
              link.classList.add('active');
            }
          });
        }
      });
    }, observerOptions);
    
    sections.forEach(section => {
      observer.observe(section);
    });
  }
  
  // ====================================
  // Contact Form Validation
  // ====================================
  
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const budget = document.getElementById('budget').value.trim();
      const message = document.getElementById('message').value.trim();
      
      // Simple validation
      if (!name || !email || !message) {
        showNotification('Please fill in all required fields.', 'error');
        return;
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
      }
      
      // Show success message
      showNotification('Thank you! Your message has been sent. We\'ll get back to you soon.', 'success');
      
      // Reset form
      contactForm.reset();
      
      // In a real application, you would submit the form data here
      console.log('Form submitted:', {
        name,
        email,
        budget,
        message
      });
    });
  }
  
  // ====================================
  // Notification System
  // ====================================
  
  function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
      existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        <span class="notification-message">${message}</span>
        <button class="notification-close" aria-label="Close notification">&times;</button>
      </div>
    `;
    
    // Add styles
    notification.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      min-width: 300px;
      max-width: 400px;
      padding: 16px 20px;
      background: ${type === 'success' ? 'rgba(16, 185, 129, 0.9)' : type === 'error' ? 'rgba(220, 53, 69, 0.9)' : 'rgba(33, 37, 43, 0.95)'};
      color: white;
      border-radius: 8px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
      z-index: var(--z-tooltip);
      display: flex;
      align-items: center;
      gap: 12px;
      animation: slideInRight 0.3s ease-out;
      backdrop-filter: blur(10px);
    `;
    
    // Add close button
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', function() {
      notification.style.animation = 'slideOutRight 0.3s ease-out';
      setTimeout(() => notification.remove(), 300);
    });
    
    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideInRight {
        from {
          transform: translateX(400px);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      @keyframes slideOutRight {
        from {
          transform: translateX(0);
          opacity: 1;
        }
        to {
          transform: translateX(400px);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
      }
    }, 5000);
  }
  
  // ====================================
  // Service Cards Stagger Animation
  // ====================================
  
  const serviceCards = document.querySelectorAll('.service-card');
  
  if (serviceCards.length > 0) {
    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const card = entry.target;
          const delay = card.dataset.index * 100;
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, delay);
          cardObserver.unobserve(card);
        }
      });
    }, { threshold: 0.1 });
    
    serviceCards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      card.dataset.index = index;
      cardObserver.observe(card);
    });
  }
  
  // ====================================
  // Project Cards Stagger Animation
  // ====================================
  
  const projectCards = document.querySelectorAll('.project-card');
  
  if (projectCards.length > 0) {
    const projectObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const card = entry.target;
          const delay = card.dataset.index * 150;
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, delay);
          projectObserver.unobserve(card);
        }
      });
    }, { threshold: 0.1 });
    
    projectCards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      card.dataset.index = index;
      projectObserver.observe(card);
    });
  }
  
  // ====================================
  // Console Welcome Message
  // ====================================
  
  console.log('%c🎮 Ghost Legacy', 'font-size: 24px; font-weight: bold; color: #ff4757;');
  console.log('%cPremium Gaming Hardware & Custom PC Builds', 'font-size: 14px; color: #a1a1aa;');
  console.log('%c%c%c%c', 'color: #00ff00; background: #000; padding: 2px 6px; font-family: monospace;');
  console.log('Welcome to Ghost Legacy!');
  
  // ====================================
  // Typing Effect for Hero (Optional)
  // ====================================
  
  const heroSubtitle = document.querySelector('.hero-subtitle');
  
  if (heroSubtitle) {
    const originalText = heroSubtitle.textContent;
    heroSubtitle.textContent = '';
    
    let charIndex = 0;
    const typingSpeed = 50;
    
    function typeText() {
      if (charIndex < originalText.length) {
        heroSubtitle.textContent += originalText.charAt(charIndex);
        charIndex++;
        setTimeout(typeText, typingSpeed);
      }
    }
    
    // Start typing effect after a short delay
    setTimeout(typeText, 500);
  }
  
  // ====================================
  // Parallax Effect for Hero Background
  // ====================================
  
  const heroSection = document.querySelector('.hero-section');
  
  if (heroSection) {
    window.addEventListener('scroll', function() {
      const scrolled = window.pageYOffset;
      const parallaxAmount = scrolled * 0.5;
      
      const heroOverlay = document.querySelector('.hero-overlay');
      if (heroOverlay) {
        heroOverlay.style.transform = `translateY(${parallaxAmount}px)`;
      }
    });
  }
  
  // ====================================
  // Form Input Animations
  // ====================================
  
  const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
  
  formInputs.forEach(input => {
    input.addEventListener('focus', function() {
      this.parentElement.style.transform = 'translateX(4px)';
    });
    
    input.addEventListener('blur', function() {
      this.parentElement.style.transform = 'translateX(0)';
    });
  });
  
});

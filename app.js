/* ==========================================================================
   PREMIUM LIGHT-THEMED PORTFOLIO JAVASCRIPT
   Author: Antigravity AI
   Target: Uppara Mahesh (AI & ML Engineer / Web Developer)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  
  // --- DOM Selectors ---
  const navbar = document.getElementById('navbar');
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status-msg');
  const skillBarFills = document.querySelectorAll('.skill-bar-fill');
  
  // ==========================================================================
  // STICKY NAVBAR & ACTIVE NAVIGATION LINK TRACKING
  // ==========================================================================
  
  const handleScroll = () => {
    // Add scrolled class to navbar
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    // Track active navigation link on scroll
    let current = '';
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + 120; // offset for nav height
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').includes(current)) {
        link.classList.add('active');
      }
    });
  };
  
  window.addEventListener('scroll', handleScroll);
  
  // ==========================================================================
  // MOBILE NAVIGATION MENU
  // ==========================================================================
  
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('open');
    navMenu.classList.toggle('open');
  });
  
  // Close menu when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('open');
      navMenu.classList.remove('open');
    });
  });
  
  // Close menu when clicking outside of the nav menu
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && navMenu.classList.contains('open')) {
      menuToggle.classList.remove('open');
      navMenu.classList.remove('open');
    }
  });

  // ==========================================================================
  // PROJECT FILTERING SYSTEM
  // ==========================================================================
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active classes
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const filterValue = btn.getAttribute('data-filter');
      
      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        // Dynamic animation transition
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px) scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // ==========================================================================
  // SCROLL-TRIGGERED REVEAL ANIMATIONS (Intersection Observer)
  // ==========================================================================
  
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  
  const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        
        // If it's a skills section, animate the progress bars
        if (entry.target.id === 'skills' || entry.target.contains(document.querySelector('.skill-bar-fill'))) {
          animateSkillBars();
        }
        
        // Stop observing once animated
        observer.unobserve(entry.target);
      }
    });
  };
  
  const revealObserver = new IntersectionObserver(revealCallback, {
    root: null, // Viewport
    threshold: 0.15, // Trigger when 15% of the element is visible
    rootMargin: '0px'
  });
  
  revealElements.forEach(element => {
    revealObserver.observe(element);
  });
  
  // Fallback for elements already in view on load
  setTimeout(() => {
    handleScroll();
  }, 100);

  // ==========================================================================
  // SKILLS PROGRESS BAR ANIMATION
  // ==========================================================================
  
  const animateSkillBars = () => {
    skillBarFills.forEach(bar => {
      const percentage = bar.getAttribute('data-percent');
      bar.style.width = percentage;
    });
  };

  // ==========================================================================
  // INTERACTIVE CONTACT FORM SUBMISSION
  // ==========================================================================
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('.submit-btn');
      const submitBtnText = submitBtn.querySelector('span');
      const submitBtnIcon = submitBtn.querySelector('i');
      
      // Get field values
      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email-input').value.trim();
      const subject = document.getElementById('contact-subject').value.trim();
      const message = document.getElementById('contact-message').value.trim();
      
      if (!name || !email || !subject || !message) {
        showStatus('Please fill in all fields before sending.', 'error');
        return;
      }
      
      // Update UI button state to submitting
      submitBtn.disabled = true;
      submitBtnText.textContent = 'Sending Message...';
      submitBtnIcon.className = 'fa-solid fa-circle-notch fa-spin';
      
      // Simulate API submission call (e.g. Formspree / EmailJS)
      setTimeout(() => {
        // Restore button state
        submitBtn.disabled = false;
        submitBtnText.textContent = 'Send Message';
        submitBtnIcon.className = 'fa-solid fa-paper-plane';
        
        // Show success status card
        showStatus(`Thank you, ${name}! Your message has been sent successfully. I will get back to you shortly.`, 'success');
        
        // Reset form inputs
        contactForm.reset();
        
        // Fade out status card after a few seconds
        setTimeout(() => {
          formStatus.style.display = 'none';
        }, 6000);
        
      }, 2000);
    });
  }
  
  const showStatus = (msg, type) => {
    formStatus.textContent = msg;
    formStatus.className = 'form-status'; // Reset classes
    
    if (type === 'success') {
      formStatus.classList.add('success');
    } else {
      formStatus.classList.add('error');
    }
  };
  
});

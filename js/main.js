/* ============================================
   MAIN.JS — DigiArtist Portfolio
   Main Application Logic
   ============================================ */

const App = (() => {
  'use strict';

  // --- DOM References (cached) ---
  let navbar, hamburger, mobileLinks, scrollProgress, backToTop;
  let testimonialTrack, testimonialDots, testimonialBtns;
  let faqItems;
  let contactForm;

  // --- Navbar ---
  const initNavbar = () => {
    navbar = document.getElementById('navbar');
    hamburger = document.getElementById('hamburger');
    mobileLinks = document.getElementById('navbar-links');

    if (!navbar) return;

    // Scroll effect
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      navbar.classList.toggle('scrolled', scrolled);
    };

    window.addEventListener('scroll', Utils.throttle(handleScroll, 16));
    handleScroll(); // Initial check

    // Mobile menu
    if (hamburger && mobileLinks) {
      hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileLinks.classList.toggle('active');
        document.body.style.overflow = mobileLinks.classList.contains('active') ? 'hidden' : '';
      });

      // Close mobile menu on link click
      mobileLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          hamburger.classList.remove('active');
          mobileLinks.classList.remove('active');
          document.body.style.overflow = '';
        });
      });
    }

    // Close mobile menu on resize
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        if (hamburger) hamburger.classList.remove('active');
        if (mobileLinks) mobileLinks.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  };

  // --- Scroll Progress ---
  const initScrollProgress = () => {
    scrollProgress = document.getElementById('scroll-progress');
    if (!scrollProgress) return;

    const updateProgress = () => {
      const winHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (window.scrollY / winHeight) * 100;
      scrollProgress.style.width = `${scrolled}%`;
    };

    window.addEventListener('scroll', Utils.throttle(updateProgress, 16));
    updateProgress();
  };

  // --- Back to Top ---
  const initBackToTop = () => {
    backToTop = document.getElementById('back-to-top');
    if (!backToTop) return;

    window.addEventListener('scroll', Utils.throttle(() => {
      backToTop.classList.toggle('visible', window.scrollY > 500);
    }, 16));

    backToTop.addEventListener('click', () => {
      Utils.smoothScroll('#hero', 800);
    });
  };

  // --- Smooth Scroll for Anchor Links ---
  const initSmoothScroll = () => {
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;

      const targetId = link.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offset = navbar?.classList.contains('scrolled') ? 70 : 80;
        const targetPos = target.offsetTop - offset;
        
        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });
      }
    });
  };

  // --- Testimonials Slider ---
  const initTestimonials = () => {
    const track = document.getElementById('testimonials-track');
    const dots = document.querySelectorAll('.testimonial-dot');
    const prevBtn = document.getElementById('testimonial-prev');
    const nextBtn = document.getElementById('testimonial-next');

    if (!track) return;

    let currentSlide = 0;
    const slides = track.children;
    const totalSlides = slides.length;
    let autoSlideInterval;

    const goToSlide = (index) => {
      if (index < 0) index = totalSlides - 1;
      if (index >= totalSlides) index = 0;
      currentSlide = index;
      
      track.style.transform = `translateX(-${currentSlide * 100}%)`;

      // Update dots
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
      });
    };

    const startAutoSlide = () => {
      stopAutoSlide();
      autoSlideInterval = setInterval(() => {
        goToSlide(currentSlide + 1);
      }, 5000);
    };

    const stopAutoSlide = () => {
      if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
        autoSlideInterval = null;
      }
    };

    // Navigation
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        goToSlide(currentSlide - 1);
        startAutoSlide();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        goToSlide(currentSlide + 1);
        startAutoSlide();
      });
    }

    // Dot navigation
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        goToSlide(i);
        startAutoSlide();
      });
    });

    // Pause on hover
    track.addEventListener('mouseenter', stopAutoSlide);
    track.addEventListener('mouseleave', startAutoSlide);

    // Touch support
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      stopAutoSlide();
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) goToSlide(currentSlide + 1);
        else goToSlide(currentSlide - 1);
      }
      startAutoSlide();
    }, { passive: true });

    // Start
    goToSlide(0);
    startAutoSlide();
  };

  // --- FAQ Accordion ---
  const initFAQ = () => {
    faqItems = document.querySelectorAll('.faq-item');
    
    if (!faqItems.length) return;

    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      const answer = item.querySelector('.faq-answer');
      
      if (!question || !answer) return;

      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all
        faqItems.forEach(other => {
          const otherAnswer = other.querySelector('.faq-answer');
          other.classList.remove('active');
          if (otherAnswer) otherAnswer.style.maxHeight = '0';
        });

        // Toggle current
        if (!isActive) {
          item.classList.add('active');
          answer.style.maxHeight = `${answer.scrollHeight}px`;
        }
      });
    });
  };

  // --- Contact Form ---
  const initContactForm = () => {
    contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    const inputs = contactForm.querySelectorAll('.form-input, .form-textarea');

    // Real-time validation on blur
    inputs.forEach(input => {
      input.addEventListener('blur', () => {
        validateField(input);
      });

      input.addEventListener('input', () => {
        if (input.classList.contains('error')) {
          validateField(input);
        }
      });
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;
      inputs.forEach(input => {
        if (!validateField(input)) {
          isValid = false;
        }
      });

      if (!isValid) return;

      // Simulate sending
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      setTimeout(() => {
        submitBtn.textContent = 'Message Sent! ✓';
        submitBtn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
        
        setTimeout(() => {
          contactForm.reset();
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          submitBtn.style.background = '';
        }, 3000);
      }, 1500);
    });
  };

  const validateField = (input) => {
    const value = input.value.trim();
    let isValid = true;

    input.classList.remove('error');

    if (input.hasAttribute('required') && !value) {
      isValid = false;
    }

    if (input.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        isValid = false;
      }
    }

    if (!isValid) {
      input.classList.add('error');
    }

    return isValid;
  };

  // --- Active Navigation Highlight ---
  const initScrollSpy = () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-links a');
    
    if (!sections.length || !navLinks.length) return;

    Utils.createScrollSpy(sections, navLinks);
  };

  // --- Dynamic Year ---
  const initYear = () => {
    const yearEl = document.getElementById('current-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  };

  // --- Initialize Everything ---
  const init = () => {
    initNavbar();
    initScrollProgress();
    initBackToTop();
    initSmoothScroll();
    initTestimonials();
    initFAQ();
    initContactForm();
    initScrollSpy();
    initYear();
  };

  return { init };
})();

// --- Boot ---
document.addEventListener('DOMContentLoaded', () => {
  // Initialize in order
  Utils.lazyLoadImages();
  App.init();
  Portfolio.init();
  Animations.init();
});

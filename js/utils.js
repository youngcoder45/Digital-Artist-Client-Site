/* ============================================
   UTILS.JS — DigiArtist Portfolio
   Helper Utilities
   ============================================ */

const Utils = (() => {
  'use strict';

  // --- DOM Helpers ---
  const $ = (selector, context = document) => context.querySelector(selector);
  const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];

  // --- Debounce ---
  const debounce = (fn, delay = 100) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  };

  // --- Throttle ---
  const throttle = (fn, limit = 100) => {
    let inThrottle = false;
    return (...args) => {
      if (!inThrottle) {
        fn(...args);
        inThrottle = true;
        setTimeout(() => { inThrottle = false; }, limit);
      }
    };
  };

  // --- Scroll Spy ---
  const createScrollSpy = (sections, navLinks, options = {}) => {
    const { offset = 100 } = options;

    const updateActiveLink = () => {
      const scrollPos = window.scrollY + offset;
      
      let currentSection = '';
      for (const section of sections) {
        if (!section) continue;
        const top = section.offsetTop;
        const height = section.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          currentSection = section.id;
          break;
        }
      }

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
          link.classList.add('active');
        }
      });
    };

    window.addEventListener('scroll', throttle(updateActiveLink, 100));
    window.addEventListener('load', updateActiveLink);
    
    return updateActiveLink;
  };

  // --- Lazy Loading ---
  const lazyLoadImages = () => {
    if ('loading' in HTMLImageElement.prototype) {
      $$('img[data-src]').forEach(img => {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      });
    } else {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
          }
        });
      }, { rootMargin: '200px' });

      $$('img[data-src]').forEach(img => observer.observe(img));
    }
  };

  // --- Smooth Scroll ---
  const smoothScroll = (target, duration = 800) => {
    const targetEl = typeof target === 'string' 
      ? $(target) 
      : target;
    
    if (!targetEl) return;
    
    const targetPos = Utils.getOffsetTop(targetEl);
    
    const startPos = window.pageYOffset;
    const distance = targetPos - startPos;
    let startTime = null;

    const easeInOutCubic = t => {
      return t < 0.5 
        ? 4 * t * t * t 
        : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const animation = currentTime => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const easedProgress = easeInOutCubic(progress);
      
      window.scrollTo(0, startPos + distance * easedProgress);
      
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  // --- Animate Counter ---
  const animateCounter = (el, target, duration = 2000) => {
    let current = 0;
    const increment = target / (duration / 16);
    const suffix = el.dataset.suffix || '';

    const update = () => {
      current += increment;
      if (current < target) {
        el.textContent = Math.floor(current) + suffix;
        requestAnimationFrame(update);
      } else {
        el.textContent = target + suffix;
      }
    };

    update();
  };

  // --- Create Ripple ---
  const createRipple = (e, btn) => {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
    
    btn.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  };

  // --- Preload Images ---
  const preloadImages = (urls) => {
    return Promise.all(urls.map(url => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = reject;
        img.src = url;
      });
    }));
  };

  // --- Get Offset Top (handling fixed headers) ---
  const getOffsetTop = (el) => {
    let offset = 0;
    while (el) {
      offset += el.offsetTop;
      el = el.offsetParent;
    }
    return offset;
  };

  // --- Detect Touch Device ---
  const isTouchDevice = () => {
    return 'ontouchstart' in window || 
           navigator.maxTouchPoints > 0 ||
           navigator.msMaxTouchPoints > 0;
  };

  // --- Set CSS Variable ---
  const setCSSVar = (name, value) => {
    document.documentElement.style.setProperty(name, value);
  };

  // --- Random Between ---
  const randomBetween = (min, max) => {
    return Math.random() * (max - min) + min;
  };

  // --- Clamp ---
  const clamp = (value, min, max) => {
    return Math.min(Math.max(value, min), max);
  };

  // --- Map Range ---
  const mapRange = (value, inMin, inMax, outMin, outMax) => {
    return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  };

  // Public API
  return {
    $,
    $$,
    debounce,
    throttle,
    createScrollSpy,
    lazyLoadImages,
    smoothScroll,
    animateCounter,
    createRipple,
    preloadImages,
    getOffsetTop,
    isTouchDevice,
    setCSSVar,
    randomBetween,
    clamp,
    mapRange
  };
})();

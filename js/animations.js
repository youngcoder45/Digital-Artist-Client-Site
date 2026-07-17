/* ============================================
   ANIMATIONS.JS — DigiArtist Portfolio
   All Animation Logic
   ============================================ */

const Animations = (() => {
  'use strict';

  // --- Scroll Reveal (Intersection Observer) ---
  const initScrollReveal = () => {
    const elements = Utils.$$('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-stagger');
    
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(el => observer.observe(el));
  };

  // --- Parallax Effect ---
  const initParallax = () => {
    const parallaxElements = Utils.$$('[data-parallax]');
    
    if (!parallaxElements.length || Utils.isTouchDevice()) return;

    const handleParallax = () => {
      const scrollY = window.scrollY;
      
      parallaxElements.forEach(el => {
        const speed = parseFloat(el.dataset.parallax) || 0.5;
        const yPos = scrollY * speed;
        el.style.transform = `translateY(${yPos}px)`;
      });
    };

    window.addEventListener('scroll', Utils.throttle(handleParallax, 16));
  };

  // --- Mouse Parallax (Hero Shapes) ---
  const initMouseParallax = () => {
    const shapes = Utils.$$('.hero-shape');
    
    if (!shapes.length || Utils.isTouchDevice()) return;

    const handleMouseMove = (e) => {
      const xPos = (e.clientX / window.innerWidth - 0.5) * 2;
      const yPos = (e.clientY / window.innerHeight - 0.5) * 2;

      shapes.forEach((shape, index) => {
        const speed = (index + 1) * 5;
        const x = xPos * speed;
        const y = yPos * speed;
        shape.style.transform = `translate(${x}px, ${y}px) rotate(${x * 0.5}deg)`;
      });
    };

    document.addEventListener('mousemove', Utils.throttle(handleMouseMove, 16));
  };

  // --- Hero Gradient Orb Parallax ---
  const initOrbParallax = () => {
    const orbs = Utils.$$('.hero-orb');
    
    if (!orbs.length || Utils.isTouchDevice()) return;

    const handleMouseMove = (e) => {
      const xPos = (e.clientX / window.innerWidth - 0.5) * 2;
      const yPos = (e.clientY / window.innerHeight - 0.5) * 2;

      orbs.forEach((orb, index) => {
        const speed = (index + 1) * 15;
        const x = xPos * speed;
        const y = yPos * speed;
        orb.style.transform = `translate(${x}px, ${y}px)`;
      });
    };

    document.addEventListener('mousemove', Utils.throttle(handleMouseMove, 16));
  };

  // --- Animated Counters ---
  const initCounters = () => {
    const counters = Utils.$$('.stat-number');
    
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.target, 10);
          if (!isNaN(target)) {
            Utils.animateCounter(el, target);
          }
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
  };

  // --- Ripple Buttons ---
  const initRippleButtons = () => {
    const buttons = Utils.$$('.ripple-btn');
    
    buttons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        Utils.createRipple(e, btn);
      });
    });
  };

  // --- Skill Rings Animation ---
  const initSkillRings = () => {
    const rings = Utils.$$('.skill-ring-progress');
    
    if (!rings.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    rings.forEach(ring => {
      const percent = parseInt(ring.dataset.percent, 10);
      if (!isNaN(percent)) {
        const circumference = 2 * Math.PI * 40; // r=40
        const offset = circumference - (percent / 100) * circumference;
        ring.style.setProperty('--target-dashoffset', offset);
        observer.observe(ring);
      }
    });
  };

  // --- Floating Elements ---
  const initFloatingElements = () => {
    const floats = Utils.$$('.float-y, .float-x, .float-rotate');
    // Just add random delays
    floats.forEach((el, i) => {
      el.style.animationDelay = `${i * 0.5}s`;
    });
  };

  // --- Text Reveal Animation ---
  const initTextReveal = () => {
    const textElements = Utils.$$('.text-reveal-animate');
    
    if (!textElements.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const text = el.textContent;
          const chars = text.split('');
          
          el.innerHTML = '';
          chars.forEach((char, index) => {
            const span = document.createElement('span');
            span.className = 'char';
            span.style.animationDelay = `${index * 0.03}s`;
            span.textContent = char === ' ' ? '\u00A0' : char;
            el.appendChild(span);
          });
          
          el.classList.add('revealed');
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    textElements.forEach(el => observer.observe(el));
  };

  // --- Word Reveal ---
  const initWordReveal = () => {
    const wordElements = Utils.$$('.word-reveal');
    
    if (!wordElements.length) return;

    wordElements.forEach(el => {
      const text = el.textContent;
      const words = text.split(' ');
      
      el.innerHTML = '';
      words.forEach((word, index) => {
        const span = document.createElement('span');
        span.className = 'word';
        span.style.animationDelay = `${index * 0.12}s`;
        span.textContent = word;
        el.appendChild(span);
        if (index < words.length - 1) {
          el.appendChild(document.createTextNode('\u00A0'));
        }
      });
    });
  };

  // --- Animated Gradient Background ---
  const initAnimatedGradients = () => {
    const gradientElements = Utils.$$('.gradient-animate');
    gradientElements.forEach(el => {
      el.classList.add('gradient-shift');
    });
  };

  // --- Background Particles (for hero) ---
  const initParticles = () => {
    const container = document.getElementById('particles-canvas');
    if (!container || Utils.isTouchDevice()) return;

    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:1;';
    container.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;

    const resize = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
    };

    const createParticles = () => {
      particles = [];
      const count = Math.floor((canvas.width * canvas.height) / 8000);
      
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 1,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          opacity: Math.random() * 0.5 + 0.1
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 92, 246, ${p.opacity})`;
        ctx.fill();

        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(139, 92, 246, ${(1 - distance / 120) * 0.1})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    resize();
    createParticles();
    draw();

    window.addEventListener('resize', () => {
      resize();
      createParticles();
    });

    // Return cleanup function
    return () => {
      cancelAnimationFrame(animationId);
    };
  };

  // --- Loading Screen ---
  const initLoadingScreen = () => {
    const loadingScreen = document.getElementById('loading-screen');
    if (!loadingScreen) return;

    const loadingFill = loadingScreen.querySelector('.loading-bar-fill');
    const progressText = loadingScreen.querySelector('.loading-progress-text');

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15 + 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        
        if (loadingFill) loadingFill.style.width = '100%';
        if (progressText) progressText.textContent = '100%';
        
        setTimeout(() => {
          loadingScreen.classList.add('hidden');
          document.body.style.overflow = '';
        }, 400);
      }
      
      if (loadingFill) loadingFill.style.width = `${progress}%`;
      if (progressText) progressText.textContent = `${Math.floor(progress)}%`;
    }, 200);

    // Fallback: hide after 3 seconds max
    setTimeout(() => {
      clearInterval(interval);
      if (!loadingScreen.classList.contains('hidden')) {
        if (loadingFill) loadingFill.style.width = '100%';
        if (progressText) progressText.textContent = '100%';
        setTimeout(() => {
          loadingScreen.classList.add('hidden');
          document.body.style.overflow = '';
        }, 300);
      }
    }, 3000);
  };

  // --- Initialize All Animations ---
  const init = () => {
    initLoadingScreen();
    initScrollReveal();
    initParallax();
    initMouseParallax();
    initOrbParallax();
    initCounters();
    initRippleButtons();
    initSkillRings();
    initFloatingElements();
    initTextReveal();
    initWordReveal();
    initAnimatedGradients();
    initParticles();
  };

  return { init };
})();

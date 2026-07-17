/* ============================================
   PORTFOLIO.JS — DigiArtist Portfolio
   Gallery Filtering & Lightbox Module
   ============================================ */

const Portfolio = (() => {
  'use strict';

  // --- Portfolio Data ---
  const portfolioData = [
    {
      id: 1,
      title: 'Nebula Brand Identity',
      category: 'brand-identity',
      categoryLabel: 'Brand Identity',
      description: 'Complete brand identity design for a tech startup including logo, color palette, typography, and brand guidelines.',
      software: 'Adobe Illustrator, Figma',
      client: 'Nebula Tech',
      date: 'March 2026',
      icon: '',
      bg: 'linear-gradient(135deg, #1a0533, #0d1b2a)'
    },
    {
      id: 2,
      title: 'Lumina Logo Design',
      category: 'logo-designs',
      categoryLabel: 'Logo Designs',
      description: 'Modern minimal logo for a premium lighting company. The mark represents both a lightbulb and a blooming flower.',
      software: 'Adobe Illustrator',
      client: 'Lumina Lighting',
      date: 'February 2026',
      icon: '',
      bg: 'linear-gradient(135deg, #1a1a2e, #16213e)'
    },
    {
      id: 3,
      title: 'Crimson Valkyrie',
      category: 'character-art',
      categoryLabel: 'Character Art',
      description: 'Original character design for a fantasy RPG game. Detailed armor, weapon design, and color studies.',
      software: 'Procreate, Photoshop',
      client: 'Fantasy Forge Games',
      date: 'January 2026',
      icon: '',
      bg: 'linear-gradient(135deg, #2d0a0a, #1a0a2e)'
    },
    {
      id: 4,
      title: 'Ethereal Dreams',
      category: 'digital-paintings',
      categoryLabel: 'Digital Paintings',
      description: 'Surreal digital painting exploring themes of consciousness and the cosmos. Mixed techniques combining traditional and digital.',
      software: 'Photoshop, Procreate',
      client: 'Personal Project',
      date: 'December 2025',
      icon: '',
      bg: 'linear-gradient(135deg, #0a0a2e, #1a0a2e)'
    },
    {
      id: 5,
      title: 'Urban Beats Poster',
      category: 'posters',
      categoryLabel: 'Posters',
      description: 'Concert poster design for an electronic music festival. Bold typography with abstract geometric patterns.',
      software: 'Illustrator, Photoshop',
      client: 'Urban Beats Festival',
      date: 'November 2025',
      icon: '',
      bg: 'linear-gradient(135deg, #2e1a0a, #1a0a2e)'
    },
    {
      id: 6,
      title: 'Verdant Brand Identity',
      category: 'brand-identity',
      categoryLabel: 'Brand Identity',
      description: 'Eco-friendly brand identity with organic shapes and earth tones. Stationery, packaging, and digital presence.',
      software: 'Illustrator, Figma, InDesign',
      client: 'Verdant Organics',
      date: 'October 2025',
      icon: '',
      bg: 'linear-gradient(135deg, #0a2e1a, #1a2e0a)'
    },
    {
      id: 7,
      title: 'Social Media Kit — Glow Cosmetics',
      category: 'social-media',
      categoryLabel: 'Social Media Graphics',
      description: 'Complete social media template kit including Instagram stories, posts, and carousel designs for a beauty brand.',
      software: 'Figma, Photoshop',
      client: 'Glow Cosmetics',
      date: 'September 2025',
      icon: '',
      bg: 'linear-gradient(135deg, #2e0a1a, #1a052e)'
    },
    {
      id: 8,
      title: 'Midnight Noir Illustrations',
      category: 'illustrations',
      categoryLabel: 'Illustrations',
      description: 'Series of noir-inspired illustrations for a graphic novel. Atmospheric lighting and dramatic compositions.',
      software: 'Procreate, Photoshop',
      client: 'Dark Horse Studios',
      date: 'August 2025',
      icon: '',
      bg: 'linear-gradient(135deg, #0a0a0a, #1a1a2e)'
    },
    {
      id: 9,
      title: 'Apex Athletics Logo',
      category: 'logo-designs',
      categoryLabel: 'Logo Designs',
      description: 'Dynamic logo for a sports brand featuring a stylized mountain peak and abstract athlete silhouette.',
      software: 'Illustrator',
      client: 'Apex Athletics',
      date: 'July 2025',
      icon: '',
      bg: 'linear-gradient(135deg, #0a1a2e, #0a2e1a)'
    },
    {
      id: 10,
      title: 'Solarpunk Cityscape',
      category: 'digital-paintings',
      categoryLabel: 'Digital Paintings',
      description: 'Concept art of a sustainable futuristic city. Vibrant colors and intricate architectural details.',
      software: 'Photoshop, Blender',
      client: 'Personal Project',
      date: 'June 2025',
      icon: '',
      bg: 'linear-gradient(135deg, #0a2e2e, #1a0a2e)'
    },
    {
      id: 11,
      title: 'Artisan Coffee Packaging',
      category: 'posters',
      categoryLabel: 'Posters',
      description: 'Packaging design collection for a premium coffee brand. Each variant tells a story through illustration.',
      software: 'Illustrator, Photoshop',
      client: 'Artisan Brew Co.',
      date: 'May 2025',
      icon: '',
      bg: 'linear-gradient(135deg, #2e1a0a, #1a0a0a)'
    },
    {
      id: 12,
      title: 'Wyvern Character Sheet',
      category: 'character-art',
      categoryLabel: 'Character Art',
      description: 'Detailed character design sheet for a fantasy wyvern, including multiple views, color variants, and texture studies.',
      software: 'Procreate, Photoshop',
      client: 'Mythical Realms',
      date: 'April 2025',
      icon: '',
      bg: 'linear-gradient(135deg, #1a0a2e, #0a1a2e)'
    }
  ];

  // --- State ---
  let currentFilter = 'all';
  let currentItemIndex = 0;
  let filteredItems = [...portfolioData];

  // --- DOM References ---
  const grid = document.getElementById('portfolio-grid');
  const filterButtons = document.querySelectorAll('.portfolio-filter');
  const modalOverlay = document.getElementById('portfolio-modal');
  const noState = document.getElementById('no-state');

  // --- Render Grid ---
  const renderGrid = (items) => {
    if (!grid) return;

    if (items.length === 0) {
      grid.innerHTML = '';
      if (noState) noState.classList.add('active');
      return;
    }

    if (noState) noState.classList.remove('active');

    grid.innerHTML = items.map((item, index) => `
      <div class="portfolio-item reveal-scale" data-index="${index}" 
           role="button" tabindex="0" 
           aria-label="View project: ${item.title}"
           style="transition-delay: ${index * 0.05}s">
        <div class="portfolio-thumbnail-placeholder" style="background: ${item.bg}">
          <span style="font-size: 4rem; opacity: 0.7; z-index: 1;">${item.icon}</span>
        </div>
        <div class="portfolio-overlay">
          <span class="portfolio-overlay-category">${item.categoryLabel}</span>
          <h3 class="portfolio-overlay-title">${item.title}</h3>
          <p class="portfolio-overlay-desc">${item.description.substring(0, 80)}...</p>
        </div>
      </div>
    `).join('');

    // Add click events
    grid.querySelectorAll('.portfolio-item').forEach((el, i) => {
      el.addEventListener('click', () => openModal(i));
      el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openModal(i);
        }
      });
    });

    // Trigger reveal animations
    requestAnimationFrame(() => {
      grid.querySelectorAll('.portfolio-item').forEach((el, i) => {
        setTimeout(() => el.classList.add('visible'), i * 80);
      });
    });
  };

  // --- Filter ---
  const filterItems = (category) => {
    currentFilter = category;
    
    if (category === 'all') {
      filteredItems = [...portfolioData];
    } else {
      filteredItems = portfolioData.filter(item => item.category === category);
    }

    renderGrid(filteredItems);

    // Update active filter button
    filterButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.filter === category);
    });
  };

  // --- Modal / Lightbox ---
  const openModal = (index) => {
    if (!modalOverlay || !filteredItems[index]) return;

    currentItemIndex = index;
    const item = filteredItems[index];

    const modalContent = modalOverlay.querySelector('.modal-content');
    const imageContainer = modalContent.querySelector('.modal-image-placeholder');
    const title = modalContent.querySelector('.modal-title');
    const category = modalContent.querySelector('.modal-category');
    const description = modalContent.querySelector('.modal-description');
    const clientEl = modalContent.querySelector('[data-meta="client"]');
    const softwareEl = modalContent.querySelector('[data-meta="software"]');
    const dateEl = modalContent.querySelector('[data-meta="date"]');

    // Set content
    if (imageContainer) {
      imageContainer.style.background = item.bg;
      imageContainer.innerHTML = `<span style="font-size: 6rem; opacity: 0.7;">${item.icon}</span>`;
    }
    if (title) title.textContent = item.title;
    if (category) category.textContent = item.categoryLabel;
    if (description) description.textContent = item.description;
    if (clientEl) clientEl.textContent = item.client;
    if (softwareEl) softwareEl.textContent = item.software;
    if (dateEl) dateEl.textContent = item.date;

    // Navigation buttons
    const prevBtn = modalContent.querySelector('.modal-prev');
    const nextBtn = modalContent.querySelector('.modal-next');
    
    if (prevBtn) {
      prevBtn.style.display = filteredItems.length > 1 ? 'inline-flex' : 'none';
      prevBtn.onclick = () => navigateModal(-1);
    }
    if (nextBtn) {
      nextBtn.style.display = filteredItems.length > 1 ? 'inline-flex' : 'none';
      nextBtn.onclick = () => navigateModal(1);
    }

    // Show modal
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Keyboard navigation
    document.addEventListener('keydown', handleKeydown);
  };

  const closeModal = () => {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
    document.removeEventListener('keydown', handleKeydown);
  };

  const navigateModal = (direction) => {
    const newIndex = currentItemIndex + direction;
    if (newIndex >= 0 && newIndex < filteredItems.length) {
      currentItemIndex = newIndex;
      const item = filteredItems[newIndex];
      
      const modalContent = modalOverlay.querySelector('.modal-content');
      const imageContainer = modalContent.querySelector('.modal-image-placeholder');
      const title = modalContent.querySelector('.modal-title');
      const category = modalContent.querySelector('.modal-category');
      const description = modalContent.querySelector('.modal-description');
      const clientEl = modalContent.querySelector('[data-meta="client"]');
      const softwareEl = modalContent.querySelector('[data-meta="software"]');
      const dateEl = modalContent.querySelector('[data-meta="date"]');

      if (imageContainer) {
        imageContainer.style.background = item.bg;
        imageContainer.innerHTML = `<span style="font-size: 6rem; opacity: 0.7;">${item.icon}</span>`;
      }
      if (title) title.textContent = item.title;
      if (category) category.textContent = item.categoryLabel;
      if (description) description.textContent = item.description;
      if (clientEl) clientEl.textContent = item.client;
      if (softwareEl) softwareEl.textContent = item.software;
      if (dateEl) dateEl.textContent = item.date;
    }
  };

  const handleKeydown = (e) => {
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') navigateModal(-1);
    if (e.key === 'ArrowRight') navigateModal(1);
  };

  // --- Initialize Portfolio ---
  const init = () => {
    // Render all items initially
    renderGrid(portfolioData);

    // Filter buttons
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterItems(btn.dataset.filter);
      });
    });

    // Modal close
    const closeBtn = modalOverlay?.querySelector('.modal-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', closeModal);
    }

    // Close on overlay click
    if (modalOverlay) {
      modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
      });
    }
  };

  return { init, filterItems };
})();

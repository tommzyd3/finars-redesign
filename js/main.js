// Background slideshow
(function () {
  const slides = document.querySelectorAll('.bg-slide');
  if (!slides.length) return;
  
  let current = 0;
  
  function nextSlide() {
    slides[current].classList.remove('active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('active');
  }
  
  // Change every 7 seconds
  setInterval(nextSlide, 7000);
})();

// Mobile menu
(function () {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  if (!toggle || !nav) return;
  
  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
})();

// Lightbox
(function () {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const closeBtn = document.querySelector('.lightbox-close');
  
  if (!lightbox) return;
  
  // Open on gallery image click
  document.querySelectorAll('.gallery-item img, .project-image img').forEach(img => {
    img.addEventListener('click', (e) => {
      // Don't open if it's a link to project page (only on detail pages)
      if (img.closest('a.project-card')) return;
      
      e.preventDefault();
      e.stopPropagation();
      lightboxImg.src = img.src.replace(/s\.jpg$/, '.jpg').replace(/01s\.jpg/, '01.jpg');
      if (!lightboxImg.src.includes('finars.si') || img.src.includes('unsplash')) {
        lightboxImg.src = img.src;
      } else {
        const full = img.src.replace(/(\d+)s\.jpg$/, '$1.jpg').replace(/s\.jpg$/, '.jpg');
        lightboxImg.src = full || img.src;
      }
      lightboxImg.alt = img.alt || '';
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });
  
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (!img) return;
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt || '';
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });
  
  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
})();

// Filter buttons on projects page
(function () {
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card[data-year]');
  
  if (!buttons.length) return;
  
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const filter = btn.dataset.filter;
      
      cards.forEach(card => {
        if (filter === 'all' || card.dataset.year === filter) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
})();

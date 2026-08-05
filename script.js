document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('site-header');
  const toggle = document.querySelector('.menu-toggle');
  const navMenu = document.getElementById('primary-navigation');
  const navLinks = document.querySelectorAll('.nav-links a, .btn-nav');

  // Sticky header shadow on scroll
  const handleScroll = () => {
    if (window.scrollY > 20) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check

  // Mobile menu toggle logic
  if (toggle && navMenu) {
    toggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('active');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close menu when pressing Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });

    // Close menu when clicking outside nav element
    document.addEventListener('click', (e) => {
      if (
        navMenu.classList.contains('active') &&
        !navMenu.contains(e.target) &&
        !toggle.contains(e.target)
      ) {
        navMenu.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close mobile menu when clicking any navigation link
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
          navMenu.classList.remove('active');
          toggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  // Lightbox preview logic for showcase cards
  const lightbox = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');
  const showcaseCards = document.querySelectorAll('.showcase-card');
  let lastActiveElement = null;

  if (lightbox && lightboxImg && lightboxCaption && lightboxClose) {
    const openLightbox = (src, caption, triggerEl) => {
      lastActiveElement = triggerEl || document.activeElement;
      lightboxImg.src = src;
      lightboxCaption.textContent = caption || '';
      lightbox.classList.add('active');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      lightboxClose.focus();
    };

    const closeLightbox = () => {
      lightbox.classList.remove('active');
      lightbox.setAttribute('aria-hidden', 'true');
      lightboxImg.src = '';
      document.body.style.overflow = '';
      if (lastActiveElement && typeof lastActiveElement.focus === 'function') {
        lastActiveElement.focus();
      }
    };

    showcaseCards.forEach((card) => {
      const triggerOpen = () => {
        const fullSrc = card.getAttribute('data-fullsrc');
        const caption = card.getAttribute('data-caption');
        const img = card.querySelector('img');
        if (img && img.style.display !== 'none' && fullSrc) {
          openLightbox(fullSrc, caption, card);
        }
      };

      card.addEventListener('click', triggerOpen);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          triggerOpen();
        }
      });
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
      }
    });
  }
});

/**
 * KOLKATA — THE CITY OF JOY
 * Master JavaScript: Editorial Interactivity, Animations & Digital Archive
 * Frontend-Only Implementation (HTML5, CSS3, Vanilla JS)
 */

document.addEventListener('DOMContentLoaded', () => {
  requestAnimationFrame(() => document.body.classList.add('page-ready'));
  initReadingProgressBar();
  initNavbar();
  initScrollRevealEngine();
  initBackToTopButton();
  initHeritageDirectory();
  initBookingEstimatorAndForm();
  initPhotographicLightbox();
  initGatheringsFilter();
});

/* --------------------------------------------------------------------------
   1. Reading Progress Bar (Pinned Viewport Indicator)
   -------------------------------------------------------------------------- */
function initReadingProgressBar() {
  let bar = document.querySelector('.reading-progress-bar');
  if (!bar) {
    bar = document.createElement('div');
    bar.className = 'reading-progress-bar';
    document.body.appendChild(bar);
  }

  const updateProgress = () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollHeight > 0) {
      const progress = (window.scrollY / scrollHeight) * 100;
      bar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
    }
  };

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
}

/* --------------------------------------------------------------------------
   2. Editorial Navigation Bar & Scroll State
   -------------------------------------------------------------------------- */
function initNavbar() {
  const header = document.querySelector('.site-header');
  const toggleBtn = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (header) {
    const handleScroll = () => {
      if (window.scrollY > 24) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      toggleBtn.setAttribute('aria-expanded', isOpen);
    });

    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        toggleBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }
}

/* --------------------------------------------------------------------------
   3. Scroll Reveal & Editorial Stagger Engine
   -------------------------------------------------------------------------- */
function initScrollRevealEngine() {
  // If user prefers reduced motion, reveal everything immediately
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.editorial-reveal, .editorial-reveal-left, .editorial-reveal-right, .editorial-reveal-scale, .section-rule').forEach(el => {
      el.classList.add('is-revealed');
    });
    return;
  }

  // Auto-apply reveal classes to key semantic components if not manually set
  const autoRevealSelectors = [
    '.section-header',
    '.section-rule',
    '.editorial-intro-grid',
    '.timeline-editorial-col',
    '.showcase-featured-card',
    '.showcase-secondary-card',
    '.editorial-pillar-col',
    '.heritage-archive-item',
    '.monograph-pullquote',
    '.editorial-spread-row',
    '.gathering-editorial-article',
    '.gathering-calendar-wrap',
    '.gallery-plate-card',
    '.booking-form-panel',
    '.booking-estimator-card'
  ];

  autoRevealSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
      if (!el.classList.contains('editorial-reveal') && !el.classList.contains('editorial-reveal-left') && !el.classList.contains('section-rule')) {
        el.classList.add('editorial-reveal');
      }
    });
  });

  // Stagger delays on children grids
  document.querySelectorAll('.timeline-editorial-grid').forEach(grid => {
    Array.from(grid.children).forEach((child, idx) => {
      child.classList.add(`delay-${Math.min(5, idx + 1)}`);
    });
  });

  document.querySelectorAll('.editorial-columns-three').forEach(grid => {
    Array.from(grid.children).forEach((child, idx) => {
      child.classList.add(`delay-${Math.min(5, idx + 1)}`);
    });
  });

  // IntersectionObserver configuration
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.editorial-reveal, .editorial-reveal-left, .editorial-reveal-right, .editorial-reveal-scale, .section-rule').forEach(target => {
    observer.observe(target);
  });
}

/* --------------------------------------------------------------------------
   4. Floating Back-to-Top Button
   -------------------------------------------------------------------------- */
function initBackToTopButton() {
  let btn = document.querySelector('.back-to-top');
  if (!btn) {
    btn = document.createElement('button');
    btn.className = 'back-to-top';
    btn.setAttribute('aria-label', 'Scroll back to top of page');
    btn.innerHTML = '↑';
    document.body.appendChild(btn);
  }

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* --------------------------------------------------------------------------
   5. Heritage Directory Search & Category Filters (heritage.html)
   -------------------------------------------------------------------------- */
function initHeritageDirectory() {
  const filterBtns = document.querySelectorAll('.heritage-filter-btn');
  const items = document.querySelectorAll('.heritage-archive-item, .heritage-card');
  const searchInput = document.getElementById('heritageSearchInput');

  if (!items.length) return;

  function applyFilters() {
    const activeCategory = document.querySelector('.heritage-filter-btn.active')?.dataset.filter?.toLowerCase() || 'all';
    const searchTerm = (searchInput?.value || '').trim().toLowerCase();

    items.forEach(item => {
      const categoryAttr = (item.dataset.category || '').toLowerCase();
      const categories = categoryAttr.split(' ');

      const title = item.querySelector('.heritage-archive-title, .heritage-card-title')?.textContent.toLowerCase() || '';
      const desc = item.querySelector('.heritage-archive-desc, .heritage-card-desc')?.textContent.toLowerCase() || '';
      const loc = item.querySelector('.heritage-archive-location, .heritage-card-loc, .heritage-loc-tag')?.textContent.toLowerCase() || '';
      const date = item.querySelector('.heritage-date-tag, .heritage-card-date-tag')?.textContent.toLowerCase() || '';

      const matchesCategory = (activeCategory === 'all' || categories.includes(activeCategory));
      const matchesSearch = !searchTerm ||
        title.includes(searchTerm) ||
        desc.includes(searchTerm) ||
        loc.includes(searchTerm) ||
        date.includes(searchTerm) ||
        categories.some(c => c.includes(searchTerm));

      if (matchesCategory && matchesSearch) {
        item.style.display = item.classList.contains('heritage-archive-item') ? 'grid' : 'flex';
        // Add smooth reveal
        item.classList.add('is-revealed');
      } else {
        item.style.display = 'none';
      }
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', applyFilters);
  }
}

/* --------------------------------------------------------------------------
   6. Hotel Accommodation Requisition Form & Live Dynamic Calculator
   -------------------------------------------------------------------------- */
function initBookingEstimatorAndForm() {
  const form = document.getElementById('hotelBookingForm');
  if (!form) return;

  const checkinInput = document.getElementById('checkinDate');
  const checkoutInput = document.getElementById('checkoutDate');
  const roomTypeSelect = document.getElementById('roomType');
  const numRoomsInput = document.getElementById('numRooms');
  const numGuestsInput = document.getElementById('numGuests');

  const sumNights = document.getElementById('sumNights');
  const sumRooms = document.getElementById('sumRooms');
  const sumRoomRate = document.getElementById('sumRoomRate');
  const sumTaxes = document.getElementById('sumTaxes');
  const sumTotal = document.getElementById('sumTotal');
  const sumRoomName = document.getElementById('sumRoomName');

  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  const minDateStr = `${yyyy}-${mm}-${dd}`;

  if (checkinInput) {
    checkinInput.min = minDateStr;
    if (!checkinInput.value) {
      const checkinDate = new Date(today);
      checkinDate.setDate(checkinDate.getDate() + 1);
      checkinInput.value = checkinDate.toISOString().split('T')[0];
    }
  }

  if (checkoutInput && !checkoutInput.value) {
    const checkoutDate = new Date(today);
    checkoutDate.setDate(checkoutDate.getDate() + 3);
    checkoutInput.value = checkoutDate.toISOString().split('T')[0];
  }

  const roomRates = {
    'deluxe': { name: 'Deluxe Heritage Suite', rate: 4500 },
    'colonial': { name: 'Grand Colonial Room', rate: 3200 },
    'riverfront': { name: 'Royal Hooghly Riverfront Room', rate: 5800 },
    'executive': { name: 'Executive Heritage Suite', rate: 7500 }
  };

  function updateTariffCalculator() {
    if (!checkinInput || !checkoutInput) return;

    const inDate = new Date(checkinInput.value);
    const outDate = new Date(checkoutInput.value);
    const roomsCount = Math.max(1, parseInt(numRoomsInput?.value, 10) || 1);
    const roomTypeKey = roomTypeSelect?.value || 'deluxe';
    const roomInfo = roomRates[roomTypeKey] || roomRates['deluxe'];

    let nights = 1;
    if (inDate && outDate && outDate > inDate) {
      const diffTime = Math.abs(outDate - inDate);
      nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }

    const subtotal = roomInfo.rate * nights * roomsCount;
    const gstTaxes = Math.round(subtotal * 0.12); // 12% statutory GST
    const grandTotal = subtotal + gstTaxes;

    if (sumNights) sumNights.textContent = `${nights} Night${nights > 1 ? 's' : ''}`;
    if (sumRooms) sumRooms.textContent = `${roomsCount} Room${roomsCount > 1 ? 's' : ''}`;
    if (sumRoomName) sumRoomName.textContent = roomInfo.name;
    if (sumRoomRate) sumRoomRate.textContent = `₹${subtotal.toLocaleString('en-IN')}`;
    if (sumTaxes) sumTaxes.textContent = `₹${gstTaxes.toLocaleString('en-IN')}`;
    
    if (sumTotal) {
      sumTotal.textContent = `₹${grandTotal.toLocaleString('en-IN')}`;
      // Visual feedback pulse
      sumTotal.classList.remove('num-pulse');
      void sumTotal.offsetWidth; // Trigger reflow
      sumTotal.classList.add('num-pulse');
    }
  }

  [checkinInput, checkoutInput, roomTypeSelect, numRoomsInput, numGuestsInput].forEach(elem => {
    if (elem) {
      elem.addEventListener('change', updateTariffCalculator);
      elem.addEventListener('input', updateTariffCalculator);
    }
  });

  updateTariffCalculator();

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const fullName = document.getElementById('fullName');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const address = document.getElementById('address');
    const idProofNum = document.getElementById('idProofNum');

    let isValid = true;
    form.querySelectorAll('.form-control').forEach(ctrl => ctrl.classList.remove('is-invalid'));

    if (!fullName || !fullName.value.trim() || fullName.value.trim().length < 3) {
      fullName?.classList.add('is-invalid');
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !email.value.trim() || !emailRegex.test(email.value.trim())) {
      email?.classList.add('is-invalid');
      isValid = false;
    }

    const phoneRegex = /^[0-9+\s\-]{10,15}$/;
    if (!phone || !phone.value.trim() || !phoneRegex.test(phone.value.trim().replace(/\s+/g, ''))) {
      phone?.classList.add('is-invalid');
      isValid = false;
    }

    if (!address || !address.value.trim()) {
      address?.classList.add('is-invalid');
      isValid = false;
    }

    if (!idProofNum || !idProofNum.value.trim()) {
      idProofNum?.classList.add('is-invalid');
      isValid = false;
    }

    const inDate = new Date(checkinInput.value);
    const outDate = new Date(checkoutInput.value);
    if (!checkinInput.value || !checkoutInput.value || outDate <= inDate) {
      checkoutInput?.classList.add('is-invalid');
      isValid = false;
    }

    if (!isValid) {
      alert('Please fill out all mandatory fields correctly before submitting your requisition.');
      return;
    }

    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const referenceId = `KOL-BK-2026-${randomCode}`;
    const selectedRoom = roomRates[roomTypeSelect.value] || roomRates['deluxe'];

    const modalRef = document.getElementById('modalRef');
    const modalGuestName = document.getElementById('modalGuestName');
    const modalDates = document.getElementById('modalDates');
    const modalRoom = document.getElementById('modalRoom');
    const modalTotal = document.getElementById('modalTotal');

    if (modalRef) modalRef.textContent = referenceId;
    if (modalGuestName) modalGuestName.textContent = fullName.value.trim();
    if (modalDates) modalDates.textContent = `${checkinInput.value} to ${checkoutInput.value}`;
    if (modalRoom) modalRoom.textContent = `${numRoomsInput.value}x ${selectedRoom.name}`;
    if (modalTotal) modalTotal.textContent = sumTotal ? sumTotal.textContent : '₹0';

    const modal = document.getElementById('bookingModal');
    if (modal) {
      modal.classList.add('active');
    }
  });

  const closeModalBtn = document.getElementById('closeModalBtn');
  const printBookingBtn = document.getElementById('printBookingBtn');
  const modal = document.getElementById('bookingModal');

  if (closeModalBtn && modal) {
    closeModalBtn.addEventListener('click', () => {
      modal.classList.remove('active');
      form.reset();
      updateTariffCalculator();
    });
  }

  if (printBookingBtn) {
    printBookingBtn.addEventListener('click', () => {
      window.print();
    });
  }
}

/* --------------------------------------------------------------------------
   7. Photographic Lightbox & Gallery Filter (gallery.html)
   -------------------------------------------------------------------------- */
function initPhotographicLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-plate-card, .gallery-item');
  const lightbox = document.getElementById('galleryLightbox');
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');

  if (!galleryItems.length || !lightbox) return;

  const lbImg = lightbox.querySelector('.lightbox-img');
  const lbTitle = lightbox.querySelector('.lightbox-title');
  const lbCaption = lightbox.querySelector('.lightbox-caption');
  const lbCounter = lightbox.querySelector('.lightbox-counter');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const prevBtn = lightbox.querySelector('.lightbox-prev');
  const nextBtn = lightbox.querySelector('.lightbox-next');

  let currentIndex = 0;
  let visibleItems = Array.from(galleryItems);

  function openLightbox(index) {
    currentIndex = index;
    updateLightboxContent();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function updateLightboxContent() {
    const item = visibleItems[currentIndex];
    if (!item) return;

    const img = item.querySelector('img');
    const title = item.dataset.title || item.querySelector('.gallery-plate-title, .gallery-archive-title')?.textContent || img?.alt || 'Archival Plate';
    const caption = item.dataset.caption || item.querySelector('.gallery-plate-caption, .gallery-archive-caption')?.textContent || '';
    const src = img ? img.getAttribute('src') : '';

    if (lbImg) {
      lbImg.style.opacity = '0';
      setTimeout(() => {
        lbImg.src = src;
        lbImg.alt = title;
        lbImg.style.opacity = '1';
      }, 150);
    }
    if (lbTitle) lbTitle.textContent = title;
    if (lbCaption) lbCaption.textContent = caption;
    if (lbCounter) lbCounter.textContent = `Photograph ${currentIndex + 1} of ${visibleItems.length}`;
  }

  function showNext() {
    if (!visibleItems.length) return;
    currentIndex = (currentIndex + 1) % visibleItems.length;
    updateLightboxContent();
  }

  function showPrev() {
    if (!visibleItems.length) return;
    currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
    updateLightboxContent();
  }

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const idx = visibleItems.indexOf(item);
      if (idx !== -1) {
        openLightbox(idx);
      }
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (nextBtn) nextBtn.addEventListener('click', showNext);
  if (prevBtn) prevBtn.addEventListener('click', showPrev);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  window.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
  });

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = (btn.dataset.filter || 'all').toLowerCase();
      visibleItems = [];

      galleryItems.forEach(item => {
        const itemCat = (item.dataset.category || '').toLowerCase();
        if (filter === 'all' || itemCat === filter) {
          item.style.display = 'block';
          item.classList.add('is-revealed');
          visibleItems.push(item);
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   8. Cultural Gatherings Filter (gathering.html)
   -------------------------------------------------------------------------- */
function initGatheringsFilter() {
  const filterBtns = document.querySelectorAll('.event-filter-btn');
  const cards = document.querySelectorAll('.gathering-editorial-article, .event-card');

  if (!cards.length || !filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = (btn.dataset.filter || 'all').toLowerCase();

      cards.forEach(card => {
        const cat = (card.dataset.category || '').toLowerCase();
        if (filter === 'all' || cat === filter) {
          card.style.display = 'grid';
          card.classList.add('is-revealed');
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

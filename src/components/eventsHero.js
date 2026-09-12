import { getUniversityEvents } from '../data/eventsData.js';
import { i18n } from '../utils/i18n.js';

export function renderEventsHero() {
  const events = getUniversityEvents(i18n.currentLang);

  return `
    <section class="events-hero-section">
      <div class="events-slider-wrap">
        <!-- Slides -->
        <div class="events-slides-track">
          ${events.map((event, index) => `
            <div class="event-slide ${index === 0 ? 'active' : ''}" data-index="${index}">
              <!-- Background atmosphere -->
              <div class="slide-atmosphere"></div>
              
              <!-- Content grid: left text + right image panel -->
              <div class="slide-content-grid">
                <!-- Left column -->
                <div class="slide-left">
                  <div class="slide-live-badge glass-panel">
                    <span class="live-dot"></span> LIVE
                  </div>
                  <h2 class="slide-slogan">${event.slogan}</h2>
                  <div class="slide-event-card-glass glass-panel">
                    <h3 class="slide-event-title">${event.title}</h3>
                    <p class="slide-event-desc">${event.description}</p>
                    <div class="slide-meta-chips">
                      <div class="glass-chip"><i class="ph-fill ph-calendar"></i> <strong>${i18n.t('events.date_label')}</strong> ${event.date}</div>
                      <div class="glass-chip"><i class="ph-fill ph-clock"></i> ${event.time}</div>
                      <div class="glass-chip"><i class="ph-fill ph-map-pin"></i> ${event.location}</div>
                      <div class="glass-chip chip-gold"><i class="ph-fill ph-ticket"></i> ${event.badge}</div>
                    </div>
                  </div>
                  <div class="slide-actions">
                    <a href="${event.link}" target="_blank" rel="noopener noreferrer" class="btn glass-btn-primary">
                      <span>${i18n.t('events.apply_free')}</span>
                      <i class="ph ph-arrow-right"></i>
                    </a>
                    <a href="/universidades" data-link class="btn glass-btn-outline">
                      <i class="ph ph-buildings"></i>
                      <span>${i18n.t('events.view_org')}</span>
                    </a>
                  </div>
                </div>
                
                <!-- Right column -->
                <div class="slide-right">
                  <div class="slide-image-panel glass-panel">
                    <img src="${event.image}" alt="${event.university}" class="slide-campus-img">
                    <div class="slide-img-glass-overlay">
                      <i class="ph-fill ph-buildings"></i>
                      <span>${event.acronym}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Thin marquee ticker -->
              <div class="slide-ticker">
                <div class="ticker-track">
                  <div class="ticker-content">
                    <span><i class="ph-fill ph-seal-check"></i> ${event.ticker}</span>
                    <span><i class="ph-fill ph-seal-check"></i> ${event.ticker}</span>
                    <span><i class="ph-fill ph-seal-check"></i> ${event.ticker}</span>
                    <span><i class="ph-fill ph-seal-check"></i> ${event.ticker}</span>
                  </div>
                  <div class="ticker-content" aria-hidden="true">
                    <span><i class="ph-fill ph-seal-check"></i> ${event.ticker}</span>
                    <span><i class="ph-fill ph-seal-check"></i> ${event.ticker}</span>
                    <span><i class="ph-fill ph-seal-check"></i> ${event.ticker}</span>
                    <span><i class="ph-fill ph-seal-check"></i> ${event.ticker}</span>
                  </div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
        
        <!-- Bottom nav bar with glass -->
        <div class="events-nav-bar glass-nav-bar">
          <div class="slide-nav-tabs">
            ${events.map((event, i) => `
              <button class="event-tab-pill ${i === 0 ? 'active' : ''}" data-index="${i}">
                <span class="tab-index">0${i + 1}</span>
                <span class="tab-title">${event.acronym}</span>
                <div class="tab-progress-rail">
                  <div class="tab-progress-thumb" style="width: ${i === 0 ? '100%' : '0%'};"></div>
                </div>
              </button>
            `).join('')}
          </div>
          <div class="slide-controls">
            <button id="eventsPrevBtn" class="glass-control-btn" aria-label="Anterior"><i class="ph ph-caret-left"></i></button>
            <button id="eventsNextBtn" class="glass-control-btn" aria-label="Siguiente"><i class="ph ph-caret-right"></i></button>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function initEventsSlider() {
  const slides = document.querySelectorAll('.event-slide');
  const tabs = document.querySelectorAll('.event-tab-pill');
  const prevBtn = document.getElementById('eventsPrevBtn');
  const nextBtn = document.getElementById('eventsNextBtn');

  if (!slides.length) return;

  let currentIndex = 0;
  let autoplayInterval = null;
  const AUTOPLAY_DELAY = 5000;

  function goToSlide(index) {
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;

    slides.forEach((slide, i) => {
      if (i === index) {
        slide.classList.add('active');
        slide.style.opacity = '1';
        slide.style.visibility = 'visible';
        slide.style.pointerEvents = 'auto';
      } else {
        slide.classList.remove('active');
        slide.style.opacity = '0';
        slide.style.visibility = 'hidden';
        slide.style.pointerEvents = 'none';
      }
    });

    tabs.forEach((tab, i) => {
      const fill = tab.querySelector('.tab-progress-thumb');
      if (i === index) {
        tab.classList.add('active');
        if (fill) fill.style.width = '100%';
      } else {
        tab.classList.remove('active');
        if (fill) fill.style.width = '0%';
      }
    });

    currentIndex = index;
  }

  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  function prevSlide() {
    goToSlide(currentIndex - 1);
  }

  function startAutoplay() {
    if (autoplayInterval) clearInterval(autoplayInterval);
    autoplayInterval = setInterval(nextSlide, AUTOPLAY_DELAY);
  }

  // Event Listeners
  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      prevSlide();
      startAutoplay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      nextSlide();
      startAutoplay();
    });
  }

  tabs.forEach((tab) => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      const idx = parseInt(tab.getAttribute('data-index'), 10);
      if (!isNaN(idx)) {
        goToSlide(idx);
        startAutoplay();
      }
    });
  });

  goToSlide(0);
  startAutoplay();
}

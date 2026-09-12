import { getUniversityEvents } from '../data/eventsData.js';
import { i18n } from '../utils/i18n.js';

export function renderEventsHero() {
  const events = getUniversityEvents(i18n.currentLang);

  return `
    <section class="events-hero-section">
      <!-- Cinematic Panoramic Showcase Slider (Image 5 Reference - Edge-to-Edge) -->
      <div id="eventsSliderWrapper" class="events-cinematic-container">
          
          <!-- Top Luminous Line -->
          <div class="events-top-luminous-line"></div>

          <!-- Slides Track -->
          <div id="eventsSlidesTrack" class="events-slides-track">
            ${events.map((event, index) => `
              <div class="event-cinematic-slide ${index === 0 ? 'active' : ''}" data-index="${index}">
                
                <!-- Full-Bleed Campus Photography with Parallax Zoom -->
                <div class="slide-background-wrap">
                  <img src="${event.image}" alt="${event.university}" class="slide-bg-photo" />
                  <div class="slide-cinema-overlay"></div>
                </div>

                <!-- Slide Foreground Stage -->
                <div class="slide-foreground-stage">
                  
                  <!-- Top Metadata Header -->
                  <div class="slide-meta-row">
                    <div class="slide-pills-group">
                      <span class="slide-pill pill-pulse">
                        <span class="pulse-beacon"></span>
                        <span>${i18n.t('events.featured_badge')}</span>
                      </span>

                      <span class="slide-pill pill-institution">
                        <i class="ph-fill ph-buildings"></i>
                        <span>${event.acronym}</span>
                      </span>

                      <span class="slide-pill pill-category">
                        ${event.category}
                      </span>
                    </div>

                    <div class="slide-sunedu-pill">
                      <i class="ph-fill ph-seal-check"></i>
                      <span>${i18n.t('events.sunedu')}</span>
                    </div>
                  </div>

                  <!-- High-Impact Grand Slogan (Direct from Reference Image 5) -->
                  <div class="slide-slogan-wrapper">
                    <h2 class="slide-grand-slogan">${event.slogan}</h2>
                  </div>

                  <!-- Event Title & Description -->
                  <div class="slide-text-block">
                    <h3 class="slide-title">${event.title}</h3>
                    <p class="slide-description">${event.description}</p>
                  </div>

                  <!-- Info Chips: Date, Time, Location, Badge -->
                  <div class="slide-chips-deck">
                    <div class="cinema-chip">
                      <i class="ph-fill ph-calendar"></i>
                      <span><strong>${i18n.t('events.date_label')}</strong> ${event.date}</span>
                    </div>
                    <div class="cinema-chip">
                      <i class="ph-fill ph-clock"></i>
                      <span>${event.time}</span>
                    </div>
                    <div class="cinema-chip">
                      <i class="ph-fill ph-map-pin"></i>
                      <span>${event.location}</span>
                    </div>
                    <div class="cinema-chip chip-gold">
                      <i class="ph-fill ph-ticket"></i>
                      <span>${event.badge}</span>
                    </div>
                  </div>

                  <!-- Bottom Actions & Social Bar (Image 5 Style) -->
                  <div class="slide-actions-bar">
                    <div class="slide-cta-buttons">
                      <a href="${event.link}" target="_blank" rel="noopener noreferrer" class="btn btn-cinema-primary">
                        <span>${i18n.t('events.apply_free')}</span>
                        <i class="ph ph-arrow-right"></i>
                      </a>
                      <a href="/universidades" data-link class="btn btn-cinema-outline">
                        <i class="ph ph-buildings"></i>
                        <span>${i18n.t('events.view_org')}</span>
                      </a>
                    </div>

                    <!-- Social Icons (Like Image 5) -->
                    <div class="slide-social-strip">
                      <span class="social-strip-label">${i18n.currentLang === 'en' ? 'Social Channels:' : (i18n.currentLang === 'qu' ? 'Tupanakuy:' : 'Redes y Canales:')}</span>
                      <div class="social-strip-icons">
                        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" class="social-icon-btn" aria-label="YouTube"><i class="ph-fill ph-youtube-logo"></i></a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="social-icon-btn" aria-label="Instagram"><i class="ph-fill ph-instagram-logo"></i></a>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" class="social-icon-btn" aria-label="Facebook"><i class="ph-fill ph-facebook-logo"></i></a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="social-icon-btn" aria-label="LinkedIn"><i class="ph-fill ph-linkedin-logo"></i></a>
                        <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" class="social-icon-btn" aria-label="TikTok"><i class="ph-fill ph-tiktok-logo"></i></a>
                      </div>
                    </div>
                  </div>

                </div>

                <!-- Animated Marquee Ticker at Slide Base (EXACTLY like Image 5) -->
                <div class="slide-marquee-ribbon">
                  <div class="marquee-track">
                    <div class="marquee-content">
                      <span class="marquee-text"><i class="ph-fill ph-seal-check"></i> ${event.ticker}</span>
                      <span class="marquee-text"><i class="ph-fill ph-seal-check"></i> ${event.ticker}</span>
                      <span class="marquee-text"><i class="ph-fill ph-seal-check"></i> ${event.ticker}</span>
                      <span class="marquee-text"><i class="ph-fill ph-seal-check"></i> ${event.ticker}</span>
                    </div>
                    <div class="marquee-content" aria-hidden="true">
                      <span class="marquee-text"><i class="ph-fill ph-seal-check"></i> ${event.ticker}</span>
                      <span class="marquee-text"><i class="ph-fill ph-seal-check"></i> ${event.ticker}</span>
                      <span class="marquee-text"><i class="ph-fill ph-seal-check"></i> ${event.ticker}</span>
                      <span class="marquee-text"><i class="ph-fill ph-seal-check"></i> ${event.ticker}</span>
                    </div>
                  </div>
                </div>

              </div>
            `).join('')}
          </div>

          <!-- Bottom Glass Navigation & University Tabs -->
          <div class="events-navigation-bar">
            
            <div id="eventsTabsContainer" class="events-tabs-list">
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

            <div class="events-controls-buttons">
              <button id="eventsPrevBtn" class="control-btn" aria-label="Anterior"><i class="ph ph-caret-left"></i></button>
              <button id="eventsNextBtn" class="control-btn" aria-label="Siguiente"><i class="ph ph-caret-right"></i></button>
            </div>

          </div>

        </div>
    </section>
  `;
}

export function initEventsSlider() {
  const slides = document.querySelectorAll('.event-cinematic-slide');
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

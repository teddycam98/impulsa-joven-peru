import { getUniversityEvents } from '../data/eventsData.js';
import { i18n } from '../utils/i18n.js';

export function renderEventsHero() {
  const events = getUniversityEvents(i18n.currentLang);

  return `
    <section class="events-hero-section">
      <div class="events-slider-wrap">
        
        <!-- Floating prev/next arrows -->
        <button id="eventsPrevBtn" class="slide-float-arrow slide-float-arrow--prev" aria-label="Anterior">
          <i class="ph ph-caret-left"></i>
        </button>
        <button id="eventsNextBtn" class="slide-float-arrow slide-float-arrow--next" aria-label="Siguiente">
          <i class="ph ph-caret-right"></i>
        </button>

        <!-- Slides Track -->
        <div class="events-slides-track">
          ${events.map((event, index) => `
            <div class="event-slide ${index === 0 ? 'active' : ''}" data-index="${index}">
              <!-- Deep navy background -->
              <div class="slide-bg-navy"></div>
              
              <!-- Content grid -->
              <div class="slide-content-grid">
                
                <!-- LEFT -->
                <div class="slide-left">
                  <div class="slide-live-badge">
                    <span class="live-dot"></span>
                    <span>EN VIVO</span>
                  </div>
                  
                  <div class="slide-slogan-block">
                    <div class="slide-slogan-line1">${event.sloganLine1}</div>
                    <div class="slide-slogan-line2">${event.sloganLine2}</div>
                  </div>
                  
                  <div class="slide-info-card">
                    <h3 class="slide-info-title">
                      <i class="ph-fill ph-calendar-star"></i>
                      ${event.title}
                    </h3>
                    <p class="slide-info-desc">${event.description}</p>
                    <div class="slide-info-chips">
                      <div class="slide-info-chip">
                        <i class="ph-fill ph-calendar"></i>
                        <div><strong>${i18n.t('events.date_label')}</strong><span>${event.date}</span></div>
                      </div>
                      <div class="slide-info-chip">
                        <i class="ph-fill ph-clock"></i>
                        <div><strong>${i18n.currentLang === 'en' ? 'Time:' : 'Hora:'}</strong><span>${event.time}</span></div>
                      </div>
                      <div class="slide-info-chip">
                        <i class="ph-fill ph-map-pin"></i>
                        <div><strong>${i18n.currentLang === 'en' ? 'Modality:' : 'Modalidad:'}</strong><span>${event.location}</span></div>
                      </div>
                    </div>
                  </div>
                  
                  <div class="slide-cta-row">
                    <a href="${event.link}" target="_blank" rel="noopener noreferrer" class="slide-btn-primary">
                      <i class="ph-fill ph-graduation-cap"></i>
                      <span>${i18n.t('events.apply_free')}</span>
                    </a>
                    <a href="/universidades" data-link class="slide-btn-outline">
                      <i class="ph ph-buildings"></i>
                      <span>${i18n.t('events.view_org')}</span>
                    </a>
                  </div>
                </div>
                
                <!-- RIGHT -->
                <div class="slide-right">
                  <div class="slide-image-card">
                    <img src="${event.image}" alt="${event.university}" class="slide-campus-photo">
                    ${event.id === 'evt-1' ? '' : `
                      <div class="slide-img-gradient"></div>
                      <div class="slide-img-phrase">${event.phrase}</div>
                      <div class="slide-img-footer">
                        <div class="slide-img-university">
                          <i class="ph-fill ph-buildings"></i>
                          <span>${event.acronym}</span>
                        </div>
                        <div class="slide-img-tags">
                          <span class="slide-img-tag">
                            <i class="ph-fill ph-calendar"></i>
                            ${event.date.split(',')[0]}
                          </span>
                          <span class="slide-img-tag">
                            <i class="ph-fill ph-chalkboard-teacher"></i>
                            ${event.badge}
                          </span>
                        </div>
                      </div>
                    `}
                  </div>
                  <!-- Dots indicator below image -->
                  <div class="slide-dots" id="slideDotsContainer">
                    ${events.map((_, di) => `<span class="slide-dot-indicator ${di === index ? 'active' : ''}" data-index="${di}"></span>`).join('')}
                  </div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
        
        <!-- BOTTOM YELLOW NAV BAR -->
        <div class="events-bottom-bar">
          <div class="events-bottom-tabs">
            ${events.map((event, i) => `
              <button class="bottom-tab ${i === 0 ? 'active' : ''}" data-index="${i}">
                <i class="ph-fill ph-buildings"></i>
                <span>${event.acronym}</span>
              </button>
            `).join('')}
          </div>
          
          <div class="events-bottom-ticker">
            <div class="ticker-inner">
              <span><i class="ph-fill ph-bell"></i> ${events[0]?.ticker || ''}</span>
              <span><i class="ph-fill ph-bell"></i> ${events[0]?.ticker || ''}</span>
            </div>
          </div>
          
          <div class="events-bottom-arrows">
            <button class="bottom-arrow-btn" id="eventsBottomPrev"><i class="ph ph-caret-left"></i></button>
            <button class="bottom-arrow-btn" id="eventsBottomNext"><i class="ph ph-caret-right"></i></button>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function initEventsSlider() {
  const slides = document.querySelectorAll('.event-slide');
  const tabs = document.querySelectorAll('.bottom-tab');
  const prevBtns = document.querySelectorAll('#eventsPrevBtn, #eventsBottomPrev');
  const nextBtns = document.querySelectorAll('#eventsNextBtn, #eventsBottomNext');
  const dotsContainer = document.getElementById('slideDotsContainer');

  if (!slides.length) return;

  let currentIndex = 0;
  let autoplayInterval = null;
  const AUTOPLAY_DELAY = 6000;

  function goToSlide(index) {
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;

    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
      slide.style.opacity = i === index ? '1' : '0';
      slide.style.visibility = i === index ? 'visible' : 'hidden';
      slide.style.pointerEvents = i === index ? 'auto' : 'none';
    });

    tabs.forEach((tab, i) => {
      tab.classList.toggle('active', i === index);
    });
    
    // Update dots
    document.querySelectorAll('.slide-dot-indicator').forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
    
    // Update ticker with current event ticker
    const tickerInner = document.querySelector('.ticker-inner');
    if (tickerInner && slides[index]) {
      // ticker updates handled by the static render
    }

    currentIndex = index;
  }

  function startAutoplay() {
    if (autoplayInterval) clearInterval(autoplayInterval);
    autoplayInterval = setInterval(() => goToSlide(currentIndex + 1), AUTOPLAY_DELAY);
  }

  prevBtns.forEach(btn => btn?.addEventListener('click', (e) => { e.preventDefault(); goToSlide(currentIndex - 1); startAutoplay(); }));
  nextBtns.forEach(btn => btn?.addEventListener('click', (e) => { e.preventDefault(); goToSlide(currentIndex + 1); startAutoplay(); }));

  tabs.forEach(tab => tab.addEventListener('click', (e) => {
    e.preventDefault();
    const idx = parseInt(tab.getAttribute('data-index'), 10);
    if (!isNaN(idx)) { goToSlide(idx); startAutoplay(); }
  }));
  
  document.querySelectorAll('.slide-dot-indicator').forEach(dot => {
    dot.addEventListener('click', (e) => {
      const idx = parseInt(dot.getAttribute('data-index'), 10);
      if (!isNaN(idx)) { goToSlide(idx); startAutoplay(); }
    });
  });

  goToSlide(0);
  startAutoplay();
}

import { universityEventsData } from '../data/eventsData.js';

export function renderEventsHero() {
  const events = universityEventsData;

  return `
    <section class="events-hero-section" style="position: relative; margin: 35px 0 55px 0;">
      <div class="container">
        
        <!-- Luxury Showcase Slider Container -->
        <div id="eventsSliderWrapper" style="position: relative; background: radial-gradient(circle at 85% 20%, rgba(255, 199, 0, 0.08) 0%, rgba(10, 50, 120, 0.35) 40%, rgba(3, 14, 40, 0.98) 100%); border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 28px; box-shadow: 0 30px 80px -15px rgba(0, 5, 25, 0.7); overflow: hidden; min-height: 480px;">
          
          <!-- Top Accent Light Line -->
          <div style="position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, transparent 0%, rgba(255, 199, 0, 0.8) 50%, transparent 100%); z-index: 5;"></div>

          <!-- Slides Track -->
          <div id="eventsSlidesTrack" style="position: relative; width: 100%; min-height: 400px;">
            ${events.map((event, index) => `
              <div class="event-slide ${index === 0 ? 'active' : ''}" data-index="${index}" style="position: absolute; inset: 0; opacity: ${index === 0 ? '1' : '0'}; visibility: ${index === 0 ? 'visible' : 'hidden'}; transition: opacity 0.5s ease-in-out, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1); transform: scale(${index === 0 ? '1' : '0.98'}); display: flex; align-items: center; padding: 45px 50px 100px 50px;">
                
                <div style="width: 100%; display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); align-items: center; gap: 40px;">
                  
                  <!-- Left Text Column -->
                  <div style="z-index: 2; color: white;">
                    
                    <!-- Live Badge & University Header -->
                    <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 12px; margin-bottom: 18px;">
                      <span style="display: inline-flex; align-items: center; gap: 6px; background: rgba(34, 197, 94, 0.15); border: 1px solid rgba(34, 197, 94, 0.35); color: #4ade80; padding: 4px 12px; border-radius: 20px; font-size: 0.78rem; font-weight: 800; letter-spacing: 0.5px; text-transform: uppercase;">
                        <span style="width: 7px; height: 7px; border-radius: 50%; background: #22c55e; box-shadow: 0 0 8px #22c55e;"></span>
                        CONVOCATORIA DESTACADA
                      </span>

                      <span style="display: inline-flex; align-items: center; gap: 6px; background: rgba(255, 199, 0, 0.12); border: 1px solid rgba(255, 199, 0, 0.3); color: #FFC700; padding: 4px 14px; border-radius: 20px; font-size: 0.8rem; font-weight: 800;">
                        <i class="ph-fill ph-buildings"></i> ${event.acronym}
                      </span>

                      <span style="color: rgba(255,255,255,0.6); font-size: 0.82rem; font-weight: 500;">
                        ${event.category}
                      </span>
                    </div>

                    <!-- Slide Title -->
                    <h2 style="font-size: clamp(1.6rem, 3vw, 2.3rem); font-weight: 900; line-height: 1.2; margin-bottom: 16px; color: #FFFFFF; text-shadow: 0 4px 20px rgba(0,0,0,0.4); letter-spacing: -0.02em;">
                      ${event.title}
                    </h2>

                    <!-- Slide Description -->
                    <p style="font-size: 1.05rem; color: rgba(255, 255, 255, 0.85); line-height: 1.6; margin-bottom: 24px; max-width: 580px;">
                      ${event.description}
                    </p>

                    <!-- Feature Badges Row -->
                    <div style="display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 30px;">
                      <div style="display: flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); padding: 8px 16px; border-radius: 12px; font-size: 0.88rem; color: rgba(255,255,255,0.95); backdrop-filter: blur(8px);">
                        <i class="ph-fill ph-calendar" style="color: #FFC700; font-size: 1.05rem;"></i> <span><strong>Fecha:</strong> ${event.date}</span>
                      </div>
                      
                      <div style="display: flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); padding: 8px 16px; border-radius: 12px; font-size: 0.88rem; color: rgba(255,255,255,0.95); backdrop-filter: blur(8px);">
                        <i class="ph-fill ph-map-pin" style="color: #FFC700; font-size: 1.05rem;"></i> <span>${event.location}</span>
                      </div>

                      <div style="display: flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); padding: 8px 16px; border-radius: 12px; font-size: 0.88rem; color: rgba(255,255,255,0.95); backdrop-filter: blur(8px);">
                        <i class="ph-fill ph-seal-check" style="color: #4ade80; font-size: 1.05rem;"></i> <span>${event.badge}</span>
                      </div>
                    </div>

                    <!-- Call To Action Buttons -->
                    <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 16px;">
                      <a href="${event.link}" target="_blank" rel="noopener noreferrer" class="btn btn-yellow" style="padding: 14px 34px; border-radius: 14px; font-weight: 800; font-size: 1rem; box-shadow: 0 10px 25px rgba(255, 199, 0, 0.35); text-decoration: none; display: inline-flex; align-items: center; gap: 10px;">
                        <span>Inscribirme gratis</span> <i class="ph ph-arrow-right" style="font-weight: 800;"></i>
                      </a>
                      
                      <a href="/universidades" data-link class="btn btn-outline" style="padding: 14px 24px; border-radius: 14px; font-size: 0.95rem; font-weight: 700; background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.2);">
                        <i class="ph ph-buildings"></i> <span>Ver Institución</span>
                      </a>
                    </div>

                  </div>

                  <!-- Right Visual Showcase Column -->
                  <div style="position: relative; display: flex; justify-content: center; align-items: center;">
                    <div class="event-image-card" style="position: relative; width: 100%; max-width: 420px; height: 320px; border-radius: 24px; overflow: hidden; border: 1px solid rgba(255, 255, 255, 0.2); box-shadow: 0 20px 45px rgba(0,0,0,0.5); background: #071530;">
                      <img src="${event.image}" alt="${event.title}" style="width: 100%; height: 100%; object-fit: cover; filter: brightness(0.92); transition: transform 0.8s ease;" />
                      <div style="position: absolute; inset: 0; background: linear-gradient(to top, rgba(3, 14, 40, 0.9) 0%, rgba(3, 14, 40, 0.2) 60%, transparent 100%);"></div>
                      
                      <!-- Top Corner Sunedu License Badge -->
                      <div style="position: absolute; top: 16px; right: 16px; background: rgba(3, 14, 40, 0.85); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.2); padding: 6px 12px; border-radius: 20px; display: inline-flex; align-items: center; gap: 6px; font-size: 0.78rem; font-weight: 700; color: white;">
                        <i class="ph-fill ph-seal-check" style="color: #4ade80;"></i> Licenciada Sunedu / Minedu
                      </div>

                      <!-- Bottom Glass Pill with Key Highlights -->
                      <div style="position: absolute; bottom: 16px; left: 16px; right: 16px; background: rgba(10, 25, 60, 0.85); backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.15); padding: 12px 16px; border-radius: 16px; display: flex; justify-content: space-between; align-items: center;">
                        <div>
                          <div style="color: white; font-weight: 800; font-size: 0.9rem;">${event.university}</div>
                          <div style="color: rgba(255,255,255,0.7); font-size: 0.75rem;">Sede / Cobertura: ${event.region}</div>
                        </div>
                        <span style="background: var(--secondary-yellow); color: #041B4D; padding: 4px 10px; border-radius: 8px; font-weight: 800; font-size: 0.75rem; text-transform: uppercase;">
                          ${event.badge}
                        </span>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            `).join('')}
          </div>

          <!-- Bottom Interactive Navigator Bar (BCP / Modern Fintech Style) -->
          <div style="position: absolute; bottom: 0; left: 0; right: 0; background: rgba(2, 10, 28, 0.8); backdrop-filter: blur(16px); border-top: 1px solid rgba(255,255,255,0.08); padding: 12px 30px; display: flex; justify-content: space-between; align-items: center; z-index: 10;">
            
            <!-- Slide Tabs (Direct Jumping) -->
            <div id="eventsTabsContainer" style="display: flex; gap: 20px; overflow-x: auto; scrollbar-width: none; -ms-overflow-style: none;">
              ${events.map((event, i) => `
                <button class="event-tab-btn ${i === 0 ? 'active' : ''}" data-index="${i}" style="background: transparent; border: none; color: ${i === 0 ? '#FFFFFF' : 'rgba(255,255,255,0.55)'}; padding: 6px 12px; cursor: pointer; text-align: left; display: flex; flex-direction: column; gap: 3px; transition: all 0.3s ease; position: relative; font-family: 'Outfit', sans-serif;">
                  <span style="font-size: 0.72rem; font-weight: 800; color: ${i === 0 ? '#FFC700' : 'rgba(255,255,255,0.4)'}; letter-spacing: 0.5px;">0${i + 1}</span>
                  <span style="font-size: 0.85rem; font-weight: ${i === 0 ? '700' : '500'}; white-space: nowrap;">${event.acronym}</span>
                  <!-- Progress Bar Line -->
                  <div style="width: 100%; height: 3px; background: rgba(255,255,255,0.12); border-radius: 3px; overflow: hidden; margin-top: 3px;">
                    <div class="event-progress-fill" style="width: ${i === 0 ? '100%' : '0%'}; height: 100%; background: #FFC700; transition: width 0.3s ease;"></div>
                  </div>
                </button>
              `).join('')}
            </div>

            <!-- Controls (Prev / Next & Play / Pause) -->
            <div style="display: flex; align-items: center; gap: 10px; flex-shrink: 0; margin-left: 15px;">
              <button id="eventsPrevBtn" aria-label="Anterior convocatoria" style="background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.15); color: white; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s;">
                <i class="ph ph-caret-left" style="font-size: 1.1rem;"></i>
              </button>

              <button id="eventsPlayPauseBtn" aria-label="Pausar o reproducir carrusel" style="background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.15); color: white; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s;">
                <i class="ph-fill ph-pause" id="eventsPlayPauseIcon" style="font-size: 0.9rem;"></i>
              </button>

              <button id="eventsNextBtn" aria-label="Siguiente convocatoria" style="background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.15); color: white; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s;">
                <i class="ph ph-caret-right" style="font-size: 1.1rem;"></i>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  `;
}

export function initEventsSlider() {
  const slides = document.querySelectorAll('.event-slide');
  const tabs = document.querySelectorAll('.event-tab-btn');
  const prevBtn = document.getElementById('eventsPrevBtn');
  const nextBtn = document.getElementById('eventsNextBtn');
  const playPauseBtn = document.getElementById('eventsPlayPauseBtn');
  const playPauseIcon = document.getElementById('eventsPlayPauseIcon');
  const wrapper = document.getElementById('eventsSliderWrapper');

  if (!slides.length) return;

  let currentIndex = 0;
  let isPlaying = true;
  let timer = null;
  const slideDuration = 6000;

  function goToSlide(index) {
    slides.forEach((slide, i) => {
      if (i === index) {
        slide.style.opacity = '1';
        slide.style.visibility = 'visible';
        slide.style.transform = 'scale(1)';
        slide.classList.add('active');
        const img = slide.querySelector('img');
        if (img) img.style.transform = 'scale(1.05)';
      } else {
        slide.style.opacity = '0';
        slide.style.visibility = 'hidden';
        slide.style.transform = 'scale(0.98)';
        slide.classList.remove('active');
        const img = slide.querySelector('img');
        if (img) img.style.transform = 'scale(1)';
      }
    });

    tabs.forEach((tab, i) => {
      const fill = tab.querySelector('.event-progress-fill');
      const number = tab.querySelector('span');
      if (i === index) {
        tab.style.color = '#FFFFFF';
        if (number) number.style.color = '#FFC700';
        if (fill) fill.style.width = '100%';
        tab.classList.add('active');
      } else {
        tab.style.color = 'rgba(255,255,255,0.55)';
        if (number) number.style.color = 'rgba(255,255,255,0.4)';
        if (fill) fill.style.width = '0%';
        tab.classList.remove('active');
      }
    });

    currentIndex = index;
  }

  function nextSlide() {
    const newIndex = (currentIndex + 1) % slides.length;
    goToSlide(newIndex);
  }

  function prevSlide() {
    const newIndex = (currentIndex - 1 + slides.length) % slides.length;
    goToSlide(newIndex);
  }

  function startAutoplay() {
    stopAutoplay();
    timer = setInterval(nextSlide, slideDuration);
    isPlaying = true;
    if (playPauseIcon) playPauseIcon.className = 'ph-fill ph-pause';
  }

  function stopAutoplay() {
    if (timer) clearInterval(timer);
    isPlaying = false;
    if (playPauseIcon) playPauseIcon.className = 'ph-fill ph-play';
  }

  function toggleAutoplay() {
    if (isPlaying) {
      stopAutoplay();
    } else {
      startAutoplay();
    }
  }

  // Event Listeners
  if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); startAutoplay(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); startAutoplay(); });
  if (playPauseBtn) playPauseBtn.addEventListener('click', toggleAutoplay);

  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      const target = e.currentTarget;
      const idx = parseInt(target.dataset.index);
      goToSlide(idx);
      startAutoplay();
    });
  });

  // Pause on hover
  if (wrapper) {
    wrapper.addEventListener('mouseenter', () => { if (isPlaying) stopAutoplay(); });
    wrapper.addEventListener('mouseleave', () => { if (!isPlaying) startAutoplay(); });
  }

  // Initial trigger
  goToSlide(0);
  startAutoplay();
}


import { universityEventsData } from '../data/eventsData.js';

export function renderEventsHero() {
  const events = universityEventsData;

  return `
    <section class="bcp-hero-section" style="position: relative; margin: 30px 0 50px 0; overflow: hidden;">
      <div class="container">
        
        <!-- BCP Style Main Slider Container -->
        <div id="bcpSliderWrapper" style="position: relative; background: linear-gradient(135deg, rgba(10, 40, 95, 0.95) 0%, rgba(4, 27, 77, 0.98) 100%); border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 28px; box-shadow: 0 20px 50px rgba(0,0,0,0.4); overflow: hidden; min-height: 380px;">
          
          <!-- Slides Track -->
          <div id="bcpSlidesTrack" style="position: relative; width: 100%; min-height: 380px;">
            ${events.map((event, index) => `
              <div class="bcp-slide ${index === 0 ? 'active' : ''}" data-index="${index}" style="position: absolute; inset: 0; opacity: ${index === 0 ? '1' : '0'}; visibility: ${index === 0 ? 'visible' : 'hidden'}; transition: opacity 0.6s ease-in-out, transform 0.6s ease-in-out; transform: scale(${index === 0 ? '1' : '0.98'}); display: flex; align-items: center;">
                
                <div style="width: 100%; display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); align-items: center; padding: 40px; gap: 30px;">
                  
                  <!-- Left Text Column (BCP Style) -->
                  <div style="z-index: 2; color: white;">
                    
                    <div style="display: inline-flex; align-items: center; gap: 8px; background: rgba(255, 199, 0, 0.15); border: 1px solid rgba(255, 199, 0, 0.3); color: #FFC700; padding: 6px 16px; border-radius: 20px; font-size: 0.85rem; font-weight: 800; margin-bottom: 16px;">
                      <i class="ph-fill ph-sparkle"></i> ${event.acronym} — ${event.category}
                    </div>

                    <h2 style="font-size: 2.2rem; font-weight: 900; line-height: 1.2; margin-bottom: 14px; color: #FFFFFF; text-shadow: 0 4px 20px rgba(0,0,0,0.3);">
                      ${event.title}
                    </h2>

                    <p style="font-size: 1.05rem; color: rgba(255, 255, 255, 0.85); line-height: 1.6; margin-bottom: 24px; max-width: 520px;">
                      ${event.description}
                    </p>

                    <!-- Details Pills -->
                    <div style="display: flex; flex-wrap: wrap; gap: 15px; margin-bottom: 28px; font-size: 0.88rem; color: rgba(255,255,255,0.9);">
                      <div style="display: flex; align-items: center; gap: 6px; background: rgba(255,255,255,0.08); padding: 6px 14px; border-radius: 10px;">
                        <i class="ph-fill ph-calendar" style="color: #FFC700;"></i> <span>${event.date}</span>
                      </div>
                      <div style="display: flex; align-items: center; gap: 6px; background: rgba(255,255,255,0.08); padding: 6px 14px; border-radius: 10px;">
                        <i class="ph-fill ph-map-pin" style="color: #FFC700;"></i> <span>${event.location}</span>
                      </div>
                    </div>

                    <!-- Call To Action Button (BCP Style Orange/Yellow) -->
                    <div style="display: flex; align-items: center; gap: 15px;">
                      <a href="${event.link}" target="_blank" rel="noopener noreferrer" class="btn btn-yellow" style="padding: 14px 32px; border-radius: 14px; font-weight: 800; font-size: 1rem; box-shadow: 0 10px 25px rgba(255, 199, 0, 0.3); text-decoration: none; display: inline-flex; align-items: center; gap: 8px;">
                        <span>Inscribirme gratis</span> <i class="ph ph-arrow-right" style="font-weight: 800;"></i>
                      </a>
                    </div>

                  </div>

                  <!-- Right Image Column (BCP Style Curved Arch Cutout) -->
                  <div style="position: relative; display: flex; justify-content: center; align-items: center;">
                    <div class="bcp-arch-wrapper" style="position: relative; width: 340px; height: 290px; border-radius: 150px 150px 20px 20px; overflow: hidden; border: 4px solid rgba(255, 199, 0, 0.4); box-shadow: 0 15px 35px rgba(0,0,0,0.5);">
                      <img src="${event.image}" alt="${event.title}" style="width: 100%; height: 100%; object-fit: cover; filter: brightness(0.95);" />
                      <div style="position: absolute; inset: 0; background: linear-gradient(to top, rgba(4,27,77,0.7) 0%, transparent 60%);"></div>
                      
                      <!-- Floating Badge inside Image -->
                      <div style="position: absolute; bottom: 15px; left: 15px; right: 15px; background: rgba(10, 25, 60, 0.85); backdrop-filter: blur(10px); padding: 10px 14px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.15); display: flex; justify-content: space-between; align-items: center;">
                        <span style="color: white; font-weight: 700; font-size: 0.82rem;">${event.university}</span>
                        <span style="background: #FFC700; color: #041B4D; padding: 2px 8px; border-radius: 6px; font-weight: 800; font-size: 0.72rem;">${event.badge}</span>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            `).join('')}
          </div>

          <!-- Bottom Controls Bar (BCP Style Dots & Pause/Play) -->
          <div style="position: absolute; bottom: 15px; left: 0; right: 0; display: flex; justify-content: center; align-items: center; gap: 20px; z-index: 10;">
            
            <!-- Slide Dots -->
            <div id="bcpDotsContainer" style="display: flex; items-center; gap: 8px; background: rgba(0,0,0,0.4); backdrop-filter: blur(10px); padding: 6px 14px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.1);">
              ${events.map((_, i) => `
                <button class="bcp-dot ${i === 0 ? 'active' : ''}" data-index="${i}" aria-label="Ver diapositiva ${i + 1}" style="width: ${i === 0 ? '24px' : '10px'}; height: 10px; border-radius: 10px; background: ${i === 0 ? '#FFC700' : 'rgba(255,255,255,0.4)'}; border: none; cursor: pointer; transition: all 0.3s ease;"></button>
              `).join('')}
            </div>

            <!-- Pause / Play Auto-rotation Toggle Button -->
            <button id="bcpPlayPauseBtn" aria-label="Pausar rotación automática" style="background: rgba(0,0,0,0.4); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.1); color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: background 0.3s;">
              <i class="ph-fill ph-pause" id="bcpPlayPauseIcon" style="font-size: 0.9rem;"></i>
            </button>

          </div>

          <!-- Prev / Next Arrow Buttons -->
          <button id="bcpPrevBtn" aria-label="Anterior" style="position: absolute; left: 15px; top: 50%; transform: translateY(-50%); background: rgba(0,0,0,0.3); backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,0.15); color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 10; transition: all 0.3s;">
            <i class="ph ph-caret-left" style="font-size: 1.2rem;"></i>
          </button>
          <button id="bcpNextBtn" aria-label="Siguiente" style="position: absolute; right: 15px; top: 50%; transform: translateY(-50%); background: rgba(0,0,0,0.3); backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,0.15); color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 10; transition: all 0.3s;">
            <i class="ph ph-caret-right" style="font-size: 1.2rem;"></i>
          </button>

        </div>
      </div>
    </section>
  `;
}

export function initEventsSlider() {
  const slides = document.querySelectorAll('.bcp-slide');
  const dots = document.querySelectorAll('.bcp-dot');
  const prevBtn = document.getElementById('bcpPrevBtn');
  const nextBtn = document.getElementById('bcpNextBtn');
  const playPauseBtn = document.getElementById('bcpPlayPauseBtn');
  const playPauseIcon = document.getElementById('bcpPlayPauseIcon');
  const wrapper = document.getElementById('bcpSliderWrapper');

  if (!slides.length) return;

  let currentIndex = 0;
  let isPlaying = true;
  let timer = null;

  function goToSlide(index) {
    slides.forEach((slide, i) => {
      if (i === index) {
        slide.style.opacity = '1';
        slide.style.visibility = 'visible';
        slide.style.transform = 'scale(1)';
        slide.classList.add('active');
      } else {
        slide.style.opacity = '0';
        slide.style.visibility = 'hidden';
        slide.style.transform = 'scale(0.98)';
        slide.classList.remove('active');
      }
    });

    dots.forEach((dot, i) => {
      if (i === index) {
        dot.style.width = '24px';
        dot.style.background = '#FFC700';
        dot.classList.add('active');
      } else {
        dot.style.width = '10px';
        dot.style.background = 'rgba(255,255,255,0.4)';
        dot.classList.remove('active');
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
    timer = setInterval(nextSlide, 5000);
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

  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const idx = parseInt(e.target.dataset.index);
      goToSlide(idx);
      startAutoplay();
    });
  });

  // Pause on hover
  if (wrapper) {
    wrapper.addEventListener('mouseenter', () => { if (isPlaying) stopAutoplay(); });
    wrapper.addEventListener('mouseleave', () => { if (!isPlaying) startAutoplay(); });
  }

  // Start initial autoplay
  startAutoplay();
}

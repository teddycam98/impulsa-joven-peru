import { dbService } from '../services/supabase.js';
import { i18n } from '../utils/i18n.js';
import { renderEventsHero } from '../components/eventsHero.js';

export async function renderHome() {
  const stats = await dbService.getStats();

  return `
    <!-- Decorative Shapes -->
    <div class="decorative-wrapper" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; pointer-events: none; z-index: -1;">
      <div class="dec-circle-solid-blue"></div>
      <div class="dec-circle-solid-yellow"></div>
      <div class="dec-dots-pattern"></div>
      <div class="dec-waves"></div>
    </div>

    <!-- Edge-to-Edge Panoramic Hero Section -->
    <section class="hero-edge-to-edge">
      <div class="hero-ambient-lights">
        <div class="hero-glow-blob hero-glow-blue"></div>
        <div class="hero-glow-blob hero-glow-gold"></div>
        <div class="hero-grid-mesh"></div>
      </div>

      <div class="hero-edge-container">
        <!-- Left Hero Content -->
        <div class="hero-left-stage animate-on-scroll">
          
          <div class="hero-live-pill">
            <span class="live-pulsing-dot"></span>
            <span data-i18n="home.hero.pill">${i18n.t('home.hero.pill')}</span>
          </div>

          <h1 class="hero-grand-title">
            <span class="hero-title-line" data-i18n="home.hero.title_1">${i18n.t('home.hero.title_1')}</span><br>
            <span class="hero-title-accent text-gradient-gold" data-i18n="home.hero.title_2">${i18n.t('home.hero.title_2')}</span>
          </h1>

          <p class="hero-grand-subtitle" data-i18n="home.hero.subtitle">
            ${i18n.t('home.hero.subtitle')}
          </p>

          <div class="hero-grand-actions">
            <a href="/becas" data-link class="btn btn-hero-primary">
              <i class="ph-fill ph-compass"></i>
              <span data-i18n="home.hero.btn_explore">${i18n.t('home.hero.btn_explore')}</span>
              <i class="ph ph-arrow-right"></i>
            </a>
            <a href="/portal-empresa" data-link class="btn btn-hero-secondary">
              <i class="ph-fill ph-briefcase"></i>
              <span data-i18n="home.hero.btn_portal">${i18n.t('home.hero.btn_portal')}</span>
            </a>
          </div>

          <!-- Quick Access Jump Bar -->
          <div class="hero-quick-access">
            <span class="quick-access-label" data-i18n="home.hero.quick_jump">${i18n.t('home.hero.quick_jump')}</span>
            <div class="quick-pills-wrap">
              <a href="/becas" data-link class="quick-pill"><i class="ph-fill ph-graduation-cap"></i> <span data-i18n="nav.study">${i18n.t('nav.study')}</span></a>
              <a href="/cursos" data-link class="quick-pill"><i class="ph-fill ph-book-open"></i> <span data-i18n="nav.learn">${i18n.t('nav.learn')}</span></a>
              <a href="/practicas" data-link class="quick-pill"><i class="ph-fill ph-chalkboard-teacher"></i> <span data-i18n="nav.internships">${i18n.t('nav.internships')}</span></a>
              <a href="/empleos" data-link class="quick-pill"><i class="ph-fill ph-briefcase"></i> <span data-i18n="nav.work">${i18n.t('nav.work')}</span></a>
              <a href="/universidades" data-link class="quick-pill"><i class="ph-fill ph-buildings"></i> <span data-i18n="nav.universities">${i18n.t('nav.universities')}</span></a>
              <a href="/concursos" data-link class="quick-pill"><i class="ph-fill ph-trophy"></i> <span data-i18n="nav.competitions">${i18n.t('nav.competitions')}</span></a>
              <a href="/voluntariado" data-link class="quick-pill"><i class="ph-fill ph-hands-clapping"></i> <span data-i18n="nav.volunteer">${i18n.t('nav.volunteer')}</span></a>
            </div>
          </div>

        </div>

        <!-- Right Hero Interactive Showcase Stage -->
        <div class="hero-right-stage animate-on-scroll">
          <div class="hero-showcase-card">
            
            <div class="showcase-card-header">
              <span class="showcase-badge badge-coverage" data-i18n="home.hero.card_badge_1">${i18n.t('home.hero.card_badge_1')}</span>
              <span class="showcase-badge badge-official" data-i18n="home.hero.card_badge_2">${i18n.t('home.hero.card_badge_2')}</span>
              <span class="showcase-badge badge-urgent" data-i18n="home.hero.card_badge_3">${i18n.t('home.hero.card_badge_3')}</span>
            </div>

            <div class="showcase-card-body">
              <div class="showcase-main-feature">
                <div class="showcase-img-wrap">
                  <img src="/jovenes.png" alt="Impulsa Joven Perú Talento" class="showcase-main-img" />
                  <div class="showcase-img-gradient"></div>
                </div>
                
                <div class="showcase-info-overlay">
                  <div class="showcase-inst-tag"><i class="ph-fill ph-seal-check" style="color: #4ade80;"></i> <span data-i18n="home.hero.showcase_tag">${i18n.t('home.hero.showcase_tag')}</span></div>
                  <h3 class="showcase-item-title" data-i18n="home.hero.showcase_title">${i18n.t('home.hero.showcase_title')}</h3>
                  <p class="showcase-item-desc" data-i18n="home.hero.showcase_desc">${i18n.t('home.hero.showcase_desc')}</p>
                  
                  <div class="showcase-actions">
                    <a href="/becas" data-link class="btn-showcase-cta">
                      <span data-i18n="ui.see_more">${i18n.t('ui.see_more')}</span>
                      <i class="ph ph-arrow-right"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <!-- Floating Micro-Cards -->
            <div class="floating-micro-card micro-card-left">
              <div class="micro-card-icon bg-gold"><i class="ph-fill ph-chart-line-up"></i></div>
              <div>
                <div class="micro-card-value" data-i18n="home.hero.stat_success">${i18n.t('home.hero.stat_success')}</div>
                <div class="micro-card-label" data-i18n="home.hero.stat_success_sub">${i18n.t('home.hero.stat_success_sub')}</div>
              </div>
            </div>

            <div class="floating-micro-card micro-card-right">
              <div class="micro-card-icon bg-blue"><i class="ph-fill ph-users-three"></i></div>
              <div>
                <div class="micro-card-value" data-i18n="home.hero.stat_youth">${i18n.t('home.hero.stat_youth')}</div>
                <div class="micro-card-label" data-i18n="home.hero.stat_youth_sub">${i18n.t('home.hero.stat_youth_sub')}</div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <!-- Integrated 7-Pillars Ribbon at Hero Base -->
      <div class="hero-stats-ribbon">
        <div class="hero-stats-wrapper">
          
          <a href="/becas" data-link class="stat-ribbon-item">
            <div class="stat-ribbon-icon icon-blue"><i class="ph-fill ph-graduation-cap"></i></div>
            <div class="stat-ribbon-text">
              <div class="stat-number" data-target="${stats.scholarshipsCount || 45}">0</div>
              <div class="stat-label" data-i18n="home.stats.scholarships">${i18n.t('home.stats.scholarships')}</div>
            </div>
          </a>

          <a href="/cursos" data-link class="stat-ribbon-item">
            <div class="stat-ribbon-icon icon-cyan"><i class="ph-fill ph-book-open"></i></div>
            <div class="stat-ribbon-text">
              <div class="stat-number" data-target="${stats.coursesCount || 80}">0</div>
              <div class="stat-label" data-i18n="home.stats.courses">${i18n.t('home.stats.courses')}</div>
            </div>
          </a>

          <a href="/practicas" data-link class="stat-ribbon-item">
            <div class="stat-ribbon-icon icon-teal"><i class="ph-fill ph-chalkboard-teacher"></i></div>
            <div class="stat-ribbon-text">
              <div class="stat-number" data-target="${stats.internshipsCount || 65}">0</div>
              <div class="stat-label" data-i18n="home.stats.internships">${i18n.t('home.stats.internships')}</div>
            </div>
          </a>

          <a href="/empleos" data-link class="stat-ribbon-item">
            <div class="stat-ribbon-icon icon-green"><i class="ph-fill ph-briefcase"></i></div>
            <div class="stat-ribbon-text">
              <div class="stat-number" data-target="${stats.jobsCount || 120}">0</div>
              <div class="stat-label" data-i18n="home.stats.jobs">${i18n.t('home.stats.jobs')}</div>
            </div>
          </a>

          <a href="/universidades" data-link class="stat-ribbon-item">
            <div class="stat-ribbon-icon icon-indigo"><i class="ph-fill ph-buildings"></i></div>
            <div class="stat-ribbon-text">
              <div class="stat-number" data-target="${stats.universitiesCount || 24}">0</div>
              <div class="stat-label" data-i18n="home.stats.universities">${i18n.t('home.stats.universities')}</div>
            </div>
          </a>

          <a href="/concursos" data-link class="stat-ribbon-item">
            <div class="stat-ribbon-icon icon-purple"><i class="ph-fill ph-trophy"></i></div>
            <div class="stat-ribbon-text">
              <div class="stat-number" data-target="${stats.competitionsCount || 28}">0</div>
              <div class="stat-label" data-i18n="home.stats.competitions">${i18n.t('home.stats.competitions')}</div>
            </div>
          </a>

          <a href="/voluntariado" data-link class="stat-ribbon-item">
            <div class="stat-ribbon-icon icon-coral"><i class="ph-fill ph-hands-clapping"></i></div>
            <div class="stat-ribbon-text">
              <div class="stat-number" data-target="${stats.volunteeringCount || 35}">0</div>
              <div class="stat-label" data-i18n="home.stats.volunteering">${i18n.t('home.stats.volunteering')}</div>
            </div>
          </a>

        </div>
      </div>
    </section>

    <!-- Hero de Eventos Universitarios -->
    ${renderEventsHero()}

    <!-- Section ¿Qué quieres lograr hoy? -->
    <section class="container bento-section animate-on-scroll">
      <div class="bento-title-wrapper">
        <h2 class="text-center section-title"><span data-i18n="home.bento.title_1">${i18n.t('home.bento.title_1')}</span> <span class="text-yellow" data-i18n="home.bento.title_2">${i18n.t('home.bento.title_2')}</span></h2>
      </div>
      
      <div class="cards-row">
        <!-- Card 1: Becas -->
        <a href="/becas" class="action-card card-blue" data-link>
          <div class="card-content">
            <div class="card-icon"><i class="ph ph-graduation-cap"></i></div>
            <h3 data-i18n="home.card.study.title">${i18n.t('home.card.study.title')}</h3>
            <p data-i18n="home.card.study.desc">${i18n.t('home.card.study.desc')}</p>
            <div class="card-arrow"><i class="ph ph-arrow-right"></i></div>
          </div>
          <img src="/images/estudiar.jpg" alt="Becas" class="card-bg-img">
          <div class="card-gradient"></div>
        </a>

        <!-- Card 2: Cursos Gratuitos -->
        <a href="/cursos" class="action-card card-purple" data-link>
          <div class="card-content">
            <div class="card-icon"><i class="ph ph-book-open"></i></div>
            <h3 data-i18n="home.card.learn.title">${i18n.t('home.card.learn.title')}</h3>
            <p data-i18n="home.card.learn.desc">${i18n.t('home.card.learn.desc')}</p>
            <div class="card-arrow"><i class="ph ph-arrow-right"></i></div>
          </div>
          <img src="/images/aprender.jpg" alt="Cursos Gratuitos" class="card-bg-img">
          <div class="card-gradient"></div>
        </a>

        <!-- Card 3: Prácticas -->
        <a href="/practicas" class="action-card card-teal" data-link>
          <div class="card-content">
            <div class="card-icon"><i class="ph ph-chalkboard-teacher"></i></div>
            <h3 data-i18n="home.card.internships.title">${i18n.t('home.card.internships.title')}</h3>
            <p data-i18n="home.card.internships.desc">${i18n.t('home.card.internships.desc')}</p>
            <div class="card-arrow"><i class="ph ph-arrow-right"></i></div>
          </div>
          <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=500&h=350&fit=crop" alt="Prácticas" class="card-bg-img">
          <div class="card-gradient"></div>
        </a>

        <!-- Card 4: Empleos -->
        <a href="/empleos" class="action-card card-green" data-link>
          <div class="card-content">
            <div class="card-icon"><i class="ph ph-briefcase"></i></div>
            <h3 data-i18n="home.card.work.title">${i18n.t('home.card.work.title')}</h3>
            <p data-i18n="home.card.work.desc">${i18n.t('home.card.work.desc')}</p>
            <div class="card-arrow"><i class="ph ph-arrow-right"></i></div>
          </div>
          <img src="/images/trabajar.jpg" alt="Empleos" class="card-bg-img">
          <div class="card-gradient"></div>
        </a>

        <!-- Card 5: Universidades -->
        <a href="/universidades" class="action-card card-navy" data-link>
          <div class="card-content">
            <div class="card-icon"><i class="ph ph-buildings"></i></div>
            <h3 data-i18n="home.card.universities.title">${i18n.t('home.card.universities.title')}</h3>
            <p data-i18n="home.card.universities.desc">${i18n.t('home.card.universities.desc')}</p>
            <div class="card-arrow"><i class="ph ph-arrow-right"></i></div>
          </div>
          <img src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=500&h=350&fit=crop" alt="Universidades" class="card-bg-img">
          <div class="card-gradient"></div>
        </a>

        <!-- Card 6: Concursos -->
        <a href="/concursos" class="action-card card-orange" data-link>
          <div class="card-content">
            <div class="card-icon"><i class="ph ph-trophy"></i></div>
            <h3 data-i18n="home.card.competitions.title">${i18n.t('home.card.competitions.title')}</h3>
            <p data-i18n="home.card.competitions.desc">${i18n.t('home.card.competitions.desc')}</p>
            <div class="card-arrow"><i class="ph ph-arrow-right"></i></div>
          </div>
          <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&h=350&fit=crop" alt="Concursos" class="card-bg-img">
          <div class="card-gradient"></div>
        </a>

        <!-- Card 7: Voluntariado -->
        <a href="/voluntariado" class="action-card card-yellow" data-link>
          <div class="card-content">
            <div class="card-icon"><i class="ph ph-hands-clapping"></i></div>
            <h3 data-i18n="home.card.volunteer.title">${i18n.t('home.card.volunteer.title')}</h3>
            <p data-i18n="home.card.volunteer.desc">${i18n.t('home.card.volunteer.desc')}</p>
            <div class="card-arrow"><i class="ph ph-arrow-right"></i></div>
          </div>
          <img src="/images/voluntariado.jpg" alt="Voluntariado" class="card-bg-img">
          <div class="card-gradient"></div>
        </a>
      </div>
    </section>
  `;
}

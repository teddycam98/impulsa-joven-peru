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

    <!-- 1. Hero de Eventos Universitarios (Slider Primero) -->
    ${renderEventsHero()}

    <!-- 2. Radiant Royal Blue Hero Section (Texto y Jóvenes Segundo) -->
    <section class="hero-vibrant-section">
      <div class="hero-vibrant-bg-elements">
        <div class="hero-vibrant-glow glow-1"></div>
        <div class="hero-vibrant-glow glow-2"></div>
        <div class="hero-subtle-mesh"></div>
      </div>

      <div class="hero-vibrant-container">
        <!-- Left Stage: Headline & Actions -->
        <div class="hero-vibrant-left animate-on-scroll">
          
          <div class="hero-star-badge">
            <i class="ph-fill ph-star text-yellow"></i>
            <span data-i18n="home.hero.badge">${i18n.t('home.hero.badge')}</span>
          </div>

          <h1 class="hero-vibrant-title">
            <span class="hero-title-white" data-i18n="home.hero.title_1">${i18n.t('home.hero.title_1')}</span><br>
            <span class="hero-title-yellow" data-i18n="home.hero.title_2">${i18n.t('home.hero.title_2')}</span>
          </h1>

          <p class="hero-vibrant-subtitle" data-i18n="home.hero.subtitle">
            ${i18n.t('home.hero.subtitle')}
          </p>

          <div class="hero-vibrant-buttons">
            <a href="/becas" data-link class="btn-hero-pill-yellow">
              <span data-i18n="home.hero.btn_explore">${i18n.t('home.hero.btn_explore')}</span>
              <i class="ph ph-arrow-right"></i>
            </a>
            <a href="/becas" data-link class="btn-hero-pill-outline">
              <span data-i18n="home.hero.btn_new">${i18n.t('home.hero.btn_new')}</span>
              <i class="ph ph-user"></i>
            </a>
          </div>

        </div>

        <!-- Right Stage: Cutout Students & Golden Script Quote -->
        <div class="hero-vibrant-right animate-on-scroll">
          <div class="hero-cutout-stage">
            <img src="/jovenes.png" alt="Impulsa Joven Perú" class="hero-cutout-img" />
            
            <!-- Golden Handwritten Quote (Image 3) -->
            <div class="hero-golden-quote">
              <span class="quote-script-text" data-i18n="home.hero.phrase">"${i18n.t('home.hero.phrase')}"</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Docked Capsule Bar (At Base of Hero) -->
      <div class="hero-capsule-bar-wrapper">
        <div class="hero-capsule-bar">
          
          <a href="/becas" data-link class="capsule-item">
            <div class="capsule-icon icon-blue"><i class="ph-fill ph-graduation-cap"></i></div>
            <div class="capsule-text">
              <div class="capsule-num stat-number" data-target="${stats.scholarshipsCount || 45}">+${stats.scholarshipsCount || 45}</div>
              <div class="capsule-lbl" data-i18n="home.stats.scholarships">${i18n.t('home.stats.scholarships')}</div>
            </div>
          </a>

          <div class="capsule-divider"></div>

          <a href="/cursos" data-link class="capsule-item">
            <div class="capsule-icon icon-cyan"><i class="ph-fill ph-book-open"></i></div>
            <div class="capsule-text">
              <div class="capsule-num stat-number" data-target="${stats.coursesCount || 80}">+${stats.coursesCount || 80}</div>
              <div class="capsule-lbl" data-i18n="home.stats.courses">${i18n.t('home.stats.courses')}</div>
            </div>
          </a>

          <div class="capsule-divider"></div>

          <a href="/practicas" data-link class="capsule-item">
            <div class="capsule-icon icon-teal"><i class="ph-fill ph-chalkboard-teacher"></i></div>
            <div class="capsule-text">
              <div class="capsule-num stat-number" data-target="${stats.internshipsCount || 65}">+${stats.internshipsCount || 65}</div>
              <div class="capsule-lbl" data-i18n="home.stats.internships">${i18n.t('home.stats.internships')}</div>
            </div>
          </a>

          <div class="capsule-divider"></div>

          <a href="/empleos" data-link class="capsule-item">
            <div class="capsule-icon icon-green"><i class="ph-fill ph-briefcase"></i></div>
            <div class="capsule-text">
              <div class="capsule-num stat-number" data-target="${stats.jobsCount || 120}">+${stats.jobsCount || 120}</div>
              <div class="capsule-lbl" data-i18n="home.stats.jobs">${i18n.t('home.stats.jobs')}</div>
            </div>
          </a>

          <div class="capsule-divider"></div>

          <a href="/universidades" data-link class="capsule-item">
            <div class="capsule-icon icon-indigo"><i class="ph-fill ph-buildings"></i></div>
            <div class="capsule-text">
              <div class="capsule-num stat-number" data-target="${stats.universitiesCount || 24}">+${stats.universitiesCount || 24}</div>
              <div class="capsule-lbl" data-i18n="home.stats.universities">${i18n.t('home.stats.universities')}</div>
            </div>
          </a>

          <div class="capsule-divider"></div>

          <a href="/concursos" data-link class="capsule-item">
            <div class="capsule-icon icon-purple"><i class="ph-fill ph-trophy"></i></div>
            <div class="capsule-text">
              <div class="capsule-num stat-number" data-target="${stats.competitionsCount || 28}">+${stats.competitionsCount || 28}</div>
              <div class="capsule-lbl" data-i18n="home.stats.competitions">${i18n.t('home.stats.competitions')}</div>
            </div>
          </a>

          <div class="capsule-divider"></div>

          <a href="/voluntariado" data-link class="capsule-item">
            <div class="capsule-icon icon-coral"><i class="ph-fill ph-hands-clapping"></i></div>
            <div class="capsule-text">
              <div class="capsule-num stat-number" data-target="${stats.volunteeringCount || 35}">+${stats.volunteeringCount || 35}</div>
              <div class="capsule-lbl" data-i18n="home.stats.volunteering">${i18n.t('home.stats.volunteering')}</div>
            </div>
          </a>

          <div class="capsule-divider"></div>

          <a href="/perfil" data-link class="capsule-item">
            <div class="capsule-icon icon-gold"><i class="ph-fill ph-users-three"></i></div>
            <div class="capsule-text">
              <div class="capsule-num stat-number" data-target="${stats.usersCount || 5420}">+${stats.usersCount || 5420}</div>
              <div class="capsule-lbl" data-i18n="home.stats.users">${i18n.t('home.stats.users')}</div>
            </div>
          </a>

        </div>
      </div>
    </section>

    <!-- Section ¿Qué quieres lograr hoy? (7 Pilares en una sola línea) -->
    <section class="container-wide bento-section animate-on-scroll">
      <div class="bento-title-wrapper">
        <h2 class="text-center section-title"><span data-i18n="home.bento.title_1">${i18n.t('home.bento.title_1')}</span> <span class="text-yellow" data-i18n="home.bento.title_2">${i18n.t('home.bento.title_2')}</span></h2>
      </div>
      
      <div class="cards-row">
        <!-- Card 1: Becas -->
        <a href="/becas" class="action-card" data-link>
          <div class="card-content">
            <div class="card-icon"><i class="ph-fill ph-graduation-cap"></i></div>
            <h3 data-i18n="home.card.study.title">${i18n.t('home.card.study.title')}</h3>
            <p data-i18n="home.card.study.desc">${i18n.t('home.card.study.desc')}</p>
            <div class="card-arrow"><i class="ph ph-arrow-right"></i></div>
          </div>
          <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=750&fit=crop&q=85" alt="Becas" class="card-bg-img">
          <div class="card-gradient"></div>
        </a>

        <!-- Card 2: Cursos Gratuitos -->
        <a href="/cursos" class="action-card" data-link>
          <div class="card-content">
            <div class="card-icon"><i class="ph-fill ph-book-open"></i></div>
            <h3 data-i18n="home.card.learn.title">${i18n.t('home.card.learn.title')}</h3>
            <p data-i18n="home.card.learn.desc">${i18n.t('home.card.learn.desc')}</p>
            <div class="card-arrow"><i class="ph ph-arrow-right"></i></div>
          </div>
          <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=750&fit=crop&q=85" alt="Cursos Gratuitos" class="card-bg-img">
          <div class="card-gradient"></div>
        </a>

        <!-- Card 3: Prácticas -->
        <a href="/practicas" class="action-card" data-link>
          <div class="card-content">
            <div class="card-icon"><i class="ph-fill ph-chalkboard-teacher"></i></div>
            <h3 data-i18n="home.card.internships.title">${i18n.t('home.card.internships.title')}</h3>
            <p data-i18n="home.card.internships.desc">${i18n.t('home.card.internships.desc')}</p>
            <div class="card-arrow"><i class="ph ph-arrow-right"></i></div>
          </div>
          <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=750&fit=crop&q=85" alt="Prácticas" class="card-bg-img">
          <div class="card-gradient"></div>
        </a>

        <!-- Card 4: Empleos -->
        <a href="/empleos" class="action-card" data-link>
          <div class="card-content">
            <div class="card-icon"><i class="ph-fill ph-briefcase"></i></div>
            <h3 data-i18n="home.card.work.title">${i18n.t('home.card.work.title')}</h3>
            <p data-i18n="home.card.work.desc">${i18n.t('home.card.work.desc')}</p>
            <div class="card-arrow"><i class="ph ph-arrow-right"></i></div>
          </div>
          <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=750&fit=crop&q=85" alt="Empleos" class="card-bg-img">
          <div class="card-gradient"></div>
        </a>

        <!-- Card 5: Universidades -->
        <a href="/universidades" class="action-card" data-link>
          <div class="card-content">
            <div class="card-icon"><i class="ph-fill ph-buildings"></i></div>
            <h3 data-i18n="home.card.universities.title">${i18n.t('home.card.universities.title')}</h3>
            <p data-i18n="home.card.universities.desc">${i18n.t('home.card.universities.desc')}</p>
            <div class="card-arrow"><i class="ph ph-arrow-right"></i></div>
          </div>
          <img src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&h=750&fit=crop&q=85" alt="Universidades" class="card-bg-img">
          <div class="card-gradient"></div>
        </a>

        <!-- Card 6: Concursos -->
        <a href="/concursos" class="action-card" data-link>
          <div class="card-content">
            <div class="card-icon"><i class="ph-fill ph-trophy"></i></div>
            <h3 data-i18n="home.card.competitions.title">${i18n.t('home.card.competitions.title')}</h3>
            <p data-i18n="home.card.competitions.desc">${i18n.t('home.card.competitions.desc')}</p>
            <div class="card-arrow"><i class="ph ph-arrow-right"></i></div>
          </div>
          <img src="https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&h=750&fit=crop&q=85" alt="Concursos" class="card-bg-img">
          <div class="card-gradient"></div>
        </a>

        <!-- Card 7: Voluntariado -->
        <a href="/voluntariado" class="action-card" data-link>
          <div class="card-content">
            <div class="card-icon"><i class="ph-fill ph-hands-clapping"></i></div>
            <h3 data-i18n="home.card.volunteer.title">${i18n.t('home.card.volunteer.title')}</h3>
            <p data-i18n="home.card.volunteer.desc">${i18n.t('home.card.volunteer.desc')}</p>
            <div class="card-arrow"><i class="ph ph-arrow-right"></i></div>
          </div>
          <img src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&h=750&fit=crop&q=85" alt="Voluntariado" class="card-bg-img">
          <div class="card-gradient"></div>
        </a>
      </div>
    </section>
  `;
}

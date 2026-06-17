import { dbService } from '../services/supabase.js';
import { i18n } from '../utils/i18n.js';

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

    <!-- Hero Section -->
    <section class="hero">
      <div class="container hero-container w-100">
        <!-- Text Left -->
        <div class="hero-content animate-on-scroll">
          <div class="hero-badge">
            <i class="ph-fill ph-star" style="color:var(--secondary-yellow)"></i> <span data-i18n="home.hero.badge">${i18n.t('home.hero.badge')}</span>
          </div>
          <h1><span data-i18n="home.hero.title_1">${i18n.t('home.hero.title_1')}</span><br><span class="text-yellow" data-i18n="home.hero.title_2">${i18n.t('home.hero.title_2')}</span></h1>
          <p class="hero-subtitle" data-i18n="home.hero.subtitle">${i18n.t('home.hero.subtitle')}</p>
          <div class="hero-actions">
            <a href="/becas" class="btn btn-yellow" data-link><span data-i18n="home.hero.btn_explore">${i18n.t('home.hero.btn_explore')}</span> <i class="ph ph-arrow-right"></i></a>
            <button class="btn btn-outline" style="color: var(--primary-blue); border-color: rgba(10, 77, 163, 0.4); font-weight: 700; background: rgba(255,255,255,0.9);" onclick="document.getElementById('registerModal').classList.remove('hidden')"><span data-i18n="home.hero.btn_new">${i18n.t('home.hero.btn_new')}</span> <i class="ph ph-user-plus"></i></button>
          </div>
        </div>
        
        <!-- Image Right (Transparent Cutout) -->
        <div class="hero-image-wrapper animate-on-scroll" style="animation-delay: 0.2s">
          <img src="/jovenes.png" alt="Jóvenes universitarios peruanos" class="main-hero-img">
        </div>
      </div>
    </section>

    <!-- Floating Stats Bar -->
    <div class="container stats-container-wrapper animate-on-scroll">
      <div class="stats-glass-bar">
        <div class="stat-item">
          <div class="stat-icon-wrapper bg-blue-icon"><i class="ph-fill ph-graduation-cap"></i></div>
          <div class="stat-text">
            <div class="stat-number" data-target="${stats.scholarshipsCount}">0</div>
            <div class="stat-label" data-i18n="home.stats.scholarships">${i18n.t('home.stats.scholarships')}</div>
          </div>
        </div>
        
        <div class="stat-item">
          <div class="stat-icon-wrapper bg-blue-icon"><i class="ph-fill ph-book-open"></i></div>
          <div class="stat-text">
            <div class="stat-number" data-target="${stats.coursesCount}">0</div>
            <div class="stat-label" data-i18n="home.stats.courses">${i18n.t('home.stats.courses')}</div>
          </div>
        </div>
        
        <div class="stat-item">
          <div class="stat-icon-wrapper bg-blue-icon"><i class="ph-fill ph-briefcase"></i></div>
          <div class="stat-text">
            <div class="stat-number" data-target="${stats.jobsCount}">0</div>
            <div class="stat-label" data-i18n="home.stats.jobs">${i18n.t('home.stats.jobs')}</div>
          </div>
        </div>
        
        <div class="stat-item">
          <div class="stat-icon-wrapper bg-blue-icon"><i class="ph-fill ph-trophy"></i></div>
          <div class="stat-text">
            <div class="stat-number" data-target="${stats.competitionsCount}">0</div>
            <div class="stat-label" data-i18n="home.stats.competitions">${i18n.t('home.stats.competitions')}</div>
          </div>
        </div>
        
        <div class="stat-item">
          <div class="stat-icon-wrapper bg-purple-icon"><i class="ph-fill ph-users"></i></div>
          <div class="stat-text">
            <div class="stat-number" data-target="${stats.usersCount}">0</div>
            <div class="stat-label" data-i18n="home.stats.users">${i18n.t('home.stats.users')}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Section ¿Qué quieres lograr hoy? -->
    <section class="container bento-section animate-on-scroll">
      <div class="bento-title-wrapper">
        <h2 class="text-center section-title"><span data-i18n="home.bento.title_1">${i18n.t('home.bento.title_1')}</span> <span class="text-yellow" data-i18n="home.bento.title_2">${i18n.t('home.bento.title_2')}</span></h2>
      </div>
      
      <div class="cards-row">
        <!-- Card 1: Estudiar -->
        <a href="/becas" class="action-card card-blue" data-link>
          <div class="card-content">
            <div class="card-icon"><i class="ph ph-graduation-cap"></i></div>
            <h3 data-i18n="home.card.study.title">${i18n.t('home.card.study.title')}</h3>
            <p data-i18n="home.card.study.desc">${i18n.t('home.card.study.desc')}</p>
            <div class="card-arrow"><i class="ph ph-arrow-right"></i></div>
          </div>
          <img src="/images/estudiar.jpg" alt="Estudiante" class="card-bg-img">
          <div class="card-gradient"></div>
        </a>

        <!-- Card 2: Aprender -->
        <a href="/cursos" class="action-card card-purple" data-link>
          <div class="card-content">
            <div class="card-icon"><i class="ph ph-book-open"></i></div>
            <h3 data-i18n="home.card.learn.title">${i18n.t('home.card.learn.title')}</h3>
            <p data-i18n="home.card.learn.desc">${i18n.t('home.card.learn.desc')}</p>
            <div class="card-arrow"><i class="ph ph-arrow-right"></i></div>
          </div>
          <img src="/images/aprender.jpg" alt="Aprender" class="card-bg-img">
          <div class="card-gradient"></div>
        </a>

        <!-- Card 3: Trabajar -->
        <a href="/empleos" class="action-card card-green" data-link>
          <div class="card-content">
            <div class="card-icon"><i class="ph ph-briefcase"></i></div>
            <h3 data-i18n="home.card.work.title">${i18n.t('home.card.work.title')}</h3>
            <p data-i18n="home.card.work.desc">${i18n.t('home.card.work.desc')}</p>
            <div class="card-arrow"><i class="ph ph-arrow-right"></i></div>
          </div>
          <img src="/images/trabajar.jpg" alt="Trabajar" class="card-bg-img">
          <div class="card-gradient"></div>
        </a>

        <!-- Card 4: Concursos -->
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

        <!-- Card 5: Voluntariado -->
        <a href="/voluntariado" class="action-card card-yellow" data-link>
          <div class="card-content">
            <div class="card-icon"><i class="ph ph-magic-wand"></i></div>
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

import { storage } from '../services/storage.js';

export function renderHome() {
  const impact = storage.getImpact();
  const scholarshipsCount = storage.getScholarships().length;
  const coursesCount = storage.getCourses().length;
  const jobsCount = storage.getJobs().length;
  const usersCount = impact.users_registered;

  return `
    <!-- Background overlay (Plaza de Ayacucho) spans entire screen -->
    <div class="global-bg"></div>
    <div class="global-bg-gradient"></div>
    
    <!-- Decorative Shapes -->
    <div class="dec-circle-solid-blue"></div>
    <div class="dec-circle-solid-yellow"></div>
    <div class="dec-dots-pattern"></div>
    <div class="dec-waves"></div>

    <!-- Hero Section -->
    <section class="hero">
      <div class="container hero-container w-100">
        <!-- Text Left -->
        <div class="hero-content animate-on-scroll">
          <div class="hero-badge">
            <i class="ph-fill ph-star" style="color:var(--secondary-yellow)"></i> Oportunidades reales para jóvenes reales
          </div>
          <h1>Impulsa<br><span class="text-yellow">tu futuro</span></h1>
          <p class="hero-subtitle">Encuentra becas, cursos, empleos y voluntariados<br>para crecer sin límites.</p>
          <div class="hero-actions">
            <a href="/becas" class="btn btn-yellow" data-link>Explorar oportunidades <i class="ph ph-arrow-right"></i></a>
            <button class="btn btn-outline" onclick="document.getElementById('registerModal').classList.remove('hidden')">Soy nuevo aquí <i class="ph ph-user-plus"></i></button>
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
            <div class="stat-number" data-target="${scholarshipsCount}">0</div>
            <div class="stat-label">Becas disponibles</div>
          </div>
        </div>
        
        <div class="stat-item">
          <div class="stat-icon-wrapper bg-blue-icon"><i class="ph-fill ph-book-open"></i></div>
          <div class="stat-text">
            <div class="stat-number" data-target="${coursesCount}">0</div>
            <div class="stat-label">Cursos gratuitos</div>
          </div>
        </div>
        
        <div class="stat-item">
          <div class="stat-icon-wrapper bg-blue-icon"><i class="ph-fill ph-briefcase"></i></div>
          <div class="stat-text">
            <div class="stat-number" data-target="${jobsCount}">0</div>
            <div class="stat-label">Empleos y prácticas</div>
          </div>
        </div>
        
        <div class="stat-item">
          <div class="stat-icon-wrapper bg-purple-icon"><i class="ph-fill ph-users"></i></div>
          <div class="stat-text">
            <div class="stat-number" data-target="${usersCount}">0</div>
            <div class="stat-label">Jóvenes registrados</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Section ¿Qué quieres lograr hoy? -->
    <section class="container bento-section animate-on-scroll">
      <div class="bento-title-wrapper">
        <h2 class="text-center section-title">¿Qué quieres lograr <span class="text-yellow">hoy?</span></h2>
      </div>
      
      <div class="cards-row">
        <!-- Card 1: Estudiar -->
        <a href="/becas" class="action-card card-blue" data-link>
          <div class="card-content">
            <div class="card-icon"><i class="ph ph-graduation-cap"></i></div>
            <h3>Estudiar</h3>
            <p>Encuentra becas<br>y universidades</p>
            <div class="card-arrow"><i class="ph ph-arrow-right"></i></div>
          </div>
          <img src="/images/estudiar.jpg" alt="Estudiante" class="card-bg-img">
          <div class="card-gradient"></div>
        </a>

        <!-- Card 2: Aprender -->
        <a href="/cursos" class="action-card card-purple" data-link>
          <div class="card-content">
            <div class="card-icon"><i class="ph ph-lightbulb"></i></div>
            <h3>Aprender</h3>
            <p>Cursos gratuitos para<br>desarrollar habilidades</p>
            <div class="card-arrow"><i class="ph ph-arrow-right"></i></div>
          </div>
          <img src="/images/aprender.jpg" alt="Aprender online" class="card-bg-img">
          <div class="card-gradient"></div>
        </a>

        <!-- Card 3: Trabajar -->
        <a href="/empleos" class="action-card card-green" data-link>
          <div class="card-content">
            <div class="card-icon"><i class="ph ph-briefcase"></i></div>
            <h3>Trabajar</h3>
            <p>Empleos, prácticas y<br>oportunidades</p>
            <div class="card-arrow"><i class="ph ph-arrow-right"></i></div>
          </div>
          <img src="/images/trabajar.jpg" alt="Trabajo" class="card-bg-img">
          <div class="card-gradient"></div>
        </a>

        <!-- Card 4: Voluntariado -->
        <a href="/voluntariado" class="action-card card-orange" data-link>
          <div class="card-content">
            <div class="card-icon"><i class="ph ph-heart"></i></div>
            <h3>Voluntariado</h3>
            <p>Contribuye y genera<br>impacto social</p>
            <div class="card-arrow"><i class="ph ph-arrow-right"></i></div>
          </div>
          <img src="/images/voluntariado.jpg" alt="Voluntariado" class="card-bg-img">
          <div class="card-gradient"></div>
        </a>
      </div>
    </section>
  `;

  return html;
}

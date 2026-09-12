import { initDynamicList } from '../components/opportunityList.js';
import { i18n } from '../utils/i18n.js';

export function renderCourses() {
  setTimeout(() => {
    initDynamicList('coursesView', 'course');
  }, 50);

  return `
    <div id="coursesView" class="container inner-page" style="margin-bottom: 3rem;">
      <div style="display: flex; flex-direction: column; align-items: center; text-align: center; margin-bottom: 40px;">
        <div style="display: inline-flex; align-items: center; justify-content: center; width: 64px; height: 64px; background: rgba(98,47,163,0.3); border: 1px solid rgba(98,47,163,0.5); border-radius: 18px; margin-bottom: 16px;">
          <i class="ph-fill ph-book-open" style="font-size: 2rem; color: #b07aff;"></i>
        </div>
        <h1 style="color: white; font-size: 3rem; font-weight: 900; margin-bottom: 10px;">
          Cursos <span style="color: var(--secondary-yellow);">Gratuitos</span>
        </h1>
        <p class="muted" style="font-size: 1.1rem; max-width: 650px;">
          Mejora tus habilidades técnicas y profesionales con cursos en línea y certificados gratuitos de Google, Cisco, Microsoft y las mejores universidades.
        </p>
      </div>
      
      <!-- Filters Panel -->
      <div style="background: rgba(10, 25, 60, 0.85); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; padding: 20px; margin-bottom: 30px; display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; align-items: center;">
        
        <!-- Search Input -->
        <div style="position: relative;">
          <i class="ph ph-magnifying-glass" style="position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: rgba(255,255,255,0.4); font-size: 1.1rem;"></i>
          <input type="text" id="searchInput" placeholder="Buscar por tema, tecnología o institución..." style="width: 100%; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.12); color: white; border-radius: 12px; padding: 12px 15px 12px 40px; font-family: 'Outfit', sans-serif; font-size: 0.95rem;">
        </div>

        <!-- Filter Area -->
        <div>
          <select id="areaFilter" style="width: 100%; background: rgba(10, 25, 60, 0.95); border: 1px solid rgba(255,255,255,0.12); color: white; border-radius: 12px; padding: 12px 15px; font-family: 'Outfit', sans-serif; font-size: 0.95rem;">
            <option value="all">Todas las Áreas</option>
            <option value="tecnologia">Tecnología, TI y Programación</option>
            <option value="negocios">Negocios, Emprendimiento y Finanzas</option>
            <option value="idiomas">Idiomas (Inglés / Quechua)</option>
            <option value="habilidades">Habilidades Blandas y Liderazgo</option>
          </select>
        </div>

        <!-- Filter Certification -->
        <div>
          <select id="certFilter" style="width: 100%; background: rgba(10, 25, 60, 0.95); border: 1px solid rgba(255,255,255,0.12); color: white; border-radius: 12px; padding: 12px 15px; font-family: 'Outfit', sans-serif; font-size: 0.95rem;">
            <option value="all">Cualquier Formato</option>
            <option value="cert-free">100% Con Certificado Gratuito</option>
            <option value="open">Cursos Abiertos / Autodidactas</option>
          </select>
        </div>

        <!-- Featured Checkbox -->
        <label style="display: flex; align-items: center; justify-content: center; gap: 10px; color: rgba(255,255,255,0.85); cursor: pointer; font-size: 0.95rem; font-weight: 600; white-space: nowrap;">
          <input type="checkbox" id="featuredFilter" style="width: 20px; height: 20px; cursor: pointer; accent-color: var(--secondary-yellow);">
          <span data-i18n="ui.featured_only">Solo Destacados</span>
        </label>

      </div>

      <div id="cardsContainer" class="grid-cards" style="margin-top: 0;"></div>
      
      <div id="listSpinner" style="display: none; justify-content: center; align-items: center; margin: 40px 0;">
        <i class="ph ph-spinner ph-spin" style="font-size: 2.5rem; color: var(--secondary-yellow);"></i>
      </div>
      
      <div style="display: flex; justify-content: center; margin-top: 30px;">
        <button id="loadMoreBtn" class="btn btn-outline" style="display: none; padding: 12px 32px;">
          <i class="ph ph-arrow-down"></i> Cargar más
        </button>
      </div>
    </div>
  `;
}

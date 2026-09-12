import { initDynamicList } from '../components/opportunityList.js';
import { i18n } from '../utils/i18n.js';

export function renderScholarships() {
  setTimeout(() => {
    initDynamicList('scholarshipsView', 'scholarship');
  }, 50);

  return `
    <div id="scholarshipsView" class="container inner-page" style="margin-bottom: 3rem;">
      <div style="display: flex; flex-direction: column; align-items: center; text-align: center; margin-bottom: 40px;">
        <div style="display: inline-flex; align-items: center; justify-content: center; width: 64px; height: 64px; background: rgba(10,77,163,0.3); border: 1px solid rgba(10,77,163,0.5); border-radius: 18px; margin-bottom: 16px;">
          <i class="ph-fill ph-graduation-cap" style="font-size: 2rem; color: #4da3ff;"></i>
        </div>
        <h1 style="color: white; font-size: 3rem; font-weight: 900; margin-bottom: 10px;">
          Becas <span style="color: var(--secondary-yellow);">Disponibles</span>
        </h1>
        <p class="muted" style="font-size: 1.1rem; max-width: 650px;">
          Accede a becas nacionales, Pronabec e internacionales para estudiar tu carrera técnica, universitaria o posgrado con cobertura completa.
        </p>
      </div>
      
      <!-- Filters Panel -->
      <div style="background: rgba(10, 25, 60, 0.85); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; padding: 20px; margin-bottom: 30px; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; align-items: center;">
        
        <!-- Search Input -->
        <div style="position: relative;">
          <i class="ph ph-magnifying-glass" style="position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: rgba(255,255,255,0.4); font-size: 1.1rem;"></i>
          <input type="text" id="searchInput" placeholder="Buscar beca por título o institución..." style="width: 100%; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.12); color: white; border-radius: 12px; padding: 12px 15px 12px 40px; font-family: 'Outfit', sans-serif; font-size: 0.95rem;">
        </div>

        <!-- Filter Age Range -->
        <div>
          <select id="ageFilter" style="width: 100%; background: rgba(10, 25, 60, 0.95); border: 1px solid rgba(255,255,255,0.12); color: white; border-radius: 12px; padding: 12px 15px; font-family: 'Outfit', sans-serif; font-size: 0.95rem;">
            <option value="all">Cualquier Rango de Edad</option>
            <option value="under18">15 a 18 años (Secundaria / Egresados)</option>
            <option value="18to25">18 a 25 años (Jóvenes)</option>
            <option value="over25">25 años a más (Posgrado / Adultos)</option>
          </select>
        </div>

        <!-- Filter Study Level -->
        <div>
          <select id="studyLevelFilter" style="width: 100%; background: rgba(10, 25, 60, 0.95); border: 1px solid rgba(255,255,255,0.12); color: white; border-radius: 12px; padding: 12px 15px; font-family: 'Outfit', sans-serif; font-size: 0.95rem;">
            <option value="all">Todos los Niveles</option>
            <option value="undergraduate">Pregrado Universitario</option>
            <option value="technical">Carreras Técnicas / Institutos</option>
            <option value="beca18">Beca 18 / Pronabec</option>
            <option value="postgraduate">Maestrías y Posgrados</option>
          </select>
        </div>

        <!-- Filter Coverage -->
        <div>
          <select id="coverageFilter" style="width: 100%; background: rgba(10, 25, 60, 0.95); border: 1px solid rgba(255,255,255,0.12); color: white; border-radius: 12px; padding: 12px 15px; font-family: 'Outfit', sans-serif; font-size: 0.95rem;">
            <option value="all">Todas las Coberturas</option>
            <option value="full">100% Cobertura Integral</option>
            <option value="partial">Cobertura Parcial (70% - 90%)</option>
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

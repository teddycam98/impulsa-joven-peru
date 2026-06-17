import { initDynamicList } from '../components/opportunityList.js';

export function renderScholarships() {
  setTimeout(() => {
    initDynamicList('scholarshipsView', 'scholarship');
  }, 50);

  return `
    <div id="scholarshipsView" class="container" style="margin-bottom: 2rem; padding-top: 260px;">
      <div style="display: flex; flex-direction: column; align-items: center; text-align: center; margin-bottom: 40px;">
        <div style="display: inline-flex; align-items: center; justify-content: center; width: 64px; height: 64px; background: rgba(10,77,163,0.3); border-radius: 16px; margin-bottom: 16px;">
          <i class="ph-fill ph-graduation-cap" style="font-size: 2rem; color: #4da3ff;"></i>
        </div>
        <h1 style="color: white; font-size: 3rem; font-weight: 900; margin-bottom: 10px;" data-i18n="cat.scholarships.title">Becas Disponibles</h1>
        <p class="muted" style="font-size: 1.1rem; max-width: 600px;" data-i18n="cat.scholarships.desc">Accede a becas nacionales e internacionales para estudiar en las mejores universidades del mundo.</p>
      </div>
      
      <!-- Filters -->
      <div style="background: rgba(255,255,255,0.04); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 16px 20px; margin-bottom: 30px; display: flex; flex-wrap: wrap; gap: 16px; align-items: center; justify-content: space-between;">
        <div style="flex: 1; min-width: 250px; position: relative;">
          <i class="ph ph-magnifying-glass" style="position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: rgba(255,255,255,0.4); font-size: 1.1rem;"></i>
          <input type="text" id="searchInput" data-i18n="cat.scholarships.search" placeholder="Buscar beca por título o institución..." aria-label="Buscar becas" style="width: 100%; background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.1); color: white; border-radius: 10px; padding: 12px 15px 12px 40px; font-family: 'Outfit', sans-serif; font-size: 0.95rem; transition: all 0.3s ease;">
        </div>
        <label style="display: flex; align-items: center; gap: 10px; color: rgba(255,255,255,0.7); cursor: pointer; font-size: 0.95rem; font-weight: 500; white-space: nowrap;">
          <input type="checkbox" id="featuredFilter" style="width: 18px; height: 18px; cursor: pointer; accent-color: var(--secondary-yellow);">
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

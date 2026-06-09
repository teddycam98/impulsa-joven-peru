import { initDynamicList } from '../components/opportunityList.js';

export function renderScholarships() {
  setTimeout(() => {
    initDynamicList('scholarshipsView', 'scholarship');
  }, 50);

  return `
    <div id="scholarshipsView" class="container mb-2 animate-on-scroll">
      <div class="flex-center" style="flex-direction: column; text-align: center; margin-bottom: 30px;">
        <h1 class="text-dark" style="font-size: 3.5rem; font-weight: 900; margin-bottom: 10px;">Becas Nacionales e Internacionales</h1>
        <p class="muted" style="font-size: 1.1rem; max-width: 600px;">Descubre oportunidades integrales y parciales para estudiar en las mejores universidades e institutos del Perú y el mundo.</p>
      </div>
      
      <!-- Filters -->
      <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; padding: 20px; margin-bottom: 30px; display: flex; flex-wrap: wrap; gap: 20px; align-items: center; justify-content: space-between;">
        <div style="flex: 1; min-width: 250px;">
          <input type="text" id="searchInput" placeholder="Buscar por palabra clave o institución..." style="width: 100%; background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.1); color: white; border-radius: 10px; padding: 12px 15px;">
        </div>
        <div style="display: flex; align-items: center; gap: 10px; color: white;">
          <input type="checkbox" id="featuredFilter" style="width: 18px; height: 18px; cursor: pointer;">
          <label for="featuredFilter" style="cursor: pointer;">Solo Destacados</label>
        </div>
      </div>

      <div id="cardsContainer" class="grid-cards" style="margin-top: 0;"></div>
      
      <div id="listSpinner" class="flex-center" style="margin: 40px 0; display: none;">
        <i class="ph ph-spinner ph-spin" style="font-size: 3rem; color: var(--secondary-yellow);"></i>
      </div>
      
      <div class="flex-center" style="margin-top: 40px;">
        <button id="loadMoreBtn" class="btn btn-outline" style="display: none; padding: 10px 30px;">Cargar más</button>
      </div>
    </div>
  `;
}

import { initDynamicList } from '../components/opportunityList.js';

export function renderVolunteering() {
  setTimeout(() => {
    initDynamicList('volunteeringView', 'volunteer');
  }, 50);

  return `
    <div id="volunteeringView" class="container inner-page" style="margin-bottom: 2rem;">
      <div style="display: flex; flex-direction: column; align-items: center; text-align: center; margin-bottom: 40px;">
        <div style="display: inline-flex; align-items: center; justify-content: center; width: 64px; height: 64px; background: rgba(217,75,27,0.3); border-radius: 16px; margin-bottom: 16px;">
          <i class="ph-fill ph-hands-clapping" style="font-size: 2rem; color: #ff8c5a;"></i>
        </div>
        <h1 style="color: white; font-size: 3rem; font-weight: 900; margin-bottom: 10px;" data-i18n="cat.volunteer.title">Voluntariado</h1>
        <p class="muted" style="font-size: 1.1rem; max-width: 600px;" data-i18n="cat.volunteer.desc">Participa en programas de voluntariado y genera un impacto positivo en tu comunidad mientras desarrollas nuevas habilidades.</p>
      </div>
      
      <!-- Filters Panel -->
      <div style="background: rgba(10, 25, 60, 0.85); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; padding: 20px; margin-bottom: 30px; display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 16px; align-items: center;">
        
        <!-- Search Input -->
        <div style="position: relative;">
          <i class="ph ph-magnifying-glass" style="position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: rgba(255,255,255,0.4); font-size: 1.1rem;"></i>
          <input type="text" id="searchInput" placeholder="Buscar voluntariado por causa u ONG..." aria-label="Buscar voluntariado" style="width: 100%; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.12); color: white; border-radius: 12px; padding: 12px 15px 12px 40px; font-family: 'Outfit', sans-serif; font-size: 0.95rem;">
        </div>

        <!-- Filter Cause -->
        <div>
          <select id="causeFilter" style="width: 100%; background: rgba(10, 25, 60, 0.95); border: 1px solid rgba(255,255,255,0.12); color: white; border-radius: 12px; padding: 12px 15px; font-family: 'Outfit', sans-serif; font-size: 0.95rem;">
            <option value="all">Todas las Causas Sociales</option>
            <option value="social">Impacto Social y Hábitat</option>
            <option value="salud">Salud y Primeros Auxilios</option>
            <option value="ambiente">Medio Ambiente y Clima</option>
            <option value="educacion">Educación e Infancia</option>
            <option value="civico">Ciudadanía y Cultura</option>
          </select>
        </div>

        <!-- Filter Modality -->
        <div>
          <select id="modalityFilter" style="width: 100%; background: rgba(10, 25, 60, 0.95); border: 1px solid rgba(255,255,255,0.12); color: white; border-radius: 12px; padding: 12px 15px; font-family: 'Outfit', sans-serif; font-size: 0.95rem;">
            <option value="all">Todas las Modalidades</option>
            <option value="onsite">Presencial (En campo)</option>
            <option value="remote">100% Remoto / En línea</option>
            <option value="hybrid">Híbrido</option>
          </select>
        </div>

        <!-- Filter Location -->
        <div>
          <select id="locationFilter" style="width: 100%; background: rgba(10, 25, 60, 0.95); border: 1px solid rgba(255,255,255,0.12); color: white; border-radius: 12px; padding: 12px 15px; font-family: 'Outfit', sans-serif; font-size: 0.95rem;">
            <option value="all">Todas las Regiones</option>
            <option value="Lima">Lima</option>
            <option value="Ayacucho">Ayacucho</option>
            <option value="Cusco">Cusco</option>
            <option value="Arequipa">Arequipa</option>
            <option value="Nacional">Nacional (Todo el Perú)</option>
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

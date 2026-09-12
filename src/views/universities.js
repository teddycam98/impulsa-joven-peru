import { universitiesData } from '../data/universitiesData.js';
import { renderEventsHero } from '../components/eventsHero.js';
import { i18n } from '../utils/i18n.js';

export function renderUniversities() {
  return `
    <div class="universities-page" style="padding-bottom: 60px;">
      
      <!-- Top Banner Hero -->
      <section class="hero-subpage" style="padding: 240px 0 40px 0; background: radial-gradient(circle at top center, rgba(10, 77, 163, 0.3) 0%, rgba(4, 27, 77, 0) 70%); text-align: center;">
        <div class="container text-center">
          <div class="hero-badge" style="display: inline-flex; align-items: center; gap: 8px; background: rgba(255, 199, 0, 0.15); border: 1px solid rgba(255, 199, 0, 0.3); color: #FFC700; padding: 6px 16px; border-radius: 20px; font-size: 0.85rem; font-weight: 700; margin-bottom: 15px;">
            <i class="ph-fill ph-buildings"></i> <span data-i18n="cat.universities.badge">${i18n.t('cat.universities.badge')}</span>
          </div>
          <h1 style="font-size: 2.5rem; font-weight: 800; color: white; margin-bottom: 12px;">
            ${i18n.t('cat.universities.title_h1')}
          </h1>
          <p class="muted" style="max-width: 750px; margin: 0 auto 30px auto; font-size: 1.05rem; line-height: 1.6;" data-i18n="cat.universities.desc">
            ${i18n.t('cat.universities.desc')}
          </p>

          <!-- Search & Filter Controls -->
          <div class="search-filter-bar glass-panel" style="max-width: 900px; margin: 0 auto; padding: 15px 20px; background: rgba(10, 25, 60, 0.85); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.12); border-radius: 20px; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
            <!-- Search Input -->
            <div style="position: relative;">
              <i class="ph ph-magnifying-glass" style="position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: var(--text-muted); font-size: 1.1rem;"></i>
              <input type="text" id="uniSearchInput" placeholder="${i18n.t('filter.search_universities')}" data-i18n-placeholder="filter.search_universities" style="width: 100%; padding: 12px 14px 12px 40px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; color: white; font-family: 'Outfit', sans-serif; font-size: 0.9rem;" />
            </div>

            <!-- Type Filter -->
            <div>
              <select id="uniTypeFilter" style="width: 100%; padding: 12px 14px; background: rgba(10, 25, 60, 0.95); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; color: white; font-family: 'Outfit', sans-serif; font-size: 0.9rem;">
                <option value="all" data-i18n="filter.type.all">${i18n.t('filter.type.all')}</option>
                <option value="publica" data-i18n="filter.type.public">${i18n.t('filter.type.public')}</option>
                <option value="privada" data-i18n="filter.type.private">${i18n.t('filter.type.private')}</option>
                <option value="instituto" data-i18n="filter.type.institute">${i18n.t('filter.type.institute')}</option>
              </select>
            </div>

            <!-- Region Filter -->
            <div>
              <select id="uniRegionFilter" style="width: 100%; padding: 12px 14px; background: rgba(10, 25, 60, 0.95); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; color: white; font-family: 'Outfit', sans-serif; font-size: 0.9rem;">
                <option value="all" data-i18n="filter.location.all">${i18n.t('filter.location.all')}</option>
                <option value="Ayacucho">Ayacucho</option>
                <option value="Lima">Lima</option>
                <option value="Arequipa">Arequipa</option>
                <option value="Cusco">Cusco</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      <!-- Events Hero (Embedded in Universities Page) -->
      ${renderEventsHero()}

      <!-- Universities Directory Grid Section -->
      <section class="container" style="margin-top: 40px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px;">
          <h2 style="font-size: 1.6rem; font-weight: 700; color: white; margin: 0;">
            <span data-i18n="cat.universities.list_title">${i18n.t('cat.universities.list_title')}</span> (<span id="uniCountDisplay">${universitiesData.length}</span>)
          </h2>
        </div>

        <div id="universitiesGrid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 24px;">
          ${renderUniversitiesList(universitiesData)}
        </div>
      </section>

    </div>
  `;
}

function renderUniversitiesList(items) {
  if (!items || items.length === 0) {
    return `
      <div style="grid-column: 1 / -1; text-center; padding: 50px 20px; background: rgba(255,255,255,0.03); border-radius: 20px; border: 1px solid rgba(255,255,255,0.05);">
        <i class="ph ph-buildings" style="font-size: 3rem; color: #FFC700; margin-bottom: 15px;"></i>
        <h3 style="color: white; font-weight: 700;">No se encontraron instituciones</h3>
        <p class="muted">Intenta ajustando el nombre de búsqueda o filtrando por otra región.</p>
      </div>
    `;
  }

  return items.map(uni => `
    <div class="uni-card glass-panel" style="background: rgba(10, 25, 60, 0.7); backdrop-filter: blur(15px); border: ${uni.acronym === 'LA PONTIFICIA' ? '2px solid #FFC700' : '1px solid rgba(255, 255, 255, 0.1)'}; border-radius: 20px; padding: 24px; display: flex; flex-direction: column; position: relative; overflow: hidden; transition: transform 0.3s ease, box-shadow 0.3s ease;">
      
      ${uni.featured ? `
        <div style="position: absolute; top: 15px; right: -32px; transform: rotate(45deg); background: #FFC700; color: #041B4D; font-size: 0.68rem; font-weight: 900; padding: 4px 35px; box-shadow: 0 4px 10px rgba(0,0,0,0.3); text-transform: uppercase;">
          <span data-i18n="uni.featured_badge">${i18n.t('uni.featured_badge')}</span>
        </div>
      ` : ''}

      <!-- Header: Logo & Title -->
      <div style="display: flex; gap: 15px; align-items: flex-start; margin-bottom: 16px;">
        <img src="${uni.logo}" alt="${uni.name}" style="width: 55px; height: 55px; border-radius: 14px; object-fit: cover; border: 2px solid rgba(255,255,255,0.15);" />
        <div>
          <span style="display: inline-block; background: rgba(255,255,255,0.08); color: #FFC700; padding: 3px 10px; border-radius: 8px; font-size: 0.75rem; font-weight: 700; margin-bottom: 4px;">
            ${uni.type}
          </span>
          <h3 style="font-size: 1.15rem; font-weight: 800; color: white; margin: 0; line-height: 1.3;">
            ${uni.name}
          </h3>
        </div>
      </div>

      <p style="font-size: 0.88rem; color: rgba(255,255,255,0.7); line-height: 1.5; margin-bottom: 18px;">
        ${uni.description}
      </p>

      <!-- Badges de Becas -->
      <div style="margin-bottom: 16px;">
        <div style="font-size: 0.8rem; font-weight: 700; color: #e2e8f0; margin-bottom: 8px; display: flex; align-items: center; gap: 6px;">
          <i class="ph-fill ph-graduation-cap" style="color: #FFC700;"></i> <span data-i18n="uni.applicable_scholarships">${i18n.t('uni.applicable_scholarships')}</span>
        </div>
        <div style="display: flex; flex-wrap: wrap; gap: 6px;">
          ${uni.becas.map(b => `
            <span style="background: rgba(4, 163, 114, 0.15); border: 1px solid rgba(4, 163, 114, 0.3); color: #34d399; font-size: 0.78rem; padding: 4px 10px; border-radius: 8px; font-weight: 600;">
              ${b}
            </span>
          `).join('')}
        </div>
      </div>

      <!-- Badges de Cursos Gratuitos -->
      <div style="margin-bottom: 20px; flex-grow: 1;">
        <div style="font-size: 0.8rem; font-weight: 700; color: #e2e8f0; margin-bottom: 8px; display: flex; align-items: center; gap: 6px;">
          <i class="ph-fill ph-book-open" style="color: #FFC700;"></i> <span data-i18n="uni.free_courses_offer">${i18n.t('uni.free_courses_offer')}</span>
        </div>
        <div style="display: flex; flex-wrap: wrap; gap: 6px;">
          ${uni.cursos.map(c => `
            <span style="background: rgba(59, 130, 246, 0.15); border: 1px solid rgba(59, 130, 246, 0.3); color: #60a5fa; font-size: 0.78rem; padding: 4px 10px; border-radius: 8px;">
              ${c}
            </span>
          `).join('')}
        </div>
      </div>

      <!-- Footer Info & Button -->
      <div style="border-top: 1px solid rgba(255,255,255,0.08); padding-top: 15px; display: flex; justify-content: space-between; align-items: center;">
        <div style="font-size: 0.8rem; color: var(--text-muted); display: flex; align-items: center; gap: 5px;">
          <i class="ph-fill ph-map-pin" style="color: #FFC700;"></i> ${uni.region}
        </div>
        <a href="${uni.website}" target="_blank" rel="noopener noreferrer" class="btn btn-outline" style="border-color: rgba(255,199,0,0.4); color: #FFC700; font-weight: 700; font-size: 0.82rem; padding: 8px 14px; border-radius: 10px; text-decoration: none; display: inline-flex; align-items: center; gap: 6px;">
          <span data-i18n="uni.view_portal">${i18n.t('uni.view_portal')}</span> <i class="ph ph-arrow-square-out"></i>
        </a>
      </div>

    </div>
  `).join('');
}

export function initUniversitiesLogic() {
  const searchInput = document.getElementById('uniSearchInput');
  const typeFilter = document.getElementById('uniTypeFilter');
  const regionFilter = document.getElementById('uniRegionFilter');
  const gridContainer = document.getElementById('universitiesGrid');
  const countDisplay = document.getElementById('uniCountDisplay');

  if (!searchInput || !gridContainer) return;

  function filterData() {
    const query = searchInput.value.toLowerCase().trim();
    const selectedType = typeFilter.value;
    const selectedRegion = regionFilter.value;

    const filtered = universitiesData.filter(uni => {
      const matchSearch = uni.name.toLowerCase().includes(query) || 
                          uni.description.toLowerCase().includes(query) ||
                          uni.region.toLowerCase().includes(query) ||
                          uni.acronym.toLowerCase().includes(query);

      const matchType = selectedType === 'all' || uni.typeCategory === selectedType;
      const matchRegion = selectedRegion === 'all' || uni.regionsAvailable.includes(selectedRegion);

      return matchSearch && matchType && matchRegion;
    });

    gridContainer.innerHTML = renderUniversitiesList(filtered);
    if (countDisplay) countDisplay.textContent = filtered.length;
  }

  searchInput.addEventListener('input', filterData);
  typeFilter.addEventListener('change', filterData);
  regionFilter.addEventListener('change', filterData);
}

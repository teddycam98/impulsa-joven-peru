import { universitiesData } from '../data/universitiesData.js';
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

      <!-- Universities Directory Grid Section -->
      <section class="container" style="margin-top: 40px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px;">
          <h2 style="font-size: 1.6rem; font-weight: 700; color: white; margin: 0;">
            <span data-i18n="cat.universities.list_title">${i18n.t('cat.universities.list_title')}</span> (<span id="uniCountDisplay">${universitiesData.length}</span>)
          </h2>
        </div>

        <div id="universitiesGrid" class="grid-cards">
          ${renderUniversitiesList(universitiesData)}
        </div>
      </section>

      <!-- Complete University Detail Modal -->
      <div id="uniDetailModal" class="uni-modal-backdrop" onclick="window.handleUniModalBackdrop(event)">
        <div class="uni-modal-container">
          <button class="uni-modal-close-btn" onclick="window.closeUniModal()" aria-label="Cerrar modal">
            <i class="ph ph-x"></i>
          </button>
          <div id="uniModalContent">
            <!-- Dynamically populated on card click -->
          </div>
        </div>
      </div>

    </div>
  `;
}

function renderUniversitiesList(items) {
  if (!items || items.length === 0) {
    return `
      <div style="grid-column: 1 / -1; text-align: center; padding: 50px 20px;">
        <i class="ph ph-buildings" style="font-size: 3rem; color: #FFD600; display: block; margin-bottom: 15px;"></i>
        <h3 style="color: white; font-weight: 700;">No se encontraron instituciones</h3>
        <p class="muted">Intenta ajustando el nombre de búsqueda o filtrando por otra región.</p>
      </div>
    `;
  }

  return items.map(uni => `
    <div class="scroll-card uni-card-clickable" onclick="window.openUniModal('${uni.id}')" style="cursor: pointer; text-decoration: none;">
      ${uni.featured ? `
        <div class="opp-badges-row">
          <span class="opp-badge opp-badge-featured"><i class="ph-fill ph-star"></i> DESTACADO</span>
        </div>
      ` : ''}
      <div class="scroll-card-img-wrapper">
        <img src="${uni.coverImage}" alt="${uni.name}" class="scroll-card-img" loading="lazy"
          onerror="this.src='https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80'" />
      </div>
      <div class="scroll-card-content">
        <div class="card-icon-header">
          <span class="card-badge"><i class="ph-fill ph-buildings"></i> ${uni.type}</span>
        </div>
        <h3>${uni.name}</h3>
        <p style="margin-bottom: 14px;">${uni.description}</p>
        
        <!-- Carreras Preview Chips -->
        <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 14px;">
          ${(uni.carreras || []).slice(0, 3).map(c => `
            <span style="font-size: 0.72rem; background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.9); padding: 3px 8px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.12);">
              <i class="ph-fill ph-graduation-cap" style="color: #FFD600;"></i> ${c}
            </span>
          `).join('')}
          ${(uni.carreras && uni.carreras.length > 3) ? `
            <span style="font-size: 0.72rem; background: rgba(255,214,0,0.15); color: #FFD600; padding: 3px 8px; border-radius: 6px; font-weight: 700;">
              +${uni.carreras.length - 3} más
            </span>
          ` : ''}
        </div>

        <div class="card-footer">
          <span class="muted"><i class="ph-fill ph-map-pin"></i> ${uni.region}</span>
          <span class="card-apply-link" style="color: #FFD600; font-weight: 700;">
            Ver Carreras e Info <i class="ph ph-arrow-right"></i>
          </span>
        </div>
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

  // Attach modal helpers to window
  window.openUniModal = function(id) {
    const uni = universitiesData.find(u => u.id === id);
    if (!uni) return;

    const modal = document.getElementById('uniDetailModal');
    const content = document.getElementById('uniModalContent');
    if (!modal || !content) return;

    content.innerHTML = `
      <div class="uni-modal-banner">
        <img src="${uni.coverImage}" alt="${uni.name}" class="uni-modal-banner-img" onerror="this.src='https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&auto=format&fit=crop&q=80'" />
        <div class="uni-modal-banner-overlay"></div>
        <div class="uni-modal-header-badge">
          <img src="${uni.logo}" alt="${uni.name}" class="uni-modal-logo" onerror="this.src='https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=150&auto=format&fit=crop&q=80'" />
          <div class="uni-modal-title-group">
            <span class="uni-modal-type-pill"><i class="ph-fill ph-buildings"></i> ${uni.type}</span>
            <h2>${uni.name}</h2>
          </div>
        </div>
      </div>

      <div class="uni-modal-body">
        
        <!-- Key Meta Strip -->
        <div class="uni-meta-grid">
          <div class="uni-meta-item">
            <span class="uni-meta-label">Región Principal</span>
            <span class="uni-meta-val"><i class="ph-fill ph-map-pin" style="color: #FFD600;"></i> ${uni.region}</span>
          </div>
          <div class="uni-meta-item">
            <span class="uni-meta-label">Modalidad de Enseñanza</span>
            <span class="uni-meta-val"><i class="ph-fill ph-chalkboard-teacher" style="color: #34d399;"></i> ${uni.modalidad || 'Presencial y Virtual'}</span>
          </div>
          <div class="uni-meta-item">
            <span class="uni-meta-label">Sedes Disponibles</span>
            <span class="uni-meta-val">${(uni.regionsAvailable || [uni.region]).join(', ')}</span>
          </div>
          <div class="uni-meta-item">
            <span class="uni-meta-label">Teléfono / Consultas</span>
            <span class="uni-meta-val"><i class="ph-fill ph-phone" style="color: #60a5fa;"></i> ${uni.phone || '+51 (01) 600-0000'}</span>
          </div>
        </div>

        <!-- Description -->
        <div>
          <h3 class="uni-section-title"><i class="ph-fill ph-info"></i> Resumen Institucional</h3>
          <p class="uni-modal-desc">${uni.description}</p>
        </div>

        <!-- Carreras Profesionales y Técnicas -->
        <div>
          <h3 class="uni-section-title">
            <i class="ph-fill ph-graduation-cap"></i> Carreras Profesionales y Técnicas Ofertadas (${(uni.carreras || []).length})
          </h3>
          <div class="uni-carreras-grid">
            ${(uni.carreras || []).map(carrera => `
              <div class="uni-carrera-chip">
                <i class="ph-fill ph-certificate"></i>
                <span>${carrera}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Becas Aplicables -->
        <div>
          <h3 class="uni-section-title"><i class="ph-fill ph-seal-check"></i> Becas Aplicables y Convenios</h3>
          <div class="uni-tags-flex">
            ${(uni.becas || []).map(b => `
              <span class="uni-beca-tag">
                <i class="ph-fill ph-star"></i> ${b}
              </span>
            `).join('')}
          </div>
        </div>

        <!-- Cursos y Talleres Gratuitos -->
        ${(uni.cursos && uni.cursos.length) ? `
          <div>
            <h3 class="uni-section-title"><i class="ph-fill ph-book-open"></i> Oferta de Cursos Libres y Talleres</h3>
            <div class="uni-tags-flex">
              ${uni.cursos.map(c => `
                <span class="uni-curso-tag">
                  <i class="ph-fill ph-sparkle"></i> ${c}
                </span>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Admisión y Requisitos -->
        <div style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 18px;">
          <h4 style="color: #FFD600; font-size: 0.95rem; font-weight: 700; margin-bottom: 8px; display: flex; align-items: center; gap: 8px;">
            <i class="ph-fill ph-calendar-check"></i> Información de Admisión
          </h4>
          <p style="color: rgba(255,255,255,0.85); font-size: 0.88rem; line-height: 1.5; margin-bottom: 12px;">
            ${uni.admision || 'Convocatoria vigente de admisión ordinaria y becas Pronabec.'}
          </p>
          <div style="font-size: 0.8rem; color: rgba(255,255,255,0.6); font-weight: 700; margin-bottom: 6px;">REQUISITOS COMUNES:</div>
          <ul style="padding-left: 18px; color: rgba(255,255,255,0.8); font-size: 0.82rem; line-height: 1.6; margin: 0;">
            ${(uni.requisitos || [
              'Certificado original de educación secundaria completa',
              'Copia de DNI o documento de identidad',
              'Acreditación socioeconómica para postulación a becas'
            ]).map(r => `<li>${r}</li>`).join('')}
          </ul>
        </div>

      </div>

      <!-- Modal Footer Action -->
      <div class="uni-modal-footer">
        <button class="btn btn-outline" onclick="window.closeUniModal()" style="border-color: rgba(255,255,255,0.3); color: white; padding: 10px 20px; font-size: 0.9rem; border-radius: 12px; cursor: pointer;">
          Cerrar
        </button>
        <a href="${uni.website}" target="_blank" rel="noopener noreferrer" class="btn-uni-portal">
          <span>Visitar Sitio Oficial (${uni.acronym})</span>
          <i class="ph ph-arrow-square-out"></i>
        </a>
      </div>
    `;

    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  };

  window.closeUniModal = function() {
    const modal = document.getElementById('uniDetailModal');
    if (modal) {
      modal.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  };

  window.handleUniModalBackdrop = function(e) {
    if (e.target && e.target.id === 'uniDetailModal') {
      window.closeUniModal();
    }
  };

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      window.closeUniModal();
    }
  });

  if (!searchInput || !gridContainer) return;

  function filterData() {
    const query = searchInput.value.toLowerCase().trim();
    const selectedType = typeFilter.value;
    const selectedRegion = regionFilter.value;

    const filtered = universitiesData.filter(uni => {
      const matchSearch = uni.name.toLowerCase().includes(query) || 
                          uni.description.toLowerCase().includes(query) ||
                          uni.region.toLowerCase().includes(query) ||
                          uni.acronym.toLowerCase().includes(query) ||
                          (uni.carreras && uni.carreras.some(c => c.toLowerCase().includes(query)));

      const matchType = selectedType === 'all' || uni.typeCategory === selectedType;
      const matchRegion = selectedRegion === 'all' || (uni.regionsAvailable && uni.regionsAvailable.includes(selectedRegion)) || uni.region === selectedRegion;

      return matchSearch && matchType && matchRegion;
    });

    gridContainer.innerHTML = renderUniversitiesList(filtered);
    if (countDisplay) countDisplay.textContent = filtered.length;
    // Reinitialize i18n translations after re-render
    if (window.i18n) window.i18n.translateDOM();
  }

  searchInput.addEventListener('input', filterData);
  typeFilter.addEventListener('change', filterData);
  regionFilter.addEventListener('change', filterData);
}

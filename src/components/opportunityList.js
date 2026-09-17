import { dbService } from '../services/supabase.js';
import { getUniqueImage } from '../utils/images.js';
import { i18n } from '../utils/i18n.js';
import { translateOpportunity } from '../utils/opportunityTranslations.js';

const categoryLabels = {
  scholarship: 'Beca',
  course: 'Curso Gratuito',
  internship: 'Práctica',
  job: 'Empleo',
  volunteer: 'Voluntariado',
  competition: 'Concurso'
};

const categoryIcons = {
  scholarship: 'ph-graduation-cap',
  course: 'ph-book-open',
  internship: 'ph-chalkboard-teacher',
  job: 'ph-briefcase',
  volunteer: 'ph-hands-clapping',
  competition: 'ph-trophy'
};

function getBadges(opp) {
  let badges = '';
  const now = new Date();
  
  if (opp.featured) {
    badges += `<span class="opp-badge opp-badge-featured"><i class="ph-fill ph-star"></i> ${i18n.t('ui.badge_featured')}</span>`;
  }
  
  if (opp.created_at) {
    const createdDate = new Date(opp.created_at);
    const diffDays = Math.ceil((now - createdDate) / (1000 * 60 * 60 * 24));
    if (diffDays <= 7) {
      badges += `<span class="opp-badge opp-badge-new"><i class="ph-fill ph-sparkle"></i> ${i18n.t('ui.badge_new')}</span>`;
    }
  }
  
  if (opp.deadline) {
    const deadlineDate = new Date(opp.deadline);
    const diffDays = Math.ceil((deadlineDate - now) / (1000 * 60 * 60 * 24));
    if (diffDays >= 0 && diffDays <= 7) {
      badges += `<span class="opp-badge opp-badge-urgent"><i class="ph ph-clock"></i> ${i18n.t('ui.badge_urgent')}</span>`;
    }
  }
  return badges;
}

function formatDeadline(deadline) {
  if (!deadline) return i18n.t('ui.open');
  try {
    const d = new Date(deadline);
    const locale = i18n.currentLang === 'en' ? 'en-US' : 'es-PE';
    return d.toLocaleDateString(locale, { day: 'numeric', month: 'short', year: 'numeric' });
  } catch (error) {
    return deadline;
  }
}

const escapeHTML = (str) => {
  if (!str) return '';
  return str.replace(/[&<>'"]/g, tag => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
  }[tag] || tag));
};

export function generateOpportunityCards(opportunities, category, favIds, startIndex = 0) {
  return opportunities.map((rawOpp, index) => {
    const opp = translateOpportunity(rawOpp, i18n.currentLang);
    const isFav = favIds.includes(opp.id);
    const badges = getBadges(opp);
    
    let imgUrl = opp.image_url;
    if (!imgUrl || imgUrl.startsWith('/images/')) {
      imgUrl = getUniqueImage(opp);
    }

    const catLabel = i18n.t(`cat.label.${opp.category}`) || categoryLabels[opp.category] || 'Oportunidad';
    const catIcon = categoryIcons[opp.category] || 'ph-globe';
    
    return `
      <div class="scroll-card uni-card-clickable" onclick="window.openOpportunityModal('${opp.id}')" style="animation-delay: ${(index % 12) * 0.06}s; cursor: pointer; text-decoration: none;">
        <button class="btn-favorite ${isFav ? 'active' : ''}" data-id="${opp.id}" data-category="${opp.category}" onclick="event.preventDefault(); event.stopPropagation(); window.toggleFav(this, '${opp.id}', '${opp.category}')" title="${isFav ? i18n.t('ui.remove_favorite') : i18n.t('ui.save')}">
          <i class="ph-fill ph-heart"></i>
        </button>
        ${badges ? `<div class="opp-badges-row">${badges}</div>` : ''}
        <div class="scroll-card-img-wrapper">
          <img src="${imgUrl}" class="scroll-card-img" alt="${opp.title || ''}" loading="lazy" onerror="this.src='/images/estudiar.jpg'" />
        </div>
        <div class="scroll-card-content">
          <div class="card-icon-header">
            <span class="card-badge"><i class="ph-fill ${catIcon}"></i> ${escapeHTML(opp.organization || catLabel)}</span>
          </div>
          <h3>${escapeHTML(opp.title || 'Sin título')}</h3>
          <p>${escapeHTML(opp.description || 'Conoce los requisitos, fechas y cómo postular.')}</p>
          <div class="card-footer">
            <span class="muted"><i class="ph-fill ph-calendar"></i> ${formatDeadline(opp.deadline)}</span>
            <span class="card-apply-link" style="color: #FFD600; font-weight: 700;">${i18n.t('ui.see_more')} <i class="ph ph-arrow-right"></i></span>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function generateSkeletonCards(count = 8) {
  return Array(count).fill('').map(() => `
    <div class="scroll-card skeleton-card-wrapper">
      <div class="skeleton" style="height: 200px; border-radius: var(--radius-lg) var(--radius-lg) 0 0;"></div>
      <div style="padding: 24px;">
        <div class="skeleton skeleton-text" style="width: 60%;"></div>
        <div class="skeleton skeleton-text" style="width: 90%; margin-top: 12px;"></div>
        <div class="skeleton skeleton-text" style="width: 40%; margin-top: 12px;"></div>
      </div>
    </div>
  `).join('');
}

export async function initDynamicList(containerId, category) {
  let page = 0;
  const limit = 12;
  let isLoading = false;
  let hasMore = true;
  let currentSearch = '';
  let currentFeatured = undefined;
  
  const container = document.getElementById(containerId);
  if (!container) return;
  
  const searchInput = container.querySelector('#searchInput');
  const featuredFilter = container.querySelector('#featuredFilter');
  const cardsContainer = container.querySelector('#cardsContainer');
  let loadMoreBtn = container.querySelector('#loadMoreBtn');

  // Dynamic Results Counter Bar
  let resultsCountText = container.querySelector('#resultsCountText');
  if (!resultsCountText && cardsContainer) {
    const bar = document.createElement('div');
    bar.id = 'resultsCountBar';
    bar.style.cssText = 'display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; padding: 12px 18px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 14px;';
    bar.innerHTML = `
      <span id="resultsCountText" style="color: rgba(255,255,255,0.85); font-size: 0.95rem; font-weight: 600;">
        <i class="ph ph-spinner ph-spin" style="margin-right: 6px;"></i>
        Cargando convocatorias...
      </span>
    `;
    cardsContainer.parentNode.insertBefore(bar, cardsContainer);
    resultsCountText = bar.querySelector('#resultsCountText');
  }

  // Specific dropdown filters
  const ageFilter = container.querySelector('#ageFilter');
  const studyLevelFilter = container.querySelector('#studyLevelFilter');
  const coverageFilter = container.querySelector('#coverageFilter');
  const modalityFilter = container.querySelector('#modalityFilter');
  const practiceTypeFilter = container.querySelector('#practiceTypeFilter');
  const areaFilter = container.querySelector('#areaFilter');
  const certFilter = container.querySelector('#certFilter');
  const locationFilter = container.querySelector('#locationFilter');
  const causeFilter = container.querySelector('#causeFilter');
  const competitionTypeFilter = container.querySelector('#competitionTypeFilter');
  
  if (!loadMoreBtn && cardsContainer) {
    loadMoreBtn = document.createElement('button');
    loadMoreBtn.id = 'loadMoreBtn';
    loadMoreBtn.className = 'btn btn-outline';
    loadMoreBtn.style.margin = '40px auto 0';
    loadMoreBtn.style.display = 'none';
    cardsContainer.parentNode.insertBefore(loadMoreBtn, cardsContainer.nextSibling);
  }

  // Ensure click listener is always securely bound to loadMoreBtn
  if (loadMoreBtn) {
    loadMoreBtn.onclick = (e) => {
      e.preventDefault();
      loadData(false);
    };
  }
  
  const favIds = await dbService.getFavoriteIds();
  
  async function loadData(reset = false) {
    if (isLoading || (!hasMore && !reset)) return;
    isLoading = true;
    
    if (reset) {
      page = 0;
      hasMore = true;
      cardsContainer.innerHTML = generateSkeletonCards(8);
      if (loadMoreBtn) loadMoreBtn.style.display = 'none';
      if (resultsCountText) {
        resultsCountText.innerHTML = `<i class="ph ph-spinner ph-spin" style="margin-right: 6px;"></i> ${i18n.t('ui.loading') || 'Cargando convocatorias...'}`;
      }
    } else {
      if (loadMoreBtn) {
        loadMoreBtn.disabled = true;
        loadMoreBtn.innerHTML = `<i class="ph ph-spinner ph-spin"></i> ${i18n.t('ui.loading') || 'Cargando más convocatorias...'}`;
      }
    }

    const filterAgeRange = ageFilter ? ageFilter.value : undefined;
    const filterTypeCategory = studyLevelFilter ? studyLevelFilter.value : 
                              (practiceTypeFilter ? practiceTypeFilter.value : 
                              (competitionTypeFilter ? competitionTypeFilter.value : 
                              (causeFilter ? causeFilter.value : 
                              (areaFilter ? areaFilter.value : undefined))));
    const filterCoverage = coverageFilter ? coverageFilter.value : 
                          (certFilter && certFilter.value === 'cert-free' ? 'full' : undefined);
    const filterModality = modalityFilter ? modalityFilter.value : undefined;
    const filterLocation = locationFilter ? locationFilter.value : undefined;
    
    let data = await dbService.getOpportunities({
      category,
      limit,
      page,
      search: currentSearch,
      featured: currentFeatured,
      active: true,
      ageRange: filterAgeRange,
      typeCategory: filterTypeCategory,
      coverage: filterCoverage,
      modality: filterModality,
      location: filterLocation
    });
    
    if (reset) {
      cardsContainer.innerHTML = '';
    }
    
    if (data.length > 0) {
      const html = generateOpportunityCards(data, category, favIds, page * limit);
      cardsContainer.insertAdjacentHTML('beforeend', html);
    }

    const renderedCount = cardsContainer.querySelectorAll('.scroll-card').length;
    const totalCount = typeof data.total === 'number' ? data.total : (page * limit + data.length);

    if (resultsCountText) {
      if (totalCount === 0) {
        resultsCountText.innerHTML = `<i class="ph ph-warning-circle" style="color: #ffb800; margin-right: 6px;"></i> No se encontraron convocatorias para los filtros seleccionados`;
      } else {
        resultsCountText.innerHTML = `<i class="ph-fill ph-check-circle" style="color: #4da3ff; margin-right: 6px;"></i> Mostrando <strong style="color: #FFD600;">${renderedCount}</strong> de <strong style="color: #fff;">${totalCount}</strong> convocatorias vigentes`;
      }
    }

    if (renderedCount < totalCount && data.length > 0) {
      hasMore = true;
      const remaining = totalCount - renderedCount;
      if (loadMoreBtn) {
        loadMoreBtn.style.display = 'inline-flex';
        loadMoreBtn.disabled = false;
        loadMoreBtn.className = 'btn btn-outline';
        loadMoreBtn.style.opacity = '1';
        loadMoreBtn.innerHTML = `${i18n.t('ui.load_more')} (${remaining} más) <i class="ph ph-caret-down"></i>`;
      }
    } else {
      hasMore = false;
      if (loadMoreBtn) {
        if (totalCount > 0 && renderedCount >= totalCount) {
          loadMoreBtn.style.display = 'inline-flex';
          loadMoreBtn.disabled = true;
          loadMoreBtn.className = 'btn btn-outline';
          loadMoreBtn.style.opacity = '0.7';
          loadMoreBtn.innerHTML = `<i class="ph-fill ph-check-circle" style="color: #4da3ff; margin-right: 6px;"></i> Has visto todas las ${totalCount} convocatorias vigentes`;
        } else {
          loadMoreBtn.style.display = 'none';
        }
      }
    }
    
    if (reset && data.length === 0) {
      cardsContainer.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1; text-align: center; padding: 50px 20px; background: rgba(255,255,255,0.03); border-radius: 20px; border: 1px solid rgba(255,255,255,0.06);">
          <i class="ph ph-magnifying-glass" style="font-size: 3rem; color: var(--secondary-yellow); margin-bottom: 15px;"></i>
          <h3 style="color: white; font-weight: 800; margin-bottom: 8px;">No se encontraron resultados</h3>
          <p class="muted">Intenta ajustando los filtros o términos de búsqueda.</p>
        </div>
      `;
    }
    
    page++;
    isLoading = false;
  }
  
  // Events
  if (searchInput) {
    let timeout = null;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        currentSearch = e.target.value.trim();
        loadData(true);
      }, 350);
    });
  }
  
  if (featuredFilter) {
    featuredFilter.addEventListener('change', (e) => {
      currentFeatured = e.target.checked ? true : undefined;
      loadData(true);
    });
  }

  // Connect all select filters to trigger reload
  const allDropdowns = [ageFilter, studyLevelFilter, coverageFilter, modalityFilter, practiceTypeFilter, areaFilter, certFilter, locationFilter, causeFilter, competitionTypeFilter];
  allDropdowns.forEach(select => {
    if (select) {
      select.addEventListener('change', () => loadData(true));
    }
  });
  
  // Initial load
  loadData(true);
  
  // Listen to language changes
  const onLangChange = () => {
    if (document.getElementById(containerId)) {
      if (loadMoreBtn && hasMore) {
        loadMoreBtn.innerHTML = `${i18n.t('ui.load_more')} <i class="ph ph-caret-down"></i>`;
      }
      loadData(true);
    } else {
      window.removeEventListener('languageChanged', onLangChange);
    }
  };
  window.addEventListener('languageChanged', onLangChange);
}

import { dbService } from '../services/supabase.js';
import { getUniqueImage } from '../utils/images.js';
import { i18n } from '../utils/i18n.js';

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
    return d.toLocaleDateString('es-PE', { day: 'numeric', month: 'short', year: 'numeric' });
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
  return opportunities.map((opp, index) => {
    const isFav = favIds.includes(opp.id);
    const badges = getBadges(opp);
    
    let imgUrl = opp.image_url;
    if (!imgUrl || imgUrl.startsWith('/images/') || imgUrl.includes('unsplash.com')) {
      imgUrl = getUniqueImage(opp);
    }

    const catLabel = categoryLabels[opp.category] || 'Oportunidad';
    const catIcon = categoryIcons[opp.category] || 'ph-globe';
    
    return `
      <a href="/oportunidad/${opp.id}" data-link class="scroll-card" style="animation-delay: ${(index % 12) * 0.06}s; text-decoration: none;">
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
            <span class="card-apply-link">${i18n.t('ui.see_more')} <i class="ph ph-arrow-right"></i></span>
          </div>
        </div>
      </a>
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
    loadMoreBtn.innerHTML = `${i18n.t('ui.load_more')} <i class="ph ph-caret-down"></i>`;
    cardsContainer.parentNode.insertBefore(loadMoreBtn, cardsContainer.nextSibling);
    loadMoreBtn.addEventListener('click', () => loadData(false));
  }
  
  const favIds = await dbService.getFavoriteIds();
  
  async function loadData(reset = false) {
    if (isLoading || (!hasMore && !reset)) return;
    isLoading = true;
    
    if (reset) {
      page = 0;
      hasMore = true;
      cardsContainer.innerHTML = generateSkeletonCards(8);
    }
    
    if (loadMoreBtn) loadMoreBtn.style.display = 'none';
    
    let rawData = await dbService.getOpportunities({
      category,
      limit,
      page,
      search: currentSearch,
      featured: currentFeatured,
      active: true
    });

    // Client-side filtering for advanced dropdown filters
    let data = rawData.filter(item => {
      if (ageFilter && ageFilter.value !== 'all') {
        if (item.ageRange && item.ageRange !== 'all' && item.ageRange !== ageFilter.value) return false;
      }
      if (studyLevelFilter && studyLevelFilter.value !== 'all') {
        if (item.typeCategory !== studyLevelFilter.value) return false;
      }
      if (coverageFilter && coverageFilter.value !== 'all') {
        if (item.coverage !== coverageFilter.value) return false;
      }
      if (modalityFilter && modalityFilter.value !== 'all') {
        if (item.modality !== modalityFilter.value) return false;
      }
      if (practiceTypeFilter && practiceTypeFilter.value !== 'all') {
        if (item.typeCategory !== practiceTypeFilter.value) return false;
      }
      if (areaFilter && areaFilter.value !== 'all') {
        if (item.typeCategory !== areaFilter.value) return false;
      }
      if (certFilter && certFilter.value === 'cert-free') {
        if (item.coverage !== 'full') return false;
      }
      if (locationFilter && locationFilter.value !== 'all') {
        const itemLoc = (item.location || '').toLowerCase();
        const filterLoc = locationFilter.value.toLowerCase();
        if (!itemLoc.includes(filterLoc)) return false;
      }
      if (causeFilter && causeFilter.value !== 'all') {
        if (item.typeCategory !== causeFilter.value) return false;
      }
      if (competitionTypeFilter && competitionTypeFilter.value !== 'all') {
        if (item.typeCategory !== competitionTypeFilter.value) return false;
      }
      return true;
    });
    
    if (rawData.length < limit) {
      hasMore = false;
    }
    
    if (reset) {
      cardsContainer.innerHTML = '';
    }
    
    if (data.length > 0) {
      const html = generateOpportunityCards(data, category, favIds, page * limit);
      cardsContainer.insertAdjacentHTML('beforeend', html);
      if (hasMore && loadMoreBtn) loadMoreBtn.style.display = 'inline-flex';
    } else if (reset) {
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
      if (loadMoreBtn) loadMoreBtn.innerHTML = `${i18n.t('ui.load_more')} <i class="ph ph-caret-down"></i>`;
      loadData(true);
    } else {
      window.removeEventListener('languageChanged', onLangChange);
    }
  };
  window.addEventListener('languageChanged', onLangChange);
}

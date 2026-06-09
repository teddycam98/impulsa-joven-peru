import { dbService } from '../services/supabase.js';
import { getUniqueImage } from '../utils/images.js';

function getBadges(opp) {
  let badges = '';
  const now = new Date();
  
  if (opp.featured) {
    badges += `<span style="background: var(--secondary-yellow); color: var(--primary-blue); font-size: 0.75rem; font-weight: bold; padding: 3px 8px; border-radius: 10px; margin-right: 5px;">DESTACADO</span>`;
  }
  
  if (opp.created_at) {
    const createdDate = new Date(opp.created_at);
    const diffDays = Math.ceil((now - createdDate) / (1000 * 60 * 60 * 24));
    if (diffDays <= 7) {
      badges += `<span style="background: #51cf66; color: white; font-size: 0.75rem; font-weight: bold; padding: 3px 8px; border-radius: 10px; margin-right: 5px;">NUEVO</span>`;
    }
  }
  
  if (opp.deadline) {
    const deadlineDate = new Date(opp.deadline);
    const diffDays = Math.ceil((deadlineDate - now) / (1000 * 60 * 60 * 24));
    if (diffDays >= 0 && diffDays <= 7) {
      badges += `<span style="background: #ff6b6b; color: white; font-size: 0.75rem; font-weight: bold; padding: 3px 8px; border-radius: 10px; margin-right: 5px;"><i class="ph ph-clock"></i> CIERRA PRONTO</span>`;
    }
  }
  return badges;
}

export function generateOpportunityCards(opportunities, category, favIds, startIndex = 0) {
  return opportunities.map((opp, index) => {
    const isFav = favIds.includes(opp.id);
    const badges = getBadges(opp);
    const imgUrl = opp.image_url || getUniqueImage(category, startIndex + index);
    
    return `
      <a href="${opp.external_link}" target="_blank" rel="noopener noreferrer" class="scroll-card animate-on-scroll" style="animation-delay: ${(index % 12) * 0.05}s; opacity: 1; transform: none;">
        <button class="btn-favorite ${isFav ? 'active' : ''}" data-id="${opp.id}" data-category="${opp.category}" onclick="event.preventDefault(); window.toggleFav(this, '${opp.id}', '${opp.category}')">
          <i class="ph-fill ph-heart"></i>
        </button>
        <img src="${imgUrl}" class="scroll-card-img" alt="${opp.title}" loading="lazy" style="object-fit: cover;" />
        <div class="scroll-card-content">
          <div class="card-icon-header" style="margin-bottom: 10px;">
            <span class="card-badge"><i class="ph-fill ph-globe"></i> ${opp.organization || 'Organización'}</span>
          </div>
          ${badges ? `<div style="margin-bottom: 8px;">${badges}</div>` : ''}
          <h3 style="font-size: 1.3rem; margin-bottom: 5px;">${opp.title}</h3>
          <p style="font-size: 0.95rem;">${opp.description || ''}</p>
          <div class="card-footer" style="margin-top: 15px;">
            <span class="muted"><i class="ph-fill ph-clock"></i> Cierra: ${opp.deadline || 'No especificado'}</span>
            <span class="text-yellow" style="font-weight:bold;">Aplicar <i class="ph ph-arrow-right"></i></span>
          </div>
        </div>
      </a>
    `;
  }).join('');
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
  
  const searchInput = document.getElementById('searchInput');
  const featuredFilter = document.getElementById('featuredFilter');
  const cardsContainer = document.getElementById('cardsContainer');
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  const spinner = document.getElementById('listSpinner');
  
  const favIds = await dbService.getFavoriteIds();
  
  async function loadData(reset = false) {
    if (isLoading || (!hasMore && !reset)) return;
    isLoading = true;
    
    if (reset) {
      page = 0;
      hasMore = true;
      cardsContainer.innerHTML = '';
    }
    
    if (spinner) spinner.style.display = 'block';
    if (loadMoreBtn) loadMoreBtn.style.display = 'none';
    
    const data = await dbService.getOpportunities({
      category,
      limit,
      page,
      search: currentSearch,
      featured: currentFeatured,
      active: true
    });
    
    if (spinner) spinner.style.display = 'none';
    
    if (data.length < limit) {
      hasMore = false;
    }
    
    if (data.length > 0) {
      const html = generateOpportunityCards(data, category, favIds, page * limit);
      cardsContainer.insertAdjacentHTML('beforeend', html);
      if (hasMore && loadMoreBtn) loadMoreBtn.style.display = 'inline-flex';
    } else if (reset) {
      cardsContainer.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 40px;">
          <i class="ph ph-folder-open" style="font-size: 4rem; color: rgba(255,255,255,0.2);"></i>
          <p style="color: rgba(255,255,255,0.6); margin-top: 10px;">No se encontraron resultados.</p>
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
      }, 500);
    });
  }
  
  if (featuredFilter) {
    featuredFilter.addEventListener('change', (e) => {
      currentFeatured = e.target.checked ? true : undefined;
      loadData(true);
    });
  }
  
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => loadData(false));
  }
  
  // Initial load
  loadData(true);
}

import { dbService } from '../services/supabase.js';
import { getUniqueImage } from '../utils/images.js';

const categoryLabels = {
  scholarship: 'Beca',
  course: 'Curso',
  job: 'Empleo',
  volunteer: 'Voluntariado'
};

const categoryIcons = {
  scholarship: 'ph-graduation-cap',
  course: 'ph-book-open',
  job: 'ph-briefcase',
  volunteer: 'ph-hands-clapping'
};

function getBadges(opp) {
  let badges = '';
  const now = new Date();
  
  if (opp.featured) {
    badges += `<span class="opp-badge opp-badge-featured"><i class="ph-fill ph-star"></i> DESTACADO</span>`;
  }
  
  if (opp.created_at) {
    const createdDate = new Date(opp.created_at);
    const diffDays = Math.ceil((now - createdDate) / (1000 * 60 * 60 * 24));
    if (diffDays <= 7) {
      badges += `<span class="opp-badge opp-badge-new"><i class="ph-fill ph-sparkle"></i> NUEVO</span>`;
    }
  }
  
  if (opp.deadline) {
    const deadlineDate = new Date(opp.deadline);
    const diffDays = Math.ceil((deadlineDate - now) / (1000 * 60 * 60 * 24));
    if (diffDays >= 0 && diffDays <= 7) {
      badges += `<span class="opp-badge opp-badge-urgent"><i class="ph ph-clock"></i> CIERRA PRONTO</span>`;
    }
  }
  return badges;
}

function formatDeadline(deadline) {
  if (!deadline) return 'Abierto';
  try {
    const d = new Date(deadline);
    return d.toLocaleDateString('es-PE', { day: 'numeric', month: 'short', year: 'numeric' });
  } catch {
    return deadline;
  }
}

const escapeHTML = (str) => {
  if (!str) return '';
  return str.replace(/[&<>'"]/g, tag => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
  }[tag] || tag));
};

const categoryImages = {
  scholarship: [
    'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1525926477800-7a3b10316ac6?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1513258496099-48168024aec0?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=500&h=350&fit=crop'
  ],
  course: [
    'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1546422904-90eab23c3d7e?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=350&fit=crop'
  ],
  job: [
    'https://images.unsplash.com/photo-1605379399642-870262d3d051?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1556761175-5973dc0f32d7?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?w=500&h=350&fit=crop'
  ],
  volunteer: [
    'https://images.unsplash.com/photo-1533106418989-88406c7cc8ca?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=500&h=350&fit=crop'
  ]
};

const categoryLinks = {
  scholarship: '/becas',
  course: '/cursos',
  job: '/empleos',
  volunteer: '/voluntariado'
};

export function generateOpportunityCards(opportunities, category, favIds, startIndex = 0) {
  return opportunities.map((opp, index) => {
    const isFav = favIds.includes(opp.id);
    const badges = getBadges(opp);
    const imageArray = categoryImages[opp.category] || categoryImages.scholarship;
    const imgUrl = imageArray[index % imageArray.length];

    const safeLink = categoryLinks[opp.category] || '#';
    const catLabel = categoryLabels[opp.category] || 'Oportunidad';
    const catIcon = categoryIcons[opp.category] || 'ph-globe';
    
    return `
      <a href="${safeLink}" target="_blank" rel="noopener noreferrer" class="scroll-card" style="animation-delay: ${(index % 12) * 0.06}s;">
        <button class="btn-favorite ${isFav ? 'active' : ''}" data-id="${opp.id}" data-category="${opp.category}" onclick="event.preventDefault(); event.stopPropagation(); window.toggleFav(this, '${opp.id}', '${opp.category}')">
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
          <p>${escapeHTML(opp.description || 'Descubre esta oportunidad y postula ahora.')}</p>
          <div class="card-footer">
            <span class="muted"><i class="ph-fill ph-calendar"></i> ${formatDeadline(opp.deadline)}</span>
            <span class="card-apply-link">Ver más <i class="ph ph-arrow-right"></i></span>
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
      cardsContainer.innerHTML = generateSkeletonCards(8);
    }
    
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
    
    if (reset) {
      cardsContainer.innerHTML = '';
    }
    
    if (data.length > 0) {
      const html = generateOpportunityCards(data, category, favIds, page * limit);
      cardsContainer.insertAdjacentHTML('beforeend', html);
      if (hasMore && loadMoreBtn) loadMoreBtn.style.display = 'inline-flex';
    } else if (reset) {
      cardsContainer.innerHTML = `
        <div class="empty-state">
          <i class="ph ph-magnifying-glass"></i>
          <h3>No se encontraron resultados</h3>
          <p>Intenta con otros términos de búsqueda o quita los filtros.</p>
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
      }, 400);
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

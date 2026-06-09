import { dbService } from '../services/supabase.js';
import { getUniqueImage } from '../utils/images.js';

export async function renderFavorites() {
  const user = await dbService.getCurrentUser();
  if (!user) {
    setTimeout(() => {
      window.history.pushState(null, null, '/');
      window.dispatchEvent(new Event('popstate'));
      const btnReg = document.getElementById('btnRegister');
      if(btnReg) btnReg.click();
    }, 100);
    return `
      <div style="display: flex; justify-content: center; align-items: center; min-height: 60vh;">
        <p class="muted">Redirigiendo...</p>
      </div>
    `;
  }

  const favorites = await dbService.getFavorites(user.id);

  const emptyState = `
    <div style="display: flex; flex-direction: column; align-items: center; text-align: center; margin: 50px auto; padding: 60px 40px; background: rgba(255,255,255,0.03); border-radius: 30px; border: 2px dashed rgba(255,255,255,0.1); max-width: 600px;">
      <i class="ph-fill ph-heart-break" style="font-size: 5rem; color: var(--secondary-yellow); margin-bottom: 20px; filter: drop-shadow(0 10px 20px rgba(255,213,0,0.3));"></i>
      <h3 style="font-size: 2rem; margin-bottom: 10px; color: white;">Aún no has guardado oportunidades</h3>
      <p class="muted" style="margin-bottom: 25px;">Explora becas, cursos y empleos, y guárdalos aquí para tenerlos a la mano cuando los necesites.</p>
      <button class="btn" onclick="window.history.pushState(null, null, '/'); window.dispatchEvent(new Event('popstate'));">Explorar oportunidades</button>
    </div>
  `;

  if (favorites.length === 0) {
    return `
      <div class="container" style="margin-bottom: 2rem; margin-top: 40px; min-height: 60vh; padding-top: 260px;">
        <h1 style="color: white; font-size: 2.5rem; margin-bottom: 20px; font-weight: 800;">Mis Favoritos</h1>
        ${emptyState}
      </div>
    `;
  }

  return `
    <div class="container" style="margin-bottom: 2rem; margin-top: 40px; min-height: 60vh; padding-top: 260px;">
      <div style="display: flex; flex-direction: column; align-items: center; text-align: center; margin-bottom: 30px;">
        <h1 style="color: white; font-size: 3.5rem; font-weight: 900; margin-bottom: 10px;">Mis Favoritos</h1>
        <p class="muted">${favorites.length} oportunidad${favorites.length !== 1 ? 'es' : ''} guardada${favorites.length !== 1 ? 's' : ''}</p>
      </div>
      <div class="grid-cards">
        ${favorites.map((fav, index) => {
          const item = fav.opportunity_data;
          if (!item) return '';
          const safeLink = item.external_link || '#';
          const imgUrl = item.image_url || getUniqueImage(fav.category, index);
          return `
            <a href="${safeLink}" target="_blank" rel="noopener noreferrer" class="scroll-card" style="animation-delay: ${index * 0.06}s">
              <button class="btn-favorite active" data-id="${fav.opportunity_id}" data-category="${fav.category}" onclick="event.preventDefault(); event.stopPropagation(); window.toggleFav(this, '${fav.opportunity_id}', '${fav.category}')">
                <i class="ph-fill ph-heart"></i>
              </button>
              <div class="scroll-card-img-wrapper">
                <img src="${imgUrl}" class="scroll-card-img" alt="${item.title || ''}" loading="lazy" onerror="this.src='/images/estudiar.jpg'" />
              </div>
              <div class="scroll-card-content">
                <div class="card-icon-header">
                  <span class="card-badge"><i class="ph-fill ph-star"></i> ${(fav.category || '').toUpperCase()}</span>
                </div>
                <h3>${item.title || 'Sin título'}</h3>
                <p>${item.description || 'Descubre esta oportunidad.'}</p>
                <div class="card-footer">
                  <span class="card-apply-link" style="font-weight: bold;">Ver más <i class="ph ph-arrow-right"></i></span>
                </div>
              </div>
            </a>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

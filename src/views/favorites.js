import { dbService } from '../services/supabase.js';
import { getUniqueImage } from '../utils/images.js';

export async function renderFavorites() {
  const user = await dbService.getCurrentUser();
  if (!user) {
    // If not logged in, redirect to home and open modal
    setTimeout(() => {
      window.history.pushState(null, null, '/');
      window.dispatchEvent(new Event('popstate'));
      const btnReg = document.getElementById('btnRegister');
      if(btnReg) btnReg.click();
    }, 100);
    return `
      <div class="flex-center" style="min-height: 60vh;">
        <p class="muted">Redirigiendo...</p>
      </div>
    `;
  }

  const favorites = await dbService.getFavorites(user.id);

  const emptyState = `
    <div class="flex-center animate-on-scroll" style="flex-direction: column; text-align: center; margin: 50px auto; padding: 60px 40px; background: rgba(255,255,255,0.03); border-radius: 30px; border: 2px dashed rgba(255,255,255,0.1); max-width: 600px;">
      <i class="ph-fill ph-heart-break" style="font-size: 5rem; color: var(--secondary-yellow); margin-bottom: 20px; filter: drop-shadow(0 10px 20px rgba(255,213,0,0.3));"></i>
      <h3 style="font-size: 2rem; margin-bottom: 10px; color: white;">Aún no has guardado oportunidades</h3>
      <p class="muted" style="margin-bottom: 25px;">Explora becas, cursos y empleos, y guárdalos aquí para tenerlos a la mano cuando los necesites.</p>
      <button class="btn" onclick="window.history.pushState(null, null, '/'); window.dispatchEvent(new Event('popstate'));">Explorar oportunidades</button>
    </div>
  `;

  if (favorites.length === 0) {
    return `
      <div class="container mb-2 animate-on-scroll" style="margin-top: 40px; min-height: 60vh;">
        <h1 style="color: white; font-size: 2.5rem; margin-bottom: 20px; font-weight: 800;">Mis Favoritos</h1>
        ${emptyState}
      </div>
    `;
  }

  return `
    <div class="container mb-2 animate-on-scroll" style="margin-top: 40px; min-height: 60vh;">
      <div class="flex-center" style="flex-direction: column; text-align: center; margin-bottom: 30px;">
        <h1 class="text-dark" style="font-size: 3.5rem; font-weight: 900; margin-bottom: 10px;">Mis Favoritos</h1>
        <p class="muted">Tus oportunidades guardadas</p>
      </div>
      <div class="grid-cards">
        ${favorites.map((fav, index) => {
          const item = fav.opportunity_data;
          if (!item) return '';
          return `
            <a href="${item.application_url || item.course_url}" target="_blank" rel="noopener noreferrer" class="scroll-card animate-on-scroll" style="animation-delay: ${index * 0.1}s">
              <button class="btn-favorite active" data-id="${fav.opportunity_id}" data-category="${fav.category}" onclick="event.preventDefault(); window.toggleFav(this, '${fav.opportunity_id}', '${fav.category}')" style="position: absolute; top: 15px; right: 15px; z-index: 10; background: rgba(0,0,0,0.5); border: none; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; cursor: pointer; backdrop-filter: blur(5px); color: var(--secondary-yellow); transition: all 0.3s ease;">
                <i class="ph-fill ph-heart" style="font-size: 1.5rem;"></i>
              </button>
              <img src="${getUniqueImage(fav.category, index)}" class="scroll-card-img" alt="${item.title}" loading="lazy" style="object-fit: cover;" />
              <div class="scroll-card-content">
                <div class="card-icon-header" style="margin-bottom: 10px;">
                  <span class="card-badge"><i class="ph-fill ph-star"></i> ${fav.category.toUpperCase()}</span>
                </div>
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <div class="card-footer">
                  <span class="text-yellow" style="font-weight:bold;">Aplicar <i class="ph ph-arrow-right"></i></span>
                </div>
              </div>
            </a>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

import { dbService } from '../services/supabase.js';
import { getUniqueImage } from '../utils/images.js';

export async function renderVolunteering() {
  const volunteering = await dbService.getVolunteering();
  const favIds = await dbService.getFavoriteIds();

  const emptyState = `
    <div class="flex-center animate-on-scroll" style="flex-direction: column; text-align: center; margin: 50px auto; padding: 60px 40px; background: rgba(255,255,255,0.03); border-radius: 30px; border: 2px dashed rgba(255,255,255,0.1); max-width: 600px;">
      <i class="ph-fill ph-folder-open" style="font-size: 5rem; color: var(--secondary-yellow); margin-bottom: 20px; filter: drop-shadow(0 10px 20px rgba(255,213,0,0.3));"></i>
      <h3 style="font-size: 2rem; margin-bottom: 10px; color: white;">Aún no hay voluntariados disponibles</h3>
      <p class="muted" style="margin-bottom: 25px;">Estamos actualizando nuestra base de datos. Vuelve pronto para descubrir nuevas oportunidades de impacto social.</p>
    </div>
  `;

  return `
    <div class="container mb-2 animate-on-scroll">
      <div class="flex-center" style="flex-direction: column; text-align: center; margin-bottom: 20px;">
        <h1 class="text-dark" style="font-size: 3.5rem; font-weight: 900; margin-bottom: 10px;">Oportunidades de Voluntariado</h1>
      </div>
      ${volunteering.length === 0 ? emptyState : `
      <div class="grid-cards">
        ${volunteering.map((v, index) => {
          const isFav = favIds.includes(v.id);
          return `
          <a href="${v.application_url}" target="_blank" rel="noopener noreferrer" class="scroll-card animate-on-scroll" style="animation-delay: ${index * 0.1}s">
            <button class="btn-favorite ${isFav ? 'active' : ''}" data-id="${v.id}" data-category="volunteering" onclick="event.preventDefault(); window.toggleFav(this, '${v.id}', 'volunteering')">
              <i class="ph-fill ph-heart"></i>
            </button>
            <img src="${getUniqueImage('volunteering', index)}" class="scroll-card-img" alt="${v.title}" loading="lazy" style="object-fit: cover;" />
            <div class="scroll-card-content">
              <div class="card-icon-header" style="margin-bottom: 10px;">
                <span class="card-badge"><i class="ph-fill ph-heart"></i> Impacto Social</span>
              </div>
              <h3>${v.title}</h3>
              <p>${v.description}</p>
              <div class="card-footer">
                <span class="muted"><i class="ph-fill ph-users"></i> ${v.organization}</span>
                <span class="text-yellow" style="font-weight:bold;">Sumarme <i class="ph ph-arrow-right"></i></span>
              </div>
            </div>
          </a>
        `;
        }).join('')}
      </div>`}
    </div>
  `;
}

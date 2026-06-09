import { storage } from '../services/storage.js';

export function renderScholarships() {
  storage.logImpact('scholarships_viewed');
  const scholarships = storage.getScholarships();

  const emptyState = `
    <div class="flex-center animate-on-scroll" style="flex-direction: column; text-align: center; margin: 50px auto; padding: 60px 40px; background: rgba(255,255,255,0.03); border-radius: 30px; border: 2px dashed rgba(255,255,255,0.1); max-width: 600px;">
      <i class="ph-fill ph-folder-open" style="font-size: 5rem; color: var(--secondary-yellow); margin-bottom: 20px; filter: drop-shadow(0 10px 20px rgba(255,213,0,0.3));"></i>
      <h3 style="font-size: 2rem; margin-bottom: 10px; color: white;">Aún no hay becas disponibles</h3>
      <p class="muted" style="margin-bottom: 25px;">Estamos actualizando nuestra base de datos. Vuelve pronto para descubrir nuevas oportunidades académicas.</p>
      <button class="btn btn-outline" onclick="alert('¡Te notificaremos cuando haya vacantes!')">Notificarme</button>
    </div>
  `;

  return `
    <div class="container mb-2 animate-on-scroll">
      <div class="flex-center" style="flex-direction: column; text-align: center; margin-bottom: 20px;">
        <h1 class="text-dark" style="font-size: 3.5rem; font-weight: 900; margin-bottom: 10px;">Becas Nacionales e Internacionales</h1>
      </div>
      ${scholarships.length === 0 ? emptyState : `
      <div class="grid-cards">
        ${scholarships.map((b, index) => `
          <a href="${b.link}" target="_blank" rel="noopener noreferrer" class="scroll-card animate-on-scroll" style="animation-delay: ${index * 0.1}s">
            <img src="${b.imageUrl}" class="scroll-card-img" alt="${b.title}" loading="lazy" />
            <div class="scroll-card-content">
              <div class="card-icon-header" style="margin-bottom: 10px;">
                <span class="card-badge"><i class="ph-fill ph-globe"></i> ${b.type}</span>
              </div>
              <h3>${b.title}</h3>
              <p>${b.desc}</p>
              <div class="card-footer">
                <span class="muted"><i class="ph-fill ph-clock"></i> Cierra: ${b.deadline}</span>
                <span class="text-yellow" style="font-weight:bold;">Aplicar <i class="ph ph-arrow-right"></i></span>
              </div>
            </div>
          </a>
        `).join('')}
      </div>`}
    </div>
  `;
}

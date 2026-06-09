import { dbService } from '../services/supabase.js';

export async function renderProfile() {
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

  const avatar = user.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=ffcc00&color=041b4d&bold=true`;

  return `
    <div class="container mb-2 animate-on-scroll" style="margin-top: 40px; min-height: 60vh;">
      <div style="background: rgba(255,255,255,0.03); border-radius: 20px; border: 1px solid rgba(255,255,255,0.1); padding: 40px; display: flex; flex-direction: column; align-items: center; text-align: center; max-width: 600px; margin: 0 auto;">
        
        <img src="${avatar}" alt="Avatar" style="width: 120px; height: 120px; border-radius: 50%; border: 4px solid var(--secondary-yellow); margin-bottom: 20px; object-fit: cover;">
        
        <h1 style="color: white; font-size: 2.5rem; margin-bottom: 5px;">${user.name}</h1>
        <p class="muted" style="margin-bottom: 30px; font-size: 1.1rem;">${user.email}</p>

        <div style="width: 100%; display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px;">
          <div style="background: rgba(255,255,255,0.05); padding: 20px; border-radius: 15px;">
            <i class="ph-fill ph-bookmark-simple" style="font-size: 2rem; color: var(--secondary-yellow); margin-bottom: 10px;"></i>
            <h3 style="color: white; font-size: 1.5rem;">0</h3>
            <p class="muted" style="font-size: 0.9rem;">Guardados</p>
          </div>
          <div style="background: rgba(255,255,255,0.05); padding: 20px; border-radius: 15px;">
            <i class="ph-fill ph-paper-plane-tilt" style="font-size: 2rem; color: var(--secondary-yellow); margin-bottom: 10px;"></i>
            <h3 style="color: white; font-size: 1.5rem;">0</h3>
            <p class="muted" style="font-size: 0.9rem;">Postulaciones</p>
          </div>
        </div>

        <button class="btn btn-outline w-100" style="margin-bottom: 15px;" onclick="window.history.pushState(null, null, '/'); window.dispatchEvent(new Event('popstate'));">Explorar oportunidades</button>
      </div>
    </div>
  `;
}

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
  
  // Format registration date
  const rawDate = user.created_at ? new Date(user.created_at) : new Date();
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = rawDate.toLocaleDateString('es-PE', options);

  return `
    <div class="container mb-2 animate-on-scroll" style="margin-top: 40px; min-height: 60vh;">
      
      <div style="background: rgba(255,255,255,0.03); border-radius: 30px; border: 1px solid rgba(255,255,255,0.08); padding: 50px 40px; display: flex; flex-direction: column; align-items: center; text-align: center; max-width: 650px; margin: 0 auto; box-shadow: 0 20px 40px rgba(0,0,0,0.2); backdrop-filter: blur(10px);">
        
        <div style="position: relative; margin-bottom: 25px;">
          <img src="${avatar}" alt="Avatar" style="width: 140px; height: 140px; border-radius: 50%; border: 4px solid var(--secondary-yellow); object-fit: cover; box-shadow: 0 10px 25px rgba(255,213,0,0.3);">
          <div style="position: absolute; bottom: 5px; right: 5px; background: #51cf66; width: 24px; height: 24px; border-radius: 50%; border: 4px solid var(--primary-blue);" title="Cuenta Activa"></div>
        </div>
        
        <h1 style="color: white; font-size: 2.8rem; margin-bottom: 5px; font-weight: 800;">${user.name}</h1>
        <p class="muted" style="margin-bottom: 15px; font-size: 1.2rem; display: flex; align-items: center; justify-content: center; gap: 8px;">
          <i class="ph-fill ph-envelope-simple"></i> ${user.email}
        </p>
        
        <div style="display: inline-flex; align-items: center; gap: 8px; background: rgba(255,213,0,0.1); color: var(--secondary-yellow); padding: 8px 16px; border-radius: 20px; font-size: 0.95rem; font-weight: 600; margin-bottom: 35px;">
          <i class="ph-fill ph-calendar-check"></i> Miembro desde ${formattedDate}
        </div>

        <div style="width: 100%; display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 35px;">
          <div style="background: rgba(255,255,255,0.05); padding: 25px 20px; border-radius: 20px; transition: transform 0.3s ease; cursor: pointer;" onmouseover="this.style.transform='translateY(-5px)'" onmouseout="this.style.transform='translateY(0)'">
            <i class="ph-fill ph-bookmark-simple" style="font-size: 2.5rem; color: var(--secondary-yellow); margin-bottom: 15px;"></i>
            <h3 style="color: white; font-size: 1.8rem; margin-bottom: 5px;">0</h3>
            <p class="muted" style="font-size: 1rem;">Guardados</p>
          </div>
          <div style="background: rgba(255,255,255,0.05); padding: 25px 20px; border-radius: 20px; transition: transform 0.3s ease; cursor: pointer;" onmouseover="this.style.transform='translateY(-5px)'" onmouseout="this.style.transform='translateY(0)'">
            <i class="ph-fill ph-paper-plane-tilt" style="font-size: 2.5rem; color: var(--secondary-yellow); margin-bottom: 15px;"></i>
            <h3 style="color: white; font-size: 1.8rem; margin-bottom: 5px;">0</h3>
            <p class="muted" style="font-size: 1rem;">Postulaciones</p>
          </div>
        </div>

        <button class="btn w-100" style="padding: 15px; font-size: 1.1rem; border-radius: 15px;" onclick="window.history.pushState(null, null, '/'); window.dispatchEvent(new Event('popstate'));">
          Explorar oportunidades <i class="ph ph-arrow-right" style="margin-left: 8px;"></i>
        </button>
      </div>
    </div>
  `;
}
